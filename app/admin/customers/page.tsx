'use client';

import { useState } from 'react';
import { customers, orders, formatPrice } from '../../data/store';

export default function AdminCustomers() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const getCustomerOrders = (orderIds: string[]) => {
    return orders.filter(o => orderIds.includes(o.id));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>
          Customers
        </h1>
        <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>
          {customers.length} total customers
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="admin-input"
          style={{ maxWidth: 400 }}
        />
      </div>

      {/* Customers List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(customer => (
          <div key={customer.id} className="admin-card" style={{ cursor: 'pointer' }}
            onClick={() => setExpanded(expanded === customer.id ? null : customer.id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', fontWeight: 700, color: 'var(--color-black)', flexShrink: 0,
                }}>
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 2 }}>{customer.name}</p>
                  <p style={{ color: 'var(--color-gray-400)', fontSize: '0.8rem' }}>{customer.email}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Phone</p>
                  <p style={{ fontSize: '0.85rem', marginTop: 2 }}>{customer.phone}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Orders</p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: 2 }}>{customer.totalOrders}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Spent</p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gold)', marginTop: 2 }}>{formatPrice(customer.totalSpent)}</p>
                </div>
                <span style={{
                  fontSize: '0.8rem', color: 'var(--color-gray-400)',
                  transform: expanded === customer.id ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s ease',
                }}>
                  ▼
                </span>
              </div>
            </div>

            {/* Expanded Order History */}
            {expanded === customer.id && (
              <div style={{
                marginTop: 20, paddingTop: 20,
                borderTop: '1px solid rgba(255,255,255,0.06)',
                animation: 'slideDown 0.3s ease-out',
              }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, fontWeight: 700 }}>
                  Order History
                </h4>
                {getCustomerOrders(customer.orders).map(order => (
                  <div key={order.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8,
                    marginBottom: 8,
                  }}>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: '0.85rem' }}>{order.refNumber}</p>
                      <p style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem' }}>
                        {order.items.map(i => i.productName).join(', ')}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 600, color: 'var(--color-gold)', fontSize: '0.9rem' }}>{formatPrice(order.total)}</p>
                      <span className={`status-badge status-${order.status}`} style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
