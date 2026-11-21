import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../utils/cart.utils';

const STORAGE_KEY = 'cart';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };
    case 'ADD_ITEM':
      return { ...state, cartItems: addItemToCart(state.cartItems, action.item) };
    case 'REMOVE_ITEM':
      return { ...state, cartItems: removeItemFromCart(state.cartItems, action.item) };
    case 'CLEAR_ITEM':
      return { ...state, cartItems: clearItemFromCart(state.cartItems, action.item) };
    default:
      throw new Error(`Unknown cart action: ${action.type}`);
  }
};

const loadCartItems = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems }, dispatch] = useReducer(
    cartReducer,
    undefined,
    () => ({ isCartOpen: false, cartItems: loadCartItems() })
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Storage can be unavailable (private mode, quota); the cart still works in memory.
    }
  }, [cartItems]);

  const value = useMemo(() => ({
    isCartOpen,
    cartItems,
    cartCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    cartTotal: cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
    addItem: item => dispatch({ type: 'ADD_ITEM', item }),
    removeItem: item => dispatch({ type: 'REMOVE_ITEM', item }),
    clearItem: item => dispatch({ type: 'CLEAR_ITEM', item }),
  }), [isCartOpen, cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside <CartProvider>');
  return context;
};
