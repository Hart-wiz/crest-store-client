'use client';

import { useState } from 'react';
import { Eye, X, Search, ChevronRight } from 'lucide-react';
import { orders, formatPrice } from '../../data/store';

const statusOptions = ['pending', 'paid', 'processing', 'shipped', 'delivered'] as const;
const statusLabels: Record<string, string> = {
  pending: 'Pending', paid: 'Paid', processing: 'Processing', shipped: 'Shipped', delivered: 'Delivered',
};

export default function AdminOrders() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filtered = orders.filter(o => {
    if (filterStatus !== 'all' && o.status !== filterStatus) return false;
    if (search && !o.customerName.toLowerCase().includes(search.toLowerCase()) && !o.refNumber.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold mb-1">
          Orders
        </h1>
        <p className="text-gray-400 text-[0.85rem]">
          Manage and track all customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 max-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="admin-input pl-10"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {['all', ...statusOptions].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`py-2 px-4 text-[0.78rem] cursor-pointer rounded-md font-body capitalize transition-colors ${
                filterStatus === s
                  ? 'bg-gold/10 border border-gold text-gold font-semibold'
                  : 'bg-white/[0.03] border border-gray-800 text-gray-400 font-normal hover:bg-white/[0.06]'
              }`}
            >
              {s === 'all' ? 'All' : statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card overflow-x-auto">
        <table className="admin-table w-full min-w-[800px]">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(order => (
              <tr key={order.id}>
                <td>
                  <span className="font-semibold text-gold text-[0.8rem]">{order.refNumber}</span>
                </td>
                <td>
                  <div>
                    <p className="font-medium text-[0.85rem]">{order.customerName}</p>
                    <p className="text-gray-500 text-[0.7rem]">{order.phone}</p>
                  </div>
                </td>
                <td className="text-gray-400 text-[0.8rem]">
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </td>
                <td className="font-semibold">{formatPrice(order.total)}</td>
                <td>
                  <span className={`py-[3px] px-2.5 rounded-xl text-[0.7rem] font-semibold ${
                    order.paymentStatus === 'completed'
                      ? 'bg-[#38A169]/15 text-[#68D391]'
                      : 'bg-[#D69E2E]/15 text-[#D69E2E]'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  <select
                    defaultValue={order.status}
                    className="admin-input py-1.5 pl-2.5 pr-8 text-[0.75rem] w-auto min-w-[110px]"
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                </td>
                <td className="text-gray-400 text-[0.8rem] whitespace-nowrap">
                  {order.createdAt}
                </td>
                <td>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 bg-white/5 border border-gray-700 text-gray-300 cursor-pointer rounded-md transition-colors hover:bg-white/10"
                    title="View Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[2000] bg-black/60 flex justify-end" onClick={() => setSelectedOrder(null)}>
          <div className="w-[440px] max-w-full h-screen overflow-y-auto bg-black-lighter border-l border-gray-800 p-8 animate-[slideInRight_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-7">
              <h2 className="font-heading text-xl font-bold">
                Order Details
              </h2>
              <button onClick={() => setSelectedOrder(null)} className="bg-transparent border-none text-gray-400 cursor-pointer hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <span className={`status-badge status-${selectedOrder.status}`}>{statusLabels[selectedOrder.status]}</span>
            </div>

            {[
              { label: 'Reference', value: selectedOrder.refNumber },
              { label: 'Customer', value: selectedOrder.customerName },
              { label: 'Email', value: selectedOrder.email },
              { label: 'Phone', value: selectedOrder.phone },
              { label: 'Address', value: `${selectedOrder.address}, ${selectedOrder.city}, ${selectedOrder.state}` },
              { label: 'Date', value: selectedOrder.createdAt },
            ].map(item => (
              <div key={item.label} className="flex justify-between py-2.5 border-b border-white/5">
                <span className="text-gray-400 text-[0.85rem]">{item.label}</span>
                <span className="text-[0.85rem] text-right max-w-[60%]">{item.value}</span>
              </div>
            ))}

            <h3 className="text-[0.85rem] font-semibold mt-6 mb-3 text-gold">
              Order Items
            </h3>
            {selectedOrder.items.map((item, i) => (
              <div key={i} className="p-3 bg-white/[0.02] rounded-lg mb-2">
                <p className="font-medium text-[0.85rem] mb-1">{item.productName}</p>
                <div className="flex justify-between text-gray-400 text-[0.8rem]">
                  <span>Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</span>
                  <span className="text-gold font-semibold">{formatPrice(item.price)}</span>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-4 py-4 border-t border-white/[0.06] text-[1.1rem] font-bold">
              <span>Total</span>
              <span className="gold-text">{formatPrice(selectedOrder.total)}</span>
            </div>

            <div className="mt-6">
              <label className="block text-[0.75rem] text-gray-400 mb-2 font-semibold text-transform: uppercase tracking-[0.08em]">
                Update Status
              </label>
              <select className="admin-input" defaultValue={selectedOrder.status}>
                {statusOptions.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
              </select>
              <button className="btn-gold w-full mt-3 py-3">
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
