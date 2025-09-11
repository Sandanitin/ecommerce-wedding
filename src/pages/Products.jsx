import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import productsData from '../shared/products'
import ProductGrid from '../components/ProductGrid'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')
  const [sort, setSort] = useState(searchParams.get('sort') || 'popular')
  const [view, setView] = useState(searchParams.get('view') || 'grid')
  const [visible, setVisible] = useState(8)

  const handleImgError = (e) => {
    if (!e?.currentTarget) return
    e.currentTarget.onerror = null
    e.currentTarget.src = '/images/logo.png'
  }

  const buildSrcSet = (url) => {
    try {
      if (url.startsWith('/')) return undefined
      const base = url.split('?')[0]
      const params = (url.split('?')[1] ?? 'auto=format&fit=crop&q=80')
      return [
        `${base}?${params}&w=200 200w`,
        `${base}?${params}&w=400 400w`,
        `${base}?${params}&w=800 800w`,
      ].join(', ')
    } catch {
      return undefined
    }
  }

  const categories = useMemo(() => ['all', ...Array.from(new Set(productsData.map(p => p.category)))], [])

  const filtered = useMemo(() => {
    let list = productsData.filter(p => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'all' || p.category === category
      return matchesQuery && matchesCategory
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [query, category])

  useEffect(() => {
    const next = {}
    if (category && category !== 'all') next.category = category
    if (sort && sort !== 'popular') next.sort = sort
    if (view && view !== 'grid') next.view = view
    setSearchParams(next)
  }, [category, sort, view])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 via-pink-50/20 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 text-rose-700 px-4 py-2 text-sm font-semibold ring-1 ring-rose-200 mb-4">
            <span className="h-2 w-2 rounded-full bg-rose-400"></span>
            Bridal Collection
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Find Your Perfect Wedding Look</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our curated collection of wedding dresses, accessories, and jewelry for your special day.</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm ring-1 ring-black/5 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1">
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  placeholder="Search bridal items..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select 
                className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white" 
                value={category} 
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'All Categories' : c.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
              <select 
                className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white" 
                value={sort} 
                onChange={e => setSort(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-white">
              <button 
                className={`px-4 py-3 text-sm font-medium transition-all ${view==='grid'?'bg-rose-500 text-white':'text-gray-600 hover:bg-gray-50'}`} 
                onClick={() => setView('grid')}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium transition-all ${view==='list'?'bg-rose-500 text-white':'text-gray-600 hover:bg-gray-50'}`} 
                onClick={() => setView('list')}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Products Section */}
        {view === 'grid' ? (
          <ProductGrid products={filtered.slice(0, visible)} />
        ) : (
          <div className="space-y-4">
            {filtered.slice(0, visible).map(p => (
              <div key={p.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm ring-1 ring-black/5 hover:shadow-md hover:ring-rose-200/50 transition-all duration-300">
                <div className="flex gap-6 items-center">
                  <div className="relative">
                    <img 
                      src={encodeURI(p.image)} 
                      alt={p.title} 
                      onError={handleImgError}
                      loading="lazy"
                      srcSet={buildSrcSet(p.image)}
                      sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 15vw"
                      className="h-32 w-32 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200" 
                    />
                    <div className="absolute -top-2 -right-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 ring-1 ring-rose-200">
                        ⭐ {p.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">{p.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {p.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </p>
                        <p className="text-gray-600 mt-2 line-clamp-2">{p.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-gray-900">${p.price.toFixed(2)}</p>
                        <button className="mt-3 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Section */}
        {visible < filtered.length && (
          <div className="flex justify-center mt-12">
            <button 
              className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => setVisible(v => v + 8)}
            >
              Load More Items
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="text-center mt-8 text-gray-500">
          Showing {Math.min(visible, filtered.length)} of {filtered.length} bridal items
        </div>
      </div>
    </div>
  )
}

export default Products


