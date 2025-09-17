import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCartIcon, UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { totals } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section - Brand/Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://dummyimage.com/64x64/e5e7eb/9ca3af.png&text=BD" 
              alt="Bridal Dreams Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-gray-900 font-bold text-xl tracking-wide">BRIDAL DREAMS</span>
        </Link>

        {/* Middle Section - Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-gray-700 font-medium text-sm tracking-wider uppercase transition-colors duration-300 ${
                isActive ? 'text-rose-600' : 'hover:text-rose-600'
              }`
            }
          >
            HOME
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => 
              `text-gray-700 font-medium text-sm tracking-wider uppercase transition-colors duration-300 ${
                isActive ? 'text-rose-600' : 'hover:text-rose-600'
              }`
            }
          >
            PRODUCTS
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-gray-700 font-medium text-sm tracking-wider uppercase transition-colors duration-300 ${
                isActive ? 'text-rose-600' : 'hover:text-rose-600'
              }`
            }
          >
            ABOUT
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-gray-700 font-medium text-sm tracking-wider uppercase transition-colors duration-300 ${
                isActive ? 'text-rose-600' : 'hover:text-rose-600'
              }`
            }
          >
            CONTACT
          </NavLink>
        </nav>

        {/* Right Section - Utility Icons */}
        <div className="flex items-center gap-6">
          {/* Shopping Cart */}
          <NavLink to="/cart" className="text-gray-700 hover:text-rose-600 transition-colors duration-300">
            <span className="relative inline-flex items-center">
              <ShoppingCartIcon className="h-6 w-6" />
              {totals.totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-rose-500 text-white rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totals.totalQuantity}
                </span>
              )}
            </span>
          </NavLink>
          
          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-700 hover:text-rose-600 transition-colors duration-300 flex items-center gap-1"
            >
              <div className="w-8 h-8 bg-gray-100 hover:bg-rose-100 rounded-full flex items-center justify-center transition-colors duration-300">
                <UserIcon className="h-5 w-5" />
              </div>
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                      Welcome, {user?.name || 'User'}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 hover:text-rose-600 transition-colors duration-300">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Navbar


