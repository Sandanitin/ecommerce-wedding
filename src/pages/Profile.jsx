import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user, isAuthenticated, loading, updateUser, refreshProfile } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [loading, isAuthenticated, navigate])

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const payload = { name, email }
      const res = await updateUser(payload)
      if (res.success) {
        setSuccess('Profile updated successfully')
        await refreshProfile()
      } else {
        setError(res.message || 'Failed to update')
      }
    } catch (err) {
      setError('Failed to update')
    } finally {
      setSaving(false)
    }
  }

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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">View and update your account details</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {success && <span className="text-green-600 text-sm">{success}</span>}
              {error && <span className="text-red-600 text-sm">{error}</span>}
            </div>
          </form>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl border">
              <div className="text-sm text-gray-500">Role</div>
              <div className="text-gray-900 font-medium">{user?.role || 'user'}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border">
              <div className="text-sm text-gray-500">Member since</div>
              <div className="text-gray-900 font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border">
              <div className="text-sm text-gray-500">Last login</div>
              <div className="text-gray-900 font-medium">{user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : '-'}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border">
              <div className="text-sm text-gray-500">Status</div>
              <div className="text-gray-900 font-medium">{user?.isActive ? 'Active' : 'Inactive'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
