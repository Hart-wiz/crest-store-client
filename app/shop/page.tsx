'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, formatPrice, categories, collections } from '../data/store';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = products.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedCollection !== 'All' && p.collection !== selectedCollection) return false;
    if (priceRange === 'under20k' && p.price >= 20000) return false;
    if (priceRange === '20k-50k' && (p.price < 20000 || p.price > 50000)) return false;
    if (priceRange === 'above50k' && p.price <= 50000) return false;
    return p.isAvailable;
  });

  const FilterSidebar = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Categories */}
      <div>
        <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)', marginBottom: 16, fontWeight: 700 }}>Category</h3>
        {['All', ...categories].map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
            display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', marginBottom: 4,
            background: selectedCategory === cat ? 'rgba(212,175,55,0.1)' : 'transparent',
            border: 'none', color: selectedCategory === cat ? 'var(--color-gold)' : 'var(--color-gray-400)',
            cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedCategory === cat ? 600 : 400,
            borderLeft: selectedCategory === cat ? '2px solid var(--color-gold)' : '2px solid transparent',
            transition: 'all 0.2s ease', fontFamily: 'var(--font-body)',
          }}>
            {cat}
          </button>
        ))}
      </div>
      {/* Collections */}
      <div>
        <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)', marginBottom: 16, fontWeight: 700 }}>Collection</h3>
        {['All', ...collections].map(col => (
          <button key={col} onClick={() => setSelectedCollection(col)} style={{
            display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', marginBottom: 4,
            background: selectedCollection === col ? 'rgba(212,175,55,0.1)' : 'transparent',
            border: 'none', color: selectedCollection === col ? 'var(--color-gold)' : 'var(--color-gray-400)',
            cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedCollection === col ? 600 : 400,
            borderLeft: selectedCollection === col ? '2px solid var(--color-gold)' : '2px solid transparent',
            transition: 'all 0.2s ease', fontFamily: 'var(--font-body)',
          }}>
            {col}
          </button>
        ))}
      </div>
      {/* Price Range */}
      <div>
        <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)', marginBottom: 16, fontWeight: 700 }}>Price Range</h3>
        {[
          { label: 'All Prices', value: 'All' },
          { label: 'Under ₦20,000', value: 'under20k' },
          { label: '₦20,000 – ₦50,000', value: '20k-50k' },
          { label: 'Above ₦50,000', value: 'above50k' },
        ].map(pr => (
          <button key={pr.value} onClick={() => setPriceRange(pr.value)} style={{
            display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', marginBottom: 4,
            background: priceRange === pr.value ? 'rgba(212,175,55,0.1)' : 'transparent',
            border: 'none', color: priceRange === pr.value ? 'var(--color-gold)' : 'var(--color-gray-400)',
            cursor: 'pointer', fontSize: '0.85rem', fontWeight: priceRange === pr.value ? 600 : 400,
            borderLeft: priceRange === pr.value ? '2px solid var(--color-gold)' : '2px solid transparent',
            transition: 'all 0.2s ease', fontFamily: 'var(--font-body)',
          }}>
            {pr.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 0' }}>
        <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 8 }}>
          The Collection
        </p>
        <h1 className="section-heading" style={{ marginBottom: 8 }}>Shop All</h1>
        <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem' }}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Mobile Filter Toggle */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px' }} className="mobile-filter-toggle">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          style={{
            display: 'none', padding: '10px 20px', background: 'transparent',
            border: '1px solid var(--color-gray-700)', color: 'var(--color-gray-300)',
            cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'var(--font-body)',
          }}
          className="filter-btn-mobile"
        >
          ☰ Filters
        </button>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40 }}>
        {/* Desktop Sidebar */}
        <aside className="filter-sidebar">
          <FilterSidebar />
        </aside>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, alignContent: 'start' }}>
          {filtered.map((product, i) => (
            <Link href={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card-hover" style={{
                background: 'var(--color-black-lighter)', border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden', position: 'relative',
                opacity: 0, animation: `fadeInUp 0.5s ease-out ${i * 0.05}s forwards`,
              }}>
                {product.isExclusive && <span className="badge-exclusive">Exclusive</span>}
                <div style={{ position: 'relative', paddingTop: '120%', background: 'var(--color-gray-900)', overflow: 'hidden' }}>
                  <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.95), transparent)',
                    transform: 'translateY(100%)', transition: 'transform 0.3s ease',
                  }} className="quick-buy-overlay">
                    <span style={{
                      display: 'block', textAlign: 'center', padding: '10px',
                      background: 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
                      color: 'var(--color-black)', fontWeight: 700, fontSize: '0.75rem',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      Quick View
                    </span>
                  </div>
                </div>
                <div style={{ padding: '16px 14px' }}>
                  <p style={{ color: 'var(--color-gray-500)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                    {product.collection}
                  </p>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>{product.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span style={{ color: 'var(--color-gray-600)', textDecoration: 'line-through', fontSize: '0.8rem' }}>
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {/* Color dots */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                    {product.colors.map(c => (
                      <span key={c.hex} style={{
                        width: 14, height: 14, borderRadius: '50%', background: c.hex,
                        border: '1.5px solid rgba(255,255,255,0.2)', display: 'inline-block',
                      }} title={c.name} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: '3rem', marginBottom: 16 }}>♛</p>
              <p style={{ color: 'var(--color-gray-400)', fontSize: '1rem' }}>No products found with selected filters</p>
              <button onClick={() => { setSelectedCategory('All'); setSelectedCollection('All'); setPriceRange('All'); }}
                className="btn-outline" style={{ marginTop: 20 }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(10,10,10,0.95)',
          padding: '80px 24px 24px', overflowY: 'auto', animation: 'fadeIn 0.2s ease-out',
        }}>
          <button onClick={() => setMobileFilterOpen(false)} style={{
            position: 'absolute', top: 24, right: 24, background: 'none',
            border: 'none', color: 'var(--color-white)', fontSize: '1.5rem', cursor: 'pointer',
          }}>
            ✕
          </button>
          <FilterSidebar />
          <button onClick={() => setMobileFilterOpen(false)} className="btn-gold"
            style={{ width: '100%', marginTop: 32, padding: '14px' }}>
            Apply Filters ({filtered.length} items)
          </button>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .filter-sidebar { display: none !important; }
          .filter-btn-mobile { display: block !important; }
          div[style*="gridTemplateColumns: '240px 1fr'"],
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
        .card-hover:hover .quick-buy-overlay {
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}
