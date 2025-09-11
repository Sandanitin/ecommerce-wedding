import React from 'react'
import { SparklesIcon, ShieldCheckIcon, TruckIcon, CreditCardIcon } from '@heroicons/react/24/outline'

const points = [
  { id: 1, title: 'Custom Designs', desc: 'Unique creative collections with attention to detail', icon: SparklesIcon },
  { id: 2, title: 'Premium Quality', desc: 'Materials selected for comfort and durability', icon: ShieldCheckIcon },
  { id: 3, title: 'Fast Shipping', desc: 'Most orders ship within 3-5 business days', icon: TruckIcon },
  { id: 4, title: 'Secure Shopping', desc: 'Protected checkout with industry-standard encryption', icon: CreditCardIcon },
]

const WhyChoose = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-wide text-primary-700">Why Choose Us</p>
          <h2 className="text-2xl font-semibold">Experience the difference</h2>
          <p className="mt-1 text-gray-600">We are committed to quality, creativity, and a great customer experience.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(p => (
            <div key={p.id} className="card p-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center">
                <p.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 font-medium text-gray-900">{p.title}</p>
              <p className="mt-1 text-sm text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose


