import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import HeroCarousel from '../components/HeroCarousel'
import frontendApi from '../services/api'

import CategoryStrip from '../components/CategoryStrip'
import CategoryCards from '../components/CategoryCards'
import Newsletter from '../components/Newsletter'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await frontendApi.products.getAll()
        setProducts(response.data.data || [])
      } catch (error) {
        console.error('Home: Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const brideFeatured = products.filter(p => [
    'Bride - Wedding Dresses', 'Bride - Photo Shoot Outfits', 'Bride - Sangeet Wear', 'Bride - Voni Function Outfits', 
    'Bride - Haldi Outfits', 'Bride - Shoes', 'Bride - Sunglasses', 'Bride - Jewelry'
  ].includes(p.category)).slice(0, 8)
  
  const groomFeatured = products.filter(p => [
    'Groom - Photo Shoot Outfits', 'Groom - Wedding Dresses / Sherwanis / Suits', 'Groom - Sangeet Wear', 'Groom - Haldi Outfits', 
    'Groom - Shoes', 'Groom - Sunglasses', 'Groom - Jewelry'
  ].includes(p.category)).slice(0, 8)
  
  const comboFeatured = products.filter(p => [
    'Combos - Pre-Wedding Photo Shoot Sets', 'Combos - Wedding Day Combos', 'Combos - Sangeet/Haldi Twin Themes'
  ].includes(p.category)).slice(0, 8)
  

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-100/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* <CategoryStrip /> */}
     
      <CategoryCards />

      <section id="featured" className="bg-gradient-to-br from-rose-50/30 via-pink-50/20 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">👰 Featured Bride Collection</h2>
              <p className="text-gray-600">Elegant bridal wear for your special day</p>
            </div>
            <Link to="/products?category=Bride - Wedding Dresses" className="text-rose-600 hover:text-rose-700 font-medium">View all bride →</Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
              <span className="ml-3 text-gray-600">Loading products...</span>
            </div>
          ) : (
            <ProductGrid products={brideFeatured} />
          )}
        </div>
      </section>

      <section id="groom" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">🤵 Featured Groom Collection</h2>
              <p className="text-gray-600">Stylish groom wear for the perfect look</p>
            </div>
            <Link to="/products?category=Groom - Wedding Dresses / Sherwanis / Suits" className="text-blue-600 hover:text-blue-700 font-medium">View all groom →</Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Loading products...</span>
            </div>
          ) : (
            <ProductGrid products={groomFeatured} />
          )}
        </div>
      </section>

      <section id="combos" className="bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-rose-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">💑 Featured Couple Combos</h2>
              <p className="text-gray-600">Perfect matching sets for bride and groom</p>
            </div>
            <Link to="/products?category=Combos - Pre-Wedding Photo Shoot Sets" className="text-purple-600 hover:text-purple-700 font-medium">View all combos →</Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-gray-600">Loading products...</span>
            </div>
          ) : (
            <ProductGrid products={comboFeatured} />
          )}
        </div>
      </section>

      <Newsletter />
    </div>
  )
}

export default Home


