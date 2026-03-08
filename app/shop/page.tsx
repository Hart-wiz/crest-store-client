'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Filter, SearchX, X } from 'lucide-react';
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
    <div className="flex flex-col gap-8 w-full">
      {/* Categories */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.12em] text-gold mb-4 font-bold">Category</h3>
        {['All', ...categories].map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`block w-full text-left py-2.5 px-3.5 mb-1 cursor-pointer text-[0.85rem] font-body transition-all duration-200 border-l-2 ${
            selectedCategory === cat
              ? 'bg-[rgba(212,175,55,0.1)] text-gold font-semibold border-gold'
              : 'bg-transparent text-gray-400 font-normal border-transparent'
          }`}>
            {cat}
          </button>
        ))}
      </div>
      {/* Collections */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.12em] text-gold mb-4 font-bold">Collection</h3>
        {['All', ...collections].map(col => (
          <button key={col} onClick={() => setSelectedCollection(col)} className={`block w-full text-left py-2.5 px-3.5 mb-1 cursor-pointer text-[0.85rem] font-body transition-all duration-200 border-l-2 ${
            selectedCollection === col
              ? 'bg-[rgba(212,175,55,0.1)] text-gold font-semibold border-gold'
              : 'bg-transparent text-gray-400 font-normal border-transparent'
          }`}>
            {col}
          </button>
        ))}
      </div>
      {/* Price Range */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.12em] text-gold mb-4 font-bold">Price Range</h3>
        {[
          { label: 'All Prices', value: 'All' },
          { label: 'Under ₦20,000', value: 'under20k' },
          { label: '₦20,000 – ₦50,000', value: '20k-50k' },
          { label: 'Above ₦50,000', value: 'above50k' },
        ].map(pr => (
          <button key={pr.value} onClick={() => setPriceRange(pr.value)} className={`block w-full text-left py-2.5 px-3.5 mb-1 cursor-pointer text-[0.85rem] font-body transition-all duration-200 border-l-2 ${
            priceRange === pr.value
              ? 'bg-[rgba(212,175,55,0.1)] text-gold font-semibold border-gold'
              : 'bg-transparent text-gray-400 font-normal border-transparent'
          }`}>
            {pr.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-[100px]">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto pt-10 px-6">
        <p className="text-gold text-[0.75rem] font-bold tracking-[0.25em] uppercase mb-2">
          The Collection
        </p>
        <h1 className="section-heading mb-2">Shop All</h1>
        <p className="text-gray-400 text-[0.9rem]">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="max-w-[1280px] mx-auto py-4 px-6 md:hidden">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="py-2.5 px-5 bg-transparent border border-gray-700 text-gray-300 cursor-pointer text-[0.85rem] font-body flex items-center gap-2"
        >
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto p-6 md:grid md:grid-cols-[240px_1fr] md:gap-10 block">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block filter-sidebar">
          <FilterSidebar />
        </aside>

        {/* Product Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5 content-start">
          {filtered.map((product, i) => (
            <Link href={product.isExclusive ? `/verify/${product.id}` : `/product/${product.id}`} key={product.id} className="no-underline text-inherit block">
              <div className="card-hover bg-black-lighter border border-white/5 overflow-hidden relative opacity-0 group"
                style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.05}s forwards` }}
              >
                {product.isExclusive && <span className="badge-exclusive">Exclusive</span>}
                <div className="relative pt-[120%] bg-gray-900 overflow-hidden">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black/95 to-transparent translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0 relative-overlay z-10">
                    <span className="block text-center p-2.5 bg-gradient-to-br from-gold-dark to-gold text-black font-bold text-[0.75rem] tracking-[0.1em] uppercase">
                      Quick View
                    </span>
                  </div>
                </div>
                <div className="py-4 px-3.5 relative z-20 bg-black-lighter">
                  <p className="text-gray-500 text-[0.7rem] tracking-[0.08em] uppercase mb-1">
                    {product.collection}
                  </p>
                  <h3 className="text-[0.9rem] font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2.5">
                    <span className="text-gold font-bold">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-gray-600 line-through text-[0.8rem]">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {/* Color dots */}
                  <div className="flex gap-1.5 mt-2.5">
                    {product.colors.map(c => (
                      <span key={c.hex} title={c.name} className="w-3.5 h-3.5 rounded-full border-[1.5px] border-white/20 inline-block" style={{ background: c.hex }} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="col-[1/-1] text-center py-20 flex flex-col items-center">
              <SearchX className="w-16 h-16 text-gray-600/50 mb-4" />
              <p className="text-gray-400 text-base">No products found with selected filters</p>
              <button onClick={() => { setSelectedCategory('All'); setSelectedCollection('All'); setPriceRange('All'); }}
                className="btn-outline mt-5">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[2000] bg-black/95 pt-20 px-6 pb-6 overflow-y-auto animate-fade-in block md:hidden">
          <button onClick={() => setMobileFilterOpen(false)} className="absolute top-6 right-6 bg-none border-none text-white cursor-pointer hover:text-gold transition-colors">
            <X className="w-7 h-7" />
          </button>
          <FilterSidebar />
          <button onClick={() => setMobileFilterOpen(false)} className="btn-gold w-full mt-8 py-3.5">
            Apply Filters ({filtered.length} items)
          </button>
        </div>
      )}

      <style jsx global>{`
        /* Removed as Tailwind md: modifiers replace this css */
      `}</style>
    </div>
  );
}
