import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import adminApi from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Attempting login with:', formData);
      const response = await adminApi.auth.login(formData);
      console.log('Full response object:', response);
      console.log('Response data:', response?.data);
      console.log('Response data.data:', response?.data?.data);
      
      // Check if user data exists in the response
      const userData = response?.data?.data?.user || response?.data?.user;
      console.log('User data:', userData);
      
      if (!userData) {
        console.error('No user data found in response');
        throw new Error('Invalid server response: Missing user data');
      }
      
      const token = response?.data?.token || response?.data?.data?.token;
      if (!token) {
        console.error('No token found in response');
        throw new Error('Invalid server response: Missing token');
      }
      
      console.log('User role from response:', userData.role);
      console.log('All user properties:', Object.keys(userData));
      
      // Store the token and user data
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(userData));
      
      // Update auth context
      await login(token, userData);
      
      console.log('Login successful, user role:', userData.role);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
      
      // Clear any partial login data
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-800/30 rounded-full opacity-40 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-700/20 rounded-full opacity-30 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-600/20 rounded-full opacity-20 blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo Container */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-2xl mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-300 text-lg">Welcome back to your dashboard</p>
          </div>

          {/* Login Card */}
          <div className="bg-gray-900/90 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-white text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 bg-black/50 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300 ${
                      errors.email ? "border-red-500/50 focus:ring-red-500/50" : "border-slate-700/50"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-white text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 bg-black/50 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300 ${
                      errors.password ? "border-red-500/50 focus:ring-red-500/50" : "border-slate-700/50"
                    }`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-gray-500/25 focus:outline-none focus:ring-2 focus:ring-gray-500 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none border border-gray-700"
              >
                <div className="flex items-center justify-center space-x-2">
                  {loading && (
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  )}
                  <span className="text-lg">{loading ? "Signing in..." : "Sign In"}</span>
                </div>
              </button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-gray-400 hover:text-gray-300 text-sm font-medium transition-colors duration-200 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Secure admin access • Protected by encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
