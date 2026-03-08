'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/store';

export interface CartItem {
  id: string; // unique cart item id (product id + size + color)
  product: Product;
  size: string;
  colorIndex: number;
  quantity: number;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartOpen: boolean;
  subtotal: number;
  hasExclusiveItem: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('crest_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart JSON');
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('crest_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.product.id}-${item.size}-${item.colorIndex}`;
    
    setCartItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, { ...item, id }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const hasExclusiveItem = cartItems.some(item => item.product.isExclusive);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartOpen,
      subtotal,
      hasExclusiveItem,
      setCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
