import React, { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getImageUrl, handleImageError } from '../utils/imageUtils'

const ProductGrid = memo(({ products }) => {
  const { addItem } = useCart()
  const navigate = useNavigate()
  

  const buildSrcSet = (url) => {
    try {
      if (url.startsWith('/')) return undefined
      const base = url.split('?')[0]
      const params = (url.split('?')[1] ?? 'auto=format&fit=crop&q=80')
      return [
        `${base}?${params}&w=400 400w`,
        `${base}?${params}&w=800 800w`,
        `${base}?${params}&w=1200 1200w`,
      ].join(', ')
    } catch {
      return undefined
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(p => (
        <div key={p._id} className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5 hover:shadow-lg hover:ring-rose-200/50 transition-all duration-300 transform hover:-translate-y-1">
          <Link to={`/products/${p._id}`} className="block">
            <div className="relative aspect-[3/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden border border-gray-200">
              <img 
                src={getImageUrl(p.images?.[0])} 
                alt={p.name} 
                onError={handleImageError}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              {Array.isArray(p.images) && p.images.length > 1 && (
                <div className="absolute bottom-0 right-0 p-2 flex gap-2">
                  {p.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={getImageUrl(image)}
                      alt={`${p.name} ${index + 2}`}
                      onError={handleImageError}
                      loading="lazy"
                      className="w-12 h-12 object-cover rounded-lg border-2 border-white"
                    />
                  ))}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-900 ring-1 ring-black/10 backdrop-blur">
                  ⭐ {p.rating}
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 ring-1 ring-gray-200 backdrop-blur shadow-sm">
                  {p.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>
            </div>
          </Link>
          <div className="p-5">
            <Link to={`/products/${p._id}`} className="block group">
              <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-rose-600 transition-colors">{p.name}</h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{p.description}</p>
            </Link>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-gray-900">₹{p.price.toLocaleString()}</span>
                <p className="text-xs text-gray-500">Starting price</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              <button 
                className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                onClick={(e) => {
                  e.preventDefault()
                  addItem(p, 1, '', '')
                }}
              >
                Add to Cart
              </button>
              <button 
                className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white text-sm font-medium rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                onClick={(e) => {
                  e.preventDefault()
                  addItem(p, 1, '', '')
                  navigate('/checkout')
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

export default ProductGrid


