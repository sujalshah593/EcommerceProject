import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toastSuccess, toastError } from "../utils/toast";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      login(data);
      toastSuccess("Login successfully!");
      navigate("/");
    } catch (error) {
      toastError("Invalid email or password");
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const googleLogin = () => {
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

      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-serif text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email to sign in to your account
        </p>

        {/* Login Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>


          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-medium hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="px-2 text-xs text-gray-500 uppercase">
            Or continue with
          </span>
          <div className="flex-grow border-t border-gray-300" />
        </div>


<button
  onClick={googleLogin}
  className="w-full py-3 border border-gray-300 bg-transparent font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2"
>
  <FcGoogle size={22} />
  Continue with Google
</button>
    
        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline hover:text-black">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
