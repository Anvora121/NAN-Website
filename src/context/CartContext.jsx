import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Load cart from backend on mount
  useEffect(() => {
    const loadCart = async () => {
      if (!token) return setLoading(false);
      try {
        const res = await api.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(res.data);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [token]);

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Add item to cart
  const addItem = async (product) => {
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      const res = await api.post(
        "/cart",
        { ...product, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(res.data);
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  // Update quantity of an item
  const updateQuantity = async (id, quantity) => {
    if (!token) return;
    try {
      const res = await api.put(
        `/cart/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(res.data);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // Remove item
  const removeItem = async (id) => {
    if (!token) return;
    try {
      const res = await api.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!token) return;
    try {
      const res = await api.delete("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
