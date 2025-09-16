import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import frontendApi from '../services/api'
import { useCart } from '../context/CartContext'
import { FaStar, FaHeart, FaShare, FaMinus, FaPlus } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await frontendApi.products.getById(id)
        setProduct(response.data.data)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Product not found')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }
  
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const colors = ['Rose Gold', 'Ivory', 'Champagne', 'Blush']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  
  // Get image URL helper
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/logo.png';
    if (imagePath.startsWith('http')) return imagePath;
    const normalizedPath = imagePath.replace(/\\/g, '/');
    const finalUrl = `${API_URL}/${normalizedPath}`;
    return finalUrl;
  }
  
  const productImages = product.images && product.images.length > 0 
    ? product.images.map(img => getImageUrl(img))
    : ['/images/logo.png']

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert('Please select a color')
      return
    }
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addItem(product, quantity, selectedColor, selectedSize)
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
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Product Thumbnails */}
            <div className="flex gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? 'border-rose-500 ring-2 ring-rose-200'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
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
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">(0 reviews)</span>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                Color:
              </h3>
              <div className="flex gap-3 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedColor === color
                        ? 'border-rose-500 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 shadow-md ring-2 ring-rose-200'
                        : 'border-gray-300 hover:border-rose-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm text-gray-600 mt-3">
                  Selected: <span className="font-semibold text-rose-600">{selectedColor}</span>
                </p>
              )}
            </div>

            {/* Size Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Size:
              </h3>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl border-2 transition-all duration-300 flex items-center justify-center font-bold text-sm transform hover:scale-105 ${
                      selectedSize === size
                        ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 shadow-md ring-2 ring-purple-200'
                        : 'border-gray-300 hover:border-purple-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-sm text-gray-600 mt-3">
                  Selected: <span className="font-semibold text-purple-600">{selectedSize}</span>
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Quantity:
              </h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center border-2 border-gray-300 rounded-xl bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-4 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <FaMinus className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="px-6 py-4 text-xl font-bold min-w-[80px] text-center bg-white border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-4 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity >= 10}
                  >
                    <FaPlus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Max 10 items</p>
                  <p className="text-green-600">In Stock</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700">
                  <span className="font-semibold">Total:</span> ₹{(product.price * quantity).toLocaleString()}
                </p>
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
                  <span className="text-gray-900 font-medium">BEATEN</span>
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

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
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