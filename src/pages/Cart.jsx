import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft, FaHeart } from 'react-icons/fa'

const Cart = () => {
  const { items, removeItem, updateQuantity, totals } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <FaShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to find the perfect wedding dress!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Shopping
              </Link>
              <Link 
                to="/" 
                className="border-2 border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-lg hover:border-rose-300 hover:text-rose-600 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/products" 
              className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors duration-300"
            >
              <FaArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Continue Shopping</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-32 w-32 object-cover rounded-xl"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-2">Category: {item.category}</p>
                        <p className="text-2xl font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors duration-300"
                        title="Remove item"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <div className="flex items-center border-2 border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-50 transition-colors duration-200"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="px-4 py-2 text-lg font-medium min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors duration-200"
                          disabled={item.quantity >= 10}
                        >
                          <FaPlus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">Max 10 items</span>
                    </div>
                    
                    {/* Item Total */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-700">Item Total:</span>
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
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
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-rose-600">₹{totals.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-4">
                <Link 
                  to="/checkout" 
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-center block"
                >
                  Proceed to Checkout
                </Link>
                
                <button className="w-full border-2 border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl hover:border-rose-300 hover:text-rose-600 transition-all duration-300 flex items-center justify-center gap-2">
                  <FaHeart className="h-4 w-4" />
                  Save for Later
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free shipping on orders over ₹2,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart