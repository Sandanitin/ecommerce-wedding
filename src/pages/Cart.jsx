import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, removeItem, updateQuantity, totals } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">Browse products and add items to your cart.</p>
        <Link to="/products" className="btn-primary mt-6 inline-flex">Go shopping</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map(item => (
          <div key={item.id} className="card p-4 flex gap-4 items-center">
            <img src={item.image} alt={item.title} className="h-20 w-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
              <div className="mt-2 flex items-center gap-2">
                <label className="text-sm text-gray-600">Qty</label>
                <input type="number" min="1" value={item.quantity} onChange={e => updateQuantity(item.id, Number(e.target.value))} className="input-primary w-20" />
                <button className="text-red-600 hover:text-red-700 text-sm" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
            <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="card p-6 h-fit">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>${totals.subtotal.toFixed(2)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>${totals.shipping.toFixed(2)}</dd></div>
          <div className="flex justify-between"><dt>Tax</dt><dd>${totals.tax.toFixed(2)}</dd></div>
          <div className="flex justify-between border-t pt-2 text-base font-semibold"><dt>Total</dt><dd>${totals.total.toFixed(2)}</dd></div>
        </dl>
        <Link to="/checkout" className="btn-primary mt-6 inline-flex w-full justify-center">Checkout</Link>
      </div>
    </div>
  )
}

export default Cart


