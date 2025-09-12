import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { 
  FaHome, 
  FaShoppingBag, 
  FaUser, 
  FaShoppingCart, 
  FaInfoCircle,
  FaEnvelope,
  FaHeart,
  FaUserCircle
} from 'react-icons/fa'

const BottomNavbar = () => {
  const location = useLocation()
  const { totals } = useCart()

  const navItems = [
    {
      path: '/',
      icon: FaHome,
      label: 'Home'
    },
    {
      path: '/products',
      icon: FaShoppingBag,
      label: 'Products'
    },
    {
      path: '/wishlist',
      icon: FaHeart,
      label: 'Wishlist'
    },
    {
      path: '/about',
      icon: FaInfoCircle,
      label: 'About'
    },
    {
      path: '/cart',
      icon: FaShoppingCart,
      label: 'Cart',
      badge: totals.totalQuantity
    }
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200/50 shadow-xl z-50 md:hidden">
      <div className="flex items-center justify-around py-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 ${
                active
                  ? 'text-rose-600 bg-gradient-to-t from-rose-50 to-rose-100/80 shadow-sm'
                  : 'text-gray-500 hover:text-rose-600 hover:bg-gradient-to-t hover:from-rose-50/50 hover:to-rose-100/30'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 transition-all duration-300 ${
                  active 
                    ? 'text-rose-600 scale-110' 
                    : 'text-gray-500 hover:scale-105'
                }`} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px] shadow-lg animate-pulse">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-semibold transition-all duration-300 ${
                active ? 'text-rose-600' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavbar
