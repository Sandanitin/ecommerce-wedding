import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import adminApi from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("verify"); // "verify" or "reset"
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get email from location state or use a default
  const email = location.state?.email || "";

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    setLoading(true);
    try {
      const res = await adminApi.auth.verifyOTP(email, otp);
      
      if (res.data.success) {
        toast.success("OTP verified successfully!");
        setStep("reset");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!newPassword || newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      // Reset password
      const res = await adminApi.auth.resetPassword(email, otp, newPassword);
      
      if (res.data.success) {
        toast.success("Password reset successfully! Logging you in...");
        
        // Automatically log in with new password
        const loginResult = await login({ email, password: newPassword });
        
        if (loginResult.success) {
          toast.success("Welcome back! Redirecting to dashboard...");
          // Redirect to dashboard
          navigate("/");
        } else {
          toast.error("Password reset successful, but login failed. Please login manually.");
          navigate("/login");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const res = await adminApi.auth.forgotPassword(email);
      
      if (res.data.success) {
        toast.success("New OTP sent to your email!");
        setOtp("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "verify") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            Verify OTP
          </h2>
          
          <p className="text-gray-600 text-center mb-6">
            We've sent a 6-digit OTP to <strong>{email}</strong>
          </p>

          <form onSubmit={handleVerifyOTP}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded mb-4 text-center text-2xl font-mono tracking-widest"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
            />

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "VERIFY OTP"}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="text-blue-500 hover:text-blue-600 text-sm disabled:opacity-50"
            >
              Resend OTP
            </button>
          </div>

          <div className="text-center mt-4 text-sm">
            <span className="text-gray-700">Remember your password?</span>{" "}
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:underline"
            >
              Back to Login →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Reset Password
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          OTP verified! Please enter your new password.
        </p>

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={6}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !newPassword || !confirmPassword}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting & Logging in..." : "RESET PASSWORD & LOGIN"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <span className="text-gray-700">Remember your password?</span>{" "}
          <Link
            to="/login"
            className="text-green-500 font-semibold hover:underline"
          >
            Back to Login →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
