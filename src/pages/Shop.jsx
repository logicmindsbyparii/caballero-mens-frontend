import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Most Popular', value: 'reviews' },
];

const Shop = () => {
  const { products, categories } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== 'All') list = list.filter((p) => p.category === selectedCategory);
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sort === 'reviews') list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    return list;
  }, [products, selectedCategory, search, sort, priceRange]);

  return (
    <main className="min-h-screen pt-20 bg-[#FAF9F6]">
      {/* Shop Header */}
      <section className="bg-white border-b border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-subtitle mb-2">Explore Our Range</p>
          <h1 className="section-title mb-2">Men's Collection</h1>
          <div className="luxury-divider" />
          <p className="text-muted text-sm mt-4">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="shop-search"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm border border-stone-200 rounded-xl bg-white focus:outline-none focus:border-[#8B4513] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 text-sm border border-stone-200 rounded-xl bg-white focus:outline-none focus:border-[#8B4513] transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>

          {/* Filter Toggle (mobile) */}
          <button
            id="filter-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-3 border border-beige rounded-xl bg-cream text-sm text-charcoal hover:border-brown transition-colors lg:hidden"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-60 shrink-0 transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xs tracking-widest uppercase font-semibold text-charcoal mb-4 pb-2 border-b border-beige">
                Category
              </h3>
              <div className="space-y-1">
                {['All', ...categories].map((cat) => (
                  <button
                    key={cat}
                    id={`filter-cat-${cat.toLowerCase().replace(' ', '-')}`}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-charcoal text-white font-medium'
                        : 'text-muted hover:bg-beige hover:text-charcoal'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="text-xs tracking-widest uppercase font-semibold text-charcoal mb-4 pb-2 border-b border-beige">
                Price Range
              </h3>
              <div className="px-1">
                <input
                  id="price-range"
                  type="range"
                  min={0}
                  max={15000}
                  step={100}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-brown cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted mt-2">
                  <span>₹0</span>
                  <span className="text-brown font-medium">Up to ₹{priceRange[1].toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              id="clear-filters"
              onClick={() => { setSelectedCategory('All'); setSearch(''); setPriceRange([0, 15000]); setSearchParams({}); }}
              className="w-full py-2 text-xs tracking-widest uppercase text-muted border border-beige rounded-lg hover:border-brown hover:text-brown transition-all duration-300"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Category Pills (mobile-friendly) */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 lg:hidden">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium border transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-charcoal text-white border-charcoal'
                      : 'bg-white text-charcoal border-beige hover:border-brown'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product) => {
                  const cardId = product._id || product.id;
                  return <ProductCard key={cardId} product={product} />;
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-brown" />
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">No products found</h3>
                <p className="text-muted text-sm">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
