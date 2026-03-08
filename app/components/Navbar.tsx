'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Crown, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartItems, setCartOpen } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-400 ease-in-out ${
          scrolled
            ? 'py-3 bg-black/95 backdrop-blur-md border-b border-white/5'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="no-underline flex items-center gap-2 text-gold">
            <Crown className="w-8 h-8" />
            <span className="font-heading text-2xl font-bold tracking-[0.15em] text-white">
              CREST
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-9 items-center nav-desktop">
            {[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: 'Track Order', href: '/track' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline no-underline text-gray-300 hover:text-gold text-[0.85rem] font-medium tracking-[0.08em] uppercase transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-300 hover:text-gold transition-colors bg-transparent border-none cursor-pointer hidden md:block"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-danger text-white text-[0.6rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link href="/shop" className="btn-gold py-2.5 px-6 text-xs">
              Shop Now
            </Link>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-300 hover:text-gold transition-colors bg-transparent border-none cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-danger text-white text-[0.6rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              className="bg-none border-none cursor-pointer p-2 z-[1100] nav-mobile-btn flex items-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6 text-gold" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[1050] bg-black/98 backdrop-blur-[20px] flex flex-col items-center justify-center gap-9 animate-fade-in"
        >
          {[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: 'Track Order', href: '/track' },
          ].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="no-underline text-white text-2xl font-heading font-semibold tracking-[0.1em] uppercase opacity-0"
              style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.1}s forwards` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setMobileOpen(false)}
            className="btn-gold no-underline mt-4 py-3.5 px-12 opacity-0"
            style={{ animation: 'fadeInUp 0.4s ease-out 0.3s forwards' }}
          >
            Shop Now
          </Link>
        </div>
      )}
    </>
  );
}
