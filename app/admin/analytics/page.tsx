'use client';

import { products, orders, formatPrice, getRevenueByMonth, getBestSellers, getOrdersByStatus, categories } from '../../data/store';

export default function AdminAnalytics() {
  const revenueData = getRevenueByMonth();
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const bestSellers = getBestSellers();
  const statusCounts = getOrdersByStatus();
  const totalOrders = orders.length;

  const categoryRevenue = categories.map(cat => {
    const catProducts = products.filter(p => p.category === cat);
    const revenue = catProducts.reduce((sum, p) => sum + p.price * Math.floor(Math.random() * 50 + 10), 0);
    return { category: cat, revenue };
  });
  const maxCatRevenue = Math.max(...categoryRevenue.map(c => c.revenue));

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>
          Analytics
        </h1>
        <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>
          Track your store performance and sales data
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Conversion Rate', value: '4.8%', icon: '📊', color: '#68D391' },
          { label: 'Avg. Order Value', value: formatPrice(57833), icon: '💳', color: 'var(--color-gold)' },
          { label: 'Total Items Sold', value: '950', icon: '📦', color: '#63B3ED' },
          { label: 'Return Rate', value: '1.2%', icon: '↩️', color: '#FC8181' },
        ].map((stat, i) => (
          <div key={i} className="admin-card" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: 8 }}>{stat.icon}</span>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: stat.color, marginBottom: 4 }}>{stat.value}</p>
            <p style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }} className="analytics-grid">
        {/* Revenue Chart */}
        <div className="admin-card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>Revenue Over Time</h3>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.8rem', marginBottom: 24 }}>Monthly revenue for the last 7 months</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 220, padding: '0 8px' }}>
            {revenueData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-gray-400)', whiteSpace: 'nowrap' }}>
                  ₦{(d.revenue / 1000).toFixed(0)}k
                </span>
                <div style={{
                  width: '100%', borderRadius: '6px 6px 0 0',
                  height: `${(d.revenue / maxRevenue) * 180}px`,
                  background: `linear-gradient(to top, var(--color-gold-dark), var(--color-gold-light))`,
                  transition: 'height 0.5s ease',
                  minHeight: 10, position: 'relative', overflow: 'hidden',
                }}>
                  <div className="animate-shimmer" style={{ position: 'absolute', inset: 0 }} />
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-gray-400)', fontWeight: 500 }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="admin-card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 20 }}>Order Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(statusCounts).map(([status, count]) => {
              const colors: Record<string, string> = {
                pending: '#D69E2E', paid: '#63B3ED', processing: '#B794F6', shipped: '#ED8936', delivered: '#68D391',
              };
              const pct = Math.round((count / totalOrders) * 100);
              return (
                <div key={status}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-300)', textTransform: 'capitalize' }}>{status}</span>
                    <span style={{ fontSize: '0.8rem', color: colors[status], fontWeight: 600 }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'var(--color-gray-800)', borderRadius: 3 }}>
                    <div style={{
                      height: '100%', width: `${pct}%`, background: colors[status],
                      borderRadius: 3, transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="analytics-grid">
        {/* Best Sellers */}
        <div className="admin-card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 20 }}>Best Selling Products</h3>
          {bestSellers.sort((a, b) => b.unitsSold - a.unitsSold).map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: i === 0 ? 'var(--color-gold)' : 'var(--color-gray-800)',
                color: i === 0 ? 'var(--color-black)' : 'var(--color-gray-400)',
                fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
              }}>
                {i + 1}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.product.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>{item.product.category}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gold)' }}>{item.unitsSold} sold</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)' }}>{formatPrice(item.product.price)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sales by Category */}
        <div className="admin-card">
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 20 }}>Sales by Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {categoryRevenue.map((cat, i) => {
              const catColors = ['#D4AF37', '#63B3ED', '#B794F6', '#ED8936'];
              return (
                <div key={cat.category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{cat.category}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                      {formatPrice(cat.revenue)}
                    </span>
                  </div>
                  <div style={{ width: '100%', height: 10, background: 'var(--color-gray-800)', borderRadius: 5 }}>
                    <div style={{
                      height: '100%', width: `${(cat.revenue / maxCatRevenue) * 100}%`,
                      background: `linear-gradient(90deg, ${catColors[i]}, ${catColors[i]}aa)`,
                      borderRadius: 5, transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .analytics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
