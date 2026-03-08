'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Crown, Star } from 'lucide-react';
import { products, formatPrice, categories } from './data/store';

export default function HomePage() {
  const featured = products.filter(p => p.isAvailable).slice(0, 4);
  const exclusives = products.filter(p => p.isExclusive);

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Crest Hero"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a4d] via-[#0a0a0ab3] via-[60%] to-black" />
        <div className="relative z-10 text-center max-w-[700px] px-6">
          <p className="animate-fade-in text-gold text-[0.8rem] font-bold tracking-[0.3em] uppercase mb-5">
            Premium Streetwear
          </p>
          <h1 className="animate-fade-in-up font-heading text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[1.1] mb-6">
            Wear the <span className="gold-text">Crown</span>,<br />Own the Streets
          </h1>
          <p className="animate-fade-in-up text-gray-300 text-[1.05rem] leading-[1.7] mb-9 opacity-0" style={{ animationDelay: '0.2s' }}>
            Crafted for those who refuse to blend in. Discover exclusive pieces that define your legacy.
          </p>
          <div className="animate-fade-in-up flex gap-4 justify-center flex-wrap opacity-0" style={{ animationDelay: '0.4s' }}>
            <Link href="/shop" className="btn-gold no-underline py-4 px-10">
              Shop Collection
            </Link>
            <Link href="/shop" className="btn-outline no-underline">
              Exclusive Drops
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-gray-500 text-[0.7rem] tracking-[0.15em] uppercase">Scroll</span>
          <div className="w-[1px] h-[30px] bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="max-w-[1280px] mx-auto py-[100px] px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-[0.75rem] font-bold tracking-[0.25em] uppercase mb-3">
            Curated for You
          </p>
          <h2 className="section-heading">Featured Pieces</h2>
          <p className="section-subheading">Handpicked essentials from our latest collections</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {featured.map((product, i) => (
            <Link href={product.isExclusive ? `/verify/${product.id}` : `/product/${product.id}`} key={product.id} className="no-underline text-inherit block">
              <div className="card-hover bg-black-lighter border border-white/5 overflow-hidden relative opacity-0 group"
                style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.1}s forwards` }}
              >
                {product.isExclusive && <span className="badge-exclusive">Exclusive</span>}
                <div className="relative pt-[120%] bg-gray-900 overflow-hidden">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end">
                    <span className="btn-gold w-full block text-center p-3 text-xs">
                      View Product
                    </span>
                  </div>
                </div>
                <div className="py-4.5 px-4">
                  <h3 className="text-[0.95rem] font-semibold mb-1.5">{product.name}</h3>
                  <div className="flex items-center gap-2.5">
                    <span className="text-gold font-bold text-base">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-gray-600 line-through text-[0.85rem]">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/shop" className="btn-outline no-underline">View All Products</Link>
        </div>
      </section>

      {/* ===== EXCLUSIVE DROPS ===== */}
      <section className="bg-gradient-to-b from-[rgba(212,175,55,0.03)] to-transparent py-[100px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold text-[0.75rem] font-bold tracking-[0.25em] uppercase mb-3">
              Limited Edition
            </p>
            <h2 className="section-heading">Exclusive Drops</h2>
            <p className="section-subheading">Available only for verified members. Once gone, gone forever.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {exclusives.map((product, i) => (
              <Link href={`/verify/${product.id}`} key={product.id} className="no-underline text-inherit block">
                <div className="card-hover bg-gradient-to-br from-[rgba(212,175,55,0.06)] to-black/80 border border-[rgba(212,175,55,0.15)] overflow-hidden relative group">
                  <span className="badge-exclusive animate-pulse-gold">Exclusive</span>
                  <div className="relative pt-[100%] overflow-hidden">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="py-5 px-4.5">
                    <h3 className="text-base font-semibold mb-1.5">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-2.5">{product.collection}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold font-bold text-[1.1rem]">{formatPrice(product.price)}</span>
                      <span className="text-gray-500 text-xs">{product.stock} left</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="max-w-[1280px] mx-auto py-[100px] px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-[0.75rem] font-bold tracking-[0.25em] uppercase mb-3">
            Explore
          </p>
          <h2 className="section-heading">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          {categories.map((cat, i) => {
            const catImages: Record<string, string> = { 'Hoodies': '/images/hoodie.png', 'T-Shirts': '/images/tshirt.png', 'Caps': '/images/cap.png', 'Jackets': '/images/jacket.png' };
            return (
              <Link href="/shop" key={cat} className="no-underline text-inherit block">
                <div className="card-hover relative pt-[70%] overflow-hidden border border-white/5 group">
                  <Image src={catImages[cat]} alt={cat} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.08]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20 to-[60%] flex items-end p-6">
                    <div>
                      <h3 className="font-heading text-[1.25rem] font-bold mb-1">{cat}</h3>
                      <span className="text-gold text-xs font-semibold tracking-[0.1em] uppercase flex items-center gap-1">
                        Shop Now <ChevronRight className="w-3.5 h-3.5" />
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
      <section className="py-20 px-6 bg-black-light">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold text-[0.75rem] font-bold tracking-[0.25em] uppercase mb-3">
              @crest.official
            </p>
            <h2 className="section-heading">Follow the Movement</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-1">
            {['/images/hoodie.png', '/images/tshirt.png', '/images/jacket.png', '/images/cap.png', '/images/hoodie.png', '/images/tshirt.png'].map((img, i) => (
              <div key={i} className="relative pt-[100%] overflow-hidden cursor-pointer group">
                <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover transition-all duration-400 group-hover:scale-105 group-hover:brightness-120" />
                <div className="absolute inset-0 bg-[rgba(212,175,55,0.15)] flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Crown className="w-8 h-8 text-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="max-w-[1280px] mx-auto py-[100px] px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-[0.75rem] font-bold tracking-[0.25em] uppercase mb-3">
            Real Talk
          </p>
          <h2 className="section-heading">What the Streets Say</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {[
            { name: 'Chidi O.', text: 'The Sovereign Hoodie is on another level. The quality is insane — you can feel the difference the moment you put it on. Crest is the real deal.', rating: 5 },
            { name: 'Amara K.', text: 'I bought the Monarch Jacket for a birthday event and got so many compliments. The gold detailing is subtle but makes a massive statement.', rating: 5 },
            { name: 'Tunde M.', text: 'Fast delivery, premium packaging, and the tee fits perfectly. This brand understands what Nigerian streetwear should look like. 10/10.', rating: 5 },
          ].map((review, i) => (
            <div key={i} className="glass card-hover p-8 rounded-xl opacity-0" style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.15}s forwards` }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-gray-300 text-[0.9rem] leading-[1.7] mb-5 italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="font-semibold text-[0.85rem]">{review.name}</p>
              <p className="text-gray-500 text-xs">Verified Buyer</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-[100px] px-6 text-center bg-gradient-to-br from-[rgba(212,175,55,0.08)] via-black to-[rgba(212,175,55,0.05)] border-y border-[rgba(212,175,55,0.1)]">
        <div className="max-w-[600px] mx-auto">
          <h2 className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-bold mb-4 leading-[1.2]">
            Ready to Elevate Your <span className="gold-text">Style</span>?
          </h2>
          <p className="text-gray-400 mb-9 text-base leading-[1.7]">
            Join thousands who have already discovered what premium streetwear feels like.
          </p>
          <Link href="/shop" className="btn-gold no-underline py-4 px-12 text-[0.9rem]">
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
