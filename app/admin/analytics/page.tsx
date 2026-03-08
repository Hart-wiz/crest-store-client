'use client';

import { BarChart3, CreditCard, Package, RotateCcw } from 'lucide-react';
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
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold mb-1">
          Analytics
        </h1>
        <p className="text-gray-400 text-[0.85rem]">
          Track your store performance and sales data
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 mb-8">
        {[
          { label: 'Conversion Rate', value: '4.8%', icon: BarChart3, color: 'text-[#68D391]' },
          { label: 'Avg. Order Value', value: formatPrice(57833), icon: CreditCard, color: 'text-gold' },
          { label: 'Total Items Sold', value: '950', icon: Package, color: 'text-[#63B3ED]' },
          { label: 'Return Rate', value: '1.2%', icon: RotateCcw, color: 'text-[#FC8181]' },
        ].map((stat, i) => (
          <div key={i} className="admin-card text-center">
            <stat.icon className={`w-6 h-6 mx-auto mb-2 opacity-90 ${stat.color}`} />
            <p className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-gray-500 text-[0.75rem] uppercase tracking-[0.08em]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="admin-card">
          <h3 className="text-[0.95rem] font-semibold mb-2">Revenue Over Time</h3>
          <p className="text-gray-500 text-[0.8rem] mb-6">Monthly revenue for the last 7 months</p>
          <div className="flex items-end gap-2 sm:gap-4 h-[220px] px-1 sm:px-2">
            {revenueData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[0.6rem] text-gray-400 whitespace-nowrap">
                  ₦{(d.revenue / 1000).toFixed(0)}k
                </span>
                <div className="w-full rounded-t-md bg-gradient-to-t from-gold-dark to-gold-light transition-[height] duration-500 min-h-[10px] relative overflow-hidden"
                  style={{
                    height: `${(d.revenue / maxRevenue) * 180}px`,
                  }}>
                  <div className="animate-shimmer absolute inset-0" />
                </div>
                <span className="text-[0.72rem] text-gray-400 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="admin-card">
          <h3 className="text-[0.95rem] font-semibold mb-5">Order Status</h3>
          <div className="flex flex-col gap-3">
            {Object.entries(statusCounts).map(([status, count]) => {
              const colors: Record<string, string> = {
                pending: '#D69E2E', paid: '#63B3ED', processing: '#B794F6', shipped: '#ED8936', delivered: '#68D391',
              };
              const pct = Math.round((count / totalOrders) * 100);
              return (
                <div key={status}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[0.8rem] text-gray-300 capitalize">{status}</span>
                    <span className="text-[0.8rem] font-semibold" style={{ color: colors[status] }}>{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-[width] duration-500"
                      style={{
                        width: `${pct}%`, background: colors[status],
                      }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Best Sellers */}
        <div className="admin-card">
          <h3 className="text-[0.95rem] font-semibold mb-5">Best Selling Products</h3>
          <div className="flex flex-col">
            {bestSellers.sort((a, b) => b.unitsSold - a.unitsSold).map((item, i) => (
              <div key={i} className="flex items-center gap-3.5 py-3 border-b border-white/[0.04] last:border-b-0">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.7rem] font-bold shrink-0 ${
                  i === 0 ? 'bg-gold text-black' : 'bg-gray-800 text-gray-400'
                }`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.85rem] font-medium truncate">{item.product.name}</p>
                  <p className="text-[0.75rem] text-gray-500 truncate">{item.product.category}</p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="text-[0.85rem] font-semibold text-gold">{item.unitsSold} sold</p>
                  <p className="text-[0.75rem] text-gray-500">{formatPrice(item.product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="admin-card">
          <h3 className="text-[0.95rem] font-semibold mb-5">Sales by Category</h3>
          <div className="flex flex-col gap-5">
            {categoryRevenue.map((cat, i) => {
              const catColors = ['#D4AF37', '#63B3ED', '#B794F6', '#ED8936'];
              return (
                <div key={cat.category}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[0.85rem] font-medium">{cat.category}</span>
                    <span className="text-[0.85rem] text-gold font-semibold">
                      {formatPrice(cat.revenue)}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-[width] duration-500"
                      style={{
                        width: `${(cat.revenue / maxCatRevenue) * 100}%`,
                        background: `linear-gradient(90deg, ${catColors[i]}, ${catColors[i]}aa)`,
                      }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
