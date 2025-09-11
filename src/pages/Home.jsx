import React from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import HeroCarousel from '../components/HeroCarousel'
import FeatureBar from '../components/FeatureBar'
import CategoryStrip from '../components/CategoryStrip'
import CategoryCards from '../components/CategoryCards'
import Newsletter from '../components/Newsletter'
import products from '../shared/products'

const Home = () => {
  const featured = products.slice(0, 8)
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-100/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden">
            <HeroCarousel />
          </div>
          <div className="mt-8 sm:mt-10 grid md:grid-cols-1 gap-8 place-items-center">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 text-rose-700 px-3 py-1 text-xs font-semibold ring-1 ring-rose-100">Bridal Collection 2024</span>
              <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Your Dream Wedding Awaits</span>
              </h1>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Find the perfect wedding dress and accessories for your special day. Elegant designs, premium quality, and personalized service.</p>
              <div className="mt-6 flex gap-3 justify-center">
                <Link to="/products?category=wedding" className="btn-primary px-6 py-2.5 shadow-sm">Shop Wedding Dresses</Link>
                <a href="#featured" className="btn-secondary px-6 py-2.5">View Collection</a>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="h-6 w-6 rounded-full bg-rose-50 text-rose-700 inline-flex items-center justify-center">✓</span>
                  Free alterations
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="h-6 w-6 rounded-full bg-rose-50 text-rose-700 inline-flex items-center justify-center">✓</span>
                  Personal consultation
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="h-6 w-6 rounded-full bg-rose-50 text-rose-700 inline-flex items-center justify-center">✓</span>
                  Premium quality
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <CategoryStrip /> */}
      <FeatureBar />
      <CategoryCards />

      <section id="featured" className="bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Wedding Dresses</h2>
          <Link to="/products?category=wedding" className="text-primary-600 hover:text-primary-700">View all dresses</Link>
        </div>
        <ProductGrid products={featured} />
        </div>
      </section>

      <Newsletter />
    </div>
  )
}

export default Home


