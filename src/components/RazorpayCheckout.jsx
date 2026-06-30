


import { useState, useEffect } from 'react';
import {
  ShieldCheck, X, CreditCard, Smartphone, Building2,
  Wallet, CheckCircle, Eye, EyeOff
} from 'lucide-react';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const RazorpayCheckout = ({ amount, onSuccess, onError, cartItems, address }) => {
  const [loading, setLoading]           = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);
  const [showModal, setShowModal]       = useState(false);
  const [mockStep, setMockStep]         = useState('select'); // select | form | processing | done
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showCvv, setShowCvv]           = useState(false);
  const [formError, setFormError]       = useState('');

  // Payment form states
  const [cardDetails, setCardDetails] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId]             = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  useEffect(() => {
    if (window.Razorpay) { setScriptLoaded(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setScriptFailed(true);
    document.body.appendChild(script);
  }, []);

  const useMock = !RAZORPAY_KEY_ID || scriptFailed || !window.Razorpay;

  const handleRealPayment = async () => {
    setLoading(true);
    try {
      const orderRes = await fetch(`${API_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'INR', receipt: `receipt_${Date.now()}` }),
      });
      const order = await orderRes.json();

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Caballero',
        description: 'Caballero Collection – Premium Menswear',
        image: '/favicon.ico',
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await fetch(`${API_URL}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const result = await verifyRes.json();
          if (result.success) {
            onSuccess?.({ orderId: order.id, paymentId: response.razorpay_payment_id });
          } else {
            onError?.('Payment verification failed. Please contact support.');
          }
        },
        theme: { color: '#8B4513' },
        modal: {
          ondismiss: () => {
            setLoading(false);
            onError?.('Payment cancelled');
          },
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      onError?.('Could not initiate payment. Please try again.');
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setMockStep('select');
    setSelectedMethod(null);
    setFormError('');
    setUpiId('');
    setCardDetails({ name: '', number: '', expiry: '', cvv: '' });
    setSelectedBank('');
    setSelectedWallet('');
  };

  const handlePay = () => {
    if (useMock) handleOpenModal();
    else handleRealPayment();
  };

  const handleMethodSelect = (id) => {
    setSelectedMethod(id);
    setFormError('');
  };

  const handleContinueToForm = () => {
    if (!selectedMethod) return;
    setMockStep('form');
  };

  const formatCard = (val) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (val) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    return cleaned;
  };

  const validateForm = () => {
    if (selectedMethod === 'upi') {
      const cleanedUpi = upiId.trim();
      // Validates typical Indian UPI formats (e.g. name@okicici, 9876543210@ybl)
      if (!cleanedUpi.match(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/)) {
        setFormError('Please enter a valid UPI ID (e.g., yourname@okicici, number@ybl)');
        return false;
      }
    }
    if (selectedMethod === 'card') {
      const num = cardDetails.number.replace(/\s/g, '');
      if (!cardDetails.name.trim()) { setFormError('Enter cardholder name'); return false; }
      if (num.length < 16) { setFormError('Enter a valid 16-digit card number'); return false; }
      if (!cardDetails.expiry.match(/^\d{2}\/\d{2}$/)) { setFormError('Enter expiry as MM/YY'); return false; }
      if (cardDetails.cvv.length < 3) { setFormError('Enter a valid CVV'); return false; }
    }
    if (selectedMethod === 'netbanking') {
      if (!selectedBank) { setFormError('Please select a bank'); return false; }
    }
    if (selectedMethod === 'wallet') {
      if (!selectedWallet) { setFormError('Please select a wallet'); return false; }
    }
    return true;
  };

  const handleSubmitPayment = async () => {
    if (!validateForm()) return;
    setFormError('');
    setMockStep('processing');
    await new Promise((r) => setTimeout(r, 2000));
    setMockStep('done');
    await new Promise((r) => setTimeout(r, 900));
    setShowModal(false);
    
    // Bubble response hooks back to Checkout module layout
    onSuccess?.({
      orderId: 'mock_order_' + Date.now(),
      paymentId: 'mock_pay_' + Date.now(),
    });
  };

  const handleClose = () => {
    setShowModal(false);
    onError?.('Payment cancelled');
  };

  const paymentMethods = [
    { id: 'upi',        label: 'UPI',                    desc: 'Google Pay, PhonePe, BHIM',  icon: <Smartphone size={22} color="#8B4513" /> },
    { id: 'card',       label: 'Credit / Debit Card',    desc: 'Visa, Mastercard, RuPay',    icon: <CreditCard size={22} color="#8B4513" /> },
    { id: 'netbanking', label: 'Net Banking',             desc: 'All major banks supported',  icon: <Building2 size={22} color="#8B4513" /> },
  ];

  const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Bank of Baroda', 'Punjab National Bank', 'Yes Bank', 'Union Bank', 'Canara Bank'];
  const wallets = ['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik', 'Freecharge', 'Airtel Money'];

  const inputStyle = (hasError) => ({
    width: '100%', padding: '11px 14px', borderRadius: '10px', fontSize: '14px',
    color: '#2c2c2c', border: `1.5px solid ${hasError ? '#e53e3e' : '#e0d0c0'}`,
    outline: 'none', background: '#fafafa', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  });

  const labelStyle = { fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '5px', display: 'block' };

  return (
    <>
      <button
        onClick={handlePay}
        disabled={loading}
        style={{
          width: '100%',
          background: loading ? '#b8845e' : 'linear-gradient(135deg, #8B4513, #a0522d)',
          color: '#fff', border: 'none', borderRadius: '14px', padding: '17px',
          fontSize: '15px', fontWeight: '700', letterSpacing: '1.5px',
          textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          transition: 'all 0.2s', boxShadow: '0 4px 16px rgba(139,69,19,0.25)',
        }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
      >
        {loading
          ? <><span className="animate-spin mr-2">⚡</span> Processing...</>
          : <><ShieldCheck size={18} /> Pay ₹{amount?.toLocaleString()} Securely</>}
      </button>
      <p style={{ textAlign: 'center', fontSize: '12px', color: '#aaa', marginTop: '10px' }}>
        🔒 Powered by Razorpay · UPI · Cards · Net Banking
      </p>

      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyCenter: 'center', padding: '20px',
        }}>
          <div style={{
            background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '440px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)', overflow: 'hidden',
            maxHeight: '90vh', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #8B4513, #a0522d)',
              padding: '18px 22px', display: 'flex', alignItems: 'center', justifycontent: 'space-between',
              flexShrink: 0,
            }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', margin: 0 }}>Caballero · Secure Payment</p>
                <p style={{ color: '#fff', fontWeight: '700', fontSize: '20px', margin: 0 }}>₹{amount?.toLocaleString()}</p>
              </div>
              {(mockStep === 'select' || mockStep === 'form') && (
                <button onClick={handleClose} style={{
                  background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                  width: '34px', height: '34px', cursor: 'pointer', display: 'flex', itemsAlign: 'center', justifycontent: 'center',
                }}>
                  <X size={16} color="#fff" />
                </button>
              )}
            </div>

            <div style={{ padding: '22px', overflowY: 'auto', flex: 1 }}>
              {mockStep === 'select' && (
                <>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#888', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Choose Payment Method
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                    {paymentMethods.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => handleMethodSelect(m.id)}
                        style={{
                          display: 'flex', itemsAlign: 'center', gap: '14px',
                          padding: '13px 15px', borderRadius: '12px', cursor: 'pointer',
                          border: `2px solid ${selectedMethod === m.id ? '#8B4513' : '#f0e8d8'}`,
                          background: selectedMethod === m.id ? '#fdf8f0' : '#fafafa',
                          transition: 'all 0.15s',
                        }}
                      >
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fdf8f0', display: 'flex', itemsAlign: 'center', justifycontent: 'center', flexShrink: 0 }}>
                          {m.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '600', fontSize: '14px', color: '#2c2c2c', margin: 0 }}>{m.label}</p>
                          <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>{m.desc}</p>
                        </div>
                        <div style={{
                          width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${selectedMethod === m.id ? '#8B4513' : '#ddd'}`,
                          background: selectedMethod === m.id ? '#8B4513' : 'transparent', flexShrink: 0,
                          display: 'flex', itemsAlign: 'center', justifycontent: 'center',
                        }}>
                          {selectedMethod === m.id && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleContinueToForm}
                    disabled={!selectedMethod}
                    style={{
                      width: '100%', background: selectedMethod ? '#8B4513' : '#e0d0c0',
                      color: selectedMethod ? '#fff' : '#aaa', border: 'none', borderRadius: '12px',
                      padding: '15px', fontWeight: '700', fontSize: '14px', letterSpacing: '1px',
                      textTransform: 'uppercase', cursor: selectedMethod ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Continue
                  </button>
                </>
              )}

              {mockStep === 'form' && (
                <>
                  <button
                    onClick={() => setMockStep('select')}
                    style={{ background: 'none', border: 'none', color: '#8B4513', fontSize: '13px', fontWeight: '600', cursor: 'pointer', padding: '0 0 14px', display: 'flex', itemsAlign: 'center', gap: '4px' }}
                  >
                    ← Back
                  </button>

                  {selectedMethod === 'upi' && (
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '15px', color: '#2c2c2c', marginBottom: '16px' }}>Enter UPI ID</p>
                      <label style={labelStyle}>UPI ID *</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        style={inputStyle(false)}
                      />
                      <p style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>
                        Examples: name@okicici, name@ybl, name@paytm
                      </p>
                    </div>
                  )}

                  {selectedMethod === 'card' && (
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '15px', color: '#2c2c2c', marginBottom: '16px' }}>Card Details</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                          <label style={labelStyle}>Cardholder Name *</label>
                          <input
                            type="text"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            placeholder="Name as on card"
                            style={inputStyle(false)}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Card Number *</label>
                          <input
                            type="text"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: formatCard(e.target.value) })}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            style={{ ...inputStyle(false), fontFamily: 'monospace', letterSpacing: '2px' }}
                          />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={labelStyle}>Expiry (MM/YY) *</label>
                            <input
                              type="text"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                              placeholder="MM/YY"
                              maxLength={5}
                              style={inputStyle(false)}
                            />
                          </div>
                          <div>
                            <label style={labelStyle}>CVV *</label>
                            <div style={{ position: 'relative' }}>
                              <input
                                type={showCvv ? 'text' : 'password'}
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                                placeholder="• • •"
                                maxLength={4}
                                style={{ ...inputStyle(false), paddingRight: '36px' }}
                              />
                              <button
                                type="button"
                                onClick={() => setShowCvv((v) => !v)}
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                              >
                                {showCvv ? <EyeOff size={14} color="#999" /> : <Eye size={14} color="#999" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'netbanking' && (
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '15px', color: '#2c2c2c', marginBottom: '16px' }}>Select Your Bank</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                        {banks.map((bank) => (
                          <div
                            key={bank}
                            onClick={() => setSelectedBank(bank)}
                            style={{
                              padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px',
                              fontWeight: selectedBank === bank ? '700' : '500',
                              border: `1.5px solid ${selectedBank === bank ? '#8B4513' : '#e0d0c0'}`,
                              background: selectedBank === bank ? '#fdf8f0' : '#fafafa',
                              color: selectedBank === bank ? '#8B4513' : '#444',
                              transition: 'all 0.15s', textAlign: 'center',
                            }}
                          >
                            {bank}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}



                  {formError && (
                    <p style={{ fontSize: '13px', color: '#e53e3e', background: '#fff5f5', padding: '10px 12px', borderRadius: '8px', border: '1px solid #fed7d7', marginTop: '12px' }}>
                      ⚠️ {formError}
                    </p>
                  )}

                  <button
                    onClick={handleSubmitPayment}
                    style={{
                      marginTop: '18px', width: '100%', background: '#8B4513', color: '#fff',
                      border: 'none', borderRadius: '12px', padding: '15px', fontWeight: '700',
                      fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer',
                    }}
                  >
                    Pay ₹{amount?.toLocaleString()}
                  </button>
                </>
              )}

              {mockStep === 'processing' && (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div className="w-12 h-12 border-4 border-stone-200 border-t-[#8B4513] rounded-full animate-spin mx-auto" />
                  <p style={{ fontWeight: '700', fontSize: '16px', color: '#2c2c2c', marginTop: '20px', marginBottom: '6px' }}>Processing Payment</p>
                  <p style={{ fontSize: '13px', color: '#888' }}>Please do not press back or refresh…</p>
                </div>
              )}

              {mockStep === 'done' && (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #2c7a5c, #38a169)', display: 'flex', itemsAlign: 'center', justifycontent: 'center', margin: '0 auto 20px', boxShadow: '0 6px 20px rgba(56,161,105,0.30)' }}>
                    <CheckCircle size={36} color="#fff" />
                  </div>
                  <p style={{ fontWeight: '700', fontSize: '18px', color: '#2c2c2c', marginBottom: '4px' }}>Payment Successful!</p>
                  <p style={{ fontSize: '13px', color: '#888' }}>Redirecting to confirmation…</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RazorpayCheckout;
