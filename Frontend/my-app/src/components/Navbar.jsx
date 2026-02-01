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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { products } = useSelector((state) => state.products);

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-white ">
      <div className="flex text items-center text-xl gap-15">
        <Link to="/" className="text-xl font-bold uppercase">
          SHRÉEJI<span className="text-red-500">.</span>
        </Link>

        <div className="hidden text lg:flex text-[13px] gap-8  uppercase font-bold tracking-widest text-gray-500">
          <Link to="/Boys" className="hover:text-black">
            Boys
          </Link>
          <Link to="/Mens" className="hover:text-black">
            Men
          </Link>
          <Link to="/privacy-policy" className="hover:text-black">
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-7 text text-[15px]">
        <Search
          className="w-5 h-5 cursor-pointer"
          onClick={() => setSearchOpen(true)}
        />

        <Link to="/favorite">
          <Heart className="w-5 h-5 cursor-pointer" />
        </Link>
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
        {mobileOpen && (
          <div className="fixed inset-0 z-[999] lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <span className="text-lg font-bold uppercase">
                  SHRÉEJI<span className="text-red-500">.</span>
                </span>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-bold tracking-widest"
                >
                  <X />
                </button>
              </div>

              <div className="flex flex-col px-6 py-8  space-y-6 text-sm font-bold uppercase tracking-widest">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
                <Link to="/Mens" onClick={() => setMobileOpen(false)}>
                  Men
                </Link>
                <Link to="/Boys" onClick={() => setMobileOpen(false)}>
                  Boys
                </Link>
                <Link to="/privacy-policy" className="hover:text-black">
                  Privacy Policy
                </Link>
                <Link to="/cart" onClick={() => setMobileOpen(false)}>
                  Cart ({cartCount})
                </Link>

                <div className="border-t text pt-6 space-y-4">
                  {user ? (
                    <>
                      <div className="text">
                        <Link
                          to="/profile"
                          className="text"
                          onClick={() => setMobileOpen(false)}
                        >
                          Profile
                        </Link>
                      </div>
                      <div className="justify-center text items-center">
                        <button
                          onClick={() => {
                            logout();
                            setMobileOpen(false);
                          }}
                          className="text-left text1 bg-black text-white px-7 py-3 text"
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
              className="w-9 h-9 rounded-full text1 bg-black text-white flex items-center justify-center uppercase text-xs font-bold"
            >
              {user.name?.charAt(0)}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg z-50">
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full text-left text1 px-4 py-3 font-serif text-xs hover:bg-gray-100"
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
        {searchOpen && (
          <div className="fixed inset-0 z-[999]">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSearchOpen(false)}
            />

            <div className="absolute right-0 top-0 h-full w-[100%] max-w-md bg-white shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <span className="text-xl flex gap-3 font-bold uppercase tracking-widest">
                  <Search className="w-5 h-7"/>Search
                </span>
                <button className="hover:bg-gray-300 hover:rounded-full  hover:cursor-pointer p-3" onClick={() => setSearchOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                {searchQuery &&
                  products
                    .filter((p) =>
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .slice(0, 10)
                    .map((p) => (
                      <Link
                        key={p._id}
                        to={`/product/${p._id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex gap-4 items-center border-b pb-4"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-20 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-semibold">{p.name}</p>
                          <p className="text-xs text-gray-500">₹{p.price}</p>
                        </div>
                      </Link>
                    ))}

                {searchQuery &&
                  products.filter((p) =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
                  ).length === 0 && (
                    <p className="text-sm text-gray-500">No products found</p>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
