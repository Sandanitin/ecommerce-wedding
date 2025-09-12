import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../shared/products'
import { useCart } from '../context/CartContext'
import { FaStar, FaHeart, FaShare, FaMinus, FaPlus } from 'react-icons/fa'

const ProductDetail = () => {
  const { id } = useParams()
  const product = products.find(p => String(p.id) === String(id)) || {
    id: 1,
    title: "Sample Category",
    price: 4999,
    image: "/images/hero1.png",
    category: "Wedding Dresses",
    description: "Beautiful wedding dress perfect for your special day",
    rating: 4.5,
    reviews: 3,
    inStock: true
  }
  
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const colors = ['Rose Gold', 'Ivory', 'Champagne', 'Blush']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert('Please select a color')
      return
    }
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addItem(product, quantity)
    alert('Product added to cart!')
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg border-2 transition-all duration-300 ${
                  isWishlisted 
                    ? 'border-rose-500 bg-rose-50 text-rose-600' 
                    : 'border-gray-300 hover:border-rose-300 text-gray-700'
                }`}
              >
                <FaHeart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg border-2 border-gray-300 hover:border-rose-300 text-gray-700 transition-all duration-300">
                <FaShare className="h-5 w-5" />
                Share
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Color:</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                      selectedColor === color
                        ? 'border-rose-500 bg-rose-50 text-rose-600'
                        : 'border-gray-300 hover:border-rose-300 text-gray-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Size:</h3>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 flex items-center justify-center font-medium ${
                      selectedSize === size
                        ? 'border-rose-500 bg-rose-50 text-rose-600'
                        : 'border-gray-300 hover:border-rose-300 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity:</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-50 transition-colors duration-200"
                    disabled={quantity <= 1}
                  >
                    <FaMinus className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="px-4 py-3 text-lg font-medium min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-50 transition-colors duration-200"
                    disabled={quantity >= 10}
                  >
                    <FaPlus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">Max 10 items</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details:</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Material:</span>
                  <span className="text-gray-900 font-medium">Cotton Blend</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand:</span>
                  <span className="text-gray-900 font-medium">Bridal Dreams</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Collection:</span>
                  <span className="text-gray-900 font-medium">Sample Collection</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Add to Cart - ₹{(product.price * quantity).toLocaleString()}
            </button>

            {/* Additional Info */}
            <div className="text-center text-sm text-gray-600">
              <p>Free shipping on orders over ₹2,000</p>
              <p>30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail