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
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold mb-1">
          Customers
        </h1>
        <p className="text-gray-400 text-[0.85rem]">
          {customers.length} total customers
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="admin-input max-w-[400px]"
        />
      </div>

      {/* Customers List */}
      <div className="flex flex-col gap-3">
        {filtered.map(customer => (
          <div key={customer.id} className="admin-card cursor-pointer transition-colors hover:bg-black-light"
            onClick={() => setExpanded(expanded === customer.id ? null : customer.id)}>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center text-base font-bold text-black shrink-0">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-[0.95rem] mb-0.5">{customer.name}</p>
                  <p className="text-gray-400 text-[0.8rem]">{customer.email}</p>
                </div>
              </div>
              <div className="flex gap-8 items-center flex-wrap">
                <div className="text-center">
                  <p className="text-[0.7rem] text-gray-500 uppercase tracking-[0.08em]">Phone</p>
                  <p className="text-[0.85rem] mt-0.5">{customer.phone}</p>
                </div>
                <div className="text-center">
                  <p className="text-[0.7rem] text-gray-500 uppercase tracking-[0.08em]">Orders</p>
                  <p className="text-[0.85rem] font-semibold mt-0.5">{customer.totalOrders}</p>
                </div>
                <div className="text-center">
                  <p className="text-[0.7rem] text-gray-500 uppercase tracking-[0.08em]">Total Spent</p>
                  <p className="text-[0.85rem] font-semibold text-gold mt-0.5">{formatPrice(customer.totalSpent)}</p>
                </div>
                <span className={`text-[0.8rem] text-gray-400 transition-transform duration-200 ${expanded === customer.id ? 'rotate-180' : 'rotate-y-0'}`}>
                  ▼
                </span>
              </div>
            </div>

            {/* Expanded Order History */}
            {expanded === customer.id && (
              <div className="mt-5 pt-5 border-t border-white/[0.06] animate-[slideDown_0.3s_ease-out]">
                <h4 className="text-[0.8rem] text-gold uppercase tracking-[0.1em] font-bold mb-3">
                  Order History
                </h4>
                {getCustomerOrders(customer.orders).map(order => (
                  <div key={order.id} className="flex justify-between items-center py-3 px-4 bg-white/[0.02] rounded-lg mb-2 border border-white/5">
                    <div>
                      <p className="font-medium text-[0.85rem]">{order.refNumber}</p>
                      <p className="text-gray-500 text-[0.75rem] max-w-[300px] truncate">
                        {order.items.map(i => i.productName).join(', ')}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <p className="font-semibold text-gold text-[0.9rem]">{formatPrice(order.total)}</p>
                      <span className={`status-badge status-${order.status} text-[0.65rem] py-0.5 px-2`}>
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
