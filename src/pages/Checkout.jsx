import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const { items, totals, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-semibold">Thank you! 🎉</h1>
        <p className="mt-2 text-gray-600">Your mock order has been placed. A confirmation email would be sent in a real app.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
      <form className="lg:col-span-2 card p-6 space-y-4" onSubmit={handlePlaceOrder}>
        <h1 className="text-xl font-semibold">Checkout</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First name</label>
            <input className="input-primary mt-1" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last name</label>
            <input className="input-primary mt-1" required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="input-primary mt-1" required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input className="input-primary mt-1" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input className="input-primary mt-1" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal code</label>
            <input className="input-primary mt-1" required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Card details</label>
            <input className="input-primary mt-1" placeholder="1234 5678 9012 3456" required />
          </div>
        </div>
        <button className="btn-primary w-full sm:w-auto">Place order</button>
      </form>
      <div className="card p-6 h-fit">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {items.map(i => (
            <li key={i.id} className="flex justify-between"><span>{i.title} × {i.quantity}</span><span>${(i.price * i.quantity).toFixed(2)}</span></li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>${totals.subtotal.toFixed(2)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>${totals.shipping.toFixed(2)}</dd></div>
          <div className="flex justify-between"><dt>Tax</dt><dd>${totals.tax.toFixed(2)}</dd></div>
          <div className="flex justify-between border-t pt-2 text-base font-semibold"><dt>Total</dt><dd>${totals.total.toFixed(2)}</dd></div>
        </dl>
      </div>
    </div>
  )
}

export default Checkout


