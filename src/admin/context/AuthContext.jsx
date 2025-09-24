import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import adminApi from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('adminUser')
      const parsed = raw ? JSON.parse(raw) : null
      console.log('AuthProvider - loaded user from localStorage:', parsed)
      return parsed
    } catch {
      console.error('AuthProvider - error parsing user from localStorage')
      return null
    }
  })
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('adminToken')
    console.log('AuthProvider - loaded token from localStorage:', storedToken ? 'exists' : 'none')
    return storedToken
  })
  const [loading, setLoading] = useState(false)
  const isAuthenticated = Boolean(token)

  useEffect(() => {
    if (token) localStorage.setItem('adminToken', token)
    else localStorage.removeItem('adminToken')
  }, [token])

  useEffect(() => {
    try {
      if (user) localStorage.setItem('adminUser', JSON.stringify(user))
      else localStorage.removeItem('adminUser')
    } catch {}
  }, [user])

  const login = useCallback(async (credentials) => {
    setLoading(true)
    try {
      console.log('AuthContext login - credentials:', credentials)
      const res = await adminApi.auth.login(credentials)
      console.log('AuthContext login - response:', res)
      console.log('AuthContext login - response.data:', res?.data)
      
      // Extract user data from the correct response structure
      const userData = res?.data?.data?.user || res?.data?.user
      const token = res?.data?.data?.token || res?.data?.token
      
      console.log('AuthContext login - extracted userData:', userData)
      console.log('AuthContext login - extracted token:', token)
      
      if (!userData || !token) {
        throw new Error('Invalid response structure from server')
      }
      
      setToken(token)
      setUser(userData)
      console.log('AuthContext login - set user:', userData)
      return { success: true }
    } catch (err) {
      console.error('AuthContext login - error:', err)
      return { success: false, message: err?.normalized?.message || err?.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try { await adminApi.auth.logout() } catch {}
    setToken('')
    setUser(null)
  }, [])

  const isAdmin = useCallback(() => {
    try {
      const role = (user?.role || '').toString().toLowerCase()
      console.log('isAdmin check - user:', user, 'role:', role, 'isAdmin:', role === 'admin')
      return role === 'admin'
    } catch (error) {
      console.error('isAdmin check - error:', error)
      return false
    }
  }, [user])

  const value = useMemo(() => ({ user, token, isAuthenticated, loading, login, logout, isAdmin }), [user, token, isAuthenticated, loading, login, logout, isAdmin])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
