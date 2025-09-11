import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import products from '../shared/products'

const CategoryStrip = () => {
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [])

  return (
    <section className="bg-white border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {categories.map(cat => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="whitespace-nowrap px-4 py-2 rounded-full border text-sm text-gray-700 hover:text-gray-900 hover:border-gray-400 bg-white"
              aria-label={`Browse ${cat}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryStrip


