import { useDispatch, useSelector } from "react-redux";
import {
  updateQty,
  removeFromCart,
  addToCart,
} from "../Redux/Slices/cartSlice";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FooterSection from "../components/FooterSection";

const CartPage = () => {
  const dispatch = useDispatch();

  // CART
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const tax = Math.round(subtotal * 0.1);
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + tax + shipping;

  return (
    <>
    <div className="min-h-screen bg-white">
      <nav className="border-b sticky top-0 bg-white/95 backdrop-blur z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <Link to="/" className="font-serif text-2xl tracking-wider">
            VÉRO
          </Link>
          <Link to="/" className="text-sm text-gray-500 hover:text-black">
            Continue Shopping
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl tracking-wide mb-12">
          Shopping Bag
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-8">Your shopping bag is empty</p>
            <Link to="/" className="inline-block px-8 py-3 bg-black text-white">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-6 pb-6 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-40 object-cover bg-gray-100"
                  />

                  <div className="flex-1">
                    <h3 className="font-serif text-lg mb-2">{item.name}</h3>

                    <p className="text-sm text-gray-500 mb-4">
                      Price: ₹{item.price}
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-gray-500">Quantity</span>
                      <div className="flex items-center border">
                        <button
                          onClick={() =>
                            item.qty > 1 &&
                            dispatch(
                              updateQty({ id: item._id, qty: item.qty - 1 })
                            )
                          }
                          className="px-3 py-2 text-gray-500 hover:text-black"
                        >
                          −
                        </button>

                        <span className="px-4 py-2 border-l border-r">
                          {item.qty}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(
                              updateQty({
                                id: item._id,
                                qty: item.qty + 1,
                              })
                            )
                          }
                          className="px-3 py-2 text-gray-500 hover:text-black"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm">
                      ₹{(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-100 p-8 sticky top-24">
                <h2 className="font-serif text-xl mb-8">Order Summary</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (10%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-red-500">
                      Free shipping on orders over ₹5,000
                    </p>
                  )}
                </div>

                <div className="border-t pt-4 mb-8 flex justify-between">
                  <span className="font-serif">Total</span>
                  <span className="font-serif text-xl">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="block text-center w-full bg-black text-white py-3 uppercase tracking-wider"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/"
                  className="block text-center w-full mt-4 border py-3"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ADD MORE ITEMS */}
        {products?.length > 0 && (
          <>
            <h2 className="text-xl mt-20 mb-6">Add more items</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, 4).map((p) => (
                <div key={p._id} className="relative">
                  <ProductCard product={p} />

                  <button
                    onClick={() => dispatch(addToCart(p))}
                    className="absolute   left-3  right-3 bg-black text-white text-xs mt-2  py-3 uppercase tracking-wider"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    <FooterSection/>
    </>
  );
};

export default CartPage;
