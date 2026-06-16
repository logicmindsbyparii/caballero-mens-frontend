import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const StoreContext = createContext(null);

// Cleansed to read base root context domain dynamically from Vercel variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const StoreProvider = ({ children }) => {
  // ─── STATES ──────────────────────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => localStorage.getItem('caballero_admin_auth') === 'true');
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('caballero_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('caballero_cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('caballero_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // ─── PERSISTENCE & DATA DATA FETCHING ────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Correct alignment path to eliminate nested /api duplicates
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      } else if (Array.isArray(data)) {
        // Fallback catch if backend pipeline outputs list arrays without wrapper object objects
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Fetch products error connection:', err);
      setProducts([]); // Fails cleanly instead of rendering stale mocked layouts
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    localStorage.setItem('caballero_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('caballero_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Real-time server state pooling integration synchronization
  useEffect(() => {
    const interval = setInterval(() => {
      fetchProducts();
      fetchAvailableCoupons();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchProducts]);

  // ─── AUTHENTICATION (WITH CART CLEARING LOGIC) ───────────────────────────
  const adminLogin = (username, password) => {
    if (username === 'caballero_admin' && password === 'Caballero@2025') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('caballero_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Credentials.' };
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('caballero_admin_auth');
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('caballero_user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Server error connection issue' };
    }
  };

  const signup = async (userData) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('caballero_user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Server error connection issue' };
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]); 
    localStorage.removeItem('caballero_user');
    localStorage.removeItem('caballero_cart');
  };

  // ─── PRODUCT CRUD (FormData supported for add) ───────────────────────────
  const addProduct = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        body: formData, 
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => [data.data, ...prev]);
        return { success: true, data: data.data };
      }
      return { success: false };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const isFormData = updates instanceof FormData;
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        body: isFormData ? updates : JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => (p._id === id || p.id === id) ? data.data : p));
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.filter(p => (p._id !== id && p.id !== id)));
        return { success: true };
      }
      return { success: false };
    } catch (err) { return { success: false }; }
  };

  const submitReview = async (productId, reviewData) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${productId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => (p.id === productId || p._id === productId) ? data.product : p));
        return { success: true, product: data.product };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Review submission failed' };
    }
  };

  const deleteReview = async (productId, reviewId) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${productId}/review/${reviewId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => (p.id === productId || p._id === productId) ? data.product : p));
        return { success: true };
      }
      return { success: false };
    } catch (err) { return { success: false }; }
  };

  const fetchUserOrders = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/api/users/${userId}/orders`);
      const data = await res.json();
      if (data.success) return data.data;
      return [];
    } catch (err) { return []; }
  };

  // ─── CART & WISHLIST OPERATIONS (FIXED FOR MONGODB _ID ROUTING) ──────────
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addToCart = (product, quantity = 1) => {
    const targetId = product._id || product.id;
    setCart((prev) => {
      const existing = prev.find((item) => (item._id === targetId || item.id === targetId));
      if (existing) {
        return prev.map((item) =>
          (item._id === targetId || item.id === targetId) ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => (item._id !== id && item.id !== id)));

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    setCart((prev) => prev.map((item) => ((item._id === id || item.id === id) ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('caballero_cart');
  };

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  const fetchAvailableCoupons = async () => {
    try {
      const res = await fetch(`${API_URL}/api/coupons`);
      const data = await res.json();
      if (data.success) setAvailableCoupons(data.data);
    } catch (err) { console.error('Fetch coupons error:', err); }
  };

  useEffect(() => {
    fetchAvailableCoupons();
  }, []);

  // ─── COUPON LOGIC ────────────────────────────────────────────────────────
  const applyCoupon = async (code) => {
    try {
      const res = await fetch(`${API_URL}/api/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.success) {
        setAppliedCoupon(data.data);
        return { success: true, message: 'Coupon applied successfully!' };
      }
      return { success: false, message: data.message || 'Invalid coupon.' };
    } catch (err) {
      return { success: false, message: 'Server connection error' };
    }
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const discountAmount = appliedCoupon 
    ? (appliedCoupon.type === 'percentage' 
        ? (cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * (appliedCoupon.discount / 100))
        : appliedCoupon.discount)
    : 0;

  // ─── ORDER PLACEMENT ─────────────────────────────────────────────────────
  const placeOrder = async (orderDetails) => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderDetails,
          userId: user?.id || user?._id,
          userName: user?.name,
          items: cart,
          couponCode: appliedCoupon?.code,
          discount: discountAmount,
          paymentDetails: orderDetails.paymentDetails,
        }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        removeCoupon();
        return { success: true, order: data.data };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Server checkout connection failure' };
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = ['Formal Pants', 'Tshirt', 'Shirt', 'Blazers', 'Kurta', 'Track Pants'];

  return (
    <StoreContext.Provider
      value={{
        products, categories, loading, fetchProducts,
        addProduct, updateProduct, deleteProduct,
        isAdminLoggedIn, adminLogin, adminLogout,
        user, login, signup, logout,
        cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
        cartTotal, cartCount,
        wishlist, toggleWishlist,
        appliedCoupon, applyCoupon, removeCoupon, discountAmount,
        availableCoupons, fetchAvailableCoupons,
        placeOrder, submitReview,
        quickViewProduct, setQuickViewProduct,
        deleteReview, fetchUserOrders,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within a StoreProvider');
  return ctx;
};

export default StoreContext;
