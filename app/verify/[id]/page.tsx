'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '../../data/store';

const verificationMessages = [
  'Checking inventory availability…',
  'Verifying customer eligibility…',
  'Validating exclusive access credentials…',
  'Confirming reservation status…',
  'Confirming exclusive access…',
];

export default function VerifyPage() {
  const params = useParams();
  const router = useRouter();
  const product = products.find(p => p.id === params.id);
  const [currentStep, setCurrentStep] = useState(0);
  const [verified, setVerified] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 5000 + Math.random() * 2000; // 5-7 sec
    const stepDuration = totalDuration / verificationMessages.length;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= verificationMessages.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, totalDuration / 100);

    const doneTimer = setTimeout(() => {
      setVerified(true);
    }, totalDuration);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!product) {
    return (
      <div style={{ paddingTop: 140, textAlign: 'center', minHeight: '80vh' }}>
        <p style={{ fontSize: '3rem', marginBottom: 16 }}>♛</p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>Product Not Found</h1>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', background: 'var(--color-black)',
    }}>
      <div style={{ maxWidth: 500, width: '100%', textAlign: 'center' }}>
        {!verified ? (
          <div className="animate-fade-in">
            {/* Spinner */}
            <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 40px' }}>
              <div style={{
                width: 100, height: 100, borderRadius: '50%',
                border: '3px solid rgba(212,175,55,0.1)',
                borderTopColor: 'var(--color-gold)',
                animation: 'spin 1s linear infinite',
              }} />
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '1.5rem' }}>♛</span>
              </div>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 12,
            }}>
              Exclusive <span className="gold-text">Verification</span>
            </h2>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem', marginBottom: 40 }}>
              {product.name}
            </p>

            {/* Messages */}
            <div style={{ marginBottom: 40 }}>
              {verificationMessages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', marginBottom: 8,
                    background: i <= currentStep ? 'rgba(255,255,255,0.03)' : 'transparent',
                    borderRadius: 8,
                    opacity: i <= currentStep ? 1 : 0.2,
                    transition: 'all 0.4s ease',
                  }}
                >
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.6rem', flexShrink: 0,
                    background: i < currentStep ? 'var(--color-gold)' : 'transparent',
                    border: i < currentStep ? 'none' : i === currentStep ? '2px solid var(--color-gold)' : '1px solid var(--color-gray-700)',
                    color: i < currentStep ? 'var(--color-black)' : 'var(--color-gray-500)',
                    animation: i === currentStep ? 'pulse-gold 1.5s infinite' : 'none',
                  }}>
                    {i < currentStep ? '✓' : ''}
                  </span>
                  <span style={{
                    color: i <= currentStep ? 'var(--color-gray-300)' : 'var(--color-gray-600)',
                    fontSize: '0.85rem', textAlign: 'left',
                  }}>
                    {msg}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{
              width: '100%', height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2,
            }}>
              <div style={{
                height: '100%', background: 'linear-gradient(90deg, var(--color-gold-dark), var(--color-gold))',
                borderRadius: 2, width: `${progress}%`, transition: 'width 0.1s linear',
              }} />
            </div>
            <p style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem', marginTop: 12 }}>
              Please wait while we verify your access…
            </p>
          </div>
        ) : (
          <div className="animate-scale-in">
            {/* Success */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%', margin: '0 auto 32px',
              background: 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'pulse-gold 2s infinite',
            }}>
              <span style={{ fontSize: '2rem', color: 'var(--color-black)' }}>✓</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, marginBottom: 16,
            }}>
              Verification <span className="gold-text">Complete</span>
            </h2>
            <p style={{
              color: 'var(--color-gray-300)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 12,
              maxWidth: 380, margin: '0 auto 40px',
            }}>
              Congratulations — you are qualified to purchase this exclusive item.
            </p>

            <div className="glass" style={{ padding: 24, borderRadius: 12, marginBottom: 32, textAlign: 'left' }}>
              <p style={{ color: 'var(--color-gray-400)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                Reserved Item
              </p>
              <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>{product.name}</p>
              <p style={{ color: 'var(--color-gold)', fontWeight: 700 }}>
                {product.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }).replace('NGN', '₦')}
              </p>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="btn-gold"
              style={{ width: '100%', padding: '18px', fontSize: '0.95rem' }}
            >
              Continue to Checkout
            </button>
            <p style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem', marginTop: 16 }}>
              Your reservation expires in 15 minutes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
