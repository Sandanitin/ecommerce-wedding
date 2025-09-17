import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';    

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
   


// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle and normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const data = error?.response?.data
    const isAuthError = status === 401 || status === 403

    // Normalize error object for consumers
    error.normalized = {
      status: status || 0,
      success: false,
      message: data?.message || error.message || 'Request failed',
      errors: data?.errors || null,
    }

    if (isAuthError) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

const frontendApi = {
  // Products
  products: {
    getAll: (params = {}) => {
      const queryParams = new URLSearchParams();
      if (params.category && params.category !== 'all') {
        queryParams.append('category', params.category);
      }
      if (params.search) {
        queryParams.append('search', params.search);
      }
      if (params.page) {
        queryParams.append('page', params.page);
      }
      if (params.limit) {
        queryParams.append('limit', params.limit);
      }
      
      const queryString = queryParams.toString();
      const url = queryString ? `/api/products?${queryString}` : '/api/products';
      console.log('API getAll URL:', url);
      return api.get(url);
    },
    getById: (id) => {
      const url = `/api/products/${id}`;
      console.log('API getById URL:', url);
      console.log('API baseURL:', api.defaults.baseURL);
      return api.get(url);
    },
  },

  // Auth
  auth: {
    login: (credentials) => api.post('/api/auth/login', credentials),
    register: (userData) => api.post('/api/auth/register', userData),
    logout: () => api.post('/api/auth/logout'),
    getProfile: () => api.get('/api/auth/profile'),
  },

  // Payments
  payments: {
    getConfig: () => api.get('/api/payments/config'),
    createOrder: (orderData) => api.post('/api/payments/create-order', orderData),
    verifyPayment: (paymentData) => api.post('/api/payments/verify', paymentData),
    getPaymentDetails: (paymentId) => api.get(`/api/payments/${paymentId}`),
  },


  // Orders
  orders: {
    create: (orderData) => api.post('/api/orders', orderData),
    getAll: () => api.get('/api/orders'),
    getById: (id) => api.get(`/api/orders/${id}`),
    getMyOrders: (params = {}) => {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      const qs = queryParams.toString()
      const url = qs ? `/api/orders/user/my-orders?${qs}` : '/api/orders/user/my-orders'
      return api.get(url)
    },
  },

  // Users
  users: {
    update: (id, data) => api.put(`/api/users/${id}`, data),
  },
};

export default frontendApi;
