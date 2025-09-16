import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import frontendApi from '../services/api'

const CategoryStrip = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await frontendApi.products.getAll()
        setProducts(response.data.data || [])
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products])

  // Category display names and icons mapping
  const getCategoryInfo = (categoryName) => {
    const categoryMap = {
      // Bride categories
      'Bride - Photo Shoot Outfits': { name: 'Photo Shoot Outfits', icon: '📸', color: 'rose' },
      'Bride - Wedding Dresses': { name: 'Wedding Dresses', icon: '👗', color: 'rose' },
      'Bride - Sangeet Wear': { name: 'Sangeet Wear', icon: '💃', color: 'rose' },
      'Bride - Voni Function Outfits': { name: 'Voni Function Outfits', icon: '👘', color: 'rose' },
      'Bride - Haldi Outfits': { name: 'Haldi Outfits', icon: '🌻', color: 'rose' },
      'Bride - Shoes': { name: 'Bridal Shoes', icon: '👠', color: 'rose' },
      'Bride - Sunglasses': { name: 'Bridal Sunglasses', icon: '🕶️', color: 'rose' },
      'Bride - Jewelry': { name: 'Bridal Jewelry', icon: '💎', color: 'rose' },
      
      // Groom categories
      'Groom - Photo Shoot Outfits': { name: 'Groom Photo Shoot', icon: '📸', color: 'blue' },
      'Groom - Wedding Dresses / Sherwanis / Suits': { name: 'Sherwanis & Suits', icon: '👔', color: 'blue' },
      'Groom - Sangeet Wear': { name: 'Groom Sangeet', icon: '💃', color: 'blue' },
      'Groom - Haldi Outfits': { name: 'Groom Haldi', icon: '🌻', color: 'blue' },
      'Groom - Shoes': { name: 'Groom Shoes', icon: '👞', color: 'blue' },
      'Groom - Sunglasses': { name: 'Groom Sunglasses', icon: '🕶️', color: 'blue' },
      'Groom - Jewelry': { name: 'Groom Jewelry', icon: '⌚', color: 'blue' },
      
      // Combo categories
      'Combos - Pre-Wedding Photo Shoot Sets': { name: 'Pre-Wedding Combos', icon: '📸', color: 'purple' },
      'Combos - Wedding Day Combos': { name: 'Wedding Day Combos', icon: '💒', color: 'purple' },
      'Combos - Sangeet/Haldi Twin Themes': { name: 'Sangeet & Haldi Combos', icon: '🎉', color: 'purple' }
    }
    
    return categoryMap[categoryName] || { name: categoryName, icon: '💍', color: 'gray' }
  }

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-rose-50/50 via-pink-50/30 to-purple-50/50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
            <span className="ml-3 text-gray-600">Loading categories...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-r from-rose-50/50 via-pink-50/30 to-purple-50/50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
          {categories.map(cat => {
            const categoryInfo = getCategoryInfo(cat)
            return (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className={`whitespace-nowrap px-6 py-3 rounded-2xl border-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${
                  categoryInfo.color === 'rose' 
                    ? 'border-rose-200 text-rose-700 hover:bg-rose-100 hover:border-rose-300' :
                  categoryInfo.color === 'blue' 
                    ? 'border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300' :
                  categoryInfo.color === 'purple' 
                    ? 'border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300' :
                    'border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                } bg-white/80 backdrop-blur-sm`}
                aria-label={`Browse ${categoryInfo.name}`}
              >
                <span className="mr-2">{categoryInfo.icon}</span>
                {categoryInfo.name}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryStrip


