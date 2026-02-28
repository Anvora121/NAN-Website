import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const {
    items,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Your cart is empty.</p>
        <button
          onClick={() => navigate("/collections")}
          className="px-6 py-3 bg-[#D4A373] text-white rounded-full"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAEDCD] pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-2xl font-semibold mb-6 text-[#6B705C]">
          Shopping Cart
        </h1>

        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-5 border-b border-black/10 pb-6">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-24 h-28 object-cover bg-[#CCD5AE]"
              />
              <div className="flex-1 space-y-2 text-[#6B705C]">
                <p className="text-sm uppercase tracking-wide">{item.name}</p>
                <p className="text-sm opacity-80">₹{item.price}</p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="border w-6 h-6"
                  >
                    −
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="border w-6 h-6"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-sm opacity-70"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal & Actions */}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
          <div className="text-[#6B705C] text-lg font-semibold">
            Subtotal: ₹{subtotal}
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <button
              onClick={() => navigate("/payment")}
              className="px-6 py-3 bg-[#D4A373] text-white rounded-full"
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="px-6 py-3 border border-[#6B705C] text-[#6B705C] rounded-full"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
