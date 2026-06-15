import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  // ─── INITIAL DATA ────────────────────────────────────────────────────────
  const initialProducts = [
    { id: 1, name: "Premium Silk Kurta", category: "Kurta", price: 2999, mrp: 4500, stock: 10, badge: "New", image: "https://images.unsplash.com/photo-1597910037310-7dd8ddb93e24?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Formal Slim Fit Pants", category: "Formal Pants", price: 1899, mrp: 2800, stock: 15, badge: "Classic", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Navy Royal Blazer", category: "Blazers", price: 5499, mrp: 7500, stock: 5, badge: "Luxury", image: "https://images.unsplash.com/photo-1594932224828-b4b059b6f68e?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Cotton Casual Shirt", category: "Shirt", price: 1299, mrp: 1999, stock: 20, badge: "Trending", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "Classic White Tshirt", category: "Tshirt", price: 799, mrp: 1200, stock: 25, badge: "Essential", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "Athletic Track Pants", category: "Track Pants", price: 1100, mrp: 1600, stock: 12, badge: "Active", image: "https://images.unsplash.com/photo-1515434126000-961d90ff09db?auto=format&fit=crop&q=80&w=800" }
  ];
  const API_URL = 'http://localhost:5000/api';

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

  // ─── PERSISTENCE ─────────────────────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        setProducts(initialProducts);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setProducts(initialProducts);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    localStorage.setItem('caballero_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('caballero_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Polling for real-time updates (every 5 seconds for near-instant feel)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchProducts();
      fetchAvailableCoupons();
    }, 5000); // 5 seconds
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
      const res = await fetch(`${API_URL}/auth/login`, {
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
      return { success: false, message: 'Server error' };
    }
  };

  const signup = async (userData) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
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
      return { success: false, message: 'Server error' };
    }
  };

  // FIXED: This now clears the User AND the Cart
  const logout = () => {
    setUser(null);
    setCart([]); // Reset Cart State
    localStorage.removeItem('caballero_user');
    localStorage.removeItem('caballero_cart'); // Clear Cart Storage
  };

  // ─── PRODUCT CRUD (FormData supported for add) ───────────────────────────
  const addProduct = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        body: formData, // Sending FormData directly for image upload
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
      const res = await fetch(`${API_URL}/products/${id}`, {
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
      const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
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
      const res = await fetch(`${API_URL}/products/${productId}/review`, {
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
      const res = await fetch(`${API_URL}/products/${productId}/review/${reviewId}`, { method: 'DELETE' });
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
      const res = await fetch(`${API_URL}/users/${userId}/orders`);
      const data = await res.json();
      if (data.success) return data.data;
      return [];
    } catch (err) { return []; }
  };

  // ─── CART & WISHLIST OPERATIONS ──────────────────────────────────────────
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('caballero_cart');
  };

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  const fetchAvailableCoupons = async () => {
    try {
      const res = await fetch(`${API_URL}/coupons`);
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
      const res = await fetch(`${API_URL}/coupons/validate`, {
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
      return { success: false, message: 'Server error' };
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
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderDetails,
          userId: user?.id,
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
      return { success: false, message: 'Server error' };
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