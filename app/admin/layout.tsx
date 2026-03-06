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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-black)', paddingTop: 0 }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260, minHeight: '100vh', background: 'var(--color-black-light)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, zIndex: 1100,
          transform: sidebarOpen ? 'translateX(0)' : undefined,
          transition: 'transform 0.3s ease',
        }}
        className="admin-sidebar"
      >
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/admin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L4 14V26L20 36L36 26V14L20 4Z" stroke="#D4AF37" strokeWidth="2.5" fill="none"/>
              <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            </svg>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-white)' }}>
                CREST
              </span>
              <span style={{ display: 'block', fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px', marginBottom: 4, borderRadius: 8,
                  textDecoration: 'none', fontSize: '0.875rem',
                  color: isActive ? 'var(--color-gold)' : 'var(--color-gray-400)',
                  background: isActive ? 'rgba(212,175,55,0.08)' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s ease',
                  borderLeft: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                }}
              >
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" style={{
            textDecoration: 'none', color: 'var(--color-gray-500)', fontSize: '0.8rem',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1099 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: 260, minHeight: '100vh' }} className="admin-main">
        {/* Top Bar */}
        <header style={{
          padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              display: 'none', background: 'none', border: 'none',
              color: 'var(--color-white)', fontSize: '1.25rem', cursor: 'pointer',
            }}
            className="admin-menu-btn"
          >
            ☰
          </button>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>
              {navItems.find(n => n.href === pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-black)',
            }}>
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: '32px' }} className="admin-content">
          {children}
        </div>
      </div>

      <style jsx global>{`
        /* Hide customer navbar and footer on admin pages */
        nav[style*="position: fixed"][style*="z-index: 1000"],
        footer { display: none !important; }

        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%) !important;
          }
          .admin-sidebar[style*="translateX(0)"] {
            transform: translateX(0) !important;
          }
          .admin-main { margin-left: 0 !important; }
          .admin-menu-btn { display: block !important; }
          .admin-content { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
}
