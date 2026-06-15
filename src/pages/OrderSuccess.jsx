import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total, address } = location.state || {};

  useEffect(() => {
    // If someone navigates here directly without state, redirect
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!location.state) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf8f0 0%, #fff9f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '52px 44px',
        boxShadow: '0 8px 40px rgba(139,69,19,0.10)',
        border: '1px solid #f0e8d8',
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center',
      }}>
        {/* Animated checkmark */}
        <div style={{
          width: '88px', height: '88px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #2c7a5c, #38a169)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: '0 6px 24px rgba(56,161,105,0.30)',
          animation: 'popIn 0.4s ease-out',
        }}>
          <CheckCircle size={46} color="#fff" strokeWidth={2.5} />
        </div>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '2rem',
          color: '#2c2c2c',
          marginBottom: '10px',
          lineHeight: '1.2',
        }}>
          Order Placed! 🎉
        </h1>
        <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
          Thank you{address?.fullName ? `, ${address.fullName}` : ''}! Your Caballero order has been confirmed and is being processed.
        </p>

        {/* Order Info Card */}
        <div style={{
          background: '#fdf8f0',
          borderRadius: '14px',
          padding: '20px',
          marginBottom: '28px',
          border: '1px solid #f0e8d8',
          textAlign: 'left',
        }}>
          {orderId && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#888' }}>Order ID</span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#8B4513', fontFamily: 'monospace' }}>
                #{orderId}
              </span>
            </div>
          )}
          {total && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#888' }}>Amount Paid</span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#2c2c2c' }}>₹{total.toLocaleString()}</span>
            </div>
          )}
          {address && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#888' }}>Delivering to</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#2c2c2c', textAlign: 'right', maxWidth: '200px' }}>
                {address.city}, {address.state}
              </span>
            </div>
          )}
        </div>

        {/* Delivery info */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          background: '#f0faf5', border: '1px solid #c6e8d5',
          borderRadius: '12px', padding: '14px 16px', marginBottom: '28px',
        }}>
          <Package size={22} color="#2c7a5c" />
          <p style={{ fontSize: '13px', color: '#2c7a5c', fontWeight: '500', textAlign: 'left', lineHeight: '1.4' }}>
            Your order will be delivered within <strong>5–7 business days</strong>. You'll receive a tracking update soon.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link
            to="/my-orders"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: '#8B4513', color: '#fff', borderRadius: '12px', padding: '15px',
              fontWeight: '700', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#6b3410'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#8B4513'}
          >
            Track My Order <ArrowRight size={16} />
          </Link>
          <Link
            to="/shop"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: '#fdf8f0', color: '#8B4513', borderRadius: '12px', padding: '14px',
              fontWeight: '600', fontSize: '14px', border: '1.5px solid #e0d0c0',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f5ead8'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fdf8f0'}
          >
            <Home size={16} /> Continue Shopping
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;
