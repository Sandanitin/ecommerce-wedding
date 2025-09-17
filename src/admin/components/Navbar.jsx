import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/orders", label: "Orders" },
    { path: "/admin/logout", label: "Logout", isLogout: true },
  ];

  return (
    <nav className="bg-white shadow-[0_4px_12px_rgba(255,0,0,0.5)] transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="flex items-center space-x-3">
              <img src="/images/logo.png" alt="logo" className="w-10 h-auto" />
              <span className="text-xl font-extrabold text-red-600">
                WEDDING
              </span>
            </Link>
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{user.name}</span>
                  <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {user.role}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.isLogout ? (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 font-medium text-sm transition-all duration-200"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? "text-red-600 border-b-2 border-red-600 font-bold"
                      : "text-gray-600 hover:text-red-600 hover:font-bold"
                  } px-3 py-2 text-sm font-medium transition-all duration-200`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) =>
            item.isLogout ? (
              <button
                key={item.label}
                onClick={() => {
                  handleLogout();
                  handleNavClick();
                }}
                className="block w-full text-left text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`${
                  location.pathname === item.path
                    ? "bg-red-100 text-red-600 font-bold"
                    : "text-gray-600 hover:bg-red-50 hover:text-red-600 hover:font-bold"
                } block px-3 py-2 rounded-md text-base font-medium transition-all duration-200`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


