'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { products, formatPrice } from '../data/store';
import { Suspense, useMemo } from 'react';
import { MessageCircle, ChevronRight, CheckCircle2, Check, MessageSquare } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const hasExclusive = searchParams.get('exclusive') === 'true';
  const refNumber = useMemo(() => 'CRS-2026-' + String(Math.floor(1000 + Math.random() * 9000)), []);
  
  const suggested = products.slice(0, 3);

  return (
    <div className="pt-[100px] min-h-screen">
      <div className="max-w-[640px] mx-auto py-[60px] px-6 pb-[80px] text-center">
        {/* Success Icon */}
        <div className="w-[88px] h-[88px] rounded-full mx-auto mb-8 bg-gradient-to-br from-[#38A169] to-[#68D391] flex items-center justify-center shadow-[0_0_25px_rgba(104,211,145,0.2)]">
          <Check className="w-12 h-12 text-white stroke-[3px]" />
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
            { label: 'Payment', value: 'Completed', icon: true },
          ].map(item => (
            <div key={item.label} className="flex justify-between items-center py-3.5 border-b border-white/5">
              <span className="text-gray-400 text-[0.85rem]">{item.label}</span>
              <div className="flex items-center gap-1.5">
                <span className={`${
                  item.highlight ? 'font-bold text-base text-gold font-body tracking-[0.05em]' : 'font-medium text-[0.85rem] text-white'
                }`}>
                  {item.value}
                </span>
                {item.icon && <Check className="w-4 h-4 text-success" />}
              </div>
            </div>
          ))}
        </div>

        {/* Community Channel Link */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-8 mt-8 text-left">
          <h3 className="text-[0.95rem] font-bold mb-2 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-gold" />
            {hasExclusive ? 'Join the Exclusive Buyers Channel' : 'Join the General Buyers Channel'}
          </h3>
          <p className="text-sm text-gray-400 mb-5">
            {hasExclusive 
              ? 'Welcome to the inner circle. Connect with other verified owners and get early access to future drops.' 
              : 'Join our community to stay updated on new releases, styling tips, and connect with other Crest fans.'}
          </p>
          <a 
            href={hasExclusive ? "https://t.me/crest_exclusive" : "https://t.me/crest_general"} 
            target="_blank" 
            rel="noreferrer"
            className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3 text-sm w-full md:w-auto"
          >
            Join the Channel <ChevronRight className="w-4 h-4" />
          </a>
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
            className="btn-outline no-underline py-3 px-7 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#4FD1C5]" /> Contact Support
          </a>
        </div>

        {/* Suggested Products */}
        <div className="text-left">
          <h2 className="font-heading text-xl mb-5">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
            {suggested.map(p => (
              <Link href={p.isExclusive ? `/verify/${p.id}` : `/product/${p.id}`} key={p.id} className="no-underline text-inherit block">
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-[100px] flex items-center justify-center"><div className="text-gold">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
