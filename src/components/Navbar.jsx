import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import logo from "../assets/logo.jpg";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collections = [
    { name: "Kurtis", slug: "kurtis" },
    { name: "Anarkalis", slug: "anarkalis" },
    { name: "Crop Tops", slug: "crop-tops" },
    { name: "Western Wear", slug: "western-wear" },
  ];

  // Dropdown handlers with delay
  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsCollectionsOpen(true);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setIsCollectionsOpen(false);
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout);
  };

  return (
    <>
      {/* ULTRA-PREMIUM BOUTIQUE NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-white/98 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-[#E9EDC9]"
          : "bg-white/95 backdrop-blur-md border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Navigation */}
          <div className="flex items-center justify-between h-20">

            {/* Left Section - Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src={logo}
                  alt="NAN"
                  className="h-11 w-11 object-cover rounded-full transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-[#D4A373]/20 group-hover:ring-2 group-hover:ring-[#D4A373]/40 transition-all duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className="block text-2xl font-serif tracking-[0.15em] text-[#6B705C] leading-none">
                  NAN
                </span>
                <span className="block text-[9px] tracking-[0.3em] text-[#6B705C]/50 uppercase mt-0.5">
                  Boutique
                </span>
              </div>
            </Link>

            {/* Center Section - Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-10">
              {/* Collections with Dropdown */}
              <div
                className="relative group"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  to="/collections"
                  className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] text-[#6B705C] hover:text-[#D4A373] transition-all duration-300 uppercase font-medium group"
                >
                  Collections
                  <svg className="w-3 h-3 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Elegant Dropdown */}
                {isCollectionsOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E9EDC9] overflow-hidden animate-[fade-in_250ms_ease-out]"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="py-3">
                      {collections.map((c, index) => (
                        <Link
                          key={c.slug}
                          to={`/collections/${c.slug}`}
                          className={`block px-6 py-3 text-sm text-[#6B705C] hover:bg-gradient-to-r hover:from-[#FAEDCD]/30 hover:to-transparent hover:text-[#D4A373] transition-all duration-200 ${index !== collections.length - 1 ? 'border-b border-[#E9EDC9]/30' : ''
                            }`}
                          onClick={() => setIsCollectionsOpen(false)}
                        >
                          <span className="font-medium tracking-wide">{c.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className="text-[11px] tracking-[0.2em] text-[#6B705C] hover:text-[#D4A373] transition-all duration-300 uppercase font-medium relative group"
              >
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4A373] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                to="/about"
                className="text-[11px] tracking-[0.2em] text-[#6B705C] hover:text-[#D4A373] transition-all duration-300 uppercase font-medium relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4A373] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                to="/contact"
                className="text-[11px] tracking-[0.2em] text-[#6B705C] hover:text-[#D4A373] transition-all duration-300 uppercase font-medium relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#D4A373] transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            {/* Right Section - Icons & Actions */}
            <div className="flex items-center gap-2">

              {/* Wishlist */}
              {isLoggedIn && (
                <Link
                  to="/wishlist"
                  className="relative p-2.5 text-[#6B705C] hover:text-[#D4A373] hover:bg-[#FAEDCD]/30 rounded-full transition-all duration-300 group"
                  aria-label="Wishlist"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] rounded-full bg-[#D4A373] text-white text-[9px] flex items-center justify-center font-semibold shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Cart */}
              {isLoggedIn && (
                <button
                  onClick={() => navigate("/cart")}
                  className="relative p-2.5 text-[#6B705C] hover:text-[#D4A373] hover:bg-[#FAEDCD]/30 rounded-full transition-all duration-300 group"
                  aria-label="Shopping cart"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] rounded-full bg-[#D4A373] text-white text-[9px] flex items-center justify-center font-semibold shadow-sm">
                      {totalItems}
                    </span>
                  )}
                </button>
              )}

              {/* Profile */}
              {isLoggedIn && (
                <Link
                  to="/profile"
                  className="p-2.5 text-[#6B705C] hover:text-[#D4A373] hover:bg-[#FAEDCD]/30 rounded-full transition-all duration-300 group"
                  aria-label="Profile"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}

              {/* Divider */}
              {isLoggedIn && <div className="hidden md:block w-px h-6 bg-[#E9EDC9]" />}

              {/* Auth Buttons */}
              {!isLoggedIn ? (
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => navigate("/signin")}
                    className="px-5 py-2 text-[11px] tracking-[0.15em] text-[#6B705C] hover:text-[#D4A373] transition-all duration-300 font-medium uppercase"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="px-6 py-2.5 bg-[#6B705C] text-white text-[10px] tracking-[0.2em] rounded-full hover:bg-[#5a5d4d] hover:shadow-lg transition-all duration-300 font-medium uppercase"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="hidden md:block px-5 py-2 text-[11px] tracking-[0.15em] text-[#6B705C] hover:text-[#D4A373] transition-all duration-300 font-medium uppercase"
                >
                  Logout
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 text-[#6B705C] hover:text-[#D4A373] hover:bg-[#FAEDCD]/30 rounded-full transition-all duration-300"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E9EDC9] bg-white/98 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
              <Link
                to="/collections"
                className="block py-3 text-sm tracking-[0.15em] text-[#6B705C] hover:text-[#D4A373] transition-colors uppercase font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <div className="pl-4 space-y-1 border-l-2 border-[#E9EDC9]">
                {collections.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/collections/${c.slug}`}
                    className="block py-2 text-sm text-[#6B705C]/80 hover:text-[#D4A373] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/blog"
                className="block py-3 text-sm tracking-[0.15em] text-[#6B705C] hover:text-[#D4A373] transition-colors uppercase font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="block py-3 text-sm tracking-[0.15em] text-[#6B705C] hover:text-[#D4A373] transition-colors uppercase font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block py-3 text-sm tracking-[0.15em] text-[#6B705C] hover:text-[#D4A373] transition-colors uppercase font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Auth */}
              {!isLoggedIn ? (
                <div className="pt-4 border-t border-[#E9EDC9] space-y-3 mt-4">
                  <button
                    onClick={() => {
                      navigate("/signin");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full py-3 text-sm text-center tracking-[0.15em] text-[#6B705C] hover:text-[#D4A373] transition-colors font-medium uppercase border border-[#E9EDC9] rounded-full"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full py-3 bg-[#6B705C] text-white text-sm text-center tracking-[0.15em] rounded-full hover:bg-[#5a5d4d] transition-colors font-medium uppercase"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full py-3 text-sm text-center tracking-[0.15em] text-[#6B705C] hover:text-[#D4A373] transition-colors font-medium uppercase border-t border-[#E9EDC9] mt-4 pt-4"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
