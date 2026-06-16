import React, { useState, useEffect } from 'react';
import { 
  Plus, Pencil, Trash2, X, Check, LogOut, 
  Package, TrendingUp, Star, ShoppingBag, AlertCircle, ChevronDown, Ticket, ClipboardList, Eye, MessageSquare, Menu, Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import AdminUsers from '../components/AdminUsers';

const CATEGORIES = ['Formal Pants', 'Tshirt', 'Shirt', 'Blazers', 'Kurta', 'Track Pants'];

// Dynamically extracts the deployment platform API environment address 
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const emptyForm = {
  name: '', category: 'Shirt', price: '', originalPrice: '',
  description: '', badge: '', inStock: true, image: null, noOffers: false,
  applicableCoupon: '', isBestseller: false
};

const Admin = () => {
  const { products, fetchProducts, addProduct, updateProduct, deleteProduct, adminLogout, deleteReview } = useStore();
  const navigate = useNavigate();

  // --- STATES ---
  const [view, setView] = useState('table'); // 'table', 'marketing', 'coupons', 'orders', 'reviews'
  const [showForm, setShowForm] = useState(false);
  const [marketingUsers, setMarketingUsers] = useState([]); 
  const [coupons, setCoupons] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [success, setSuccess] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Coupon Form State
  const [couponForm, setCouponForm] = useState({ code: '', discount: '', type: 'percentage' });
  const [showCouponForm, setShowCouponForm] = useState(false);

  // --- AUTO FETCH (FAST POLLING for REAL-TIME feel) ---
  useEffect(() => {
    const loadAll = () => {
      fetchProducts?.();
      fetchAvailableCoupons();
      fetchOrders();
      if (view === 'marketing') fetchMarketingData();
    };

    loadAll();

    // Polling every 5 seconds for "Real-time" feel without refresh
    const interval = setInterval(loadAll, 5000);
    return () => clearInterval(interval);
  }, [view, fetchProducts]);

  // --- ACTIONS ---
  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setMobileMenuOpen(false);
  };

  const openEdit = (p) => {
    setForm({ 
      ...emptyForm, 
      ...p, 
      isBestseller: p.badge === 'Bestseller' 
    });
    setEditingId(p._id || p.id);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('originalPrice', form.originalPrice || '');
    formData.append('description', form.description || '');
    formData.append('inStock', form.inStock);
    formData.append('noOffers', form.noOffers);
    formData.append('applicableCoupon', form.applicableCoupon || '');
    
    const finalBadge = form.isBestseller ? 'Bestseller' : form.badge;
    formData.append('badge', finalBadge || '');

    if (form.image instanceof File) {
      formData.append('image', form.image);
    } else if (typeof form.image === 'string' && form.image.startsWith('http')) {
      formData.append('imageUrl', form.image);
    }

    if (editingId) {
      const res = await updateProduct(editingId, formData); 
      if (res.success) {
        showSuccess('Product Updated');
        fetchProducts?.(); // Immediate refresh
      }
    } else {
      const res = await addProduct(formData);
      if (res.success) {
        showSuccess('Product Added');
        fetchProducts?.(); // Immediate refresh
      }
    }
    setShowForm(false);
  };

  const fetchMarketingData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users`);
      const result = await res.json();
      if (result.success) setMarketingUsers(result.data);
    } catch (err) { console.error(err); }
  };

  const fetchAvailableCoupons = async () => {
    try {
      const res = await fetch(`${API_URL}/api/coupons`);
      const result = await res.json();
      if (result.success) setCoupons(result.data);
    } catch (err) { console.error(err); }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      const result = await res.json();
      if (result.success) setOrders(result.data);
    } catch (err) { console.error(err); }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await res.json();
      if (result.success) {
        showSuccess(`Order marked as ${newStatus}`);
        fetchOrders(); // Refresh
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        showSuccess('Order Deleted');
        fetchOrders();
      }
    } catch (err) { console.error(err); }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/coupons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(couponForm)
      });
      const result = await res.json();
      if (result.success) {
        setCouponForm({ code: '', discount: '', type: 'percentage' });
        setShowCouponForm(false);
        showSuccess('Coupon Created');
        fetchAvailableCoupons();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteReview = async (productId, reviewId) => {
    if (!window.confirm('Remove this review?')) return;
    const res = await deleteReview(productId, reviewId);
    if (res.success) {
      showSuccess('Review Removed');
      fetchProducts?.();
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin-login');
  };

  const allReviews = products.flatMap(p => 
    (p.reviewList || []).map(r => ({ ...r, productId: p.id || p._id, productName: p.name, productImage: p.image }))
  ).sort((a,b) => new Date(b.date) - new Date(a.date));

  const navItems = [
    { id: 'table', label: 'Inventory', icon: Package },
    { id: 'marketing', label: 'Users', icon: ClipboardList, action: fetchMarketingData },
    { id: 'coupons', label: 'Coupons', icon: Ticket, action: fetchAvailableCoupons },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, action: fetchOrders },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare }
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F6] pb-20 md:pb-0">
      {/* Admin Header */}
      <header className="bg-[#c24b10] text-white py-4 px-4 md:px-6 flex items-center justify-between sticky top-0 z-[110] shadow-xl">
        <div className="flex items-center gap-3">
           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 -ml-2 hover:bg-white/10 rounded-lg">
              <Menu size={24} />
           </button>
           <img src="/logoremove.png" alt="Logo" className="w-10 h-8 object-contain brightness-0 invert" />
           <h1 className="font-serif text-base md:text-lg font-bold text-white cursor-pointer hidden sm:block" onClick={() => setView('table')}>Owner Panel</h1>
        </div>

        <nav className="hidden md:flex items-center gap-1">
           {navItems.map(item => (
             <button 
               key={item.id} 
               onClick={() => { setView(item.id); item.action?.(); }} 
               className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${view === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}
             >
                <item.icon size={14} /> {item.label}
             </button>
           ))}
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-2 text-[10px] bg-red-400/20 text-red-100 px-3 md:px-4 py-2 rounded-xl hover:bg-red-400/30 transition-all font-bold uppercase tracking-widest">
          <LogOut size={14} /> <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      {/* Mobile Sidebar Navigation */}
      <div className={`fixed inset-0 z-[120] transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
         <aside className="relative bg-white w-3/4 h-full shadow-2xl p-6">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-xl font-serif font-bold text-stone-900">Management</h2>
               <button onClick={() => setMobileMenuOpen(false)}><X size={20} className="text-stone-400" /></button>
            </div>
            <div className="space-y-2">
               {navItems.map(item => (
                 <button 
                   key={item.id} 
                   onClick={() => { setView(item.id); item.action?.(); setMobileMenuOpen(false); }} 
                   className={`w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all ${view === item.id ? 'bg-[#c24b10] text-white shadow-lg shadow-[#c24b10]/20' : 'text-stone-500 hover:bg-stone-50'}`}
                 >
                    <item.icon size={20} /> {item.label}
                 </button>
               ))}
            </div>
            <div className="absolute bottom-8 left-6 right-6">
               <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 text-red-600 text-sm font-bold">
                  <LogOut size={20} /> Sign Out
               </button>
            </div>
         </aside>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {success && <div className="fixed top-24 right-4 md:right-6 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-[130] animate-fade-in font-bold text-sm">{success}</div>}

        {showForm && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 md:p-4">
            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <form onSubmit={handleSave} className="relative bg-white w-full max-w-2xl rounded-[2rem] p-6 md:p-8 shadow-3xl overflow-y-auto max-h-[95vh] custom-scrollbar">
              <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
                <h2 className="text-2xl md:text-3xl font-serif text-stone-900">{editingId ? 'Update Design' : 'New Collection'}</h2>
                <button type="button" onClick={() => setShowForm(false)} className="p-2 hover:bg-stone-50 rounded-full"><X size={24} className="text-stone-400" /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 px-1">Product Name</label>
                  <input className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-[#c24b10] transition-all text-sm" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 px-1">Category</label>
                  <select className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-[#c24b10] transition-all cursor-pointer text-sm" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 px-1">Offer Price (₹)</label>
                  <input className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-[#c24b10] transition-all text-sm" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 px-1">Regular Price (₹)</label>
                  <input className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-[#c24b10] transition-all font-light text-sm" type="number" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 px-1">Exclusive Image</label>
                  <div className="relative group">
                     <input type="file" id="file-upload" accept="image/*" className="hidden" onChange={e => setForm({...form, image: e.target.files[0]})} required={!editingId} />
                     <label htmlFor="file-upload" className="w-full p-8 md:p-12 bg-stone-50 border-2 border-dashed border-stone-100 rounded-[2rem] flex flex-col items-center gap-3 cursor-pointer group-hover:border-[#c24b10] transition-all">
                        <Plus className="text-stone-300 group-hover:text-[#c24b10]" size={32} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900">
                           {form.image?.name || 'Tap to upload product vision'}
                        </span>
                     </label>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 px-1">Description</label>
                  <textarea rows="3" className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-[#c24b10] resize-none text-sm" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 px-1">Assigned Coupon Special</label>
                   <select className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-[#c24b10] text-sm" value={form.applicableCoupon} onChange={e => setForm({...form, applicableCoupon: e.target.value})}>
                    <option value="">No Special Discount</option>
                    {coupons.map(c => <option key={c._id || c.id} value={c.code}>{c.code} ({c.discount}{c.type === 'percentage' ? '%' : ' OFF'})</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 p-5 bg-stone-50 rounded-[2rem] border border-stone-100">
                 <div className="flex items-center gap-4">
                    <input type="checkbox" id="best" checked={form.isBestseller} onChange={e => setForm({...form, isBestseller: e.target.checked})} className="w-5 h-5 accent-[#c24b10] rounded-lg" />
                    <label htmlFor="best" className="text-xs font-bold text-stone-800">Assign Bestseller Badge ⭐</label>
                 </div>
                 <div className="flex items-center gap-4">
                    <input type="checkbox" id="nooff" checked={form.noOffers} onChange={e => setForm({...form, noOffers: e.target.checked})} className="w-5 h-5 accent-red-500 rounded-lg" />
                    <label htmlFor="nooff" className="text-xs font-bold text-stone-500">Disable all discounts for this product</label>
                 </div>
              </div>

              <button type="submit" className="w-full mt-8 bg-[#c24b10] text-white py-5 rounded-[2rem] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1">
                {editingId ? 'Confirm Updates' : 'Add to Collection'}
              </button>
            </form>
          </div>
        )}

        {/* Views */}
        {view === 'marketing' ? <AdminUsers /> : 
         view === 'coupons' ? (
           <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-stone-100 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-stone-50 gap-4">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-serif">Coupons Hub</h2>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Manage Reward Vouchers</p>
                 </div>
                 <button onClick={() => setShowCouponForm(true)} className="w-full sm:w-auto bg-[#c24b10] text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#c24b10]/20">+ New Voucher</button>
              </div>
              {showCouponForm && (
                <form onSubmit={handleCreateCoupon} className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-stone-50 rounded-[2rem] animate-fade-down items-end border border-stone-100">
                   <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-stone-300 ml-1">Code</label>
                      <input placeholder="CABALLERO60" className="w-full p-4 rounded-xl border border-stone-100 bg-white shadow-sm text-sm" value={couponForm.code} onChange={e => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})} required />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-stone-300 ml-1">Discount Value</label>
                      <input type="number" placeholder="Value" className="w-full p-4 rounded-xl border border-stone-100 bg-white shadow-sm text-sm" value={couponForm.discount} onChange={e => setCouponForm({...couponForm, discount: e.target.value})} required />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-stone-300 ml-1">Type</label>
                      <select className="w-full p-4 rounded-xl border border-stone-100 bg-white shadow-sm text-sm" value={couponForm.type} onChange={e => setCouponForm({...couponForm, type: e.target.value})}>
                         <option value="percentage">% Percentage</option>
                         <option value="flat">₹ Flat Price</option>
                      </select>
                   </div>
                   <button type="submit" className="bg-stone-900 text-white p-4 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-xl">Create</button>
                </form>
              )}
              
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="text-[10px] uppercase font-bold text-stone-300">
                       <tr><th className="p-4">Voucher</th><th className="p-4">Benefit</th><th className="p-4">Type</th><th className="p-4 text-right">Delete</th></tr>
                    </thead>
                    <tbody>
                       {coupons.map(c => (
                         <tr key={c._id || c.id} className="border-b border-stone-50 hover:bg-stone-50/30 transition-colors group">
                           <td className="p-4 font-bold text-stone-900">{c.code}</td>
                           <td className="p-4 text-stone-600 font-medium">{c.discount}</td>
                           <td className="p-4 text-[9px] font-bold text-stone-400 uppercase tracking-tighter">{c.type}</td>
                           <td className="p-4 text-right">
                              <button onClick={() => handleDeleteOrder(c._id || c.id)} className="p-2 text-stone-200 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
                 {coupons.length === 0 && <p className="text-center py-12 text-stone-300 italic text-sm">No vouchers active.</p>}
              </div>
           </div>
         ) : 
         view === 'orders' ? (
           <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 px-2 mb-8">
                 <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-2">Revenue Streams</p>
                    <h2 className="text-3xl font-serif">Product Sales</h2>
                 </div>
                 <div className="bg-white px-6 py-4 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-6">
                    <div className="text-center">
                       <p className="text-[9px] font-bold text-stone-400 uppercase">Volume</p>
                       <p className="text-xl font-serif font-bold">{orders.length}</p>
                    </div>
                    <div className="w-px h-8 bg-stone-100" />
                    <div className="text-center">
                       <p className="text-[9px] font-bold text-stone-400 uppercase">Income</p>
                       <p className="text-xl font-serif font-bold text-green-600">₹{orders.reduce((s,o)=>s+o.total,0).toLocaleString()}</p>
                    </div>
                 </div>
              </div>
              
              {orders.length === 0 ? <p className="text-center py-20 text-stone-300 italic">No sales recorded yet.</p> : 
               orders.map(order => (
                 <div key={order._id || order.id} className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-stone-100 hover:shadow-md transition-all group">
                    <div className="flex justify-between gap-4 flex-wrap pb-6 border-b border-stone-50 mb-6">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-stone-900 text-white rounded-[1.5rem] flex items-center justify-center font-bold text-lg shadow-lg">{order.userName?.charAt(0)}</div>
                          <div>
                             <p className="font-bold text-stone-900 uppercase tracking-tight">{order.userName}</p>
                             <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">{new Date(order.createdAt).toLocaleString()} • {order._id || order.id}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 md:gap-8">
                          <div className="text-right">
                             <p className="text-2xl font-serif font-bold text-stone-900">₹{order.total.toLocaleString()}</p>
                             <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{order.status}</span>
                          </div>
                          <button onClick={() => handleDeleteOrder(order._id || order.id)} className="p-3 text-stone-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group-hover:text-stone-300"><Trash2 size={20} /></button>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pl-1">Bag Items</p>
                          <div className="space-y-3">
                             {order.items.map((it, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-stone-50/50 rounded-2xl border border-stone-100/50">
                                   <div className="flex items-center gap-3">
                                      <img 
                                        src={it.image} 
                                        className="w-10 h-10 rounded-lg object-cover" 
                                        alt="" 
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80'; }}
                                      />
                                      <span className="text-sm font-bold text-stone-700">{it.name} <span className="text-stone-300 ml-1">x{it.quantity}</span></span>
                                   </div>
                                   <span className="text-sm font-bold text-stone-900">₹{(it.price * it.quantity).toLocaleString()}</span>
                                </div>
                             ))}
                          </div>
                       </div>
                       
                       <div className="space-y-4">
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pl-1">Fiscal Details</p>
                          <div className="bg-stone-50 p-6 rounded-[2rem] text-xs space-y-3 border border-stone-100 shadow-inner">
                             <div className="flex justify-between items-center">
                                <span className="text-stone-400 font-bold uppercase tracking-tighter">Payment Strategy</span>
                                <span className="font-bold text-stone-900">{order.paymentMethod}</span>
                             </div>
                             {order.couponCode && (
                                <div className="flex justify-between items-center text-green-600">
                                   <span className="font-bold uppercase tracking-tighter">Voucher Benefit ({order.couponCode})</span>
                                   <span className="font-bold">-₹{order.discount.toLocaleString()}</span>
                                </div>
                             )}
                             <hr className="border-stone-100" />
                             <div className="flex justify-between items-center pt-2">
                                <span className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Settled Total</span>
                                <span className="text-2xl font-serif font-bold text-[#c24b10]">₹{order.total.toLocaleString()}</span>
                             </div>
                             {order.status === 'Pending' && (
                                <button 
                                  onClick={() => handleUpdateStatus(order._id || order.id, 'Paid')} 
                                  className="w-full mt-4 bg-white border-2 border-[#c24b10] text-[#c24b10] py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#c24b10] hover:text-white transition-all shadow-md active:scale-95"
                                >
                                   Mark as Delivered & Settled
                                </button>
                             )}
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
           </div>
         ) : 
         view === 'reviews' ? (
           <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-stone-100 animate-fade-in">
              <div className="mb-8 pb-4 border-b border-stone-50 flex justify-between items-end">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-serif">Customer Feedback</h2>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Real-time engagement portal</p>
                 </div>
                 <div className="bg-stone-50 px-4 py-2 rounded-xl border border-stone-100 text-[10px] font-bold text-stone-500 uppercase">
                    Total: {allReviews.length}
                 </div>
              </div>
              {allReviews.length === 0 ? <p className="text-center py-20 text-stone-300 italic">No feedback stories yet.</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                   {allReviews.map((r, i) => (
                      <div key={i} className="flex flex-col sm:flex-row gap-6 p-6 rounded-[2rem] bg-stone-50/50 border border-transparent hover:border-stone-100 hover:bg-white transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1">
                         <div className="w-full sm:w-24 h-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 shadow-md">
                            <img 
                              src={r.productImage} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                              alt="" 
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80'; }}
                            />
                         </div>
                         <div className="flex-1 flex flex-col justify-between">
                            <div>
                               <div className="flex justify-between items-start mb-2">
                                  <div>
                                     <p className="font-bold text-stone-900 group-hover:text-[#c24b10] transition-colors">{r.userName}</p>
                                     <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em] font-bold mt-0.5">{r.productName}</p>
                                  </div>
                                  <button onClick={() => handleDeleteReview(r.productId, r.id)} className="p-2 text-stone-200 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                               </div>
                               <div className="flex gap-1 mb-3">
                                  {[...Array(5)].map((_, starIdx) => <Star key={starIdx} size={10} className={starIdx < r.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'} />)}
                               </div>
                               <p className="text-sm text-stone-500 italic leading-relaxed">"{r.comment}"</p>
                            </div>
                            <p className="text-[8px] text-stone-300 mt-4 font-bold uppercase tracking-tight">{new Date(r.date).toLocaleString()}</p>
                         </div>
                      </div>
                   ))}
                </div>
              )}
           </div>
         ) :
         (
           <>
              {/* Analytics Summary */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                 {[
                   { label: 'Inventory Total', val: products.length, icon: Package, color: 'text-[#c24b10]' },
                   { label: 'Unchecked Feedback', val: allReviews.length, icon: MessageSquare, color: 'text-stone-900' },
                   { label: 'Pending Sales', val: orders.filter(o=>o.status==='Pending').length, icon: Clock, color: 'text-amber-500' },
                   { label: 'Total Earnings', val: `₹${orders.reduce((s,o)=>s+o.total,0).toLocaleString()}`, icon: TrendingUp, color: 'text-green-600' }
                 ].map((stat, i) => (
                   <div key={i} className="bg-white p-5 md:p-6 rounded-[2rem] shadow-sm border border-stone-100 hover:shadow-lg transition-all group">
                      <div className="flex justify-between items-center mb-3">
                         <stat.icon size={20} className="text-stone-300 group-hover:text-[#c24b10] transition-colors" />
                         <span className="text-[8px] font-bold uppercase tracking-widest text-stone-300">Live</span>
                      </div>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-stone-400 mb-1 font-bold">{stat.label}</p>
                      <p className={`text-xl md:text-3xl font-serif font-bold ${stat.color}`}>{stat.val}</p>
                   </div>
                 ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-2 gap-4">
                 <div>
                    <h2 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-tight">Visonary Collections</h2>
                    <p className="text-stone-400 text-xs md:text-sm mt-1 italic font-light">Designing the future of men's elegance</p>
                 </div>
                 <button onClick={openAdd} className="w-full sm:w-auto bg-[#c24b10] text-white px-8 py-5 rounded-[2rem] flex items-center gap-3 hover:bg-stone-800 transition-all font-bold tracking-[0.2em] uppercase text-[10px] shadow-2xl shadow-[#c24b10]/20 justify-center group">
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Product
                 </button>
              </div>

              {/* Responsive Cards for Mobile, Table for Desktop */}
              <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 overflow-hidden">
                 {/* Desktop View (Table) */}
                 <table className="w-full text-left hidden md:table">
                    <thead className="bg-[#FAF9F6] border-b border-stone-100 text-[10px] uppercase font-bold text-stone-400 tracking-widest">
                       <tr><th className="p-6">Design Architecture</th><th className="p-6">Market Status</th><th className="p-6">Voucher Hub</th><th className="p-6">Fiscal Value</th><th className="p-6 text-right">Moderation</th></tr>
                    </thead>
                    <tbody>
                       {products.map(p => (
                         <tr key={p._id || p.id} className="border-b border-stone-50 hover:bg-[#FAF9F6]/50 transition-colors group">
                            <td className="p-6 flex items-center gap-5">
                               <div className="relative">
                                  <img 
                                    src={p.image} 
                                    className="w-16 h-16 rounded-[1.2rem] object-cover shadow-md group-hover:scale-110 transition-transform duration-500" 
                                    alt="" 
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80'; }}
                                  />
                                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                               </div>
                               <div>
                                  <p className="font-bold text-stone-900 uppercase tracking-tight">{p.name}</p>
                                  <p className="text-[9px] text-stone-400 uppercase font-black tracking-widest mt-0.5">{p.category}</p>
                               </div>
                            </td>
                            <td className="p-6">
                               {p.badge === 'Bestseller' ? <span className="text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-tight border border-amber-100 shadow-sm shadow-amber-900/5">Bestseller ⭐</span> : 
                                p.noOffers ? <span className="text-red-400 text-[10px] font-bold uppercase tracking-tighter italic">Signature Piece</span> : 
                                <span className="text-stone-300 text-[9px] uppercase font-bold tracking-[0.3em]">Classical</span>}
                            </td>
                            <td className="p-6">
                               {p.applicableCoupon ? <span className="text-[#c24b10] bg-[#c24b10]/5 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-[#c24b10]/20 shadow-sm">{p.applicableCoupon}</span> : <span className="text-stone-200 text-[10px] italic font-medium">Standard Pricing</span>}
                            </td>
                            <td className="p-6 font-serif text-lg font-bold text-stone-900 italic">₹{p.price.toLocaleString()}</td>
                            <td className="p-6 text-right flex items-center justify-end gap-2">
                               <button onClick={() => openEdit(p)} className="p-4 text-stone-300 hover:text-[#c24b10] hover:bg-stone-50 rounded-2xl transition-all"><Pencil size={20} /></button>
                               <button onClick={() => deleteProduct(p._id || p.id)} className="p-4 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"><Trash2 size={20} /></button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>

                 {/* Mobile View (Cards) */}
                 <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                    {products.map(p => (
                      <div key={p._id || p.id} className="bg-[#FAF9F6]/50 p-4 rounded-3xl border border-stone-100 space-y-4">
                         <div className="flex items-center gap-4">
                            <img 
                              src={p.image} 
                              className="w-20 h-24 rounded-2xl object-cover shadow-lg" 
                              alt="" 
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80'; }}
                            />
                            <div className="flex-1">
                               <p className="text-[10px] text-[#c24b10] font-bold uppercase tracking-widest">{p.category}</p>
                               <h3 className="text-base font-serif font-bold text-stone-900">{p.name}</h3>
                               <p className="text-xl font-serif font-bold text-stone-900 mt-2">₹{p.price.toLocaleString()}</p>
                               <div className="mt-2 flex gap-2 flex-wrap">
                                  {p.badge && <span className="text-[8px] bg-amber-50 text-amber-600 px-2 py-1 rounded-lg border border-amber-100 font-bold uppercase">{p.badge}</span>}
                                  {p.applicableCoupon && <span className="text-[8px] bg-stone-900 text-white px-2 py-1 rounded-lg font-bold uppercase">{p.applicableCoupon}</span>}
                               </div>
                            </div>
                         </div>
                         <div className="flex gap-2 pt-2 border-t border-stone-200/50">
                            <button onClick={() => openEdit(p)} className="flex-1 bg-white border border-stone-200 text-stone-600 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                               <Pencil size={14} /> Edit
                            </button>
                            <button onClick={() => deleteProduct(p._id || p.id)} className="flex-1 bg-red-50 text-red-500 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                               <Trash2 size={14} /> Delete
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </>
         )
        }
      </div>
    </main>
  );
};

export default Admin;
