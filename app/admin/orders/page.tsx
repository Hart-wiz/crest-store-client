'use client';

import { useState } from 'react';
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
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>
          Orders
        </h1>
        <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>
          Manage and track all customer orders
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="admin-input"
          style={{ maxWidth: 280, flex: 1 }}
        />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['all', ...statusOptions].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: '8px 16px', fontSize: '0.78rem',
                background: filterStatus === s ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)',
                border: filterStatus === s ? '1px solid var(--color-gold)' : '1px solid var(--color-gray-800)',
                color: filterStatus === s ? 'var(--color-gold)' : 'var(--color-gray-400)',
                cursor: 'pointer', borderRadius: 6, fontWeight: filterStatus === s ? 600 : 400,
                fontFamily: 'var(--font-body)', textTransform: 'capitalize',
              }}
            >
              {s === 'all' ? 'All' : statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card" style={{ overflow: 'auto' }}>
        <table className="admin-table">
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
                  <span style={{ fontWeight: 600, color: 'var(--color-gold)', fontSize: '0.8rem' }}>{order.refNumber}</span>
                </td>
                <td>
                  <div>
                    <p style={{ fontWeight: 500, fontSize: '0.85rem' }}>{order.customerName}</p>
                    <p style={{ color: 'var(--color-gray-500)', fontSize: '0.7rem' }}>{order.phone}</p>
                  </div>
                </td>
                <td style={{ color: 'var(--color-gray-400)', fontSize: '0.8rem' }}>
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </td>
                <td style={{ fontWeight: 600 }}>{formatPrice(order.total)}</td>
                <td>
                  <span style={{
                    padding: '3px 10px', borderRadius: 12, fontSize: '0.7rem', fontWeight: 600,
                    background: order.paymentStatus === 'completed' ? 'rgba(56,161,105,0.15)' : 'rgba(214,158,46,0.15)',
                    color: order.paymentStatus === 'completed' ? '#68D391' : '#D69E2E',
                  }}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  <select
                    defaultValue={order.status}
                    className="admin-input"
                    style={{ padding: '6px 30px 6px 10px', fontSize: '0.75rem', width: 'auto', minWidth: 110 }}
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                </td>
                <td style={{ color: 'var(--color-gray-400)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                  {order.createdAt}
                </td>
                <td>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    style={{
                      padding: '6px 14px', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--color-gray-700)', color: 'var(--color-gray-300)',
                      cursor: 'pointer', fontSize: '0.75rem', borderRadius: 6,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.6)',
          display: 'flex', justifyContent: 'flex-end',
        }} onClick={() => setSelectedOrder(null)}>
          <div style={{
            width: 440, maxWidth: '100%', height: '100vh', overflowY: 'auto',
            background: 'var(--color-black-lighter)', borderLeft: '1px solid var(--color-gray-800)',
            padding: 32, animation: 'slideInRight 0.3s ease-out',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
                Order Details
              </h2>
              <button onClick={() => setSelectedOrder(null)} style={{
                background: 'none', border: 'none', color: 'var(--color-gray-400)',
                fontSize: '1.25rem', cursor: 'pointer',
              }}>✕</button>
            </div>

            <div style={{ marginBottom: 24 }}>
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
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between', padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>{item.label}</span>
                <span style={{ fontSize: '0.85rem', textAlign: 'right', maxWidth: '60%' }}>{item.value}</span>
              </div>
            ))}

            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: 24, marginBottom: 12, color: 'var(--color-gold)' }}>
              Order Items
            </h3>
            {selectedOrder.items.map((item, i) => (
              <div key={i} style={{
                padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, marginBottom: 8,
              }}>
                <p style={{ fontWeight: 500, fontSize: '0.85rem', marginBottom: 4 }}>{item.productName}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-gray-400)', fontSize: '0.8rem' }}>
                  <span>Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</span>
                  <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{formatPrice(item.price)}</span>
                </div>
              </div>
            ))}

            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: 16, padding: '16px 0',
              borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '1.1rem', fontWeight: 700,
            }}>
              <span>Total</span>
              <span className="gold-text">{formatPrice(selectedOrder.total)}</span>
            </div>

            <div style={{ marginTop: 24 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Update Status
              </label>
              <select className="admin-input" defaultValue={selectedOrder.status}>
                {statusOptions.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
              </select>
              <button className="btn-gold" style={{ width: '100%', marginTop: 12, padding: '12px' }}>
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
