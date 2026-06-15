import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { products, wishlist } = useStore();
  
  const wishlistProducts = products.filter(p => wishlist.includes(p.id || p._id));

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12 animate-fade-in text-center">
          <Heart size={40} className="text-rose-500 mb-4 fill-rose-500/20" />
          <h1 className="text-4xl font-serif text-stone-900 mb-4 tracking-tight">Your Wishlist</h1>
          <div className="h-0.5 w-16 bg-brown rounded-full mb-4" />
          <p className="text-stone-500 max-w-lg">
            A curated list of your favorite premium selections. Save them for the perfect moment.
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-up">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-stone-100 animate-fade-in">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-stone-300" />
            </div>
            <h2 className="text-xl font-serif text-stone-800 mb-2">Your wishlist is empty</h2>
            <p className="text-stone-400 text-sm mb-8">Start exploring our collection to find something you love.</p>
            <Link 
              to="/shop" 
              className="px-8 py-3 bg-stone-900 text-white text-xs tracking-widest uppercase font-bold rounded-full hover:bg-[#c24b10] transition-all shadow-lg hover:shadow-brown/20"
            >
              Explore Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
