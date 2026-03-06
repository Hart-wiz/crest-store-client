'use client';

import { useState } from 'react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('store');

  const tabs = [
    { id: 'store', label: 'Store Info', icon: '🏪' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'delivery', label: 'Delivery', icon: '🚚' },
    { id: 'account', label: 'Admin Account', icon: '👤' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>
          Settings
        </h1>
        <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>
          Manage your store configuration and account
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 20px', fontSize: '0.85rem', cursor: 'pointer',
              background: 'none', border: 'none', fontFamily: 'var(--font-body)',
              color: activeTab === tab.id ? 'var(--color-gold)' : 'var(--color-gray-500)',
              fontWeight: activeTab === tab.id ? 600 : 400,
              borderBottom: activeTab === tab.id ? '2px solid var(--color-gold)' : '2px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ marginRight: 8 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Store Info */}
      {activeTab === 'store' && (
        <div className="admin-card animate-fade-in" style={{ maxWidth: 640 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 24 }}>Store Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Store Name
              </label>
              <input className="admin-input" defaultValue="Crest — Premium Streetwear" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Store Tagline
              </label>
              <input className="admin-input" defaultValue="Wear the Crown, Own the Streets" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Contact Email
              </label>
              <input className="admin-input" type="email" defaultValue="hello@crest.store" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Contact Phone
              </label>
              <input className="admin-input" type="tel" defaultValue="+234 801 234 5678" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Store Description
              </label>
              <textarea className="admin-input" defaultValue="Premium streetwear for those who dare to stand out. Crafted with uncompromising quality and bold vision." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                WhatsApp Number
              </label>
              <input className="admin-input" defaultValue="+234 801 234 5678" />
            </div>
            <button className="btn-gold" style={{ alignSelf: 'flex-start', padding: '12px 32px' }}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Payment */}
      {activeTab === 'payment' && (
        <div className="admin-card animate-fade-in" style={{ maxWidth: 640 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 24 }}>Payment Configuration</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Payment Gateway
              </label>
              <select className="admin-input" defaultValue="paystack">
                <option value="paystack">Paystack</option>
                <option value="flutterwave">Flutterwave</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                API Public Key
              </label>
              <input className="admin-input" type="password" defaultValue="pk_test_xxxxxxxxxxxx" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                API Secret Key
              </label>
              <input className="admin-input" type="password" defaultValue="sk_test_xxxxxxxxxxxx" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Currency
              </label>
              <select className="admin-input" defaultValue="NGN">
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
            <div style={{
              padding: 16, background: 'rgba(56,161,105,0.08)', borderRadius: 8,
              border: '1px solid rgba(56,161,105,0.2)',
            }}>
              <p style={{ color: '#68D391', fontSize: '0.85rem', fontWeight: 600 }}>
                ✅ Payment gateway is connected and active
              </p>
            </div>
            <button className="btn-gold" style={{ alignSelf: 'flex-start', padding: '12px 32px' }}>
              Save Payment Settings
            </button>
          </div>
        </div>
      )}

      {/* Delivery */}
      {activeTab === 'delivery' && (
        <div className="admin-card animate-fade-in" style={{ maxWidth: 640 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 24 }}>Delivery Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Free Delivery Threshold (₦)
              </label>
              <input className="admin-input" type="number" defaultValue="30000" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Standard Delivery Fee (₦)
              </label>
              <input className="admin-input" type="number" defaultValue="2500" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Estimated Delivery Time
              </label>
              <input className="admin-input" defaultValue="3-5 Business Days" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Delivery Partner
              </label>
              <select className="admin-input" defaultValue="gig">
                <option value="gig">GIG Logistics</option>
                <option value="dhl">DHL</option>
                <option value="fedex">FedEx</option>
                <option value="custom">Custom / In-house</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 24, borderRadius: 12, padding: 2,
                background: 'var(--color-gold)', cursor: 'pointer',
              }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', transform: 'translateX(20px)', transition: 'transform 0.3s ease' }} />
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-300)' }}>Enable order tracking notifications</span>
            </div>
            <button className="btn-gold" style={{ alignSelf: 'flex-start', padding: '12px 32px' }}>
              Save Delivery Settings
            </button>
          </div>
        </div>
      )}

      {/* Admin Account */}
      {activeTab === 'account' && (
        <div className="admin-card animate-fade-in" style={{ maxWidth: 640 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 24 }}>Admin Account</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 8 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-black)',
              }}>
                A
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Admin User</p>
                <p style={{ color: 'var(--color-gray-500)', fontSize: '0.85rem' }}>admin@crest.store</p>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Full Name
              </label>
              <input className="admin-input" defaultValue="Admin User" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Email Address
              </label>
              <input className="admin-input" type="email" defaultValue="admin@crest.store" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Change Password
              </label>
              <input className="admin-input" type="password" placeholder="Enter new password" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Confirm Password
              </label>
              <input className="admin-input" type="password" placeholder="Confirm new password" />
            </div>
            <button className="btn-gold" style={{ alignSelf: 'flex-start', padding: '12px 32px' }}>
              Update Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
