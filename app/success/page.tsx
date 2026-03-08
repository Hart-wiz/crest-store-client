'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products, formatPrice } from '../data/store';

export default function SuccessPage() {
  const refNumber = 'CRS-2026-' + String(Math.floor(1000 + Math.random() * 9000));
  const suggested = products.slice(0, 3);

  return (
    <div className="pt-[100px] min-h-screen">
      <div className="max-w-[640px] mx-auto py-[60px] px-6 pb-[80px] text-center">
        {/* Success Icon */}
        <div className="w-[88px] h-[88px] rounded-full mx-auto mb-8 bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center animate-pulse-gold">
          <span className="text-[2.5rem] text-black">✓</span>
        </div>

        <h1 className="font-heading text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-3">
          Thank You for Your <span className="gold-text">Order</span>!
        </h1>
        <p className="text-gray-300 text-base mb-10 leading-[1.7]">
          Your payment has been processed successfully. You will receive a confirmation via email and SMS shortly.
        </p>

        {/* Order Details */}
        <div className="glass p-8 rounded-xl text-left mb-8">
          <h3 className="text-[0.85rem] font-bold text-gold tracking-[0.1em] uppercase mb-5">
            Order Details
          </h3>
          {[
            { label: 'Order Reference', value: refNumber, highlight: true },
            { label: 'Status', value: 'Confirmed' },
            { label: 'Estimated Delivery', value: '3-5 Business Days' },
            { label: 'Payment', value: 'Completed ✓' },
          ].map(item => (
            <div key={item.label} className="flex justify-between items-center py-3.5 border-b border-white/5">
              <span className="text-gray-400 text-[0.85rem]">{item.label}</span>
              <span className={`${
                item.highlight ? 'font-bold text-base text-gold font-body tracking-[0.05em]' : 'font-medium text-[0.85rem] text-white'
              }`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap justify-center mb-12">
          <Link href="/track" className="btn-gold no-underline py-3.5 px-7">
            Track Your Order
          </Link>
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline no-underline py-3 px-7"
          >
            💬 Contact Support
          </a>
        </div>

        {/* Suggested Products */}
        <div className="text-left">
          <h2 className="font-heading text-xl mb-5">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
            {suggested.map(p => (
              <Link href={`/product/${p.id}`} key={p.id} className="no-underline text-inherit block">
                <div className="card-hover bg-black-lighter border border-white/5 overflow-hidden">
                  <div className="relative pt-[100%] overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="text-[0.8rem] font-semibold mb-1">{p.name}</p>
                    <span className="text-gold font-bold text-[0.85rem]">{formatPrice(p.price)}</span>
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
