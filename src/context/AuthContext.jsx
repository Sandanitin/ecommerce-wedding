import React, { createContext, useContext, useState, useEffect } from 'react';
import frontendApi from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (!token || !storedUser) {
          setLoading(false);
          return;
        }

        // Set user from localStorage immediately for better UX
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Then verify with the server
        const response = await frontendApi.auth.getProfile();
        
        if (response.data.success) {
          setUser(response.data.data.user);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        const status = error?.response?.status;
        console.error('Auth check failed:', {
          message: error?.message,
          status,
          data: error?.response?.data
        });
        // Only logout on 401 (invalid/expired token). For network or server errors, keep session.
        if (status === 401) {
          logout();
        } else {
          setIsAuthenticated(!!localStorage.getItem('token'));
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await frontendApi.auth.login(credentials);
      
      if (response.data.success) {
        const { token, user } = response.data.data;
        
        // Store token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setUser(user);
        setIsAuthenticated(true);
        
        return { success: true, user };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await frontendApi.auth.register(userData);
      
      if (response.data.success) {
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = async () => {
    try {
      // Call logout API if user is authenticated
      if (isAuthenticated) {
        await frontendApi.auth.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and state regardless of API call result
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const response = await frontendApi.auth.getProfile();
      if (response.data?.success) {
        const freshUser = response.data.data.user;
        setUser(freshUser);
        localStorage.setItem('user', JSON.stringify(freshUser));
        return { success: true, user: freshUser };
      }
      return { success: false, message: response.data?.message || 'Unable to refresh profile' };
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        await logout();
      }
      return { success: false, message: error.response?.data?.message || 'Failed to refresh profile' };
    }
  };

  const updateUser = async (updates) => {
    try {
      if (!user?.id && !user?._id) {
        throw new Error('No authenticated user to update');
      }
      const userId = user.id || user._id;
      const response = await frontendApi.users.update(userId, updates);
      if (response.data?.success) {
        const updated = response.data.data.user;
        setUser(updated);
        localStorage.setItem('user', JSON.stringify(updated));
        return { success: true, user: updated };
      }
      return { success: false, message: response.data?.message || 'Update failed' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update user' };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshProfile,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
