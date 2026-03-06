'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.address.trim()) newErrors.address = 'Delivery address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      router.push('/success');
    }
  };

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nassarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara',
  ];

  const InputField = ({ label, field, type = 'text', placeholder }: { label: string; field: string; type?: string; placeholder: string }) => (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: 'block', fontSize: '0.75rem', textTransform: 'uppercase',
        letterSpacing: '0.1em', color: 'var(--color-gray-400)', marginBottom: 8, fontWeight: 600,
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={(form as Record<string, string>)[field]}
        onChange={e => handleChange(field, e.target.value)}
        style={{
          width: '100%', padding: '14px 16px',
          background: 'rgba(255,255,255,0.04)', border: errors[field] ? '1px solid var(--color-danger)' : '1px solid rgba(255,255,255,0.08)',
          color: 'var(--color-white)', fontSize: '0.9rem', outline: 'none',
          transition: 'border-color 0.3s ease', fontFamily: 'var(--font-body)',
        }}
        onFocus={e => { if (!errors[field]) e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
        onBlur={e => { if (!errors[field]) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
      />
      {errors[field] && (
        <p style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: 4 }}>{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>
            Secure Checkout
          </p>
          <h1 className="section-heading">Complete Your Order</h1>
          <p className="section-subheading">No account required. Fast, simple, and secure.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }} className="checkout-grid">
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="glass" style={{ padding: 32, borderRadius: 12 }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 24, letterSpacing: '0.05em' }}>
                Delivery Information
              </h2>
              <InputField label="Full Name" field="fullName" placeholder="Enter your full name" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <InputField label="Email Address" field="email" type="email" placeholder="you@example.com" />
                <InputField label="Phone Number" field="phone" type="tel" placeholder="+234 801 234 5678" />
              </div>
              <InputField label="Delivery Address" field="address" placeholder="Street address" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <InputField label="City" field="city" placeholder="e.g., Lagos" />
                <div style={{ marginBottom: 20 }}>
                  <label style={{
                    display: 'block', fontSize: '0.75rem', textTransform: 'uppercase',
                    letterSpacing: '0.1em', color: 'var(--color-gray-400)', marginBottom: 8, fontWeight: 600,
                  }}>
                    State
                  </label>
                  <select
                    value={form.state}
                    onChange={e => handleChange('state', e.target.value)}
                    style={{
                      width: '100%', padding: '14px 16px', appearance: 'none',
                      background: 'rgba(255,255,255,0.04)', border: errors.state ? '1px solid var(--color-danger)' : '1px solid rgba(255,255,255,0.08)',
                      color: form.state ? 'var(--color-white)' : 'var(--color-gray-500)',
                      fontSize: '0.9rem', outline: 'none', fontFamily: 'var(--font-body)',
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b6b6b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '20px',
                    }}
                  >
                    <option value="">Select state</option>
                    {nigerianStates.map(s => (
                      <option key={s} value={s} style={{ background: 'var(--color-black)', color: 'var(--color-white)' }}>{s}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: 4 }}>{errors.state}</p>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-gold" style={{
                width: '100%', padding: '16px', fontSize: '0.9rem', marginTop: 8,
              }}>
                Proceed to Payment
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div>
            <div className="glass" style={{ padding: 28, borderRadius: 12, position: 'sticky', top: 100 }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 20, textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                Order Summary
              </h3>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--color-gray-400)' }}>Subtotal</span>
                  <span>₦45,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--color-gray-400)' }}>Delivery</span>
                  <span style={{ color: 'var(--color-success)' }}>Free</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700 }}>
                <span>Total</span>
                <span className="gold-text">₦45,000</span>
              </div>

              <div style={{ marginTop: 24, padding: '16px', background: 'rgba(212,175,55,0.05)', borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)', lineHeight: 1.6 }}>
                  🔒 Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
