// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, X } from 'lucide-react';
// import { useStore } from '../context/StoreContext';
// import RazorpayCheckout from '../components/RazorpayCheckout';

// const Cart = () => {
//   const { cart, updateCartItem, removeFromCart, clearCart } = useStore();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setCartItems(cart || []);
//   }, [cart]);

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 1) return;
//     updateCartItem(productId, newQuantity);
//   };

//   const removeItem = (productId) => {
//     removeFromCart(productId);
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const shipping = subtotal > 1999 ? 0 : 99;
//   const total = subtotal + shipping;

//   const handlePaymentSuccess = (paymentData) => {
//     console.log('Payment successful!', paymentData);
//     alert('Payment successful! Your order has been placed.');
//     clearCart();
//     navigate('/order-success', { state: { orderId: paymentData.orderId } });
//   };

//   const handlePaymentError = (error) => {
//     console.error('Payment error:', error);
//     alert('Payment failed. Please try again.');
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-cream py-16">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <ShoppingBag size={64} className="mx-auto text-brown/30 mb-6" />
//           <h2 className="text-3xl font-serif text-charcoal mb-4">Your cart is empty</h2>
//           <p className="text-muted mb-8">Looks like you haven't added anything to your cart yet.</p>
//           <Link to="/shop" className="inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-full hover:bg-brown transition">
//             <ArrowLeft size={16} /> Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-cream py-8 md:py-16">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-3xl md:text-4xl font-serif text-charcoal mb-8">Shopping Cart</h1>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {cartItems.map((item) => (
//               <div key={item.id} className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm border border-beige">
//                 <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-xl" />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-serif text-xl text-charcoal">{item.name}</h3>
//                       <p className="text-brown text-sm">{item.category}</p>
//                     </div>
//                     <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                   <div className="flex justify-between items-center mt-4">
//                     <div className="flex items-center gap-3 border border-beige rounded-full px-3 py-1">
//                       <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-brown">
//                         <Minus size={14} />
//                       </button>
//                       <span className="w-8 text-center">{item.quantity}</span>
//                       <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-brown">
//                         <Plus size={14} />
//                       </button>
//                     </div>
//                     <p className="font-semibold text-charcoal">₹{(item.price * item.quantity).toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige h-fit sticky top-24">
//             <h2 className="text-xl font-serif text-charcoal mb-4">Order Summary</h2>
//             <div className="space-y-3 border-b border-beige pb-4">
//               <div className="flex justify-between text-muted">
//                 <span>Subtotal</span>
//                 <span>₹{subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-muted">
//                 <span>Shipping</span>
//                 <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
//               </div>
//             </div>
//             <div className="flex justify-between text-lg font-bold text-charcoal mt-4">
//               <span>Total</span>
//               <span>₹{total.toLocaleString()}</span>
//             </div>
            
//             {/* Razorpay Checkout Button */}
//             <div className="mt-6">
//               <RazorpayCheckout 
//                 amount={total}
//                 onSuccess={handlePaymentSuccess}
//                 onError={handlePaymentError}
//               />
//             </div>
            
//             <p className="text-xs text-muted text-center mt-4">
//               Secure payment powered by Razorpay
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
// import { useStore } from '../context/StoreContext';
// import RazorpayCheckout from '../components/RazorpayCheckout';

// const Cart = () => {
//   // Destructured with updateCartQuantity to correctly match your updated StoreContext backend logic
//   const { cart, updateCartQuantity, removeFromCart, clearCart } = useStore();
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setCartItems(cart || []);
//   }, [cart]);

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 1) return;
//     // Route tracking back via correct Context method
//     updateCartQuantity(productId, newQuantity);
//   };

//   const removeItem = (productId) => {
//     removeFromCart(productId);
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const shipping = subtotal > 1999 ? 0 : 99;
//   const total = subtotal + shipping;

//   const handlePaymentSuccess = (paymentData) => {
//     console.log('Payment successful!', paymentData);
//     alert('Payment successful! Your order has been placed.');
//     clearCart();
//     navigate('/order-success');
//   };

//   const handlePaymentError = (error) => {
//     console.error('Payment error:', error);
//     alert('Payment failed. Please try again.');
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-cream py-16">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <ShoppingBag size={64} className="mx-auto text-brown/30 mb-6" />
//           <h2 className="text-3xl font-serif text-charcoal mb-4">Your cart is empty</h2>
//           <p className="text-muted mb-8">Looks like you haven't added anything to your cart yet.</p>
//           <Link to="/shop" className="inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-full hover:bg-brown transition">
//             <ArrowLeft size={16} /> Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-cream py-8 md:py-16">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-3xl md:text-4xl font-serif text-charcoal mb-8">Shopping Cart</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {cartItems.map((item) => {
//               // Safety fallback to read either MongoDB tracking object IDs or internal UI fallback IDs
//               const itemId = item._id || item.id;

//               return (
//                 <div key={itemId} className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm border border-beige">
//                   {/* Product Image */}
//                   <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-xl" />

//                   {/* Product Details */}
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="font-serif text-xl text-charcoal">{item.name}</h3>
//                         <p className="text-brown text-sm mt-1">{item.category}</p>
//                       </div>
//                       <button onClick={() => removeItem(itemId)} className="text-red-500 hover:text-red-700 transition-colors">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>

//                     {/* Quantity & Price Row */}
//                     <div className="flex justify-between items-center mt-4 flex-wrap gap-3">
//                       <div className="flex items-center gap-3 border border-beige rounded-full px-3 py-1">
//                         <button
//                           onClick={() => updateQuantity(itemId, item.quantity - 1)}
//                           className="p-1 hover:text-brown transition-colors"
//                           aria-label="Decrease quantity"
//                         >
//                           <Minus size={14} />
//                         </button>
//                         <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
//                         <button
//                           onClick={() => updateQuantity(itemId, item.quantity + 1)}
//                           className="p-1 hover:text-brown transition-colors"
//                           aria-label="Increase quantity"
//                         >
//                           <Plus size={14} />
//                         </button>
//                       </div>
//                       <p className="font-semibold text-charcoal text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Order Summary */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige h-fit sticky top-24">
//             <h2 className="text-xl font-serif text-charcoal mb-4">Order Summary</h2>
//             <div className="space-y-3 border-b border-beige pb-4">
//               <div className="flex justify-between text-muted">
//                 <span>Subtotal</span>
//                 <span>₹{subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-muted">
//                 <span>Shipping</span>
//                 <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
//               </div>
//             </div>
//             <div className="flex justify-between text-lg font-bold text-charcoal mt-4">
//               <span>Total</span>
//               <span>₹{total.toLocaleString()}</span>
//             </div>

//             {/* Razorpay Checkout Button Container */}
//             <div className="mt-6">
//               <RazorpayCheckout
//                 amount={total}
//                 onSuccess={handlePaymentSuccess}
//                 onError={handlePaymentError}
//               />
//             </div>
//             <p className="text-xs text-muted text-center mt-4">
//               Secure payment powered by Razorpay
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useStore();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(cart || []);
  }, [cart]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, newQuantity);
  };

  const removeItem = (productId) => {
    removeFromCart(productId);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal + shipping;

  // Navigate to the full Checkout page (address + payment gateway)
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <ShoppingBag size={64} className="mx-auto text-brown/30 mb-6" />
          <h2 className="text-3xl font-serif text-charcoal mb-4">Your cart is empty</h2>
          <p className="text-muted mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-full hover:bg-brown transition">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif text-charcoal mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-sm border border-beige">
                  <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-xl" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-xl text-charcoal">{item.name}</h3>
                        <p className="text-brown text-sm mt-1">{item.category}</p>
                      </div>
                      <button onClick={() => removeItem(itemId)} className="text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4 flex-wrap gap-3">
                      <div className="flex items-center gap-3 border border-beige rounded-full px-3 py-1">
                        <button
                          onClick={() => updateQuantity(itemId, item.quantity - 1)}
                          className="p-1 hover:text-brown transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(itemId, item.quantity + 1)}
                          className="p-1 hover:text-brown transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-semibold text-charcoal text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige h-fit sticky top-24">
            <h2 className="text-xl font-serif text-charcoal mb-4">Order Summary</h2>
            <div className="space-y-3 border-b border-beige pb-4">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: '12px', color: '#8B4513', background: '#fdf8f0', padding: '8px 10px', borderRadius: '8px' }}>
                  🛍️ Add ₹{(2000 - subtotal).toLocaleString()} more for free shipping!
                </p>
              )}
            </div>
            <div className="flex justify-between text-lg font-bold text-charcoal mt-4">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {/* Proceed to Checkout */}
            <div className="mt-6">
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#8B4513] text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-stone-800 transition-all text-center text-sm"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>

            {/* Trust Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
              <ShieldCheck size={14} color="#2c7a5c" />
              <p className="text-xs text-muted text-center">
                Secure checkout · UPI · Cards · Wallets
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;