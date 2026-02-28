import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProfilePage from "./pages/ProfilePage";
import Payment from "./pages/Payment";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CartPage from "./pages/CartPage";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard";
import AddItems from "./admin/AddItems";
import Contacts from "./admin/Contacts";
import Orders from "./admin/Orders";
import Users from "./admin/Users";

/* ---------- Layout Wrapper ---------- */
function Layout({ isLoggedIn, setIsLoggedIn, children }) {
  const location = useLocation();

  // hide navbar & footer on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <main className="flex-grow">
        {children}
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <Router>
      <WishlistProvider>
        <CartProvider>
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:slug" element={<Collection />} />
              <Route path="/collections/:slug/:productId" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<ProfilePage />} />

              <Route
                path="/signin"
                element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path="/signup"
                element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
              />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />}>
                <Route path="add-items" element={<AddItems />} />
                <Route path="users" element={<Users />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Routes>
          </Layout>
        </CartProvider>
      </WishlistProvider>
    </Router>
  );
}

export default App;
