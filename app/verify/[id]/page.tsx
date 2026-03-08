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
      <div className="pt-[140px] text-center min-h-[80vh]">
        <p className="text-5xl mb-4">♛</p>
        <h1 className="font-heading text-2xl">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black">
      <div className="max-w-[500px] w-full text-center">
        {!verified ? (
          <div className="animate-fade-in">
            {/* Spinner */}
            <div className="relative w-[100px] h-[100px] mx-auto mb-10">
              <div className="w-[100px] h-[100px] rounded-full border-[3px] border-[rgba(212,175,55,0.1)] border-t-gold animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">♛</span>
              </div>
            </div>

            <h2 className="font-heading text-2xl font-bold mb-3">
              Exclusive <span className="gold-text">Verification</span>
            </h2>
            <p className="text-gray-400 text-[0.9rem] mb-10">
              {product.name}
            </p>

            {/* Messages */}
            <div className="mb-10">
              {verificationMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-3 px-4 mb-2 rounded-lg transition-all duration-400 ${
                    i <= currentStep ? 'bg-white/5 opacity-100' : 'bg-transparent opacity-20'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] shrink-0 ${
                    i < currentStep
                      ? 'bg-gold text-black border-none'
                      : i === currentStep
                        ? 'bg-transparent border-2 border-gold text-gray-500 animate-pulse-gold'
                        : 'bg-transparent border border-gray-700 text-gray-500'
                  }`}>
                    {i < currentStep ? '✓' : ''}
                  </span>
                  <span className={`text-[0.85rem] text-left ${
                    i <= currentStep ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {msg}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-white/5 rounded-sm">
              <div className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-sm transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }} />
            </div>
            <p className="text-gray-500 text-xs mt-3">
              Please wait while we verify your access…
            </p>
          </div>
        ) : (
          <div className="animate-scale-in">
            {/* Success */}
            <div className="w-20 h-20 rounded-full mx-auto mb-8 bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center animate-pulse-gold">
              <span className="text-[2rem] text-black">✓</span>
            </div>
            <h2 className="font-heading text-[1.75rem] font-bold mb-4">
              Verification <span className="gold-text">Complete</span>
            </h2>
            <p className="text-gray-300 text-base leading-[1.7] mb-3 max-w-[380px] mx-auto pb-10">
              Congratulations — you are qualified to purchase this exclusive item.
            </p>

            <div className="glass p-6 rounded-xl mb-8 text-left">
              <p className="text-gray-400 text-xs uppercase tracking-[0.1em] mb-2">
                Reserved Item
              </p>
              <p className="font-semibold text-base mb-1">{product.name}</p>
              <p className="text-gold font-bold">
                {product.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }).replace('NGN', '₦')}
              </p>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="btn-gold w-full p-[18px] text-[0.95rem]"
            >
              Continue to Checkout
            </button>
            <p className="text-gray-500 text-xs mt-4">
              Your reservation expires in 15 minutes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
