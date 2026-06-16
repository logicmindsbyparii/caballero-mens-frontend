import { useState } from 'react';
import { ShoppingBag, Eye, Star, Heart, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const ProductCard = ({ product }) => {
  const { addToCart, setQuickViewProduct, availableCoupons, wishlist, toggleWishlist } = useStore();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const productId = product._id || product.id;
  const isInWishlist = wishlist?.includes(productId);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const fallbackImg = `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80`;

  return (
    <div
      id={`product-${productId}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 cursor-pointer animate-fade-up"
      onClick={() => setQuickViewProduct(product)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-beige">
        <img
          src={imgError ? fallbackImg : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-4 left-4 text-[10px] tracking-widest uppercase px-3.5 py-1.5 rounded-full font-bold z-10 shadow-lg ${
            product.badge === 'Bestseller' ? 'bg-amber-400 text-black' : 'bg-stone-900 text-white'
          }`}>
            {product.badge === 'Bestseller' ? '⭐ Bestseller' : product.badge}
          </span>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-charcoal text-white text-[10px] font-medium px-2 py-1 rounded-full z-10">
            -{discount}%
          </span>
        )}

        {/* Offer Available Indicator (FIXED PHANTOM BADGE LABELS) */}
        {(() => {
          const isOfferDisabled = product.noOffers === true || product.noOffers === 'true';
          if (isOfferDisabled || !availableCoupons || availableCoupons.length === 0) return null;

          // Double check formatting to ensure it isn't an empty string or literal 'null' string text
          const hasAssignedCoupon = product.applicableCoupon && 
                                    product.applicableCoupon !== 'null' && 
                                    product.applicableCoupon !== 'undefined' && 
                                    product.applicableCoupon.trim() !== "";

          const specificCoupon = hasAssignedCoupon 
            ? availableCoupons.find(c => c.code.trim().toUpperCase() === product.applicableCoupon.trim().toUpperCase()) 
            : null;
          
          // Show specifically matching coupon card, or fallback to first generic coupon if no manual lock was set
          const displayCoupon = specificCoupon || (hasAssignedCoupon ? null : availableCoupons[0]);
          
          if (!displayCoupon) return null;

          return (
            <div className="absolute top-[40px] left-3 bg-stone-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex flex-col items-start gap-0 z-[15] animate-fade-in shadow-lg border border-stone-800 pointer-events-none">
              <div className="flex items-center gap-1">
                <Tag size={8} className="text-amber-400" /> 
                <span>USE {displayCoupon.code}</span>
              </div>
              <span className="text-[7px] opacity-90 border-t border-white/10 mt-0.5 pt-0.5 whitespace-nowrap">
                GET {displayCoupon.type === 'percentage' ? `${displayCoupon.discount}%` : `₹${displayCoupon.discount}`} OFF
              </span>
            </div>
          );
        })()}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(productId); }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-400 hover:scale-110 z-20"
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            className={`transition-colors duration-300 ${isInWishlist ? 'fill-rose-500 text-rose-500' : 'text-stone-800'}`}
          />
        </button>

        {/* Action Buttons – appear on hover */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-10">
          <button
            id={`add-to-cart-${productId}`}
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-lg flex items-center justify-center gap-1.5 ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-white text-charcoal hover:bg-brown hover:text-white'
            }`}
          >
            <ShoppingBag size={13} />
            {added ? 'Added!' : 'Add to Bag'}
          </button>
          <button
            id={`quick-view-${productId}`}
            onClick={handleQuickView}
            className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center text-charcoal hover:bg-brown hover:text-white transition-all duration-300"
            aria-label="Quick view"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Category */}
        <p className="text-brown text-[10px] tracking-widest uppercase font-medium mb-1">{product.category}</p>

        {/* Name */}
        <h3 className="font-serif text-charcoal text-base font-medium leading-snug mb-2 group-hover:text-brown transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(product.rating || 4) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted ml-1">({product.reviews || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg font-semibold text-charcoal">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
