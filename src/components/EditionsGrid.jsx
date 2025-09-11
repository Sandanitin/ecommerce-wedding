import React from 'react'
import { Link } from 'react-router-dom'

const editions = [
  { id: 'edition-1', title: 'Edition One', desc: 'Curated everyday essentials', image: 'https://images.unsplash.com/photo-1519764622345-23439dd774f4?q=80&w=1600&auto=format&fit=crop' },
  { id: 'edition-2', title: 'Edition Two', desc: 'Seasonal colors and textures', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop' },
  { id: 'edition-3', title: 'Edition Three', desc: 'Minimal, modern silhouettes', image: 'https://images.unsplash.com/photo-1512436994844-4aee7d73ff85?q=80&w=1600&auto=format&fit=crop' },
]

const EditionsGrid = () => {
  return (
    <section id="editions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-primary-700">Our Editions</p>
          <h2 className="text-2xl font-semibold">Explore our editions</h2>
          <p className="mt-1 text-gray-600">Discover curated collections featuring unique designs and materials.</p>
        </div>
        <Link to="/products" className="text-primary-600 hover:text-primary-700">View all products</Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {editions.map(e => (
          <div key={e.id} className="relative overflow-hidden rounded-2xl group bg-gray-100">
            <img src={e.image} alt={e.title} className="h-64 w-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-xl font-semibold">{e.title}</h3>
              <p className="text-white/90">{e.desc}</p>
              <Link to="/products" className="inline-flex mt-3 px-4 py-2 rounded-md bg-white text-gray-900 text-sm font-medium hover:bg-gray-100">Shop {e.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default EditionsGrid


