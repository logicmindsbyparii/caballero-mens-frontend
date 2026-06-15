import { useEffect, useState } from 'react';
import { X, ShoppingBag, Star, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, submitReview, user } = useStore();
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState('desc'); // 'desc' | 'reviews'
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '', userName: user?.name || '' });
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize('M');
      setQty(1);
      setActiveTab('desc');
      setAdded(false);
      setImgError(false);
      setReviewForm({ rating: 5, comment: '', userName: user?.name || '' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => { setAdded(false); }, 2000);
  };

  const fallbackImg = `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Product Quick View"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl animate-fade-up">
        {/* Close Button */}
        <button
          id="quick-view-close"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center hover:bg-[#c24b10] transition-colors duration-300"
        >
          <X size={14} />
        </button>

        {/* Image */}
        <div className="md:w-5/12 bg-stone-50 aspect-square md:aspect-auto relative shrink-0 overflow-hidden">
          <img
            src={imgError ? fallbackImg : product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-[#c24b10] text-white text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-medium shadow-lg">
              {product.badge}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c24b10] font-bold mb-2">{product.category}</p>
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900 font-semibold mb-3 leading-tight">
            {product.name}
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
                />
              ))}
            </div>
            <span className="text-sm text-stone-400 font-medium">{product.rating} · {product.reviews} reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-5">
            <span className="font-serif text-2xl font-bold text-stone-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-base text-stone-300 line-through font-light">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-bold">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-stone-100 mb-6">
            <button 
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-xs tracking-widest uppercase font-bold transition-all relative ${activeTab === 'desc' ? 'text-stone-900' : 'text-stone-300'}`}
            >
              Description
              {activeTab === 'desc' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#c24b10]" />}
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs tracking-widest uppercase font-bold transition-all relative ${activeTab === 'reviews' ? 'text-stone-900' : 'text-stone-300'}`}
            >
              Reviews ({product.reviews || 0})
              {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#c24b10]" />}
            </button>
          </div>

          {activeTab === 'desc' ? (
            <div className="animate-fade-in">
              <p className="text-stone-500 text-sm leading-relaxed mb-6 font-light">
                {product.description || 'No description available for this premium selection.'}
              </p>
              
              {/* Size */}
              <div className="mb-5">
                <p className="text-[10px] tracking-widest uppercase font-bold text-stone-400 mb-3">Size Selection</p>
                <div className="flex gap-2 flex-wrap">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-full text-xs font-bold border transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-stone-900 text-white border-stone-900 shadow-lg scale-110'
                          : 'bg-white text-stone-400 border-stone-100 hover:border-[#c24b10] hover:text-[#c24b10]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-6 mb-8 mt-6">
                <p className="text-[10px] tracking-widest uppercase font-bold text-stone-400">Quantity</p>
                <div className="flex items-center bg-stone-50 rounded-full p-1 border border-stone-100">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-stone-900">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-5 flex items-center justify-center gap-3 text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-400 rounded-full shadow-xl ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-stone-900 text-white hover:bg-[#c24b10] hover:-translate-y-1'
                }`}
              >
                <ShoppingBag size={18} />
                {added ? 'Successfully Added!' : 'Add to Shopping Bag'}
              </button>
            </div>
          ) : (
            <div className="animate-fade-in pb-4">
              {/* Review Form */}
              <div className="bg-stone-50 rounded-3xl p-6 mb-6 border border-stone-100 shadow-inner">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-4 text-center">Share Your Feedback</h4>
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button key={num} onClick={() => setReviewForm({...reviewForm, rating: num})} className="transform hover:scale-125 transition-transform">
                      <Star size={20} className={`${num <= reviewForm.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} />
                    </button>
                  ))}
                </div>
                <input 
                  placeholder="Your Name" 
                  className="w-full bg-white border border-stone-100 p-4 rounded-2xl text-xs mb-3 outline-none focus:border-[#c24b10] shadow-sm transition-all"
                  value={reviewForm.userName}
                  onChange={(e) => setReviewForm({...reviewForm, userName: e.target.value})}
                />
                <textarea 
                  placeholder="Share your experience with this design..." 
                  className="w-full bg-white border border-stone-100 p-4 rounded-2xl text-xs mb-4 outline-none focus:border-[#c24b10] h-24 resize-none shadow-sm transition-all"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                />
                <button 
                  onClick={async () => {
                    if (!reviewForm.comment.trim()) return alert('Please enter a comment');
                    setReviewLoading(true);
                    const res = await submitReview(product.id || product._id, reviewForm);
                    setReviewLoading(false);
                    if (res.success) {
                      setReviewForm({ rating: 5, comment: '', userName: user?.name || '' });
                      alert('Review submitted successfully!');
                    }
                  }}
                  disabled={reviewLoading}
                  className="w-full bg-stone-900 text-white py-4 rounded-2xl text-[10px] tracking-widest uppercase font-bold hover:bg-[#c24b10] transition-all disabled:opacity-50 shadow-lg"
                >
                  {reviewLoading ? 'Publishing...' : 'Post Experience'}
                </button>
              </div>

              {/* Review List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {(product.reviewList || []).length > 0 ? (
                  product.reviewList.map(r => (
                    <div key={r.id} className="bg-white p-4 rounded-2xl border border-stone-50 shadow-sm transition-all hover:border-stone-100">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-bold text-stone-900 uppercase tracking-tight">{r.userName}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={`${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-100'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-relaxed italic font-light">"{r.comment}"</p>
                      <div className="flex justify-between items-center mt-3">
                         <span className="text-[9px] text-stone-300 font-bold uppercase tracking-tighter">{new Date(r.date).toLocaleDateString()}</span>
                         <span className="text-[8px] bg-stone-50 text-stone-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">Verified Feedback</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                     <Star size={24} className="mx-auto mb-2 text-stone-100" />
                     <p className="text-stone-300 text-[11px] uppercase tracking-widest font-bold">No feedback yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
