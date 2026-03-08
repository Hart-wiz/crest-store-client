'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { usePaystackPayment } from 'react-paystack';
import { Loader2, ShieldCheck, Check } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, hasExclusiveItem, clearCart } = useCart();
  
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Paystack configuration (using a test public key for demonstration)
  const config = {
    reference: (new Date()).getTime().toString(),
    email: form.email || 'customer@example.com',
    amount: subtotal * 100, // Paystack amount is in kobo (multiply by 100)
    publicKey: 'pk_test_d397c886e0c608bfa0c6552e424075f922fb6e49', // Test key
  };

  const initializePayment = usePaystackPayment(config);

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

  const onSuccess = () => {
    setIsProcessing(false);
    clearCart();
    router.push(`/success?exclusive=${hasExclusiveItem}`);
  };

  const onClose = () => {
    setIsProcessing(false);
    // User closed payment overlay
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsProcessing(true);
      initializePayment({ onSuccess, onClose });
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
    <div className="mb-5">
      <label className="block text-xs uppercase tracking-[0.1em] text-gray-400 mb-2 font-semibold">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={(form as Record<string, string>)[field]}
        onChange={e => handleChange(field, e.target.value)}
        className={`w-full py-3.5 px-4 bg-white/5 border text-white text-[0.9rem] outline-none transition-colors duration-300 font-body ${
          errors[field] ? 'border-danger' : 'border-white/10 focus:border-gold'
        }`}
      />
      {errors[field] && (
        <p className="text-danger text-xs mt-1">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="pt-[100px] min-h-screen">
      <div className="max-w-[900px] mx-auto py-10 px-6 pb-20">
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-3">
            Secure Checkout
          </p>
          <h1 className="section-heading">Complete Your Order</h1>
          <p className="section-subheading">No account required. Fast, simple, and secure.</p>
        </div>

        <div className="md:grid md:grid-cols-[1fr_380px] md:gap-12 block checkout-grid">
          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-10 md:mb-0">
            <div className="glass p-8 rounded-xl">
              <h2 className="text-base font-bold mb-6 tracking-[0.05em]">
                Delivery Information
              </h2>
              <InputField label="Full Name" field="fullName" placeholder="Enter your full name" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField label="Email Address" field="email" type="email" placeholder="you@example.com" />
                <InputField label="Phone Number" field="phone" type="tel" placeholder="+234 801 234 5678" />
              </div>
              <InputField label="Delivery Address" field="address" placeholder="Street address" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField label="City" field="city" placeholder="e.g., Lagos" />
                <div className="mb-5">
                  <label className="block text-xs uppercase tracking-[0.1em] text-gray-400 mb-2 font-semibold">
                    State
                  </label>
                  <select
                    value={form.state}
                    onChange={e => handleChange('state', e.target.value)}
                    className={`w-full py-3.5 px-4 appearance-none bg-white/5 border text-[0.9rem] outline-none font-body ${
                      errors.state ? 'border-danger' : 'border-white/10'
                    } ${form.state ? 'text-white' : 'text-gray-500'}`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b6b6b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '20px',
                    }}
                  >
                    <option value="">Select state</option>
                    {nigerianStates.map(s => (
                      <option key={s} value={s} className="bg-black text-white">{s}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-danger text-xs mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing || cartItems.length === 0}
                className="btn-gold w-full p-4 text-[0.9rem] mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div>
            <div className="glass p-7 rounded-xl sticky top-[100px]">
              <h3 className="text-[0.85rem] font-bold tracking-[0.05em] mb-5 uppercase text-gold">
                Order Summary
              </h3>
              
              {/* Items List */}
              <div className="mb-6 flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-[0.85rem]">
                    <div className="flex gap-3">
                      <span className="text-gray-400">{item.quantity}x</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white line-clamp-1">{item.product.name}</p>
                          {item.product.isExclusive && (
                            <span className="text-[0.6rem] text-gold font-bold uppercase tracking-tighter">
                              Exclusive
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-[0.75rem]">Size: {item.size}</p>
                      </div>
                    </div>
                    <span className="font-medium">₦{(item.price * item.quantity).toLocaleString('en-NG')}</span>
                  </div>
                ))}
              </div>

              <div className="border-b border-white/5 pb-4 mb-4 border-t pt-4">
                <div className="flex justify-between mb-2 text-[0.85rem]">
                  <span className="text-gray-400">Subtotal</span>
                  <span>₦{subtotal.toLocaleString('en-NG')}</span>
                </div>
                <div className="flex justify-between mb-2 text-[0.85rem]">
                  <span className="text-gray-400">Delivery</span>
                  <span className="text-success">Free</span>
                </div>
              </div>
              <div className="flex justify-between text-[1.1rem] font-bold">
                <span>Total</span>
                <span className="gold-text">₦{subtotal.toLocaleString('en-NG')}</span>
              </div>

              <div className="mt-6 p-4 bg-[rgba(212,175,55,0.05)] rounded-lg border border-[rgba(212,175,55,0.1)] flex gap-3">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                <p className="text-xs text-gray-400 leading-[1.6]">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Removed as Tailwind md: modifiers replace this css */
      `}</style>
    </div>
  );
}
