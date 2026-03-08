'use client';

import Link from 'next/link';
import { DollarSign, Package, Tag, Users, ArrowRight } from 'lucide-react';
import { orders, products, customers, getTotalRevenue, formatPrice, getRevenueByMonth } from '../data/store';

export default function AdminDashboard() {
  const totalRevenue = getTotalRevenue();
  const revenueData = getRevenueByMonth();
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const recentOrders = [...orders].reverse().slice(0, 5);

  const stats = [
    { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: DollarSign, change: '+12.5%', positive: true, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Total Orders', value: orders.length.toString(), icon: Package, change: '+8.3%', positive: true, color: 'text-[#63B3ED]', bg: 'bg-[#63B3ED]/10' },
    { label: 'Products', value: products.length.toString(), icon: Tag, change: '+2', positive: true, color: 'text-[#B794F6]', bg: 'bg-[#B794F6]/10' },
    { label: 'Customers', value: customers.length.toString(), icon: Users, change: '+15.2%', positive: true, color: 'text-[#4FD1C5]', bg: 'bg-[#4FD1C5]/10' },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-heading text-[1.75rem] font-bold mb-1">
          Welcome back, <span className="gold-text">Admin</span>
        </h1>
        <p className="text-gray-400 text-[0.9rem]">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="admin-card opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[0.7rem] font-semibold py-[3px] px-2 rounded-xl ${
                stat.positive ? 'bg-[#38A169]/15 text-[#68D391]' : 'bg-[#E53E3E]/15 text-[#FC8181]'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-gray-400 text-[0.75rem] uppercase tracking-[0.08em] mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts + Recent Orders */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-8 dashboard-grid">
        {/* Revenue Chart */}
        <div className="admin-card">
          <h3 className="text-[0.95rem] font-semibold mb-6">Revenue Overview</h3>
          <div className="flex items-end gap-3 h-[200px] px-2">
            {revenueData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[0.65rem] text-gray-400">
                  {formatPrice(d.revenue).replace('₦', '')}
                </span>
                <div className="w-full rounded-t-sm bg-gradient-to-t from-gold-dark to-gold transition-[height] duration-500 min-h-[10px]"
                  style={{
                    height: `${(d.revenue / maxRevenue) * 160}px`,
                    opacity: 0.7 + (i / revenueData.length) * 0.3,
                  }} />
                <span className="text-[0.7rem] text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="admin-card overflow-hidden">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[0.95rem] font-semibold">Recent Orders</h3>
            <Link href="/admin/orders" className="text-gold text-[0.8rem] no-underline hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div>
            {recentOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center py-3 border-b border-white/5 last:border-b-0">
                <div>
                  <p className="text-[0.85rem] font-medium mb-0.5">{order.customerName}</p>
                  <p className="text-[0.75rem] text-gray-500">{order.refNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-[0.85rem] font-semibold text-gold mb-1">{formatPrice(order.total)}</p>
                  <span className={`status-badge status-${order.status} text-[0.65rem] py-0.5 px-2`}>
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
        <h3 className="text-[0.95rem] font-semibold mb-5">Top Products</h3>
        <div className="overflow-x-auto">
          <table className="admin-table w-full min-w-[600px]">
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
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gray-900 overflow-hidden relative shrink-0">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="text-gray-400">{p.category}</td>
                  <td className="text-gold font-semibold">{formatPrice(p.price)}</td>
                  <td>{p.stock}</td>
                  <td>{p.isExclusive ? <span className="badge-exclusive static">Exclusive</span> : <span className="text-gray-400 text-sm">Standard</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
