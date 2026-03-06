'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products, formatPrice } from '../data/store';

export default function SuccessPage() {
  const refNumber = 'CRS-2026-' + String(Math.floor(1000 + Math.random() * 9000));
  const suggested = products.slice(0, 3);

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 24px 80px', textAlign: 'center' }}>
        {/* Success Icon */}
        <div style={{
          width: 88, height: 88, borderRadius: '50%', margin: '0 auto 32px',
          background: 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pulse-gold 2s infinite',
        }}>
          <span style={{ fontSize: '2.5rem', color: 'var(--color-black)' }}>✓</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          fontWeight: 700, marginBottom: 12,
        }}>
          Thank You for Your <span className="gold-text">Order</span>!
        </h1>
        <p style={{ color: 'var(--color-gray-300)', fontSize: '1rem', marginBottom: 40, lineHeight: 1.7 }}>
          Your payment has been processed successfully. You will receive a confirmation via email and SMS shortly.
        </p>

        {/* Order Details */}
        <div className="glass" style={{ padding: 32, borderRadius: 12, textAlign: 'left', marginBottom: 32 }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            Order Details
          </h3>
          {[
            { label: 'Order Reference', value: refNumber, highlight: true },
            { label: 'Status', value: 'Confirmed' },
            { label: 'Estimated Delivery', value: '3-5 Business Days' },
            { label: 'Payment', value: 'Completed ✓' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <span style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>{item.label}</span>
              <span style={{
                fontWeight: item.highlight ? 700 : 500,
                fontSize: item.highlight ? '1rem' : '0.85rem',
                color: item.highlight ? 'var(--color-gold)' : 'var(--color-white)',
                fontFamily: item.highlight ? 'var(--font-body)' : 'inherit',
                letterSpacing: item.highlight ? '0.05em' : 'normal',
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
          <Link href="/track" className="btn-gold" style={{ textDecoration: 'none', padding: '14px 28px' }}>
            Track Your Order
          </Link>
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ textDecoration: 'none', padding: '12px 28px' }}
          >
            💬 Contact Support
          </a>
        </div>

        {/* Suggested Products */}
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: 20 }}>
            You Might Also Like
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {suggested.map(p => (
              <Link href={`/product/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-hover" style={{
                  background: 'var(--color-black-lighter)', border: '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}>
                  <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
                    <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 12 }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>{p.name}</p>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.85rem' }}>{formatPrice(p.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
