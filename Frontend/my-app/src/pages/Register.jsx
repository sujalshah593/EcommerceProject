import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toastSuccess, toastError } from "../utils/toast";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
      });

      login(data);
      toastSuccess("Account created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1700);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const googleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f3ee] px-4 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 text-sm text-gray-700 hover:underline"
      >
        ← Back to store
      </Link>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-serif text-center mb-2">
          Create an Account
        </h1>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your details below to create your account
        </p>
        <form onSubmit={submitHandler} className="space-y-4">
          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="px-2 text-xs text-gray-500 uppercase">
            Or sign up with
          </span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <button
          onClick={googleSignup}
          className="w-full py-3 border border-gray-300 bg-transparent font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
        <p className="text-xs text-center text-gray-600 mt-6">
          By clicking continue, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-black">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
