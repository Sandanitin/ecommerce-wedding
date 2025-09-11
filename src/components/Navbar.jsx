import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { totals } = useCart()
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="font-semibold">Bridal Dreams</span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary-600 font-medium' : 'text-gray-700 hover:text-gray-900'}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'text-primary-600 font-medium' : 'text-gray-700 hover:text-gray-900'}>Products</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'text-primary-600 font-medium' : 'text-gray-700 hover:text-gray-900'}>
            <span className="relative inline-flex items-center">
              <ShoppingCartIcon className="h-6 w-6" />
              {totals.totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-primary-600 text-white rounded-full h-5 w-5 flex items-center justify-center">{totals.totalQuantity}</span>
              )}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar


