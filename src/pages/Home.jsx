// import { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, ChevronDown, Award, Truck, RefreshCw, Headphones } from 'lucide-react';
// import { useStore } from '../context/StoreContext';
// import ProductCard from '../components/ProductCard';

// // ── Category images & icons ───────────────────────────────────────────────
// const CATEGORIES = [
//   {
//     name: 'Formal Pants',
//     image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
//     desc: 'Polished & Professional',
//   },
//   {
//     name: 'Tshirt',
//     displayName: 'T-Shirts',
//     image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
//     desc: 'Casual Comfort',
//   },
//   {
//     name: 'Shirt',
//     displayName: 'Shirts',
//     image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
//     desc: 'Classic Elegance',
//   },
//   {
//     name: 'Blazers',
//     image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
//     desc: 'Tailored Perfection',
//   },
//   {
//     name: 'Kurta',
//     displayName: 'Kurtas',
//     image: 'https://images.unsplash.com/photo-1626370799739-4d027f6b0bbd?w=800&q=80',
//     desc: 'Heritage & Culture',
//   },
//   {
//     name: 'Track Pants',
//     image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
//     desc: 'Active Lifestyle',
//   },
// ];

// const FEATURES = [
//   { Icon: Award, title: 'Premium Quality', desc: 'Handpicked fabrics and expert craftsmanship.' },
//   { Icon: Truck, title: 'Free Shipping', desc: 'Complimentary delivery on orders above ₹1,999.' },
//   { Icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free return policy.' },
//   { Icon: Headphones, title: '24/7 Support', desc: 'Dedicated style consultants always available.' },
// ];

// // ── Fade-in hook ──────────────────────────────────────────────────────────────
// const useFadeIn = () => {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
//       { threshold: 0.15 }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);

//   return [ref, visible];
// };

// // ─────────────────────────────────────────────────────────────────────────────
// const Home = () => {
//   const { products } = useStore();
//   const featuredProducts = products.slice(0, 8);

//   const [heroRef, heroVisible] = useFadeIn();
//   const [catRef, catVisible] = useFadeIn();
//   const [featRef, featVisible] = useFadeIn();
//   const [featuresRef, featuresVisible] = useFadeIn();

//   return (
//     <main className="min-h-screen">
//       {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
//       <section
//         id="hero"
//         className="relative min-h-screen flex items-center justify-center overflow-hidden"
//         style={{
//           background: 'linear-gradient(135deg, #2C2C2C 0%, #3d3d3d 50%, #1a1a1a 100%)',
//         }}
//       >
//         {/* Background image with overlay */}
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1600&q=80"
//             alt="Hero background"
//             className="w-full h-full object-cover opacity-30"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
//         </div>

//         {/* Hero Content */}
//         <div
//           ref={heroRef}
//           className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${
//             heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           <p className="section-subtitle text-brown mb-4 tracking-[0.4em]">SINCE 2010 · SURAT, INDIA</p>
//           <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-none mb-4 text-shadow">
//             The Modern
//             <br />
//             <span className="text-beige italic">Gentleman</span>
//           </h1>
//           <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light">
//             Curated menswear that blends timeless elegance with contemporary style.
//             Wear your confidence.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Link
//               to="/shop"
//               id="hero-shop-btn"
//               className="btn-primary px-10 py-4 text-sm flex items-center gap-2 group"
//               style={{ backgroundColor: '#c24b10', border: 'none' }}
//             >
//               Explore Collection
//               <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               to="/about"
//               id="hero-about-btn"
//               className="px-10 py-4 text-sm tracking-widest uppercase font-medium border border-white/40 text-white hover:border-white hover:bg-white/10 transition-all duration-300"
//             >
//               Our Story
//             </Link>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
//           <span className="text-[10px] tracking-widest uppercase">Scroll</span>
//           <ChevronDown size={16} />
//         </div>
//       </section>

//       {/* ── FEATURES STRIP ───────────────────────────────────────────────── */}
//       <section className="bg-[#FAF9F6] border-y border-stone-200 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {FEATURES.map(({ Icon, title, desc }) => (
//               <div key={title} className="flex items-start gap-3">
//                 <div className="w-9 h-9 rounded-full bg-[#c24b10]/10 flex items-center justify-center shrink-0">
//                   <Icon size={16} className="text-[#c24b10]" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-stone-800 text-sm">{title}</p>
//                   <p className="text-stone-500 text-xs leading-relaxed hidden sm:block">{desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CATEGORY GRID ────────────────────────────────────────────────── */}
//       <section id="categories" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-14" ref={catRef}>
//             <p className={`section-subtitle mb-3 transition-all duration-700 ${catVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
//               Browse by Style
//             </p>
//             <h2 className={`section-title transition-all duration-700 delay-150 ${catVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
//               Our Collections
//             </h2>
//             <div className="luxury-divider" />
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
//             {CATEGORIES.map((cat, i) => (
//               <Link
//                 to={`/shop?category=${encodeURIComponent(cat.name)}`}
//                 key={cat.name}
//                 id={`category-${cat.name.toLowerCase().replace(' ', '-')}`}
//                 className={`group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer block transition-all duration-700 ${
//                   catVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                 }`}
//                 style={{ transitionDelay: `${i * 80}ms` }}
//               >
//                 <img
//                   src={cat.image}
//                   alt={cat.displayName || cat.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
//                 <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
//                   <p className="text-[10px] tracking-widest uppercase text-white/70 mb-1">{cat.desc}</p>
//                   <h3 className="font-serif text-xl font-semibold">{cat.displayName || cat.name}</h3>
//                   <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <span className="text-xs tracking-wider">Shop Now</span>
//                     <ArrowRight size={12} />
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
//       <section id="featured" className="py-20 bg-[#FAF9F6] border-t border-stone-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-14" ref={featRef}>
//             <p className={`section-subtitle mb-3 transition-all duration-700 ${featVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
//               Handpicked for You
//             </p>
//             <h2 className={`section-title transition-all duration-700 delay-150 ${featVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
//               Featured Products
//             </h2>
//             <div className="luxury-divider" />
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {featuredProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <Link to="/shop" id="view-all-btn" className="btn-outline inline-flex items-center gap-2 group">
//               View All Products
//               <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ── BRAND PROMISE BANNER ──────────────────────────────────────────── */}
//       <section
//         ref={featuresRef}
//         className="relative py-24 overflow-hidden"
//         style={{ background: 'linear-gradient(135deg, #c24b10 0%, #c24b10 100%)' }}
//       >
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
//           <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 translate-y-1/3" />
//         </div>
//         <div className={`relative z-10 text-center max-w-3xl mx-auto px-4 transition-all duration-1000 ${
//           featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//         }`}>
//           <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-4">Caballero Promise</p>
//           <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-6 leading-tight">
//             "Dress Well. Live Well."
//           </h2>
//           <p className="text-white/75 text-base leading-relaxed mb-8">
//             Every piece in our collection is designed to make you look and feel your absolute best.
//             From boardroom to casual outings — we've got you covered.
//           </p>
//           <Link
//             to="/shop"
//             id="banner-shop-btn"
//             className="inline-flex items-center gap-2 bg-white text-brown px-8 py-3.5 text-sm tracking-widest uppercase font-medium hover:bg-cream transition-colors duration-300 rounded-none group"
//           >
//             Shop the Collection
//             <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Home;


// import { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, ChevronDown, Award, Truck, RefreshCw, Headphones } from 'lucide-react';
// import { useStore } from '../context/StoreContext';
// import ProductCard from '../components/ProductCard';

// // ── Category images & icons ───────────────────────────────────────────────
// const CATEGORIES = [
//   {
//     name: 'Formal Pants',
//     image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
//     desc: 'Polished & Professional',
//   },
//   {
//     name: 'Tshirt',
//     displayName: 'T-Shirts',
//     image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
//     desc: 'Casual Comfort',
//   },
//   {
//     name: 'Shirt',
//     displayName: 'Shirts',
//     image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
//     desc: 'Classic Elegance',
//   },
//   {
//     name: 'Blazers',
//     image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
//     desc: 'Tailored Perfection',
//   },
//   {
//     name: 'Kurta',
//     displayName: 'Kurtas',
//     image: 'https://images.unsplash.com/photo-1626370799739-4d027f6b0bbd?w=800&q=80',
//     desc: 'Heritage & Culture',
//   },
//   {
//     name: 'Track Pants',
//     image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
//     desc: 'Active Lifestyle',
//   },
// ];

// const FEATURES = [
//   { Icon: Award, title: 'Premium Quality', desc: 'Handpicked fabrics and expert craftsmanship.' },
//   { Icon: Truck, title: 'Free Shipping', desc: 'Complimentary delivery on orders above ₹1,999.' },
//   { Icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free return policy.' },
//   { Icon: Headphones, title: '24/7 Support', desc: 'Dedicated style consultants always available.' },
// ];

// // ── Fade-in hook ──────────────────────────────────────────────────────────────
// const useFadeIn = () => {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
//       { threshold: 0.15 }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);

//   return [ref, visible];
// };

// // ─────────────────────────────────────────────────────────────────────────────
// const Home = () => {
//   const { products } = useStore();
//   const featuredProducts = products.slice(0, 8);

//   const [heroRef, heroVisible] = useFadeIn();
//   const [catRef, catVisible] = useFadeIn();
//   const [featRef, featVisible] = useFadeIn();
//   const [featuresRef, featuresVisible] = useFadeIn();

//   return (
//     <main className="min-h-screen">
//       {/* ── HERO SECTION – LUXURY GRADIENT + ORGANIC SHAPES ─────────────────── */}
//       <section
//         id="hero"
//         className="relative min-h-screen flex items-center justify-center overflow-hidden"
//         style={{
//           background: 'radial-gradient(ellipse at 30% 40%, #F5F0E8 0%, #E8DCCC 50%, #D4C4A8 100%)',
//         }}
//       >
//         {/* Abstract floating shapes for depth */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl animate-pulse" />
//           <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-brown/10 blur-3xl animate-pulse delay-1000" />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/30 rounded-full" />
//           <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-cream/40 blur-2xl" />
//           {/* Subtle texture overlay */}
//           <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%20opacity%3D%220.03%22%2F%3E%3C%2Fsvg%3E')] opacity-20" />
//         </div>

//         {/* Hero Content */}
//         <div
//           ref={heroRef}
//           className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${
//             heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           <p className="text-brown/80 tracking-[0.4em] text-sm mb-4 font-medium">SINCE 2010 · SURAT, INDIA</p>
//           <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal font-bold leading-none mb-4">
//             The Modern
//             <br />
//             <span className="text-brown italic">Gentleman</span>
//           </h1>
//           <p className="text-charcoal/70 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light">
//             Curated menswear that blends timeless elegance with contemporary style.
//             Wear your confidence.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Link
//               to="/shop"
//               id="hero-shop-btn"
//               className="bg-charcoal text-cream px-10 py-4 text-sm flex items-center gap-2 group hover:bg-brown transition-all duration-300 rounded-full"
//             >
//               Explore Collection
//               <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               to="/about"
//               id="hero-about-btn"
//               className="px-10 py-4 text-sm tracking-widest uppercase font-medium border border-charcoal/30 text-charcoal hover:border-brown hover:text-brown transition-all duration-300 rounded-full"
//             >
//               Our Story
//             </Link>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-brown/60 animate-bounce">
//           <span className="text-[10px] tracking-widest uppercase">Scroll</span>
//           <ChevronDown size={16} />
//         </div>
//       </section>

//       {/* ── FEATURES STRIP ───────────────────────────────────────────────── */}
//       <section className="bg-cream border-y border-beige py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {FEATURES.map(({ Icon, title, desc }) => (
//               <div key={title} className="flex items-start gap-3">
//                 <div className="w-9 h-9 rounded-full bg-brown/10 flex items-center justify-center shrink-0">
//                   <Icon size={16} className="text-brown" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-charcoal text-sm">{title}</p>
//                   <p className="text-charcoal/60 text-xs leading-relaxed hidden sm:block">{desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CATEGORY GRID ────────────────────────────────────────────────── */}
//       <section id="categories" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-14" ref={catRef}>
//             <p className={`text-brown/70 text-xs tracking-[0.3em] uppercase mb-3 transition-all duration-700 ${catVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
//               Browse by Style
//             </p>
//             <h2 className={`font-serif text-3xl md:text-4xl text-charcoal font-light mb-4 transition-all duration-700 delay-150 ${catVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
//               Our Collections
//             </h2>
//             <div className="w-16 h-px bg-brown/30 mx-auto" />
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
//             {CATEGORIES.map((cat, i) => (
//               <Link
//                 to={`/shop?category=${encodeURIComponent(cat.name)}`}
//                 key={cat.name}
//                 id={`category-${cat.name.toLowerCase().replace(' ', '-')}`}
//                 className={`group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer block transition-all duration-700 ${
//                   catVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                 }`}
//                 style={{ transitionDelay: `${i * 80}ms` }}
//               >
//                 <img
//                   src={cat.image}
//                   alt={cat.displayName || cat.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//                 <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
//                   <p className="text-[10px] tracking-widest uppercase text-white/70 mb-1">{cat.desc}</p>
//                   <h3 className="font-serif text-xl font-semibold">{cat.displayName || cat.name}</h3>
//                   <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <span className="text-xs tracking-wider">Shop Now</span>
//                     <ArrowRight size={12} />
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
//       <section id="featured" className="py-20 bg-cream border-t border-beige">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-14" ref={featRef}>
//             <p className={`text-brown/70 text-xs tracking-[0.3em] uppercase mb-3 transition-all duration-700 ${featVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
//               Handpicked for You
//             </p>
//             <h2 className={`font-serif text-3xl md:text-4xl text-charcoal font-light mb-4 transition-all duration-700 delay-150 ${featVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
//               Featured Products
//             </h2>
//             <div className="w-16 h-px bg-brown/30 mx-auto" />
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {featuredProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <Link to="/shop" id="view-all-btn" className="inline-flex items-center gap-2 border border-charcoal/30 text-charcoal px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium hover:border-brown hover:text-brown transition-all duration-300 group">
//               View All Products
//               <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ── BRAND PROMISE BANNER – Elegant Brown ──────────────────────────── */}
//       <section
//         ref={featuresRef}
//         className="relative py-24 overflow-hidden bg-brown"
//       >
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-cream -translate-x-1/2 -translate-y-1/2" />
//           <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cream translate-x-1/3 translate-y-1/3" />
//         </div>
//         <div className={`relative z-10 text-center max-w-3xl mx-auto px-4 transition-all duration-1000 ${
//           featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//         }`}>
//           <p className="text-cream/60 text-xs tracking-[0.4em] uppercase mb-4">Caballero Promise</p>
//           <h2 className="font-serif text-3xl md:text-5xl text-cream font-bold mb-6 leading-tight">
//             "Dress Well. Live Well."
//           </h2>
//           <p className="text-cream/80 text-base leading-relaxed mb-8">
//             Every piece in our collection is designed to make you look and feel your absolute best.
//             From boardroom to casual outings — we've got you covered.
//           </p>
//           <Link
//             to="/shop"
//             id="banner-shop-btn"
//             className="inline-flex items-center gap-2 bg-cream text-brown px-8 py-3.5 text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors duration-300 rounded-full group"
//           >
//             Shop the Collection
//             <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Home;

// import { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, ChevronDown, Award, Truck, RefreshCw, Headphones, Sparkles, Eye } from 'lucide-react';
// import { useStore } from '../context/StoreContext';
// import ProductCard from '../components/ProductCard';

// // Category data (high-res images)
// const CATEGORIES = [
//   { name: 'Formal Pants', slug: 'formal-pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', desc: 'Polished & Professional', tag: 'Office Essential' },
//   { name: 'Tshirt', slug: 'tshirt', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', desc: 'Casual Comfort', tag: 'Everyday Wear' },
//   { name: 'Shirt', slug: 'shirt', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', desc: 'Classic Elegance', tag: 'Timeless' },
//   { name: 'Blazers', slug: 'blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', desc: 'Tailored Perfection', tag: 'Signature' },
//   { name: 'Kurta', slug: 'kurta', image: 'https://images.unsplash.com/photo-1626370799739-4d027f6b0bbd?w=800&q=80', desc: 'Heritage & Culture', tag: 'Festive' },
//   { name: 'Track Pants', slug: 'track-pants', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80', desc: 'Active Lifestyle', tag: 'Performance' },
// ];

// const FEATURES = [
//   { Icon: Award, title: 'Premium Quality', desc: 'Handpicked fabrics & expert craftsmanship' },
//   { Icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹1,999' },
//   { Icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free policy' },
//   { Icon: Headphones, title: '24/7 Support', desc: 'Dedicated style consultants' },
// ];

// // Fade-in hook
// const useFadeIn = (threshold = 0.2) => {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [threshold]);
//   return [ref, visible];
// };

// const Home = () => {
//   const { products } = useStore();
//   const featuredProducts = products.slice(0, 8);
//   const [heroRef, heroVisible] = useFadeIn(0.1);
//   const [catRef, catVisible] = useFadeIn();
//   const [featRef, featVisible] = useFadeIn();

//   // Video URL (free Pexels fashion video – elegant model walking in suit)
//   const videoUrl = 'https://player.vimeo.com/external/420766849.sd.mp4?s=9b6f5a2c0c0b5e7f3d8e9f0a1b2c3d4e5f6a7b8c&profile_id=164&oauth2_token_id=57447761';
//   // Fallback: a reliable fashion video from Pexels (CDN)
//   const fallbackVideo = 'https://cdn.pixabay.com/video/2022/03/20/112093-696598405_large.mp4';

//   return (
//     <main className="min-h-screen bg-cream">
//       {/* ========== HERO WITH VIDEO BACKGROUND ========== */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Video Background */}
//         <div className="absolute inset-0 w-full h-full">
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full object-cover"
//             poster="https://images.unsplash.com/photo-1534126511673-b6899657816a?w=1600&q=80"
//           >
//             <source src={videoUrl} type="video/mp4" />
//             {/* Fallback video (Pixabay – safe) */}
//             <source src={fallbackVideo} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           {/* Dark overlay for better text contrast */}
//           <div className="absolute inset-0 bg-black/50" />
//         </div>

//         {/* Abstract glowing orbs (optional, adds depth) */}
//         <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] animate-pulse pointer-events-none" />
//         <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-brown/20 blur-[100px] animate-pulse delay-700 pointer-events-none" />

//         {/* Hero content */}
//         <div
//           ref={heroRef}
//           className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${
//             heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//           }`}
//         >
//           <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
//             <p className="text-amber-400 text-[11px] tracking-[0.3em] uppercase font-medium">Since 2010 · Surat, India</p>
//           </div>
//           <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-bold leading-[1.1] tracking-tight">
//             The Modern<br />
//             <span className="text-amber-400 italic">Gentleman</span>
//           </h1>
//           <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto my-6 leading-relaxed font-light">
//             Curated menswear that blends timeless elegance with contemporary style.<br />
//             Wear your confidence.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-5 justify-center">
//             <Link
//               to="/shop"
//               className="group bg-amber-500 text-black px-8 py-4 rounded-full flex items-center gap-2 text-sm font-semibold tracking-wide hover:bg-amber-400 transition-all shadow-xl hover:shadow-amber-500/20 hover:scale-105"
//             >
//               Explore Collection
//               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               to="/about"
//               className="border border-white/30 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition-all"
//             >
//               Our Story
//             </Link>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce z-10">
//           <ChevronDown size={20} />
//         </div>
//       </section>

//       {/* ========== LIMITED OFFER STRIP ========== */}
//       {/* <div className="bg-amber-500 text-black py-3 text-center text-xs tracking-[0.2em] uppercase font-semibold">
//         🎁 Limited Time: Use code <span className="bg-black/20 px-2 py-0.5 rounded">WELCOME20</span> for 20% off your first order
//       </div> */}

//       {/* ========== FEATURES / TRUST BADGES ========== */}
//       <section className="bg-white border-b border-gray-100 py-8">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
//           {FEATURES.map(({ Icon, title, desc }) => (
//             <div key={title} className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
//                 <Icon size={18} className="text-amber-600" />
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800 text-sm">{title}</p>
//                 <p className="text-gray-500 text-xs hidden sm:block">{desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ========== CATEGORY GRID – LUXURY CARDS ========== */}
//       <section ref={catRef} className="py-20 bg-cream">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-2 font-semibold">Shop by Category</p>
//             <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-light">Our Collections</h2>
//             <div className="w-20 h-px bg-amber-400 mx-auto mt-4" />
//           </div>
//           <div
//             className={`grid grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-700 ${
//               catVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//             }`}
//           >
//             {CATEGORIES.map((cat) => (
//               <Link
//                 key={cat.name}
//                 to={`/shop?category=${encodeURIComponent(cat.name)}`}
//                 className="group relative overflow-hidden rounded-2xl aspect-[4/5] block shadow-lg hover:shadow-2xl transition-all duration-500"
//               >
//                 <img
//                   src={cat.image}
//                   alt={cat.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
//                 <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
//                   <p className="text-amber-400 text-[10px] tracking-wider uppercase font-bold">{cat.tag}</p>
//                   <h3 className="font-serif text-2xl font-bold">{cat.displayName || cat.name}</h3>
//                   <p className="text-white/70 text-sm mt-1">{cat.desc}</p>
//                   <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <span className="text-xs font-medium">Shop Now</span>
//                     <ArrowRight size={12} />
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ========== FEATURED PRODUCTS ========== */}
//       <section ref={featRef} className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-2 font-semibold">Handpicked for You</p>
//             <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-light">Featured Products</h2>
//             <div className="w-20 h-px bg-amber-400 mx-auto mt-4" />
//           </div>
//           <div
//             className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
//               featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//             }`}
//           >
//             {featuredProducts.map((product) => (
//               <div key={product.id} className="group relative">
//                 <ProductCard product={product} />
//                 <button
//                   className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-500 hover:text-white"
//                   aria-label="Quick view"
//                 >
//                   <Eye size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-12">
//             <Link
//               to="/shop"
//               className="inline-flex items-center gap-2 border border-gray-300 px-8 py-3 rounded-full text-sm font-medium hover:border-amber-500 hover:text-amber-500 transition-all"
//             >
//               View All Products <ArrowRight size={14} />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ========== BRAND PROMISE BANNER (static image for contrast) ========== */}
//       <section className="relative py-28 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534126511673-b6899657816a?w=1600&q=80')" }}>
//         <div className="absolute inset-0 bg-black/60" />
//         <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
//           <Sparkles className="mx-auto mb-4 text-amber-400" size={36} />
//           <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4">"Dress Well. Live Well."</h2>
//           <p className="text-white/80 text-lg mb-8">
//             Every piece in our collection is designed to make you look and feel your absolute best.
//             From boardroom to casual outings — we've got you covered.
//           </p>
//           <Link
//             to="/shop"
//             className="inline-flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-amber-400 transition-all shadow-xl"
//           >
//             Shop the Collection <ArrowRight size={16} />
//           </Link>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Home;

// import { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, ChevronDown, Award, Truck, RefreshCw, Headphones, Sparkles, Eye } from 'lucide-react';
// import { useStore } from '../context/StoreContext';
// import ProductCard from '../components/ProductCard';

// // Category data
// const CATEGORIES = [
//   { name: 'Formal Pants', slug: 'formal-pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', desc: 'Polished & Professional', tag: 'Office Essential' },
//   { name: 'Tshirt', slug: 'tshirt', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', desc: 'Casual Comfort', tag: 'Everyday Wear' },
//   { name: 'Shirt', slug: 'shirt', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', desc: 'Classic Elegance', tag: 'Timeless' },
//   { name: 'Blazers', slug: 'blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', desc: 'Tailored Perfection', tag: 'Signature' },
//   { name: 'Kurta', slug: 'kurta', image: 'https://images.unsplash.com/photo-1626370799739-4d027f6b0bbd?w=800&q=80', desc: 'Heritage & Culture', tag: 'Festive' },
//   { name: 'Track Pants', slug: 'track-pants', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80', desc: 'Active Lifestyle', tag: 'Performance' },
// ];

// const FEATURES = [
//   { Icon: Award, title: 'Premium Quality', desc: 'Handpicked fabrics & expert craftsmanship' },
//   { Icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹1,999' },
//   { Icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free policy' },
//   { Icon: Headphones, title: '24/7 Support', desc: 'Dedicated style consultants' },
// ];

// // Fade-in hook
// const useFadeIn = (threshold = 0.2) => {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [threshold]);
//   return [ref, visible];
// };

// const Home = () => {
//   const { products } = useStore();
//   // Ensure products is an array
//   const featuredProducts = Array.isArray(products) ? products.slice(0, 8) : [];
//   const [heroRef, heroVisible] = useFadeIn(0.1);
//   const [catRef, catVisible] = useFadeIn();
//   const [featRef, featVisible] = useFadeIn();

//   return (
//     <main className="min-h-screen bg-cream">
//       {/* ========== HERO WITH VIDEO BACKGROUND ========== */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Video Background - Guaranteed working URL */}
//         <div className="absolute inset-0 w-full h-full">
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full object-cover"
//             poster="https://images.unsplash.com/photo-1534126511673-b6899657816a?w=1600&q=80"
//           >
//             <source src="https://cdn.pixabay.com/video/2022/03/20/112093-696598405_large.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           {/* Dark overlay for text contrast */}
//           <div className="absolute inset-0 bg-black/50" />
//         </div>

//         {/* Abstract glowing orbs (adds depth) */}
//         <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] animate-pulse pointer-events-none" />
//         <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-brown/20 blur-[100px] animate-pulse delay-700 pointer-events-none" />

//         {/* Hero content */}
//         <div
//           ref={heroRef}
//           className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${
//             heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//           }`}
//         >
//           <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
//             <p className="text-amber-400 text-[11px] tracking-[0.3em] uppercase font-medium">Since 2010 · Surat, India</p>
//           </div>
//           <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-bold leading-[1.1] tracking-tight">
//             The Modern<br />
//             <span className="text-amber-400 italic">Gentleman</span>
//           </h1>
//           <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto my-6 leading-relaxed font-light">
//             Curated menswear that blends timeless elegance with contemporary style.<br />
//             Wear your confidence.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-5 justify-center">
//             <Link
//               to="/shop"
//               className="group bg-amber-500 text-black px-8 py-4 rounded-full flex items-center gap-2 text-sm font-semibold tracking-wide hover:bg-amber-400 transition-all shadow-xl hover:shadow-amber-500/20 hover:scale-105"
//             >
//               Explore Collection
//               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               to="/about"
//               className="border border-white/30 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition-all"
//             >
//               Our Story
//             </Link>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce z-10">
//           <ChevronDown size={20} />
//         </div>
//       </section>

//       {/* ========== LIMITED OFFER STRIP ========== */}
//       {/* <div className="bg-amber-500 text-black py-3 text-center text-xs tracking-[0.2em] uppercase font-semibold">
//         🎁 Limited Time: Use code <span className="bg-black/20 px-2 py-0.5 rounded">WELCOME20</span> for 20% off your first order
//       </div> */}

//       {/* ========== FEATURES ========== */}
//       <section className="bg-white border-b border-gray-100 py-8">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
//           {FEATURES.map(({ Icon, title, desc }) => (
//             <div key={title} className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
//                 <Icon size={18} className="text-amber-600" />
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800 text-sm">{title}</p>
//                 <p className="text-gray-500 text-xs hidden sm:block">{desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ========== CATEGORY GRID ========== */}
//       <section ref={catRef} className="py-20 bg-cream">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-2 font-semibold">Shop by Category</p>
//             <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-light">Our Collections</h2>
//             <div className="w-20 h-px bg-amber-400 mx-auto mt-4" />
//           </div>
//           <div
//             className={`grid grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-700 ${
//               catVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//             }`}
//           >
//             {CATEGORIES.map((cat) => (
//               <Link
//                 key={cat.name}
//                 to={`/shop?category=${encodeURIComponent(cat.name)}`}
//                 className="group relative overflow-hidden rounded-2xl aspect-[4/5] block shadow-lg hover:shadow-2xl transition-all duration-500"
//               >
//                 <img
//                   src={cat.image}
//                   alt={cat.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
//                 <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
//                   <p className="text-amber-400 text-[10px] tracking-wider uppercase font-bold">{cat.tag}</p>
//                   <h3 className="font-serif text-2xl font-bold">{cat.displayName || cat.name}</h3>
//                   <p className="text-white/70 text-sm mt-1">{cat.desc}</p>
//                   <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <span className="text-xs font-medium">Shop Now</span>
//                     <ArrowRight size={12} />
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ========== FEATURED PRODUCTS ========== */}
//       <section ref={featRef} className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-2 font-semibold">Handpicked for You</p>
//             <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-light">Featured Products</h2>
//             <div className="w-20 h-px bg-amber-400 mx-auto mt-4" />
//           </div>
//           {featuredProducts.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">Loading products...</div>
//           ) : (
//             <div
//               className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
//                 featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//             >
//               {featuredProducts.map((product) => (
//                 <div key={product.id} className="group relative">
//                   <ProductCard product={product} />
//                   <button
//                     className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-500 hover:text-white"
//                     aria-label="Quick view"
//                   >
//                     <Eye size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//           <div className="text-center mt-12">
//             <Link
//               to="/shop"
//               className="inline-flex items-center gap-2 border border-gray-300 px-8 py-3 rounded-full text-sm font-medium hover:border-amber-500 hover:text-amber-500 transition-all"
//             >
//               View All Products <ArrowRight size={14} />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ========== BRAND PROMISE BANNER ========== */}
//       <section className="relative py-28 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534126511673-b6899657816a?w=1600&q=80')" }}>
//         <div className="absolute inset-0 bg-black/60" />
//         <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
//           <Sparkles className="mx-auto mb-4 text-amber-400" size={36} />
//           <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4">"Dress Well. Live Well."</h2>
//           <p className="text-white/80 text-lg mb-8">
//             Every piece in our collection is designed to make you look and feel your absolute best.
//             From boardroom to casual outings — we've got you covered.
//           </p>
//           <Link
//             to="/shop"
//             className="inline-flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-amber-400 transition-all shadow-xl"
//           >
//             Shop the Collection <ArrowRight size={16} />
//           </Link>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Home;


// Home.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Award, Truck, RefreshCw, Headphones, Sparkles, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

// Category data
const CATEGORIES = [
  { name: 'Formal Pants', slug: 'formal-pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', desc: 'Polished & Professional', tag: 'Office Essential' },
  { name: 'Tshirt', slug: 'tshirt', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', desc: 'Casual Comfort', tag: 'Everyday Wear' },
  { name: 'Shirt', slug: 'shirt', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', desc: 'Classic Elegance', tag: 'Timeless' },
  { name: 'Blazers', slug: 'blazers', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', desc: 'Tailored Perfection', tag: 'Signature' },
  { name: 'Kurta', slug: 'kurta', image: 'https://images.unsplash.com/photo-1727835523545-70ee992b5763?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=firangi-yarn-menswear-brand-hEuVOYuq1l4-unsplash.jpg', desc: 'Heritage & Culture', tag: 'Festive' },
  { name: 'Track Pants', slug: 'track-pants', image: 'https://images.unsplash.com/photo-1719473466836-ff9f5ebe0e1b?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=tuananh-blue-pcUwRAJX5es-unsplash.jpg', desc: 'Active Lifestyle', tag: 'Performance' },
];

const FEATURES = [
  { Icon: Award, title: 'Premium Quality', desc: 'Handpicked fabrics & expert craftsmanship' },
  { Icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹1,999' },
  { Icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free policy' },
  { Icon: Headphones, title: '24/7 Support', desc: 'Dedicated style consultants' },
];

// Fade-in hook
const useFadeIn = (threshold = 0.2) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const Home = () => {
  const { products } = useStore();
  const featuredProducts = Array.isArray(products) ? products.slice(0, 8) : [];
  const [heroRef, heroVisible] = useFadeIn(0.1);
  const [catRef, catVisible] = useFadeIn();
  const [featRef, featVisible] = useFadeIn();

  return (
    <main className="min-h-screen bg-cream">
      {/* ========== HERO WITH VIDEO BACKGROUND (FIXED) ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background - Guaranteed working URL */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1534126511673-b6899657816a?w=1600&q=80"
          >
            <source src="https://cdn.pixabay.com/video/2022/03/20/112093-696598405_large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Abstract glowing orbs for depth */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-brown/20 blur-[100px] animate-pulse delay-700 pointer-events-none" />

        <div
          ref={heroRef}
          className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-amber-400 text-[11px] tracking-[0.3em] uppercase font-medium">Since 2010 · Surat, India</p>
          </div>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-bold leading-[1.1] tracking-tight">
            The Modern<br />
            <span className="text-amber-400 italic">Gentleman</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto my-6 leading-relaxed font-light">
            Curated menswear that blends timeless elegance with contemporary style.<br />
            Wear your confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/shop"
              className="group bg-amber-500 text-black px-8 py-4 rounded-full flex items-center gap-2 text-sm font-semibold tracking-wide hover:bg-amber-400 transition-all shadow-xl hover:shadow-amber-500/20 hover:scale-105"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="border border-white/30 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition-all"
            >
              Our Story
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce z-10">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Icon size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{title}</p>
                <p className="text-gray-500 text-xs hidden sm:block">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section ref={catRef} className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-2 font-semibold">Shop by Category</p>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-light">Our Collections</h2>
            <div className="w-20 h-px bg-amber-400 mx-auto mt-4" />
          </div>
          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-700 ${
              catVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] block shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-amber-400 text-[10px] tracking-wider uppercase font-bold">{cat.tag}</p>
                  <h3 className="font-serif text-2xl font-bold">{cat.displayName || cat.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{cat.desc}</p>
                  <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-medium">Shop Now</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={featRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-2 font-semibold">Handpicked for You</p>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-light">Featured Products</h2>
            <div className="w-20 h-px bg-amber-400 mx-auto mt-4" />
          </div>
          {featuredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Loading products...</div>
          ) : (
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${
                featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <ProductCard product={product} />
                  <button
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-500 hover:text-white"
                    aria-label="Quick view"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-gray-300 px-8 py-3 rounded-full text-sm font-medium hover:border-amber-500 hover:text-amber-500 transition-all"
            >
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Promise Banner */}
      <section className="relative py-28 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534126511673-b6899657816a?w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <Sparkles className="mx-auto mb-4 text-amber-400" size={36} />
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4">"Dress Well. Live Well."</h2>
          <p className="text-white/80 text-lg mb-8">
            Every piece in our collection is designed to make you look and feel your absolute best.
            From boardroom to casual outings — we've got you covered.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-amber-400 transition-all shadow-xl"
          >
            Shop the Collection <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;