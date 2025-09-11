import React from 'react'
import { useParams } from 'react-router-dom'
import products from '../shared/products'
import { useCart } from '../context/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const product = products.find(p => String(p.id) === String(id))
  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p>Product not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-2 gap-8">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">Category: {product.category}</span>
        </div>
        <button className="btn-primary mt-6" onClick={() => addItem(product, 1)}>Add to cart</button>
      </div>
    </div>
  )
}

export default ProductDetail


