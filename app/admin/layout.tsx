'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Products', href: '/admin/products', icon: '🏷️' },
  { label: 'Orders', href: '/admin/orders', icon: '📦' },
  { label: 'Customers', href: '/admin/customers', icon: '👥' },
  { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black pt-0">
      {/* Sidebar */}
      <aside
        className={`w-[260px] min-h-screen bg-black-light border-r border-white/5 flex flex-col fixed top-0 left-0 z-[1100] transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="py-6 px-5 border-b border-white/5">
          <Link href="/admin" className="no-underline flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L4 14V26L20 36L36 26V14L20 4Z" stroke="#D4AF37" strokeWidth="2.5" fill="none"/>
              <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            </svg>
            <div>
              <span className="font-heading text-[1.1rem] font-bold tracking-[0.15em] text-white">
                CREST
              </span>
              <span className="block text-[0.6rem] text-gold tracking-[0.2em] uppercase">
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 py-3 px-4 mb-1 rounded-lg no-underline text-sm transition-all duration-200 border-l-[3px] ${
                  isActive
                    ? 'text-gold bg-[rgba(212,175,55,0.08)] font-semibold border-gold'
                    : 'text-gray-400 bg-transparent font-normal border-transparent hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="py-4 px-5 border-t border-white/5">
          <Link href="/" className="no-underline text-gray-500 text-xs flex items-center gap-2 hover:text-white transition-colors">
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[1099] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-[260px] ml-0 min-h-screen">
        {/* Top Bar */}
        <header className="py-4 px-8 border-b border-white/5 flex items-center justify-between bg-black/95 backdrop-blur-[12px] sticky top-0 z-[100]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden block bg-transparent border-none text-white text-xl cursor-pointer"
          >
            ☰
          </button>
          <div>
            <h2 className="text-base font-semibold">
              {navItems.find(n => n.href === pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center text-[0.8rem] font-bold text-black" title="Admin">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="md:p-8 p-4">
          {children}
        </div>
      </div>

      <style jsx global>{`
        /* Hide customer navbar and footer on admin pages */
        nav[style*="position: fixed"], nav.fixed,
        footer { display: none !important; }
      `}</style>
    </div>
  );
}
