// // import React, { useState, useEffect } from 'react';
// import { useStore } from '../context/StoreContext';
// import { ShoppingBag, ChevronRight, Star, Tag, ClipboardList, Clock, CheckCircle2 } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const MyOrders = () => {
//   const { user, fetchUserOrders, setQuickViewProduct, products } = useStore();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       loadOrders();
//     }
//   }, [user]);

//   const loadOrders = async () => {
//     setLoading(true);
//     // FIXED: Correct tracking payload mapper to support MongoDB _id models safely
//     const targetUserId = user?._id || user?.id;
//     const data = await fetchUserOrders(targetUserId);
//     setOrders(data || []);
//     setLoading(false);
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#FAF9F6] px-4">
//         <div className="bg-white p-10 rounded-[40px] shadow-xl text-center max-w-sm">
//            <ShoppingBag size={48} className="mx-auto mb-6 text-stone-300" />
//            <h2 className="text-2xl font-serif mb-4">You're not signed in</h2>
//            <p className="text-stone-400 text-sm mb-8 text-pretty">Please sign in to view your wardrobe history and orders.</p>
//            <Link to="/login" className="block w-full bg-stone-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px]">Sign In</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-32 pb-24 bg-[#FAF9F6] px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <header className="mb-12 animate-fade-in flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//           <div>
//             <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-2 font-bold">Account</p>
//             <h1 className="text-4xl font-serif text-stone-900 tracking-tight">My Orders</h1>
//             <div className="h-0.5 w-16 bg-[#c24b10] mt-4 rounded-full" />
//           </div>
//           <p className="text-stone-400 text-sm italic">Showing your premium collection history</p>
//         </header>

//         {loading ? (
//           <div className="space-y-6">
//             {[1, 2].map(i => <div key={i} className="h-48 bg-white/50 rounded-3xl animate-pulse" />)}
//           </div>
//         ) : orders.length === 0 ? (
//           <div className="bg-white rounded-[40px] p-16 text-center border border-stone-100 shadow-sm animate-fade-up">
//             <ClipboardList size={64} className="mx-auto mb-6 text-stone-100" />
//             <h3 className="text-xl font-serif text-stone-800 mb-2">No orders found</h3>
//             <p className="text-stone-400 text-sm mb-8">You haven't made any purchases yet. Your future gems will appear here.</p>
//             <Link to="/shop" className="inline-block bg-stone-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#c24b10] transition-colors shadow-lg">Start Exploring</Link>
//           </div>
//         ) : (
//           <div className="space-y-6 animate-fade-up">
//             {orders.map((order) => {
//               const orderKeyId = order._id || order.id;
//               return (
//                 <div key={orderKeyId} className="bg-white rounded-[40px] p-6 md:p-8 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
//                   <div className="flex flex-wrap justify-between items-start gap-4 mb-8 border-b border-stone-50 pb-6">
//                      <div className="flex gap-4">
//                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${order.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
//                            {order.status === 'Paid' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
//                         </div>
//                         <div>
//                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Order #{orderKeyId}</p>
//                            <div className="flex items-center gap-2">
//                               <span className="font-bold text-stone-900 text-sm">Status: {order.status}</span>
//                               <span className="text-stone-300">•</span>
//                               <span className="text-stone-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
//                            </div>
//                         </div>
//                      </div>
//                      <div className="text-right">
//                         <p className="text-2xl font-serif font-bold text-stone-900">₹{order.total.toLocaleString()}</p>
//                         <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">{(order.items || []).length} Items</p>
//                      </div>
//                   </div>

//                   <div className="space-y-4">
//                      {(order.items || []).map((item, idx) => (
//                        <div key={idx} className="flex items-center justify-between gap-4 p-4 rounded-3xl bg-stone-50/50 border border-stone-100/50 hover:bg-stone-50 transition-colors">
//                           <div className="flex items-center gap-4">
//                              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
//                              <div>
//                                 <p className="font-bold text-stone-800 text-sm">{item.name}</p>
//                                 <p className="text-xs text-stone-400 uppercase tracking-[0.1em]">{item.category} • x{item.quantity}</p>
//                              </div>
//                           </div>
//                           <div className="flex items-center gap-4">
//                              <button 
//                                onClick={() => {
//                                  const fullProduct = products.find(p => p.id === item.id || p._id === item.id);
//                                  if (fullProduct) setQuickViewProduct(fullProduct);
//                                  else alert("Product details loading, please try in a moment...");
//                                }}
//                                className="text-[10px] bg-white border border-stone-200 text-stone-900 px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider hover:border-[#c24b10] hover:text-[#c24b10] transition-all shadow-sm flex items-center gap-2"
//                              >
//                                 <Star size={12} className="fill-current" /> Write Review
//                              </button>
//                              <ChevronRight size={18} className="text-stone-200" />
//                           </div>
//                        </div>
//                      ))}
//                   </div>

//                   <div className="mt-8 flex justify-between items-center text-xs">
//                      <div className="flex gap-4 text-stone-400 font-bold uppercase tracking-widest">
//                         <span>{order.paymentMethod || 'Online Payment'}</span>
//                         {order.couponCode && (
//                           <span className="text-green-600 flex items-center gap-1">
//                              <Tag size={12} /> {order.couponCode}
//                           </span>
//                         )}
//                      </div>
//                      <Link to="/contact" className="text-[#c24b10] font-bold hover:underline">Need Help?</Link>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;


// import React, { useState, useEffect } from 'react';
// import { useStore } from '../context/StoreContext';
// import { ShoppingBag, ChevronRight, Star, Tag, ClipboardList, Clock, CheckCircle2 } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const MyOrders = () => {
//   const { user, fetchUserOrders, setQuickViewProduct, products } = useStore();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       loadOrders();
//     }
//   }, [user]);

//   const loadOrders = async () => {
//     setLoading(true);
//     const data = await fetchUserOrders(user.id);
//     setOrders(data);
//     setLoading(false);
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#FAF9F6] px-4">
//         <div className="bg-white p-10 rounded-[40px] shadow-xl text-center max-w-sm">
//            <ShoppingBag size={48} className="mx-auto mb-6 text-stone-300" />
//            <h2 className="text-2xl font-serif mb-4">You're not signed in</h2>
//            <p className="text-stone-400 text-sm mb-8 text-pretty">Please sign in to view your wardrobe history and orders.</p>
//            <Link to="/login" className="block w-full bg-stone-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px]">Sign In</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-32 pb-24 bg-[#FAF9F6] px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <header className="mb-12 animate-fade-in flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//           <div>
//             <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-2 font-bold">Account</p>
//             <h1 className="text-4xl font-serif text-stone-900 tracking-tight">My Orders</h1>
//             <div className="h-0.5 w-16 bg-[#c24b10] mt-4 rounded-full" />
//           </div>
//           <p className="text-stone-400 text-sm italic">Showing your premium collection history</p>
//         </header>

//         {loading ? (
//           <div className="space-y-6">
//             {[1, 2].map(i => <div key={i} className="h-48 bg-white/50 rounded-3xl animate-pulse" />)}
//           </div>
//         ) : orders.length === 0 ? (
//           <div className="bg-white rounded-[40px] p-16 text-center border border-stone-100 shadow-sm animate-fade-up">
//             <ClipboardList size={64} className="mx-auto mb-6 text-stone-100" />
//             <h3 className="text-xl font-serif text-stone-800 mb-2">No orders found</h3>
//             <p className="text-stone-400 text-sm mb-8">You haven't made any purchases yet. Your future gems will appear here.</p>
//             <Link to="/shop" className="inline-block bg-stone-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#c24b10] transition-colors shadow-lg">Start Exploring</Link>
//           </div>
//         ) : (
//           <div className="space-y-6 animate-fade-up">
//             {orders.map((order) => (
//               <div key={order.id} className="bg-white rounded-[40px] p-6 md:p-8 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
//                 <div className="flex flex-wrap justify-between items-start gap-4 mb-8 border-b border-stone-50 pb-6">
//                    <div className="flex gap-4">
//                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${order.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
//                          {order.status === 'Paid' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
//                       </div>
//                       <div>
//                          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Order #{order.id}</p>
//                          <div className="flex items-center gap-2">
//                             <span className="font-bold text-stone-900 text-sm">Status: {order.status}</span>
//                             <span className="text-stone-300">•</span>
//                             <span className="text-stone-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
//                          </div>
//                       </div>
//                    </div>
//                    <div className="text-right">
//                       <p className="text-2xl font-serif font-bold text-stone-900">₹{order.total.toLocaleString()}</p>
//                       <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">{order.items.length} Items</p>
//                    </div>
//                 </div>

//                 <div className="space-y-4">
//                    {order.items.map((item, idx) => (
//                      <div key={idx} className="flex items-center justify-between gap-4 p-4 rounded-3xl bg-stone-50/50 border border-stone-100/50 hover:bg-stone-50 transition-colors">
//                         <div className="flex items-center gap-4">
//                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
//                            <div>
//                               <p className="font-bold text-stone-800 text-sm">{item.name}</p>
//                               <p className="text-xs text-stone-400 uppercase tracking-[0.1em]">{item.category} • x{item.quantity}</p>
//                            </div>
//                         </div>
//                         <div className="flex items-center gap-4">
//                            <button 
//                              onClick={() => {
//                                // Open quick view to leave review
//                                const fullProduct = products.find(p => p.id === item.id || p._id === item.id);
//                                if (fullProduct) setQuickViewProduct(fullProduct);
//                                else alert("Product details loading, please try in a moment...");
//                              }}
//                              className="text-[10px] bg-white border border-stone-200 text-stone-900 px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider hover:border-[#c24b10] hover:text-[#c24b10] transition-all shadow-sm flex items-center gap-2"
//                            >
//                               <Star size={12} className="fill-current" /> Write Review
//                            </button>
//                            <ChevronRight size={18} className="text-stone-200" />
//                         </div>
//                      </div>
//                    ))}
//                 </div>

//                 <div className="mt-8 flex justify-between items-center text-xs">
//                    <div className="flex gap-4 text-stone-400 font-bold uppercase tracking-widest">
//                       <span>{order.paymentMethod}</span>
//                       {order.couponCode && (
//                         <span className="text-green-600 flex items-center gap-1">
//                            <Tag size={12} /> {order.couponCode}
//                         </span>
//                       )}
//                    </div>
//                    <Link to="/contact" className="text-[#c24b10] font-bold hover:underline">Need Help?</Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;


import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ChevronRight, Star, Tag, ClipboardList, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { user, fetchUserOrders, setQuickViewProduct, products } = useStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    setLoading(true);
    // FIXED: Correct tracking payload mapper to support MongoDB _id models safely
    const targetUserId = user?._id || user?.id;
    const data = await fetchUserOrders(targetUserId);
    setOrders(data || []);
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#FAF9F6] px-4">
        <div className="bg-white p-10 rounded-[40px] shadow-xl text-center max-w-sm">
           <ShoppingBag size={48} className="mx-auto mb-6 text-stone-300" />
           <h2 className="text-2xl font-serif mb-4">You're not signed in</h2>
           <p className="text-stone-400 text-sm mb-8 text-pretty">Please sign in to view your wardrobe history and orders.</p>
           <Link to="/login" className="block w-full bg-stone-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px]">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#FAF9F6] px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 animate-fade-in flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-2 font-bold">Account</p>
            <h1 className="text-4xl font-serif text-stone-900 tracking-tight">My Orders</h1>
            <div className="h-0.5 w-16 bg-[#c24b10] mt-4 rounded-full" />
          </div>
          <p className="text-stone-400 text-sm italic">Showing your premium collection history</p>
        </header>

        {loading ? (
          <div className="space-y-6">
            {[1, 2].map(i => <div key={i} className="h-48 bg-white/50 rounded-3xl animate-pulse" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-[40px] p-16 text-center border border-stone-100 shadow-sm animate-fade-up">
            <ClipboardList size={64} className="mx-auto mb-6 text-stone-100" />
            <h3 className="text-xl font-serif text-stone-800 mb-2">No orders found</h3>
            <p className="text-stone-400 text-sm mb-8">You haven't made any purchases yet. Your future gems will appear here.</p>
            <Link to="/shop" className="inline-block bg-stone-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#c24b10] transition-colors shadow-lg">Start Exploring</Link>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-up">
            {orders.map((order) => {
              const orderKeyId = order._id || order.id;
              return (
                <div key={orderKeyId} className="bg-white rounded-[40px] p-6 md:p-8 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-8 border-b border-stone-50 pb-6">
                     <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${order.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                           {order.status === 'Paid' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                        </div>
                        <div>
                           <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Order #{orderKeyId}</p>
                           <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-900 text-sm">Status: {order.status}</span>
                              <span className="text-stone-300">•</span>
                              <span className="text-stone-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
                           </div>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-2xl font-serif font-bold text-stone-900">₹{order.total.toLocaleString()}</p>
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">{(order.items || []).length} Items</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     {(order.items || []).map((item, idx) => (
                       <div key={idx} className="flex items-center justify-between gap-4 p-4 rounded-3xl bg-stone-50/50 border border-stone-100/50 hover:bg-stone-50 transition-colors">
                          <div className="flex items-center gap-4">
                             <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                             <div>
                                <p className="font-bold text-stone-800 text-sm">{item.name}</p>
                                <p className="text-xs text-stone-400 uppercase tracking-[0.1em]">{item.category} • x{item.quantity}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <button 
                               onClick={() => {
                                 const targetId = item._id || item.id;
                                 const fullProduct = products.find(p => p.id === targetId || p._id === targetId);
                                 if (fullProduct) {
                                   setQuickViewProduct(fullProduct);
                                 } else {
                                   // Fallback if the product was deleted from the store by the admin
                                   setQuickViewProduct({ ...item, id: targetId, reviewList: [] });
                                 }
                               }}
                               className="text-[10px] bg-white border border-stone-200 text-stone-900 px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider hover:border-[#c24b10] hover:text-[#c24b10] transition-all shadow-sm flex items-center gap-2"
                             >
                                <Star size={12} className="fill-current" /> Write Review
                             </button>
                             <ChevronRight size={18} className="text-stone-200" />
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="mt-8 flex justify-between items-center text-xs">
                     <div className="flex gap-4 text-stone-400 font-bold uppercase tracking-widest">
                        <span>{order.paymentMethod || 'Online Payment'}</span>
                        {order.couponCode && (
                          <span className="text-green-600 flex items-center gap-1">
                             <Tag size={12} /> {order.couponCode}
                          </span>
                        )}
                     </div>
                     <Link to="/contact" className="text-[#c24b10] font-bold hover:underline">Need Help?</Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
