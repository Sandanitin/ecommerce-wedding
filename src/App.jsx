import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import BottomNavbar from './components/BottomNavbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import AdminApp from './admin/App'

const App = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          {!isAdminRoute && <Navbar />}
          <main className="flex-1 pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
             <Route path="/forgot-password" element={<Navigate to="/admin/forgot-password" replace />} />
            
              <Route path="/admin/*" element={<AdminApp />} />
            </Routes>
          </main>
          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <BottomNavbar />}
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App


