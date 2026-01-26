import {
  ShoppingCart,
  Search,
  Menu,
  Heart,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, Suspense, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import {
  fetchProducts,
  resetProducts,
} from "../Redux/Slices/productSlice.js";
import TruckLoader from "../components/TruckLoader.jsx";
import Navbar from "../components/Navbar.jsx";


const MensContent = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const fetchedPages = useRef(new Set());

  const { products, loading, error, pages } = useSelector(
    (state) => state.products
  );

  const mensProducts = products.filter(
    (p) => p.targetGroup === "Men"
  );

  useEffect(() => {
    dispatch(resetProducts());
    fetchedPages.current.clear();
    setPage(1);
  }, [dispatch]);

  useEffect(() => {
    if (!fetchedPages.current.has(page)) {
      fetchedPages.current.add(page);
      dispatch(fetchProducts({ page, targetGroup: "Men" }));
    }
  }, [dispatch, page]);

  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-white">
      {/* <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 bg-white/80 backdrop-blur-md border-b">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
            SHRÉEJI<span className="text-red-500">.</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            <Link to="#">New Arrivals</Link>
            <Link to="/mens" className="text-black">
              Men
            </Link>
            <Link to="/boys">Boys</Link>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Search className="w-5 h-5 cursor-pointer" />
          <Heart className="w-5 h-5 cursor-pointer" />

          <div className="relative">
            <ShoppingCart className="w-5 h-5 cursor-pointer" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full">
              2
            </span>
          </div>

          <Menu className="lg:hidden w-6 h-6" />

          <Link
            to="/login"
            className="hidden sm:block px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest"
          >
            Sign In
          </Link>
        </div> */}
      {/* </nav> */}
      <Navbar/>

      <main className="pt-24 md:pt-32">
        <section className="sticky top-[72px] z-40 bg-white/95 backdrop-blur border-b px-6 md:px-12 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6">
              <button className="flex text items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex text1 items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
              >
                Sort By
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
          {loading && <TruckLoader/>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16 md:gap-x-8">
            {mensProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {page < pages && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={loading}
                className="px-12 py-4 border text1 border-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const MensPage = () => (
  <Suspense fallback={null}>
    <MensContent />
  </Suspense>
);

export default MensPage;
