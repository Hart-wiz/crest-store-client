'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Link href="/" className="no-underline flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L4 14V26L20 36L36 26V14L20 4Z" stroke="#D4AF37" strokeWidth="2.5" fill="none"/>
              <path d="M20 10L28 15V25L20 30L12 25V15L20 10Z" fill="#D4AF37" opacity="0.15"/>
              <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            </svg>
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
            <Link href="/shop" className="btn-gold py-2.5 px-6 text-xs">
              Shop Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden bg-none border-none cursor-pointer p-2 z-[1100] nav-mobile-btn flex items-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 flex flex-col relative ${mobileOpen ? 'gap-0' : 'gap-[5px]'}`}>
              <span className={`block h-[2px] bg-gold rounded transition-all duration-300 ${
                mobileOpen ? 'absolute top-1/2 rotate-45 w-full' : 'relative w-full'
              }`}>&nbsp;</span>
              <span className={`block h-[2px] bg-gold rounded transition-all duration-300 w-[70%] ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}>&nbsp;</span>
              <span className={`block h-[2px] bg-gold rounded transition-all duration-300 ${
                mobileOpen ? 'absolute top-1/2 -rotate-45 w-full' : 'relative w-full'
              }`}>&nbsp;</span>
            </div>
          </button>
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
