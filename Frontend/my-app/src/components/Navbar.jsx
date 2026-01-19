import { ShoppingCart, Search, Menu, Heart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-white border-b">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold uppercase">
          SHRÉEJI<span className="text-red-500">.</span>
        </Link>

        <div className="hidden lg:flex gap-8 text-[10px] uppercase font-bold tracking-widest text-gray-500">
          <Link to="#" className="hover:text-black">
            New Arrivals
          </Link>
          <Link to="/Boys" className="hover:text-black">
            Boys
          </Link>
          <Link to="/Mens" className="hover:text-black">
            Men
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 cursor-pointer" />
        <Heart className="w-5 h-5 cursor-pointer" />
        <div className="relative">
          <Link to="/cart">
            <ShoppingCart className="w-5 h-5 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full px-1">
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 font-bold bg-red-500 text-white text-[8px] rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
        </div>
        <Menu
          className="lg:hidden w-6 h-6"
          onClick={() => setMobileOpen(true)}
        />
        {/* ================= MOBILE MENU ================= */}
        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="fixed inset-0 z-[999] lg:hidden">
            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />

            {/* DRAWER */}
            <div className="absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-xl flex flex-col">
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <span className="text-lg font-bold uppercase">
                  SHRÉEJI<span className="text-red-500">.</span>
                </span>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-bold tracking-widest"
                >
                  <X/>
                </button>
              </div>

              {/* MENU LINKS */}
              <div className="flex flex-col px-6 py-8 space-y-6 text-sm font-bold uppercase tracking-widest">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
                <Link to="/Mens" onClick={() => setMobileOpen(false)}>
                  Men
                </Link>
                <Link to="/Boys" onClick={() => setMobileOpen(false)}>
                  Boys
                </Link>
                <Link to="/cart" onClick={() => setMobileOpen(false)}>
                  Cart ({cartCount})
                </Link>

                <div className="border-t pt-6 space-y-4">
                  {user ? (
                    <>
                      <div>
                        <Link
                          to="/profile"
                          onClick={() => setMobileOpen(false)}
                        >
                          Profile
                        </Link>
                      </div>
                      <div className="justify-center items-center">
                        <button
                          onClick={() => {
                            logout();
                            setMobileOpen(false);
                          }}
                          className="text-left bg-black text-white px-7 py-3 font-serif"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {user ? (
          <div className="relative">
            <button
              onClick={() => setOpen((p) => !p)}
              className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center uppercase text-xs font-bold"
            >
              {user.name?.charAt(0)}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg z-50">
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-xs font-serif hover:bg-gray-100"
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 font-serif text-xs hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden sm:block px-6 py-2 bg-black text-white text-[10px] uppercase tracking-widest"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
