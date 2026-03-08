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
    <div className="pt-[100px] min-h-screen">
      <div className="max-w-[640px] mx-auto py-[60px] px-6 pb-[80px]">
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-3">
            Order Status
          </p>
          <h1 className="section-heading">Track Your Order</h1>
          <p className="section-subheading">Enter your phone number or order reference to check status</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch}>
          <div className="glass p-8 rounded-xl mb-8">
            <div className="mb-5">
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-400 mb-2 font-semibold">
                Order Reference Number
              </label>
              <input
                type="text"
                placeholder="e.g., CRS-2026-0001"
                value={refNumber}
                onChange={e => setRefNumber(e.target.value)}
                className="w-full py-3.5 px-4 bg-white/5 border border-white/10 text-white text-[0.9rem] outline-none transition-colors duration-300 font-body focus:border-gold"
              />
            </div>

            <div className="text-center text-gray-500 text-[0.8rem] mb-5">
              — or —
            </div>

            <div className="mb-6">
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-400 mb-2 font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+234..."
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full py-3.5 px-4 bg-white/5 border border-white/10 text-white text-[0.9rem] outline-none transition-colors duration-300 font-body focus:border-gold"
              />
            </div>

            <button type="submit" className="btn-gold w-full p-4 text-[0.9rem]">
              Track Order
            </button>
          </div>
        </form>

        {/* Results */}
        {result && (
          <div className="animate-fade-in-up">
            <div className="glass p-8 rounded-xl">
              <div className="flex justify-between items-start mb-7 flex-wrap gap-3">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-[0.1em] mb-1">
                    Order Reference
                  </p>
                  <p className="font-bold text-[1.1rem] text-gold">{result.refNumber}</p>
                </div>
                <span className={`status-badge status-${result.status}`}>
                  {statusLabels[result.status]}
                </span>
              </div>

              {/* Progress Timeline */}
              <div className="my-8 px-2 relative">
                <div className="flex justify-between relative">
                  {/* Background line */}
                  <div className="absolute top-[14px] left-[10%] right-[10%] h-0.5 bg-gray-800" />
                  <div className="absolute top-[14px] left-[10%] h-0.5 bg-gold transition-all duration-500"
                    style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 80}%` }} />
                  {statusSteps.map((step, i) => (
                    <div key={step} className="flex flex-col items-center relative z-10 flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-bold transition-all duration-300 ${
                        i <= currentStepIndex
                          ? 'bg-gold text-black border-[3px] border-transparent'
                          : 'bg-gray-800 text-gray-500 border-none'
                      } ${i === currentStepIndex ? 'border-gold-light shadow-[0_0_15px_rgba(212,175,55,0.3)]' : ''}`}>
                        {i < currentStepIndex ? '✓' : i + 1}
                      </div>
                      <span className={`text-[0.65rem] mt-2 text-center ${
                        i <= currentStepIndex ? 'text-gold' : 'text-gray-600'
                      } ${i === currentStepIndex ? 'font-semibold' : 'font-normal'}`}>
                        {statusLabels[step]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="border-t border-white/5 pt-5 mt-2">
                {[
                  { label: 'Customer', value: result.customerName },
                  { label: 'Items', value: result.items.map(i => i.productName).join(', ') },
                  { label: 'Total', value: `₦${result.total.toLocaleString()}` },
                  { label: 'Order Date', value: result.createdAt },
                  { label: 'Delivery', value: `${result.address}, ${result.city}, ${result.state}` },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2.5 border-b border-white/[0.03]">
                    <span className="text-gray-400 text-[0.85rem]">{item.label}</span>
                    <span className="text-[0.85rem] text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {notFound && searched && (
          <div className="animate-fade-in text-center py-12">
            <p className="text-[2.5rem] mb-4">🔍</p>
            <h3 className="font-heading text-xl mb-2">Order Not Found</h3>
            <p className="text-gray-400 text-[0.9rem] mb-6">
              Please check your reference number or phone number and try again.
            </p>
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline no-underline"
            >
              💬 Contact Support
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
