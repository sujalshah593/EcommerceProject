import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Redux/Slices/cartSlice.js";
import api from "../api/axios.js";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth || {});git 

  const [orderStep, setOrderStep] = useState("shipping");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateShipping = () => {
    const { firstName, email, phone, address, city, zipCode } = formData;

    if (!firstName || !email || !phone || !address || !city || !zipCode) {
      alert("Please fill all required shipping fields");
      return false;
    }
    return true;
  };


  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const tax = Math.round(subtotal * 0.1);
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // STEP 1 — shipping
    if (orderStep === "shipping") {
      if (!validateShipping()) return;
      setOrderStep("payment");
      return;
    }

    // STEP 2 — payment & order
    try {
      const orderPayload = {
        orderItems: cartItems.map((i) => ({
          name: i.name,
          qty: i.qty,
          image: i.image,
          price: i.price,
          product: i._id,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.zipCode,
          country: "India",
        },
        totalPrice: total,
      };

      await api.post("/orders", orderPayload);

      dispatch(clearCart());
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* <nav className="border-b sticky top-0 bg-white/95 backdrop-blur z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
            <Link to="/" className="font-serif text-2xl tracking-wider">
              VÉRO
            </Link>
            
          </div>
        </nav> */}

        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-12">
            <Link
              to="/cart"
              className="text-sm text-gray-500 hover:text-black transition"
            >
              ← Back to Cart
            </Link>

            <h1 className="font-serif text-4xl tracking-wide">Checkout</h1>

            {/* spacer to keep title centered */}
            <div className="w-24"></div>
          </div>
          <div className="flex gap-8 mb-12">
            {["shipping", "payment"].map((step, i) => (
              <div
                key={step}
                className={`flex flex-col items-center ${
                  orderStep === step ? "text-black" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center mb-2 ${
                    orderStep === step
                      ? "border-black bg-black/10"
                      : "border-gray-300"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-sm capitalize">{step}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {orderStep === "shipping" && (
                  <>
                    <h2 className="font-serif text-2xl mb-6">
                      Shipping Address
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border px-4 py-3"
                        required
                      />
                      <input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border px-4 py-3"
                        required
                      />
                    </div>

                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border px-4 py-3 w-full"
                      required
                    />

                    <input
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border px-4 py-3 w-full"
                      required
                    />

                    <input
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="border px-4 py-3 w-full"
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border px-4 py-3"
                        required
                      />
                      <input
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="border px-4 py-3"
                        required
                      />
                    </div>

                    <input
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="border px-4 py-3 w-full"
                      required
                    />
                  </>
                )}

                {orderStep === "payment" && (
                  <>
                    <h2 className="font-serif text-2xl mb-6">
                      Payment Information
                    </h2>

                    <input
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="border px-4 py-3 w-full"
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="border px-4 py-3"
                        required
                      />
                      <input
                        name="cvc"
                        placeholder="CVV"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        className="border px-4 py-3"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-8">
                  {orderStep === "payment" && (
                    <button
                      type="button"
                      onClick={() => setOrderStep("shipping")}
                      className="flex-1 border py-3"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white py-3 uppercase tracking-wider"
                  >
                    {orderStep === "shipping"
                      ? "Continue to Payment"
                      : "Place Order"}
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-100 p-8 sticky top-24">
                <h2 className="font-serif text-xl mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-red-500">FREE</span>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <span>Total</span>
                  <span className="text-2xl">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default CheckoutPage;
