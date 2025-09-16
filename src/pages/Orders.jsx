import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import frontendApi from '../services/api'
import { useAuth } from '../context/AuthContext'

const Orders = () => {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [loading, isAuthenticated, navigate])

  const fetchOrders = async (pageNum = 1) => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await frontendApi.orders.getMyOrders({ page: pageNum, limit })
      const data = res.data
      setOrders(data.data || [])
      setTotalPages(data.pagination?.pages || 1)
    } catch (err) {
      console.error('Failed to load orders:', err)
      setError(err.response?.data?.message || 'Failed to load orders')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders(page)
    }
  }, [isAuthenticated, page])

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-1">View your recent purchases and their statuses</p>
          </div>
          <Link to="/products" className="text-rose-600 hover:text-rose-700 font-medium">Continue Shopping →</Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
            <span className="ml-3 text-gray-600">Loading orders...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            <div className="font-semibold mb-2">Unable to load orders</div>
            <div className="text-sm">{error}</div>
            <button onClick={() => fetchOrders(page)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Try again</button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293a1 1 0 00.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Browse our collection and place your first order.</p>
            <Link to="/products" className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600">Shop now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Order ID</div>
                    <div className="font-mono text-gray-900">{order._id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Placed on</div>
                    <div className="text-gray-900">{new Date(order.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-gray-900 font-semibold">₹{(order.totalAmount || 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-700">
                      {order.status || 'pending'}
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  {order.items?.map((it, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <img
                        src={it.product?.images?.[0] ? `/${String(it.product.images[0]).replace(/\\/g, '/')}` : '/images/logo.png'}
                        alt={it.product?.name || 'Product'}
                        className="h-16 w-16 rounded-lg object-cover border"
                        onError={(e) => { e.currentTarget.src = '/images/logo.png' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{it.product?.name || 'Product'}</div>
                        <div className="text-sm text-gray-500">Qty: {it.quantity} • ₹{(it.price || it.product?.price || 0).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Previous
            </button>
            <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
