'use client';

import { useCart } from '../context/CartContext';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-[440px] max-w-full h-full bg-black-lighter border-l border-gray-800 flex flex-col animate-[slideInRight_0.3s_ease-out]">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-heading text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-gold" /> Your Cart
          </h2>
          <button 
            onClick={() => setCartOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-400 text-lg">Your cart is empty.</p>
              <button 
                onClick={() => setCartOpen(false)}
                className="mt-6 btn-outline p-3 px-8 mx-auto"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10 relative">
                  <div className="w-[80px] h-[100px] relative rounded-lg overflow-hidden shrink-0 bg-black">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[0.9rem] font-bold line-clamp-1 pr-6">{item.product.name}</h3>
                        {item.product.isExclusive && (
                          <span className="text-[0.6rem] bg-gold/10 text-gold border border-gold/30 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider shrink-0">
                            Exclusive
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-[0.75rem] mb-1">
                        Size: {item.size} | Color: <span className="inline-block w-3 h-3 rounded-full align-middle border border-gray-600" style={{ backgroundColor: item.product.colors[item.colorIndex].hex }} title={item.product.colors[item.colorIndex].name}></span>
                      </p>
                      <p className="text-gold font-bold text-[0.85rem]">
                        ₦{item.price.toLocaleString('en-NG')}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3 border-t border-white/5 pt-3">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center rounded-sm bg-black border border-gray-700 text-gray-300 hover:bg-white/10"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[0.85rem] font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, Math.min(item.product.stock, item.quantity + 1))}
                          className="w-6 h-6 flex items-center justify-center rounded-sm bg-black border border-gray-700 text-gray-300 hover:bg-white/10"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-danger flex items-center gap-1 text-[0.75rem] transition-colors"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-black">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-[0.9rem]">Subtotal</span>
              <span className="font-bold text-[1.1rem]">₦{subtotal.toLocaleString('en-NG')}</span>
            </div>
            <p className="text-[0.7rem] text-gray-500 mb-5 text-center">Shipping & taxes calculated at checkout.</p>
            <Link 
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="btn-gold w-full flex items-center justify-center p-4 text-[0.95rem]"
            >
              Checkout Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
