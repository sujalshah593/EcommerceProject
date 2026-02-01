import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toastSuccess, toastError } from "../utils/toast";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState("LOGIN"); 
  const [otp, setOtp] = useState("");
  const [otpData, setOtpData] = useState(null);
  const [timer, setTimer] = useState(60);

  const { login } = useAuth();
  const navigate = useNavigate();

  const startTimer = () => {
    let t = 60;
    setTimer(t);
    const i = setInterval(() => {
      t--;
      setTimer(t);
      if (t === 0) clearInterval(i);
    }, 1000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", { email, password });

      login(data);
      toastSuccess("Login successfully!");
      navigate("/");
    } catch (error) {
      if (error.response?.data?.requiresOtp) {
        setOtpData(error.response.data);
        setStep("OTP");
        startTimer();
        toastSuccess("OTP sent to your email");
      } else {
        toastError(error.response?.data?.message || "Login failed");
      }
    }
  };


  const verifyOtpHandler = async () => {
    try {
      await api.post("/auth/verify-otp", {
        userId: otpData.userId,
        otp,
      });

      toastSuccess("OTP verified! Please login again.");
      setStep("LOGIN");
      setOtp("");
    } catch (err) {
      toastError("Invalid OTP");
    }
  };

  const resendOtpHandler = async () => {
    try {
      await api.post("/auth/resend-otp", { email });
      startTimer();
      toastSuccess("OTP resent");
    } catch {
      toastError("Failed to resend OTP");
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

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={step === "OTP"}
              className="w-full px-3 py-2 border border-gray-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={step === "OTP"}
                className="w-full px-3 py-2 pr-10 border border-gray-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {step === "OTP" && (
            <div className="space-y-3">
              <label className="block text-sm font-medium">
                Enter OTP
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black"
              />

              <button
                type="button"
                onClick={verifyOtpHandler}
                className="w-full py-3 bg-black text-white font-medium"
              >
                Verify OTP
              </button>

              {timer > 0 ? (
                <p className="text-xs text-gray-500 text-center">
                  Resend OTP in {timer}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={resendOtpHandler}
                  className="text-xs underline text-center w-full"
                >
                  Resend OTP
                </button>
              )}
            </div>
          )}

          {step === "LOGIN" && (
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-medium hover:opacity-90"
            >
              Sign In
            </button>
          )}
        </form>

        {/* GOOGLE */}
        {step === "LOGIN" && (
          <>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t" />
              <span className="px-2 text-xs text-gray-500 uppercase">
                Or continue with
              </span>
              <div className="flex-grow border-t" />
            </div>

            <button
              onClick={googleLogin}
              className="w-full py-3 border border-gray-300 flex items-center justify-center gap-2"
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>
          </>
        )}

        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
