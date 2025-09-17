import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import adminApi from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('adminUser')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem('adminToken'))
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

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const res = await adminApi.auth.login({ email, password })
      const data = res?.data?.data
      setToken(data?.token || '')
      setUser(data?.user || null)
      return { success: true }
    } catch (err) {
      return { success: false, message: err?.normalized?.message || 'Login failed' }
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
      return role === 'admin'
    } catch {
      return false
    }
  }, [user])

  const value = useMemo(() => ({ user, token, isAuthenticated, loading, login, logout, isAdmin }), [user, token, isAuthenticated, loading, login, logout, isAdmin])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
