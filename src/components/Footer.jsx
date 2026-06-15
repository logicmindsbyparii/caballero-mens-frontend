// import { Link } from 'react-router-dom';
// import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-charcoal text-white pt-16 pb-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

//           {/* Brand */}
//           <div className="lg:col-span-1">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10">
//                 <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
//                   <rect x="20" y="20" width="60" height="10" fill="#F5F5DC"/>
//                   <rect x="30" y="10" width="40" height="12" fill="#F5F5DC"/>
//                   <rect x="30" y="30" width="3" height="28" fill="#F5F5DC"/>
//                   <rect x="67" y="30" width="3" height="28" fill="#F5F5DC"/>
//                   <rect x="30" y="55" width="40" height="3" fill="#F5F5DC"/>
//                 </svg>
//               </div>
//               <div>
//                 <span className="font-serif text-xl font-bold tracking-wider text-beige block leading-none">Caballero</span>
//                 <span className="text-[9px] tracking-[0.3em] uppercase text-brown font-medium">Casual</span>
//               </div>
//             </div>
//             <p className="text-white/60 text-sm leading-relaxed mb-6">
//               Redefining menswear with timeless elegance. Crafted for the modern gentleman who values quality and style.
//             </p>
//             <div className="flex gap-3">
//               {[
//                 { Icon: Instagram, href: '#', id: 'footer-instagram' },
//                 { Icon: Facebook, href: '#', id: 'footer-facebook' },
//                 { Icon: Twitter, href: '#', id: 'footer-twitter' },
//               ].map(({ Icon, href, id }) => (
//                 <a
//                   key={id}
//                   id={id}
//                   href={href}
//                   className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-brown hover:bg-brown/10 transition-all duration-300"
//                 >
//                   <Icon size={15} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-sm tracking-widest uppercase font-medium text-beige mb-5">Quick Links</h4>
//             <ul className="space-y-3">
//               {['Home', 'Shop', 'About', 'Contact'].map((item) => (
//                 <li key={item}>
//                   <Link
//                     to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
//                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                     className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2"
//                   >
//                     <span className="w-4 h-px bg-brown/50 group-hover:bg-brown transition-colors" />
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h4 className="text-sm tracking-widest uppercase font-medium text-beige mb-5">Categories</h4>
//             <ul className="space-y-3">
//               {['Formal Pants', 'T-Shirts', 'Shirts', 'Blazers', 'Kurta', 'Track Pants'].map((cat) => (
//                 <li key={cat}>
//                   <Link
//                     to="/shop"
//                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                     className="text-white/60 text-sm hover:text-white transition-colors duration-300"
//                   >
//                     {cat}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="text-sm tracking-widest uppercase font-medium text-beige mb-5">Contact</h4>
//             <ul className="space-y-4">
//               <li className="flex items-start gap-3">
//                 <MapPin size={15} className="text-brown mt-0.5 shrink-0" />
//                 <span className="text-white/60 text-sm">123 Fashion Street, Mumbai, Maharashtra 400001</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Phone size={15} className="text-brown shrink-0" />
//                 <a href="tel:+919876543210" className="text-white/60 text-sm hover:text-white transition-colors">+91 98765 43210</a>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail size={15} className="text-brown shrink-0" />
//                 <a href="mailto:hello@caballerocasual.com" className="text-white/60 text-sm hover:text-white transition-colors">hello@caballerocasual.com</a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-white/40 text-xs">
//             © {currentYear} Caballero Casual. All rights reserved.
//           </p>
//           <div className="flex gap-4 text-xs text-white/40">
//             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
//             <span>·</span>
//             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
//             <span>·</span>
//             <Link to="/admin-portal" className="hover:text-white transition-colors">Admin</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// Footer.jsx
// import { Link } from 'react-router-dom';
// import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="relative bg-charcoal text-white pt-16 pb-6 overflow-hidden">
//       {/* ========== CREATIVE ANIMATED BACKGROUND ========== */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Animated gradient overlay (shifts slowly) */}
//         <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-gray-800 to-charcoal animate-gradient opacity-70" />
        
//         {/* Floating glowing orbs */}
//         <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl animate-float-slow" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-amber-600/5 blur-3xl animate-float-delayed" />
//         <div className="absolute top-1/3 left-1/2 w-60 h-60 rounded-full bg-amber-400/5 blur-2xl animate-pulse-slow" />
        
//         {/* Subtle pattern overlay (like fine fabric texture) */}
//         <div 
//           className="absolute inset-0 opacity-10"
//           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c7a55b 1px, transparent 1px)', backgroundSize: '24px 24px' }}
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Main footer grid (unchanged) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
//           {/* Brand */}
//           <div className="lg:col-span-1">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10">
//                 <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
//                   <rect x="20" y="20" width="60" height="10" fill="#F5F5DC"/>
//                   <rect x="30" y="10" width="40" height="12" fill="#F5F5DC"/>
//                   <rect x="30" y="30" width="3" height="28" fill="#F5F5DC"/>
//                   <rect x="67" y="30" width="3" height="28" fill="#F5F5DC"/>
//                   <rect x="30" y="55" width="40" height="3" fill="#F5F5DC"/>
//                 </svg>
//               </div>
//               <div>
//                 <span className="font-serif text-xl font-bold tracking-wider text-beige block leading-none">Caballero</span>
//                 <span className="text-[9px] tracking-[0.3em] uppercase text-brown font-medium">Casual</span>
//               </div>
//             </div>
//             <p className="text-white/60 text-sm leading-relaxed mb-6">
//               Redefining menswear with timeless elegance. Crafted for the modern gentleman who values quality and style.
//             </p>
//             <div className="flex gap-3">
//               {[
//                 { Icon: Instagram, href: '#', id: 'footer-instagram' },
//                 { Icon: Facebook, href: '#', id: 'footer-facebook' },
//                 { Icon: Twitter, href: '#', id: 'footer-twitter' },
//               ].map(({ Icon, href, id }) => (
//                 <a
//                   key={id}
//                   id={id}
//                   href={href}
//                   className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-brown hover:bg-brown/10 transition-all duration-300"
//                 >
//                   <Icon size={15} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-sm tracking-widest uppercase font-medium text-beige mb-5">Quick Links</h4>
//             <ul className="space-y-3">
//               {['Home', 'Shop', 'About', 'Contact'].map((item) => (
//                 <li key={item}>
//                   <Link
//                     to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
//                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                     className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2"
//                   >
//                     <span className="w-4 h-px bg-brown/50 group-hover:bg-brown transition-colors" />
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h4 className="text-sm tracking-widest uppercase font-medium text-beige mb-5">Categories</h4>
//             <ul className="space-y-3">
//               {['Formal Pants', 'T-Shirts', 'Shirts', 'Blazers', 'Kurta', 'Track Pants'].map((cat) => (
//                 <li key={cat}>
//                   <Link
//                     to="/shop"
//                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                     className="text-white/60 text-sm hover:text-white transition-colors duration-300"
//                   >
//                     {cat}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="text-sm tracking-widest uppercase font-medium text-beige mb-5">Contact</h4>
//             <ul className="space-y-4">
//               <li className="flex items-start gap-3">
//                 <MapPin size={15} className="text-brown mt-0.5 shrink-0" />
//                 <span className="text-white/60 text-sm">123 Fashion Street, Mumbai, Maharashtra 400001</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Phone size={15} className="text-brown shrink-0" />
//                 <a href="tel:+919876543210" className="text-white/60 text-sm hover:text-white transition-colors">+91 98765 43210</a>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail size={15} className="text-brown shrink-0" />
//                 <a href="mailto:hello@caballerocasual.com" className="text-white/60 text-sm hover:text-white transition-colors">hello@caballerocasual.com</a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar – Admin removed, added design credit centered */}
//         <div className="pt-8 flex flex-col items-center gap-3">
//           <p className="text-white/40 text-xs text-center">
//             © {currentYear} Caballero Casual. All rights reserved.
//           </p>
          
//           {/* New: Design & Development Credit (bottom center) */}
//           <p className="text-white/30 text-[11px] tracking-wide font-light">
//             Design and Developed by <span className="text-amber-400/70 font-medium">Logic Minds by Pari</span>
//           </p>
          
//           <div className="flex gap-4 text-xs text-white/40">
//             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
//             <span>·</span>
//             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
//             {/* Admin link removed entirely */}
//           </div>
//         </div>
//       </div>

//       {/* Keyframe animations – add to your global CSS or keep here using style tag */}
//       <style>{`
//         @keyframes gradientShift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradientShift 12s ease infinite;
//         }
//         @keyframes floatSlow {
//           0% { transform: translate(0, 0) scale(1); }
//           50% { transform: translate(30px, -20px) scale(1.05); }
//           100% { transform: translate(0, 0) scale(1); }
//         }
//         .animate-float-slow {
//           animation: floatSlow 14s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: floatSlow 18s ease-in-out infinite reverse;
//         }
//         @keyframes pulseSlow {
//           0%, 100% { opacity: 0.3; transform: scale(1); }
//           50% { opacity: 0.6; transform: scale(1.1); }
//         }
//         .animate-pulse-slow {
//           animation: pulseSlow 8s ease-in-out infinite;
//         }
//       `}</style>
//     </footer>
//   );
// };

// export default Footer;

// Footer.jsx
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal text-white pt-16 pb-6 overflow-hidden">
      {/* ========== CREATIVE ANIMATED BACKGROUND (NOW VISIBLE) ========== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient – subtle shift */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-gray-800/50 to-charcoal animate-gradient" />
        
        {/* Floating orbs – increased opacity and blur for visible glow */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-amber-500/15 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/3 left-1/2 w-60 h-60 rounded-full bg-amber-400/15 blur-2xl animate-pulse-slow" />
        
        {/* Subtle fabric-like pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c7a55b 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="20" y="20" width="60" height="10" fill="#F5F5DC"/>
                  <rect x="30" y="10" width="40" height="12" fill="#F5F5DC"/>
                  <rect x="30" y="30" width="3" height="28" fill="#F5F5DC"/>
                  <rect x="67" y="30" width="3" height="28" fill="#F5F5DC"/>
                  <rect x="30" y="55" width="40" height="3" fill="#F5F5DC"/>
                </svg>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-beige block leading-none">Caballero</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-brown font-medium">Casual</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Redefining menswear with timeless elegance. Crafted for the modern gentleman who values quality and style.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: 'www.instagram.com', id: 'footer-instagram' },
                { Icon: Facebook, href: 'www.facebook.com', id: 'footer-facebook' },
                { Icon: Twitter, href: 'www.twitter.com', id: 'footer-twitter' },
              ].map(({ Icon, href, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-brown hover:bg-brown/10 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm tracking-widest uppercase font-medium text-beige mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Shop', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span className="w-4 h-px bg-brown/50 group-hover:bg-brown transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm tracking-widest uppercase font-medium text-beige mb-5">Categories</h4>
            <ul className="space-y-3">
              {['Formal Pants', 'T-Shirts', 'Shirts', 'Blazers', 'Kurta', 'Track Pants'].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/shop"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-300"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-widest uppercase font-medium text-beige mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-brown mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">123 Fashion Street, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-brown shrink-0" />
                <a href="tel:+919876543210" className="text-white/60 text-sm hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-brown shrink-0" />
                <a href="mailto:hello@caballerocasual.com" className="text-white/60 text-sm hover:text-white transition-colors">hello@caballerocasual.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* ========== BOTTOM BAR – NEW LAYOUT ========== */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: Copyright */}
          <p className="text-white/40 text-xs text-center md:text-left">
            © {currentYear} Caballero Casual. All rights reserved.
          </p>

          {/* Center: Design Credit */}
          <p className="text-gray-500 text-[11px] tracking-wide font-light text-center">
            Design and Developed by{' '}
            <a href="https://logicmindsbyparii.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-medium hover:text-amber-700 hover:underline transition-all duration-300">
              Logic Minds by Parii
            </a>
          </p>

          {/* Right: Privacy & Terms (working links) */}
          <div className="flex gap-4 text-xs text-white/40 justify-center md:justify-end">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Services</Link>
          </div>
        </div>
      </div>

      {/* CSS Animations – now fully visible */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 12s ease infinite;
        }
        @keyframes floatSlow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-float-slow {
          animation: floatSlow 14s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatSlow 18s ease-in-out infinite reverse;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;