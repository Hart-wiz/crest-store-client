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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L4 14V26L20 36L36 26V14L20 4Z" stroke="#D4AF37" strokeWidth="2.5" fill="none"/>
              <path d="M20 10L28 15V25L20 30L12 25V15L20 10Z" fill="#D4AF37" opacity="0.15"/>
              <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-white)' }}>
              CREST
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="nav-desktop">
            {[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: 'Track Order', href: '/track' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline"
                style={{
                  textDecoration: 'none',
                  color: 'var(--color-gray-300)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-gray-300)')}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/shop" className="btn-gold" style={{ textDecoration: 'none', padding: '10px 24px', fontSize: '0.8rem' }}>
              Shop Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              zIndex: 1100,
            }}
          >
            <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: mobileOpen ? 0 : 5, position: 'relative' }}>
              <span style={{
                display: 'block', height: 2, background: 'var(--color-gold)', borderRadius: 2, transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translateY(0px)' : 'none',
                position: mobileOpen ? 'absolute' : 'relative', top: mobileOpen ? '50%' : 'auto',
              }}>&nbsp;</span>
              <span style={{
                display: 'block', height: 2, background: 'var(--color-gold)', borderRadius: 2, transition: 'all 0.3s ease',
                opacity: mobileOpen ? 0 : 1, width: '70%',
              }}>&nbsp;</span>
              <span style={{
                display: 'block', height: 2, background: 'var(--color-gold)', borderRadius: 2, transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(-45deg) translateY(0px)' : 'none',
                position: mobileOpen ? 'absolute' : 'relative', top: mobileOpen ? '50%' : 'auto',
              }}>&nbsp;</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1050,
            background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
            animation: 'fadeIn 0.3s ease-out',
          }}
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
              style={{
                textDecoration: 'none',
                color: 'var(--color-white)',
                fontSize: '1.5rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0,
                animation: `fadeInUp 0.4s ease-out ${i * 0.1}s forwards`,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setMobileOpen(false)}
            className="btn-gold"
            style={{
              textDecoration: 'none', marginTop: 16, padding: '14px 48px',
              opacity: 0, animation: 'fadeInUp 0.4s ease-out 0.3s forwards',
            }}
          >
            Shop Now
          </Link>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
