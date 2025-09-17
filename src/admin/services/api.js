import axios from 'axios'

// If VITE_API_URL is not set, fall back to same-origin so Vite dev proxy can handle /api
const API_URL = (import.meta.env.VITE_API_URL || '').trim()

const api = axios.create({
  baseURL: API_URL || '',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const data = error?.response?.data
    const isAuthError = status === 401 || status === 403
    error.normalized = {
      status: status || 0,
      success: false,
      message: data?.message || error.message || 'Request failed',
      errors: data?.errors || null,
    }
    if (isAuthError) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

const adminApi = {
  auth: {
    register: (userData) => api.post('/api/auth/register', userData),
    login: (credentials) => api.post('/api/auth/login', credentials),
    logout: () => api.post('/api/auth/logout'),
    getProfile: () => api.get('/api/auth/profile'),
    forgotPassword: (data) => api.post('/api/auth/forgot-password', { email: data.email }),
    verifyOTP: (data) => api.post('/api/auth/verify-otp', { email: data.email, otp: data.otp }),
    resetPassword: (data) => api.post('/api/auth/reset-password', { email: data.email, otp: data.code, newPassword: data.newPassword })
  },
  users: {
    getAll: () => api.get('/api/users'),
    getById: (id) => api.get(`/api/users/${id}`),
    create: (data) => api.post('/api/users', data),
    update: (id, data) => api.put(`/api/users/${id}`, data),
    updateStatus: (id, isActive) => api.put(`/api/users/${id}/status`, { isActive }),
    delete: (id) => api.delete(`/api/users/${id}`)
  },
  products: {
    getAll: () => api.get('/api/products'),
    getById: (id) => api.get(`/api/products/${id}`),
    create: (formData) => {
      const token = localStorage.getItem('adminToken')
      return api.post('/api/products', formData, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } })
    },
    update: (id, formData) => {
      const token = localStorage.getItem('adminToken')
      return api.put(`/api/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } })
    },
    delete: (id) => api.delete(`/api/products/${id}`),
  },
  orders: {
    getAll: () => api.get('/api/orders'),
    getById: (id) => api.get(`/api/orders/${id}`),
    updateStatus: (id, status) => api.put(`/api/orders/${id}/status`, { status }),
  },
  dashboard: {
    getOverview: () => api.get('/api/admin/dashboard'),
  },
}

export default adminApi


