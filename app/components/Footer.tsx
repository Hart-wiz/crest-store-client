'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-black-light)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Newsletter Bar */}
      <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))', padding: '48px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 8 }}>
            Join the <span className="gold-text">Crest</span> Community
          </h3>
          <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem', marginBottom: 24 }}>
            Be the first to know about exclusive drops, limited releases, and VIP access.
          </p>
          <div style={{ display: 'flex', gap: 0, maxWidth: 440, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1, padding: '14px 18px', background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none',
                color: 'var(--color-white)', fontSize: '0.875rem', outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
            />
            <button className="btn-gold" style={{ whiteSpace: 'nowrap', padding: '14px 24px' }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L4 14V26L20 36L36 26V14L20 4Z" stroke="#D4AF37" strokeWidth="2.5" fill="none"/>
              <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.15em' }}>CREST</span>
          </div>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 280 }}>
            Premium streetwear for those who dare to stand out. Crafted with uncompromising quality and bold vision.
          </p>
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
            {['Instagram', 'Twitter', 'TikTok'].map(social => (
              <a
                key={social}
                href="#"
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1px solid var(--color-gray-700)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-gray-400)', fontSize: '0.7rem', fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.3s ease',
                  letterSpacing: '-0.02em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-gold)';
                  e.currentTarget.style.color = 'var(--color-gold)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-gray-700)';
                  e.currentTarget.style.color = 'var(--color-gray-400)';
                }}
              >
                {social[0] + social[1]}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)', marginBottom: 20, fontWeight: 700 }}>Quick Links</h4>
          {[
            { label: 'Shop All', href: '/shop' },
            { label: 'New Arrivals', href: '/shop' },
            { label: 'Exclusive Drops', href: '/shop' },
            { label: 'Track Order', href: '/track' },
          ].map(link => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                display: 'block', color: 'var(--color-gray-400)', textDecoration: 'none',
                fontSize: '0.85rem', marginBottom: 12, transition: 'color 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-white)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-gray-400)')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div>
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)', marginBottom: 20, fontWeight: 700 }}>Categories</h4>
          {['Hoodies', 'T-Shirts', 'Jackets', 'Caps'].map(cat => (
            <Link
              key={cat}
              href="/shop"
              style={{
                display: 'block', color: 'var(--color-gray-400)', textDecoration: 'none',
                fontSize: '0.85rem', marginBottom: 12, transition: 'color 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-white)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-gray-400)')}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)', marginBottom: 20, fontWeight: 700 }}>Contact</h4>
          <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem', marginBottom: 12 }}>
            📧 hello@crest.store
          </p>
          <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem', marginBottom: 12 }}>
            📱 +234 801 234 5678
          </p>
          <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem', marginBottom: 12 }}>
            💬 WhatsApp Support
          </p>
          <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>
            📍 Lagos, Nigeria
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 24px',
        textAlign: 'center',
      }}>
        <p style={{ color: 'var(--color-gray-600)', fontSize: '0.8rem' }}>
          © 2026 Crest. All rights reserved. Designed for greatness.
        </p>
      </div>
    </footer>
  );
}
