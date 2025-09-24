import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider as AdminAuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import TestAuth from "./pages/TestAuth";
import VerifyOTP from "./pages/auth/VerifyOTP";

const AdminApp = () => {
  return (
    <AdminAuthProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="test-auth" element={<TestAuth />} />
        <Route
          path="/*"
          element={
            <AdminRoute>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="pt-16 pb-20">
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />

                  </Routes>
                </div>
                <BottomNav />
              </div>
            </AdminRoute>
          }
        />
      </Routes>
    </AdminAuthProvider>
  );
};

export default AdminApp;


