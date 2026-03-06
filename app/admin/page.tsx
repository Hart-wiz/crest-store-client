'use client';

import Link from 'next/link';
import { orders, products, customers, getTotalRevenue, formatPrice, getRevenueByMonth } from '../data/store';

export default function AdminDashboard() {
  const totalRevenue = getTotalRevenue();
  const revenueData = getRevenueByMonth();
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const recentOrders = [...orders].reverse().slice(0, 5);

  const stats = [
    { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: '💰', change: '+12.5%', positive: true },
    { label: 'Total Orders', value: orders.length.toString(), icon: '📦', change: '+8.3%', positive: true },
    { label: 'Products', value: products.length.toString(), icon: '🏷️', change: '+2', positive: true },
    { label: 'Customers', value: customers.length.toString(), icon: '👥', change: '+15.2%', positive: true },
  ];

  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, marginBottom: 4 }}>
          Welcome back, <span className="gold-text">Admin</span>
        </h1>
        <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem' }}>
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map((stat, i) => (
          <div key={i} className="admin-card" style={{
            opacity: 0, animation: `fadeInUp 0.5s ease-out ${i * 0.1}s forwards`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 600, padding: '3px 8px', borderRadius: 12,
                background: stat.positive ? 'rgba(56,161,105,0.15)' : 'rgba(229,62,62,0.15)',
                color: stat.positive ? '#68D391' : '#FC8181',
              }}>
                {stat.change}
              </span>
            </div>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              {stat.label}
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts + Recent Orders */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }} className="dashboard-grid">
        {/* Revenue Chart */}
        <div className="admin-card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 24 }}>Revenue Overview</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 200, padding: '0 8px' }}>
            {revenueData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-gray-400)' }}>
                  {formatPrice(d.revenue).replace('₦', '')}
                </span>
                <div style={{
                  width: '100%', borderRadius: '4px 4px 0 0',
                  height: `${(d.revenue / maxRevenue) * 160}px`,
                  background: `linear-gradient(to top, var(--color-gold-dark), var(--color-gold))`,
                  opacity: 0.7 + (i / revenueData.length) * 0.3,
                  transition: 'height 0.5s ease',
                  minHeight: 10,
                }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--color-gray-500)' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="admin-card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Recent Orders</h3>
            <Link href="/admin/orders" style={{ color: 'var(--color-gold)', fontSize: '0.8rem', textDecoration: 'none' }}>
              View All →
            </Link>
          </div>
          <div>
            {recentOrders.map(order => (
              <div key={order.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: 2 }}>{order.customerName}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>{order.refNumber}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gold)' }}>{formatPrice(order.total)}</p>
                  <span className={`status-badge status-${order.status}`} style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Performance */}
      <div className="admin-card">
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 20 }}>Top Products</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 6, background: 'var(--color-gray-900)',
                      overflow: 'hidden', position: 'relative', flexShrink: 0,
                    }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontWeight: 500 }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--color-gray-400)' }}>{p.category}</td>
                <td style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{formatPrice(p.price)}</td>
                <td>{p.stock}</td>
                <td>{p.isExclusive ? <span className="badge-exclusive" style={{ position: 'static' }}>Exclusive</span> : <span style={{ color: 'var(--color-gray-400)', fontSize: '0.8rem' }}>Standard</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
