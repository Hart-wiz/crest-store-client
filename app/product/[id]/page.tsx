'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, formatPrice } from '../../data/store';

export default function ProductPage() {
  const params = useParams();
  const product = products.find(p => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div style={{ paddingTop: 140, textAlign: 'center', minHeight: '60vh' }}>
        <p style={{ fontSize: '3rem', marginBottom: 16 }}>♛</p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 12 }}>Product Not Found</h1>
        <Link href="/shop" className="btn-outline" style={{ textDecoration: 'none' }}>Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const buyLink = product.isExclusive ? `/verify/${product.id}` : '/checkout';

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 24px 0' }}>
        <div style={{ display: 'flex', gap: 8, fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>
          <Link href="/" style={{ color: 'var(--color-gray-500)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/shop" style={{ color: 'var(--color-gray-500)', textDecoration: 'none' }}>Shop</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-gray-300)' }}>{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '40px 24px 80px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60,
      }} className="product-grid">
        {/* Image Gallery */}
        <div>
          <div style={{
            position: 'relative', paddingTop: '120%', overflow: 'hidden',
            background: 'var(--color-black-lighter)', border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {product.isExclusive && <span className="badge-exclusive" style={{ animation: 'pulse-gold 2s infinite' }}>Exclusive</span>}
            <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
          </div>
          {/* Thumbnail row */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{
                flex: 1, paddingTop: '25%', position: 'relative', overflow: 'hidden',
                background: 'var(--color-black-lighter)', border: i === 0 ? '2px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer', opacity: i === 0 ? 1 : 0.5,
              }}>
                <Image src={product.images[0]} alt={`${product.name} ${i + 1}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="animate-fade-in-up">
          <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
            {product.collection}
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
            {product.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-gold)' }}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span style={{ color: 'var(--color-gray-600)', textDecoration: 'line-through', fontSize: '1rem' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span style={{
                background: 'rgba(56,161,105,0.15)', color: '#68D391',
                padding: '4px 10px', fontSize: '0.75rem', fontWeight: 600, borderRadius: 4,
              }}>
                Save {formatPrice(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          <p style={{ color: 'var(--color-gray-300)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 32 }}>
            {product.description}
          </p>

          {/* Size Selector */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gray-400)', marginBottom: 12, fontWeight: 600 }}>
              Size
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} style={{
                  padding: '10px 20px', border: selectedSize === size ? '2px solid var(--color-gold)' : '1px solid var(--color-gray-700)',
                  background: selectedSize === size ? 'rgba(212,175,55,0.1)' : 'transparent',
                  color: selectedSize === size ? 'var(--color-gold)' : 'var(--color-gray-300)',
                  cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-body)', minWidth: 52,
                }}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gray-400)', marginBottom: 12, fontWeight: 600 }}>
              Color — <span style={{ color: 'var(--color-white)', textTransform: 'none' }}>{product.colors[selectedColor].name}</span>
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              {product.colors.map((color, i) => (
                <button key={color.hex} onClick={() => setSelectedColor(i)} style={{
                  width: 36, height: 36, borderRadius: '50%', background: color.hex,
                  border: selectedColor === i ? '3px solid var(--color-gold)' : '2px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  boxShadow: selectedColor === i ? '0 0 0 3px rgba(212,175,55,0.3)' : 'none',
                }} title={color.name} />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gray-400)', marginBottom: 12, fontWeight: 600 }}>
              Quantity
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{
                width: 44, height: 44, border: '1px solid var(--color-gray-700)',
                background: 'transparent', color: 'var(--color-white)', fontSize: '1.2rem',
                cursor: 'pointer',
              }}>−</button>
              <span style={{
                width: 56, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderTop: '1px solid var(--color-gray-700)', borderBottom: '1px solid var(--color-gray-700)',
                fontSize: '0.9rem', fontWeight: 600,
              }}>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} style={{
                width: 44, height: 44, border: '1px solid var(--color-gray-700)',
                background: 'transparent', color: 'var(--color-white)', fontSize: '1.2rem',
                cursor: 'pointer',
              }}>+</button>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href={buyLink} className="btn-gold" style={{
              textDecoration: 'none', flex: 1, textAlign: 'center',
              padding: '16px 32px', fontSize: '0.9rem', minWidth: 200,
            }}>
              {product.isExclusive ? 'Buy Exclusive Item' : 'Buy Now'}
            </Link>
          </div>

          {/* Stock info */}
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: product.stock > 10 ? 'var(--color-success)' : 'var(--color-warning)' }} />
            <span style={{ color: 'var(--color-gray-400)', fontSize: '0.8rem' }}>
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </span>
          </div>

          {/* Details */}
          <div style={{ marginTop: 40, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
            {[
              { label: '✅ Premium Quality Materials' },
              { label: '🚚 Fast Delivery (2-5 Days)' },
              { label: '💬 WhatsApp Support' },
              { label: '🔒 Secure Checkout' },
            ].map((item, i) => (
              <p key={i} style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem', marginBottom: 10 }}>
                {item.label}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 100px' }}>
          <h2 className="section-heading" style={{ marginBottom: 32 }}>You May Also Like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {related.map(p => (
              <Link href={`/product/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-hover" style={{
                  background: 'var(--color-black-lighter)', border: '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden', position: 'relative',
                }}>
                  {p.isExclusive && <span className="badge-exclusive">Exclusive</span>}
                  <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
                    <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '14px' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>{p.name}</h3>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{formatPrice(p.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
