'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Shirt, Minus, Plus, ArrowRight, CheckCircle2, Truck, MessageSquare, ShieldCheck } from 'lucide-react';
import { products, formatPrice } from '../../data/store';
import { useCart } from '../../context/CartContext';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = products.find(p => p.id === params.id);
  const { addToCart, setCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (product?.isExclusive && searchParams.get('verified') !== 'true') {
      router.replace(`/verify/${product.id}`);
    }
  }, [product, searchParams, router]);

  if (!product) {
    return (
      <div className="pt-[140px] text-center min-h-[60vh] flex flex-col items-center">
        <Shirt className="w-16 h-16 text-gray-700 mb-4" />
        <h1 className="font-heading text-2xl mb-3">Product Not Found</h1>
        <Link href="/shop" className="btn-outline no-underline">Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    setAdding(true);
    addToCart({
      product,
      size: selectedSize,
      colorIndex: selectedColor,
      quantity,
      price: product.price
    });
    
    setTimeout(() => {
      setAdding(false);
      setCartOpen(true);
    }, 500);
  };

  return (
    <div className="pt-[100px]">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto pt-6 px-6">
        <div className="flex gap-2 text-[0.8rem] text-gray-500">
          <Link href="/" className="text-gray-500 no-underline hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="text-gray-500 no-underline hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gray-300">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-[1280px] mx-auto pt-10 px-6 pb-20 md:grid md:grid-cols-2 md:gap-15 block gap-8 product-grid">
        {/* Image Gallery */}
        <div>
          <div className="relative pt-[120%] overflow-hidden bg-black-lighter border border-white/5">
            {product.isExclusive && <span className="badge-exclusive animate-pulse-gold">Exclusive</span>}
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>
          {/* Thumbnail row */}
          <div className="flex gap-2 mt-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`flex-1 pt-[25%] relative overflow-hidden bg-black-lighter cursor-pointer ${
                i === 0 ? 'border-2 border-gold opacity-100' : 'border border-white/5 opacity-50 hover:opacity-100 transition-opacity'
              }`}>
                <Image src={product.images[0]} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="animate-fade-in-up mt-8 md:mt-0">
          <p className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-2">
            {product.collection}
          </p>
          <h1 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-4 leading-[1.2]">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-gold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-gray-600 line-through text-base">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-[#38A169]/15 text-[#68D391] py-1 px-2.5 text-xs font-semibold rounded">
                Save {formatPrice(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          <p className="text-gray-300 text-[0.9rem] leading-[1.8] mb-8">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-7">
            <label className="block text-xs uppercase tracking-[0.1em] text-gray-400 mb-3 font-semibold">
              Size
            </label>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`py-2.5 px-5 cursor-pointer text-[0.85rem] font-semibold transition-all duration-200 font-body min-w-[52px] ${
                  selectedSize === size
                    ? 'border-2 border-gold bg-[rgba(212,175,55,0.1)] text-gold'
                    : 'border border-gray-700 bg-transparent text-gray-300 hover:border-gray-500'
                }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mb-7">
            <label className="block text-xs uppercase tracking-[0.1em] text-gray-400 mb-3 font-semibold">
              Color — <span className="text-white normal-case">{product.colors[selectedColor].name}</span>
            </label>
            <div className="flex gap-2.5">
              {product.colors.map((color, i) => (
                <button key={color.hex} onClick={() => setSelectedColor(i)} className={`w-9 h-9 rounded-full cursor-pointer transition-all duration-200 ${
                  selectedColor === i
                    ? 'border-[3px] border-gold shadow-[0_0_0_3px_rgba(212,175,55,0.3)]'
                    : 'border-2 border-white/20 hover:border-white/50'
                }`} style={{ background: color.hex }} title={color.name} />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-[0.1em] text-gray-400 mb-3 font-semibold">
              Quantity
            </label>
            <div className="flex items-center gap-0">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 border border-gray-700 bg-transparent text-white cursor-pointer hover:bg-gray-800 transition-colors flex items-center justify-center">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-14 h-11 flex items-center justify-center border-y border-gray-700 text-[0.9rem] font-semibold">
                {quantity}
              </span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-11 h-11 border border-gray-700 bg-transparent text-white cursor-pointer hover:bg-gray-800 transition-colors flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button 
              onClick={handleAddToCart}
              disabled={adding}
              className="btn-gold flex-1 text-center py-4 px-8 text-[0.9rem] min-w-[200px] border-none flex items-center justify-center gap-2"
            >
              {adding ? 'Adding...' : 'Add to Cart'}
              {!adding && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>

          {/* Stock info */}
          <div className="mt-5 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-success' : 'bg-warning'}`} />
            <span className="text-gray-400 text-[0.8rem]">
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </span>
          </div>

          {/* Details */}
          <div className="mt-10 border-t border-white/5 pt-6">
            {[
              { label: 'Premium Quality Materials', icon: CheckCircle2, color: 'text-[#68D391]' },
              { label: 'Fast Delivery (2-5 Days)', icon: Truck, color: 'text-[#63B3ED]' },
              { label: 'WhatsApp Support', icon: MessageSquare, color: 'text-[#4FD1C5]' },
              { label: 'Secure Checkout', icon: ShieldCheck, color: 'text-gold' },
            ].map((item, i) => (
              <p key={i} className="text-gray-400 text-[0.85rem] mb-2.5 flex items-center gap-2.5">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                {item.label}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-6 pb-[100px]">
          <h2 className="section-heading mb-8">You May Also Like</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
            {related.map(p => (
              <Link href={`/product/${p.id}`} key={p.id} className="no-underline text-inherit block">
                <div className="card-hover bg-black-lighter border border-white/5 overflow-hidden relative group">
                  {p.isExclusive && <span className="badge-exclusive">Exclusive</span>}
                  <div className="relative pt-[100%] overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-[0.85rem] font-semibold mb-1">{p.name}</h3>
                    <span className="text-gold font-bold">{formatPrice(p.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style jsx global>{`
        /* Removed as Tailwind md: modifiers replace this css */
      `}</style>
    </div>
  );
}
