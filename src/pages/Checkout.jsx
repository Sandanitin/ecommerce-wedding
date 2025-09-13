import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaArrowLeft, FaCreditCard, FaLock, FaCheckCircle, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa'

const Checkout = () => {
  const { items, totals, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India'
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve(true)
        return
      }

      // Check if script is already being loaded
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        // Wait for existing script to load
        const checkLoaded = setInterval(() => {
          if (window.Razorpay) {
            clearInterval(checkLoaded)
            resolve(true)
          }
        }, 100)
        
        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkLoaded)
          resolve(false)
        }, 10000)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        console.log('Razorpay script loaded successfully')
        resolve(true)
      }
      script.onerror = () => {
        console.error('Failed to load Razorpay script')
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    
    // Validate shipping form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.postalCode) {
      alert('Please fill in all required shipping information')
      return
    }
    
    setIsProcessing(true)
    
    try {
      // Load Razorpay script
      const res = await loadRazorpayScript()
      if (!res) {
        alert('Razorpay SDK failed to load. Please check your internet connection.')
        setIsProcessing(false)
        return
      }

      // Create order on your backend (for demo, we'll use mock data)
      const orderData = {
        amount: totals.total * 100, // Convert to paise
        currency: 'INR',
        receipt: `order_${Date.now()}`,
        notes: {
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`
        }
      }

      // In a real app, you would make an API call to your backend to create the order
      // For demo purposes, we'll use mock data
      const mockOrderResponse = {
        id: `order_${Date.now()}`,
        amount: orderData.amount,
        currency: orderData.currency
      }

      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag', // Replace with your Razorpay key
        amount: mockOrderResponse.amount,
        currency: mockOrderResponse.currency,
        name: 'Bridal Dreams',
        description: `Order for ${items.length} item(s)`,
        // Remove order_id for now - we'll create a simple payment without order
        handler: function (response) {
          // Payment successful
          console.log('Payment successful:', response)
          alert('Payment successful! Order placed.')
          setPlaced(true)
          clearCart()
          setIsProcessing(false)
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        notes: orderData.notes,
        theme: {
          color: '#ec4899' // Rose color to match the theme
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false)
            console.log('Payment modal dismissed')
          }
        },
        on: {
          payment_failed: function(response) {
            console.error('Payment failed:', response)
            alert('Payment failed. Please try again.')
            setIsProcessing(false)
          }
        }
      }

      // Check if Razorpay is available
      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options)
        razorpay.open()
      } else {
        throw new Error('Razorpay not loaded')
      }
      
    } catch (error) {
      console.error('Payment error:', error)
      
      // Fallback: Show a simple confirmation for demo purposes
      const proceedWithDemoPayment = confirm(
        'Razorpay payment gateway is not available. Would you like to proceed with a demo payment? (This is for testing purposes only)'
      )
      
      if (proceedWithDemoPayment) {
        // Simulate successful payment
        setTimeout(() => {
          alert('Demo payment successful! Order placed.')
          setPlaced(true)
          clearCart()
          setIsProcessing(false)
        }, 1000)
      } else {
        setIsProcessing(false)
      }
    }
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
              <FaCheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully! 🎉</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Thank you for your purchase! Your order has been confirmed and you will receive a confirmation email shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Continue Shopping
              </Link>
              <Link 
                to="/" 
                className="border-2 border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-lg hover:border-rose-300 hover:text-rose-600 transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-pink-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/cart" 
              className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors duration-300"
            >
              <FaArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Cart</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FaTruck className="text-white text-lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
              </div>
              
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">First Name *</label>
                    <input 
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Last Name *</label>
                    <input 
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address *</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number *</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Address *</label>
                  <input 
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                    required 
                  />
                </div>
                
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">City *</label>
                    <input 
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Postal Code *</label>
                    <input 
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Country *</label>
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      required
                    >
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{item.title}</h3>
                      <div className="flex gap-2 mt-1">
                        {item.selectedColor && (
                          <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs font-medium">
                            {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                            {item.selectedSize}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="font-semibold text-gray-900">₹{totals.subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {totals.shipping === 0 ? 'Free' : `₹${totals.shipping.toLocaleString()}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-gray-900">₹{totals.tax.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-rose-600">₹{totals.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full mt-8 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Opening Payment Gateway...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <FaShieldAlt className="text-lg" />
                    <span>Pay with Razorpay</span>
                  </div>
                )}
              </button>

              {/* Security Features */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>SSL encrypted checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Free shipping on orders over ₹2,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout


