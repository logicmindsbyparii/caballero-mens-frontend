

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, MapPin, CreditCard, ChevronRight, Lock } from 'lucide-react';
import RazorpayCheckout from '../components/RazorpayCheckout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Checkout = () => {
  const { cart, clearCart, user } = useStore();
  const navigate = useNavigate();
  const paymentDone = useRef(false);

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
  });
  const [errors, setErrors] = useState({});
  const [brokenImages, setBrokenImages] = useState({});

  const subtotal = (cart || []).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal + shipping;

  const validate = () => {
    const e = {};
    if (!address.fullName.trim()) e.fullName = 'Full name is required';
    if (!/^\d{10}$/.test(address.phone)) e.phone = 'Enter a valid 10-digit phone number';
    if (!/^\d{6}$/.test(address.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
    if (!address.address.trim()) e.address = 'Address is required';
    if (!address.city.trim()) e.city = 'City is required';
    if (!address.state.trim()) e.state = 'State is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (validate()) setStep(2);
  };

  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handlePaymentSuccess = async (paymentData) => {
    paymentDone.current = true;
    try {
      await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || user?._id || 'guest',
          userName: address.fullName,
          items: cart,
          subtotal,
          discount: 0,
          total,
          paymentMethod: 'Razorpay',
          paymentDetails: { paymentId: paymentData?.paymentId || 'mock' },
          shippingAddress: address,
        }),
      });
    } catch (err) {
      console.error('Order save error:', err);
    }
    clearCart();
    navigate('/order-success', { state: { orderId: paymentData?.orderId, total, address } });
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
  };

  const handleImageError = (itemId) => {
    setBrokenImages(prev => ({ ...prev, [itemId]: true }));
  };

  const fallbackImg = `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80`;

  useEffect(() => {
    if (!user) {
      alert("Please login to proceed with checkout.");
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  if (!paymentDone.current && (!cart || cart.length === 0)) {
    navigate('/cart');
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f0', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#2c2c2c', marginBottom: '8px' }}>
            Checkout
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: step >= 1 ? '#8B4513' : '#999', fontWeight: step === 1 ? '700' : '400', fontSize: '14px'
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step >= 1 ? '#8B4513' : '#ddd', color: '#fff', fontSize: '13px', fontWeight: '700'
              }}>1</div>
              Delivery Address
            </div>
            <ChevronRight size={16} color="#bbb" />
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: step >= 2 ? '#8B4513' : '#999', fontWeight: step === 2 ? '700' : '400', fontSize: '14px'
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step >= 2 ? '#8B4513' : '#ddd', color: step >= 2 ? '#fff' : '#999', fontSize: '13px', fontWeight: '700'
              }}>2</div>
              Payment
            </div>
          </div>
        </div>

        <ResponsiveStyle />
        <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '28px', alignItems: 'start' }}>

          <div>
            {step === 1 && (
              <div style={{
                background: '#fff', borderRadius: '16px', padding: '28px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0e8d8'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <MapPin size={22} color="#8B4513" />
                  <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#2c2c2c', margin: 0 }}>
                    Delivery Address
                  </h2>
                </div>
                <form onSubmit={handleAddressSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <InputField
                        label="Full Name *"
                        value={address.fullName}
                        onChange={(v) => handleChange('fullName', v)}
                        placeholder="Enter your full name"
                        error={errors.fullName}
                      />
                    </div>
                    <InputField
                      label="Phone Number *"
                      value={address.phone}
                      onChange={(v) => handleChange('phone', v)}
                      placeholder="10-digit mobile number"
                      error={errors.phone}
                      type="tel"
                      maxLength={10}
                    />
                    <InputField
                      label="Pincode *"
                      value={address.pincode}
                      onChange={(v) => handleChange('pincode', v)}
                      placeholder="6-digit pincode"
                      error={errors.pincode}
                      maxLength={6}
                    />
                    <div style={{ gridColumn: '1 / -1' }}>
                      <InputField
                        label="Flat, House No., Building, Street *"
                        value={address.address}
                        onChange={(v) => handleChange('address', v)}
                        placeholder="Enter your full address"
                        error={errors.address}
                      />
                    </div>
                    <InputField
                      label="City / Town *"
                      value={address.city}
                      onChange={(v) => handleChange('city', v)}
                      placeholder="Enter your city"
                      error={errors.city}
                    />
                    <InputField
                      label="State *"
                      value={address.state}
                      onChange={(v) => handleChange('state', v)}
                      placeholder="Enter your state"
                      error={errors.state}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      marginTop: '24px', width: '100%', background: '#8B4513', color: '#fff',
                      border: 'none', borderRadius: '12px', padding: '16px', fontSize: '15px',
                      fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#6b3410'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#8B4513'}
                  >
                    Continue to Payment <ChevronRight size={18} />
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div style={{
                background: '#fff', borderRadius: '16px', padding: '28px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0e8d8'
              }}>
                <div style={{
                  background: '#fdf8f0', borderRadius: '10px', padding: '14px 16px',
                  marginBottom: '24px', border: '1px solid #e8d8c0', display: 'flex', justifycontent: 'space-between', alignitems: 'flex-start'
                }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#8B4513', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Delivering to
                    </p>
                    <p style={{ fontWeight: '600', color: '#2c2c2c', marginBottom: '2px', fontSize: '14px' }}>{address.fullName}</p>
                    <p style={{ color: '#666', fontSize: '13px' }}>
                      {address.address}, {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p style={{ color: '#666', fontSize: '13px' }}>📞 {address.phone}</p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    style={{ background: 'none', border: '1px solid #8B4513', color: '#8B4513', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', cursor: 'pointer', fontWeight: '600', whiteSpace: 'nowrap' }}
                  >
                    Change
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <CreditCard size={22} color="#8B4513" />
                  <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#2c2c2c', margin: 0 }}>
                    Payment
                  </h2>
                </div>

                <div style={{
                  background: '#f8fffe', border: '1px solid #d0e8e0', borderRadius: '10px',
                  padding: '16px', marginBottom: '20px'
                }}>
                  <p style={{ fontSize: '13px', color: '#2c7a5c', fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={15} /> 100% Secure Payments
                  </p>
                  <p style={{ fontSize: '13px', color: '#555', lineheight: '1.5' }}>
                    Pay securely using UPI, Credit/Debit Cards, or Net Banking via Razorpay.
                  </p>
                </div>

                <RazorpayCheckout
                  amount={total}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  cartItems={cart}
                  address={address}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
                  <Lock size={12} color="#999" />
                  <p style={{ fontSize: '12px', color: '#999', textalign: 'center' }}>
                    Your payment info is encrypted and never stored on our servers
                  </p>
                </div>
              </div>
            )}
          </div>

          <div style={{
            background: '#fff', borderRadius: '16px', padding: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0e8d8',
            position: 'sticky', top: '100px'
          }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#2c2c2c', marginBottom: '20px' }}>
              Order Summary
            </h2>

            <div style={{ marginBottom: '16px', maxHeight: '280px', overflowY: 'auto' }}>
              {(cart || []).map((item) => {
                const itemId = item._id || item.id;
                return (
                  <div key={itemId} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'center' }}>
                    <img
                      src={brokenImages[itemId] ? fallbackImg : item.image}
                      alt={item.name}
                      onError={() => handleImageError(itemId)}
                      style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #f0e8d8', flexShrink: 0, background: '#fafafa' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#2c2c2c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: '12px', color: '#8B4513' }}>{item.category}</p>
                      <p style={{ fontSize: '12px', color: '#666' }}>Qty: {item.quantity}</p>
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#2c2c2c', flexShrink: 0 }}>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>

            <div style={{ borderTop: '1px solid #f0e8d8', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Subtotal</span>
                <span style={{ color: '#333', fontSize: '14px' }}>₹{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Shipping</span>
                <span style={{ color: shipping === 0 ? '#2c7a5c' : '#333', fontSize: '14px', fontWeight: shipping === 0 ? '600' : '400' }}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: '12px', color: '#8B4513', background: '#fdf8f0', padding: '8px 12px', borderRadius: '8px', marginBottom: '14px' }}>
                  🛍️ Add ₹{(2000 - subtotal).toLocaleString()} more for free shipping!
                </p>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px', borderTop: '2px solid #f0e8d8' }}>
                <span style={{ fontWeight: '700', fontSize: '16px', color: '#2c2c2c' }}>Total</span>
                <span style={{ fontWeight: '700', fontSize: '18px', color: '#8B4513' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, placeholder, error, type = 'text', maxLength }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      style={{
        padding: '11px 14px', borderRadius: '10px', fontSize: '14px', color: '#2c2c2c',
        border: `1.5px solid ${error ? '#e53e3e' : '#e0d0c0'}`,
        outline: 'none', background: '#fafafa', transition: 'border-color 0.2s',
        boxSizing: 'border-box', width: '100%'
      }}
      onFocus={(e) => e.target.style.borderColor = '#8B4513'}
      onBlur={(e) => e.target.style.borderColor = error ? '#e53e3e' : '#e0d0c0'}
    />
    {error && <span style={{ fontSize: '12px', color: '#e53e3e' }}>{error}</span>}
  </div>
);

const ResponsiveStyle = () => (
  <style>{`
    @media (max-width: 768px) {
      .checkout-grid { grid-template-columns: 1fr !important; }
      .checkout-form-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

export default Checkout;
