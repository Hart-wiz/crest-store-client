'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products, formatPrice, categories } from './data/store';

export default function HomePage() {
  const featured = products.filter(p => p.isAvailable).slice(0, 4);
  const exclusives = products.filter(p => p.isExclusive);

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden',
      }}>
        <Image
          src="/images/hero.png"
          alt="Crest Hero"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,1) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 700, padding: '0 24px' }}>
          <p className="animate-fade-in" style={{
            color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20,
          }}>
            Premium Streetwear
          </p>
          <h1 className="animate-fade-in-up" style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 800, lineHeight: 1.1, marginBottom: 24,
          }}>
            Wear the <span className="gold-text">Crown</span>,<br />Own the Streets
          </h1>
          <p className="animate-fade-in-up" style={{
            color: 'var(--color-gray-300)', fontSize: '1.05rem', lineHeight: 1.7,
            marginBottom: 36, animationDelay: '0.2s', opacity: 0,
          }}>
            Crafted for those who refuse to blend in. Discover exclusive pieces that define your legacy.
          </p>
          <div className="animate-fade-in-up" style={{
            display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
            animationDelay: '0.4s', opacity: 0,
          }}>
            <Link href="/shop" className="btn-gold" style={{ textDecoration: 'none', padding: '16px 40px' }}>
              Shop Collection
            </Link>
            <Link href="/shop" className="btn-outline" style={{ textDecoration: 'none' }}>
              Exclusive Drops
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }} className="animate-float">
          <span style={{ color: 'var(--color-gray-500)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, var(--color-gold), transparent)' }} />
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>
            Curated for You
          </p>
          <h2 className="section-heading">Featured Pieces</h2>
          <p className="section-subheading">Handpicked essentials from our latest collections</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {featured.map((product, i) => (
            <Link href={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card-hover" style={{
                background: 'var(--color-black-lighter)', border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden', position: 'relative',
                opacity: 0, animation: `fadeInUp 0.6s ease-out ${i * 0.1}s forwards`,
              }}>
                {product.isExclusive && <span className="badge-exclusive">Exclusive</span>}
                <div style={{ position: 'relative', paddingTop: '120%', background: 'var(--color-gray-900)', overflow: 'hidden' }}>
                  <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
                    opacity: 0, transition: 'opacity 0.3s ease',
                  }}
                    className="product-overlay"
                  >
                    <span className="btn-gold" style={{ width: '100%', display: 'block', textAlign: 'center', padding: '12px', fontSize: '0.75rem' }}>
                      View Product
                    </span>
                  </div>
                </div>
                <div style={{ padding: '18px 16px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 6 }}>{product.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1rem' }}>{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span style={{ color: 'var(--color-gray-600)', textDecoration: 'line-through', fontSize: '0.85rem' }}>
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/shop" className="btn-outline" style={{ textDecoration: 'none' }}>View All Products</Link>
        </div>
      </section>

      {/* ===== EXCLUSIVE DROPS ===== */}
      <section style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.03) 0%, transparent 100%)', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>
              Limited Edition
            </p>
            <h2 className="section-heading">Exclusive Drops</h2>
            <p className="section-subheading">Available only for verified members. Once gone, gone forever.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {exclusives.map((product, i) => (
              <Link href={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-hover" style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(10,10,10,0.8))',
                  border: '1px solid rgba(212,175,55,0.15)', overflow: 'hidden', position: 'relative',
                }}>
                  <span className="badge-exclusive" style={{ animation: 'pulse-gold 2s infinite' }}>Exclusive</span>
                  <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
                    <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                  <div style={{ padding: '20px 18px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 6 }}>{product.name}</h3>
                    <p style={{ color: 'var(--color-gray-400)', fontSize: '0.8rem', marginBottom: 10 }}>{product.collection}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem' }}>{formatPrice(product.price)}</span>
                      <span style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>{product.stock} left</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>
            Explore
          </p>
          <h2 className="section-heading">Shop by Category</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {categories.map((cat, i) => {
            const catImages: Record<string, string> = { 'Hoodies': '/images/hoodie.png', 'T-Shirts': '/images/tshirt.png', 'Caps': '/images/cap.png', 'Jackets': '/images/jacket.png' };
            return (
              <Link href="/shop" key={cat} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-hover" style={{
                  position: 'relative', paddingTop: '70%', overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <Image src={catImages[cat]} alt={cat} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 60%)',
                    display: 'flex', alignItems: 'flex-end', padding: 24,
                  }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: 4 }}>{cat}</h3>
                      <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Shop Now →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== INSTAGRAM GALLERY ===== */}
      <section style={{ padding: '80px 24px', background: 'var(--color-black-light)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>
              @crest.official
            </p>
            <h2 className="section-heading">Follow the Movement</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 4 }}>
            {['/images/hoodie.png', '/images/tshirt.png', '/images/jacket.png', '/images/cap.png', '/images/hoodie.png', '/images/tshirt.png'].map((img, i) => (
              <div key={i} style={{
                position: 'relative', paddingTop: '100%', overflow: 'hidden', cursor: 'pointer',
              }}>
                <Image src={img} alt={`Gallery ${i + 1}`} fill style={{ objectFit: 'cover', transition: 'transform 0.4s ease, filter 0.4s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'brightness(1.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(1)'; }}
                />
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(212,175,55,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.3s ease',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                >
                  <span style={{ fontSize: '1.5rem' }}>♛</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>
            Real Talk
          </p>
          <h2 className="section-heading">What the Streets Say</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {[
            { name: 'Chidi O.', text: 'The Sovereign Hoodie is on another level. The quality is insane — you can feel the difference the moment you put it on. Crest is the real deal.', rating: 5 },
            { name: 'Amara K.', text: 'I bought the Monarch Jacket for a birthday event and got so many compliments. The gold detailing is subtle but makes a massive statement.', rating: 5 },
            { name: 'Tunde M.', text: 'Fast delivery, premium packaging, and the tee fits perfectly. This brand understands what Nigerian streetwear should look like. 10/10.', rating: 5 },
          ].map((review, i) => (
            <div key={i} className="glass card-hover" style={{
              padding: 32, borderRadius: 12,
              opacity: 0, animation: `fadeInUp 0.6s ease-out ${i * 0.15}s forwards`,
            }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {Array.from({ length: review.rating }).map((_, j) => (
                  <span key={j} style={{ color: 'var(--color-gold)', fontSize: '1rem' }}>★</span>
                ))}
              </div>
              <p style={{ color: 'var(--color-gray-300)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                &ldquo;{review.text}&rdquo;
              </p>
              <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{review.name}</p>
              <p style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>Verified Buyer</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{
        padding: '100px 24px', textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, var(--color-black) 50%, rgba(212,175,55,0.05) 100%)',
        borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
            Ready to Elevate Your <span className="gold-text">Style</span>?
          </h2>
          <p style={{ color: 'var(--color-gray-400)', marginBottom: 36, fontSize: '1rem', lineHeight: 1.7 }}>
            Join thousands who have already discovered what premium streetwear feels like.
          </p>
          <Link href="/shop" className="btn-gold" style={{ textDecoration: 'none', padding: '16px 48px', fontSize: '0.9rem' }}>
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
