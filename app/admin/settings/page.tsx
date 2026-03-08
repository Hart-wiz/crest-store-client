'use client';

import { useState } from 'react';
import { Store, CreditCard, Truck, UserCircle, CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('store');

  const tabs = [
    { id: 'store', label: 'Store Info', icon: <Store className="w-4 h-4" /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'delivery', label: 'Delivery', icon: <Truck className="w-4 h-4" /> },
    { id: 'account', label: 'Admin Account', icon: <UserCircle className="w-4 h-4" /> },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold mb-1">
          Settings
        </h1>
        <p className="text-gray-400 text-[0.85rem]">
          Manage your store configuration and account
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-white/[0.06] flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-5 text-[0.85rem] cursor-pointer bg-transparent font-body transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-gold font-semibold border-gold'
                : 'text-gray-500 font-normal border-transparent hover:text-gray-300'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Store Info */}
      {activeTab === 'store' && (
        <div className="admin-card animate-fade-in max-w-[640px]">
          <h3 className="text-base font-semibold mb-6">Store Information</h3>
          <div className="flex flex-col gap-4.5">
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Store Name
              </label>
              <input className="admin-input" defaultValue="Crest — Premium Streetwear" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Store Tagline
              </label>
              <input className="admin-input" defaultValue="Wear the Crown, Own the Streets" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Contact Email
              </label>
              <input className="admin-input" type="email" defaultValue="hello@crest.store" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Contact Phone
              </label>
              <input className="admin-input" type="tel" defaultValue="+234 801 234 5678" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Store Description
              </label>
              <textarea className="admin-input min-h-[100px]" defaultValue="Premium streetwear for those who dare to stand out. Crafted with uncompromising quality and bold vision." />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                WhatsApp Number
              </label>
              <input className="admin-input" defaultValue="+234 801 234 5678" />
            </div>
            <button className="btn-gold self-start py-3 px-8 mt-2">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Payment */}
      {activeTab === 'payment' && (
        <div className="admin-card animate-fade-in max-w-[640px]">
          <h3 className="text-base font-semibold mb-6">Payment Configuration</h3>
          <div className="flex flex-col gap-4.5">
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Payment Gateway
              </label>
              <select className="admin-input" defaultValue="paystack">
                <option value="paystack">Paystack</option>
                <option value="flutterwave">Flutterwave</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                API Public Key
              </label>
              <input className="admin-input" type="password" defaultValue="pk_test_xxxxxxxxxxxx" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                API Secret Key
              </label>
              <input className="admin-input" type="password" defaultValue="sk_test_xxxxxxxxxxxx" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Currency
              </label>
              <select className="admin-input" defaultValue="NGN">
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
            <div className="p-4 bg-[#38A169]/10 rounded-lg border border-[#38A169]/20 mt-2">
              <p className="text-[#68D391] text-[0.85rem] font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Payment gateway is connected and active
              </p>
            </div>
            <button className="btn-gold self-start py-3 px-8 mt-2">
              Save Payment Settings
            </button>
          </div>
        </div>
      )}

      {/* Delivery */}
      {activeTab === 'delivery' && (
        <div className="admin-card animate-fade-in max-w-[640px]">
          <h3 className="text-base font-semibold mb-6">Delivery Settings</h3>
          <div className="flex flex-col gap-4.5">
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Free Delivery Threshold (₦)
              </label>
              <input className="admin-input" type="number" defaultValue="30000" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Standard Delivery Fee (₦)
              </label>
              <input className="admin-input" type="number" defaultValue="2500" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Estimated Delivery Time
              </label>
              <input className="admin-input" defaultValue="3-5 Business Days" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Delivery Partner
              </label>
              <select className="admin-input" defaultValue="gig">
                <option value="gig">GIG Logistics</option>
                <option value="dhl">DHL</option>
                <option value="fedex">FedEx</option>
                <option value="custom">Custom / In-house</option>
              </select>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-11 h-6 rounded-full p-0.5 bg-gold cursor-pointer flex items-center">
                <div className="w-5 h-5 rounded-full bg-white transform translate-x-5 transition-transform duration-300 ease-in-out" />
              </div>
              <span className="text-[0.85rem] text-gray-300">Enable order tracking notifications</span>
            </div>
            <button className="btn-gold self-start py-3 px-8 mt-4">
              Save Delivery Settings
            </button>
          </div>
        </div>
      )}

      {/* Admin Account */}
      {activeTab === 'account' && (
        <div className="admin-card animate-fade-in max-w-[640px]">
          <h3 className="text-base font-semibold mb-6">Admin Account</h3>
          <div className="flex flex-col gap-4.5">
            <div className="flex items-center gap-5 mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center text-2xl font-bold text-black shrink-0">
                A
              </div>
              <div>
                <p className="font-semibold text-[1.1rem] mb-1">Admin User</p>
                <p className="text-gray-500 text-[0.85rem]">admin@crest.store</p>
              </div>
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Full Name
              </label>
              <input className="admin-input" defaultValue="Admin User" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Email Address
              </label>
              <input className="admin-input" type="email" defaultValue="admin@crest.store" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Change Password
              </label>
              <input className="admin-input" type="password" placeholder="Enter new password" />
            </div>
            <div>
              <label className="block text-[0.75rem] text-gray-400 mb-1.5 font-semibold uppercase tracking-[0.08em]">
                Confirm Password
              </label>
              <input className="admin-input" type="password" placeholder="Confirm new password" />
            </div>
            <button className="btn-gold self-start py-3 px-8 mt-2">
              Update Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
