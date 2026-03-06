'use client';

import { useState } from 'react';
import { orders } from '../data/store';

const statusSteps = ['pending', 'paid', 'processing', 'shipped', 'delivered'] as const;
const statusLabels: Record<string, string> = {
  pending: 'Order Placed',
  paid: 'Payment Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
};

export default function TrackPage() {
  const [phone, setPhone] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [result, setResult] = useState<typeof orders[0] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = orders.find(o =>
      (refNumber && o.refNumber.toLowerCase() === refNumber.toLowerCase()) ||
      (phone && o.phone.includes(phone))
    );
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const currentStepIndex = result ? statusSteps.indexOf(result.status) : -1;

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>
            Order Status
          </p>
          <h1 className="section-heading">Track Your Order</h1>
          <p className="section-subheading">Enter your phone number or order reference to check status</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch}>
          <div className="glass" style={{ padding: 32, borderRadius: 12, marginBottom: 32 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block', fontSize: '0.75rem', textTransform: 'uppercase',
                letterSpacing: '0.1em', color: 'var(--color-gray-400)', marginBottom: 8, fontWeight: 600,
              }}>
                Order Reference Number
              </label>
              <input
                type="text"
                placeholder="e.g., CRS-2026-0001"
                value={refNumber}
                onChange={e => setRefNumber(e.target.value)}
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--color-white)', fontSize: '0.9rem', outline: 'none',
                  transition: 'border-color 0.3s ease', fontFamily: 'var(--font-body)',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            <div style={{ textAlign: 'center', color: 'var(--color-gray-500)', fontSize: '0.8rem', marginBottom: 20 }}>
              — or —
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block', fontSize: '0.75rem', textTransform: 'uppercase',
                letterSpacing: '0.1em', color: 'var(--color-gray-400)', marginBottom: 8, fontWeight: 600,
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+234..."
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--color-white)', fontSize: '0.9rem', outline: 'none',
                  transition: 'border-color 0.3s ease', fontFamily: 'var(--font-body)',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: '0.9rem' }}>
              Track Order
            </button>
          </div>
        </form>

        {/* Results */}
        {result && (
          <div className="animate-fade-in-up">
            <div className="glass" style={{ padding: 32, borderRadius: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p style={{ color: 'var(--color-gray-400)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                    Order Reference
                  </p>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-gold)' }}>{result.refNumber}</p>
                </div>
                <span className={`status-badge status-${result.status}`}>
                  {statusLabels[result.status]}
                </span>
              </div>

              {/* Progress Timeline */}
              <div style={{ margin: '32px 0', padding: '0 8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                  {/* Background line */}
                  <div style={{
                    position: 'absolute', top: 14, left: '10%', right: '10%',
                    height: 2, background: 'var(--color-gray-800)',
                  }} />
                  <div style={{
                    position: 'absolute', top: 14, left: '10%',
                    height: 2, background: 'var(--color-gold)',
                    width: `${(currentStepIndex / (statusSteps.length - 1)) * 80}%`,
                    transition: 'width 0.5s ease',
                  }} />
                  {statusSteps.map((step, i) => (
                    <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, flex: 1 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: i <= currentStepIndex ? 'var(--color-gold)' : 'var(--color-gray-800)',
                        color: i <= currentStepIndex ? 'var(--color-black)' : 'var(--color-gray-500)',
                        fontSize: '0.65rem', fontWeight: 700,
                        transition: 'all 0.3s ease',
                        border: i === currentStepIndex ? '3px solid var(--color-gold-light)' : 'none',
                        boxShadow: i === currentStepIndex ? '0 0 15px rgba(212,175,55,0.3)' : 'none',
                      }}>
                        {i < currentStepIndex ? '✓' : i + 1}
                      </div>
                      <span style={{
                        fontSize: '0.65rem', marginTop: 8,
                        color: i <= currentStepIndex ? 'var(--color-gold)' : 'var(--color-gray-600)',
                        fontWeight: i === currentStepIndex ? 600 : 400,
                        textAlign: 'center',
                      }}>
                        {statusLabels[step]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, marginTop: 8 }}>
                {[
                  { label: 'Customer', value: result.customerName },
                  { label: 'Items', value: result.items.map(i => i.productName).join(', ') },
                  { label: 'Total', value: `₦${result.total.toLocaleString()}` },
                  { label: 'Order Date', value: result.createdAt },
                  { label: 'Delivery', value: `${result.address}, ${result.city}, ${result.state}` },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between', padding: '10px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                  }}>
                    <span style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>{item.label}</span>
                    <span style={{ fontSize: '0.85rem', textAlign: 'right', maxWidth: '60%' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {notFound && searched && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: 16 }}>🔍</p>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: 8 }}>Order Not Found</h3>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem', marginBottom: 24 }}>
              Please check your reference number or phone number and try again.
            </p>
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ textDecoration: 'none' }}
            >
              💬 Contact Support
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
