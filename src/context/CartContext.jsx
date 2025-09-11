import React, { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id)
      let items
      if (existing) {
        items = state.items.map(i => i.id === action.item.id ? { ...i, quantity: i.quantity + (action.quantity || 1) } : i)
      } else {
        items = [...state.items, { ...action.item, quantity: action.quantity || 1 }]
      }
      return { ...state, items }
    }
    case 'REMOVE': {
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    }
    case 'UPDATE_QTY': {
      const { id, quantity } = action
      if (quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== id) }
      }
      return { ...state, items: state.items.map(i => i.id === id ? { ...i, quantity } : i) }
    }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const addItem = (item, quantity = 1) => dispatch({ type: 'ADD', item, quantity })
  const removeItem = (id) => dispatch({ type: 'REMOVE', id })
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QTY', id, quantity })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const totals = useMemo(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const shipping = state.items.length > 0 ? 7.99 : 0
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax
    const totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0)
    return { subtotal, shipping, tax, total, totalQuantity }
  }, [state.items])

  const value = useMemo(() => ({
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totals,
  }), [state.items, totals])

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


