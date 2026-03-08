'use client';

import Link from 'next/link';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black-light border-t border-white/5">
      {/* Newsletter Bar */}
      <div className="bg-gradient-to-br from-[rgba(212,175,55,0.08)] to-[rgba(212,175,55,0.02)] py-12 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h3 className="font-heading text-2xl mb-2">
            Join the <span className="gold-text">Crest</span> Community
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Be the first to know about exclusive drops, limited releases, and VIP access.
          </p>
          <div className="flex max-w-[440px] mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 py-3.5 px-4.5 bg-white/5 border border-white/10 border-r-0 text-white text-sm outline-none font-body placeholder:text-gray-500"
            />
            <button className="btn-gold whitespace-nowrap py-3.5 px-6">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1280px] mx-auto pt-14 px-6 pb-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L4 14V26L20 36L36 26V14L20 4Z" stroke="#D4AF37" strokeWidth="2.5" fill="none"/>
              <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            </svg>
            <span className="font-heading text-xl font-bold tracking-[0.15em]">CREST</span>
          </div>
          <p className="text-gray-500 text-[0.85rem] leading-[1.7] max-w-[280px]">
            Premium streetwear for those who dare to stand out. Crafted with uncompromising quality and bold vision.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            {['Instagram', 'Twitter', 'TikTok'].map(social => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 text-[0.7rem] font-semibold no-underline transition-all duration-300 tracking-[-0.02em] hover:border-gold hover:text-gold"
              >
                {social[0] + social[1]}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.12em] text-gold mb-5 font-bold">Quick Links</h4>
          {[
            { label: 'Shop All', href: '/shop' },
            { label: 'New Arrivals', href: '/shop' },
            { label: 'Exclusive Drops', href: '/shop' },
            { label: 'Track Order', href: '/track' },
          ].map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-gray-400 no-underline text-[0.85rem] mb-3 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.12em] text-gold mb-5 font-bold">Categories</h4>
          {['Hoodies', 'T-Shirts', 'Jackets', 'Caps'].map(cat => (
            <Link
              key={cat}
              href="/shop"
              className="block text-gray-400 no-underline text-[0.85rem] mb-3 transition-colors duration-300 hover:text-white"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.12em] text-gold mb-5 font-bold">Contact</h4>
          <p className="text-gray-400 text-[0.85rem] mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4" /> hello@crest.store
          </p>
          <p className="text-gray-400 text-[0.85rem] mb-3 flex items-center gap-2">
            <Phone className="w-4 h-4" /> +234 801 234 5678
          </p>
          <p className="text-gray-400 text-[0.85rem] mb-3 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> WhatsApp Support
          </p>
          <p className="text-gray-400 text-[0.85rem] flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Lagos, Nigeria
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-5 px-6 text-center">
        <p className="text-gray-600 text-[0.8rem]">
          © 2026 Crest. All rights reserved. Designed for greatness.
        </p>
      </div>
    </footer>
  );
}
