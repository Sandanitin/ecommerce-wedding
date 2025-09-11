import React from 'react'
import { Link } from 'react-router-dom'

const PromoBanners = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-6">
      <div className="relative rounded-2xl overflow-hidden bg-primary-600 text-white">
        <img src="https://images.unsplash.com/photo-1520975605360-4a4b5b1d8b68?q=80&w=1600&auto=format&fit=crop" alt="Accessories" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative p-8 sm:p-10">
          <h3 className="text-2xl font-semibold">Accessories Sale</h3>
          <p className="mt-2 text-white/90">Up to 30% off selected accessories</p>
          <Link to="/products" className="btn-secondary mt-6 inline-flex">Shop deals</Link>
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden bg-gray-900 text-white">
        <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1600&auto=format&fit=crop" alt="Electronics" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative p-8 sm:p-10">
          <h3 className="text-2xl font-semibold">Audio Essentials</h3>
          <p className="mt-2 text-white/90">Crisp sound at honest prices</p>
          <Link to="/products" className="btn-secondary mt-6 inline-flex">Shop audio</Link>
        </div>
      </div>
    </section>
  )
}

export default PromoBanners


