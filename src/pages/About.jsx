// import { Award, Users, Globe, Heart } from 'lucide-react';

// const MILESTONES = [
//   { year: '2010', title: 'Founded', desc: 'Caballero Casual was born in Surat, Gujarat — with a vision to redefine menswear.' },
//   { year: '2014', title: 'Pan-India Expansion', desc: 'Launched across 50+ cities with dedicated retail presence.' },
//   { year: '2018', title: '1 Million Customers', desc: 'Reached the milestone of serving over a million proud Caballero customers.' },
//   { year: '2022', title: 'Digital First', desc: 'Launched our premium e-commerce platform to bring luxury menswear online.' },
//   { year: '2025', title: 'New Heights', desc: 'Expanding globally with premium collections celebrating the modern gentleman.' },
// ];

// const VALUES = [
//   { Icon: Award, title: 'Uncompromising Quality', desc: 'Every thread, every stitch is crafted to perfection using the finest materials.' },
//   { Icon: Heart, title: 'Passion for Style', desc: 'We believe great clothing creates great confidence. Style is our language.' },
//   { Icon: Users, title: 'Customer First', desc: 'Your satisfaction is our legacy. We build relationships, not just transactions.' },
//   { Icon: Globe, title: 'Sustainability', desc: 'Committed to ethical sourcing and sustainable fashion practices.' },
// ];

// const About = () => (
//   <main className="min-h-screen pt-20">
//     {/* Hero */}
//     <section
//       className="relative py-28 flex items-center justify-center overflow-hidden"
//       style={{ background: 'linear-gradient(135deg, #2C2C2C 0%, #1a1a1a 100%)' }}
//     >
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
//           alt="About background"
//           className="w-full h-full object-cover opacity-20"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
//       </div>
//       <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
//         <p className="section-subtitle text-brown mb-4 tracking-[0.4em]">SINCE 2010</p>
//         <h1 className="font-serif text-5xl md:text-6xl text-white font-bold mb-5 text-shadow">Our Story</h1>
//         <p className="text-white/70 text-base leading-relaxed">
//           Born in the textile capital of India, Caballero Casual was founded with a single belief —
//           that every man deserves to wear his confidence.
//         </p>
//       </div>
//     </section>

//     {/* Mission */}
//     <section className="py-20 bg-white">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <p className="section-subtitle mb-3">Our Mission</p>
//         <h2 className="section-title mb-4">Crafted for the Modern Gentleman</h2>
//         <div className="luxury-divider" />
//         <p className="text-muted text-base leading-relaxed mt-8 max-w-2xl mx-auto">
//           We create menswear that transcends trends. Inspired by heritage and shaped by modern sensibilities,
//           every Caballero piece tells a story of craftsmanship, elegance, and timeless style.
//         </p>
//       </div>
//     </section>

//     {/* Values */}
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-14">
//           <p className="section-subtitle mb-3">What Drives Us</p>
//           <h2 className="section-title">Our Core Values</h2>
//           <div className="luxury-divider" />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {VALUES.map(({ Icon, title, desc }) => (
//             <div key={title} className="text-center p-8 rounded-2xl border border-beige hover:shadow-luxury transition-shadow duration-300 group">
//               <div className="w-14 h-14 bg-brown/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-brown/20 transition-colors">
//                 <Icon size={24} className="text-brown" />
//               </div>
//               <h3 className="font-serif text-lg text-charcoal font-semibold mb-3">{title}</h3>
//               <p className="text-muted text-sm leading-relaxed">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>

//     {/* Timeline */}
//     <section className="py-20 bg-gray-200">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-14">
//           <p className="section-subtitle mb-3">Our Journey</p>
//           <h2 className="section-title">The Caballero Timeline</h2>
//           <div className="luxury-divider" />
//         </div>
//         <div className="relative">
//           {/* Line */}
//           <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brown/20 -translate-x-1/2" />
//           <div className="space-y-10">
//             {MILESTONES.map((m, i) => (
//               <div
//                 key={m.year}
//                 className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
//               >
//                 {/* Dot */}
//                 <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-brown rounded-full -translate-x-1/2 mt-2 z-10" />
//                 {/* Content */}
//                 <div className={`flex-1 ml-10 md:ml-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
//                   <div className="bg-white rounded-2xl p-5 shadow-card">
//                     <span className="section-subtitle text-[10px]">{m.year}</span>
//                     <h3 className="font-serif text-lg text-charcoal font-semibold mt-1 mb-2">{m.title}</h3>
//                     <p className="text-muted text-sm leading-relaxed">{m.desc}</p>
//                   </div>
//                 </div>
//                 <div className="hidden md:block flex-1" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   </main>
// );

// export default About;

// About.jsx
import { useEffect, useRef, useState } from 'react';
import { Award, Users, Globe, Heart, Calendar, MapPin, TrendingUp } from 'lucide-react';

const MILESTONES = [
  { year: '2010', title: 'Founded', desc: 'Caballero Casual was born in Surat, Gujarat — with a vision to redefine menswear.' },
  { year: '2014', title: 'Pan-India Expansion', desc: 'Launched across 50+ cities with dedicated retail presence.' },
  { year: '2018', title: '1 Million Customers', desc: 'Reached the milestone of serving over a million proud Caballero customers.' },
  { year: '2022', title: 'Digital First', desc: 'Launched our premium e-commerce platform to bring luxury menswear online.' },
  { year: '2025', title: 'New Heights', desc: 'Expanding globally with premium collections celebrating the modern gentleman.' },
];

const VALUES = [
  { Icon: Award, title: 'Uncompromising Quality', desc: 'Every thread, every stitch is crafted to perfection using the finest materials.' },
  { Icon: Heart, title: 'Passion for Style', desc: 'We believe great clothing creates great confidence. Style is our language.' },
  { Icon: Users, title: 'Customer First', desc: 'Your satisfaction is our legacy. We build relationships, not just transactions.' },
  { Icon: Globe, title: 'Sustainability', desc: 'Committed to ethical sourcing and sustainable fashion practices.' },
];

// Stats data for counters
const STATS = [
  { label: 'Years of Excellence', value: 15, suffix: '+', icon: Calendar },
  { label: 'Happy Customers', value: 1.2, suffix: 'M+', icon: Users },
  { label: 'Global Stores', value: 85, suffix: '+', icon: MapPin },
  { label: 'Growth Rate', value: 40, suffix: '%', icon: TrendingUp },
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

// Counter animation hook
const useCounter = (targetValue, suffix = '', duration = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = targetValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [targetValue, duration]);
  return `${count}${suffix}`;
};

const About = () => {
  const [heroRef, heroVisible] = useFadeIn(0.1);
  const [missionRef, missionVisible] = useFadeIn();
  const [valuesRef, valuesVisible] = useFadeIn();
  const [timelineRef, timelineVisible] = useFadeIn();
  const [statsRef, statsVisible] = useFadeIn();

  // Trigger counters only when visible
  const [countersStarted, setCountersStarted] = useState(false);
  useEffect(() => {
    if (statsVisible && !countersStarted) setCountersStarted(true);
  }, [statsVisible, countersStarted]);

  const yearsCount = useCounter(15, '+', 1200);
  const customersCount = useCounter(1.2, 'M+', 1200);
  const storesCount = useCounter(85, '+', 1200);
  const growthCount = useCounter(40, '%', 1200);

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section with Parallax Effect */}
      <section className="relative py-28 flex items-center justify-center overflow-hidden min-h-[60vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
            alt="About background"
            className="w-full h-full object-cover opacity-20 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div
          ref={heroRef}
          className={`relative z-10 text-center px-4 max-w-3xl mx-auto transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-amber-400 text-sm tracking-[0.4em] mb-4 font-semibold">SINCE 2010</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-bold mb-5">Our Story</h1>
          <p className="text-white/80 text-base leading-relaxed max-w-2xl mx-auto">
            Born in the textile capital of India, Caballero Casual was founded with a single belief —
            that every man deserves to wear his confidence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-amber-600 text-xs tracking-[0.3em] uppercase mb-3 transition-all duration-700 ${missionVisible ? 'opacity-100' : 'opacity-0'}`}>
            Our Mission
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl text-gray-900 font-light mb-4 transition-all duration-700 delay-150 ${missionVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Crafted for the Modern Gentleman
          </h2>
          <div className="w-20 h-px bg-amber-400 mx-auto my-6" />
          <p className={`text-gray-600 text-base leading-relaxed mt-4 max-w-2xl mx-auto transition-all duration-700 delay-300 ${missionVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            We create menswear that transcends trends. Inspired by heritage and shaped by modern sensibilities,
            every Caballero piece tells a story of craftsmanship, elegance, and timeless style.
          </p>
        </div>
      </section>

      {/* Stats Counter Section (Creative Addition) */}
      <section ref={statsRef} className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {countersStarted && (
              <>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-amber-600">{yearsCount}</div>
                  <p className="text-gray-600 text-sm uppercase tracking-wide">Years of Excellence</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-amber-600">{customersCount}</div>
                  <p className="text-gray-600 text-sm uppercase tracking-wide">Happy Customers</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-amber-600">{storesCount}</div>
                  <p className="text-gray-600 text-sm uppercase tracking-wide">Global Stores</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-amber-600">{growthCount}</div>
                  <p className="text-gray-600 text-sm uppercase tracking-wide">Growth Rate</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className={`text-amber-600 text-xs tracking-[0.3em] uppercase mb-3 transition-all duration-700 ${valuesVisible ? 'opacity-100' : 'opacity-0'}`}>
              What Drives Us
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl text-gray-900 font-light mb-4 transition-all duration-700 delay-150 ${valuesVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              Our Core Values
            </h2>
            <div className="w-20 h-px bg-amber-400 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map(({ Icon, title, desc }, idx) => (
              <div
                key={title}
                className={`text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-500 group hover:-translate-y-2 ${
                  valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-amber-200 transition-colors">
                  <Icon size={28} className="text-amber-600" />
                </div>
                <h3 className="font-serif text-xl text-gray-800 font-semibold mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Enhanced with hover effects */}
      <section ref={timelineRef} className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className={`text-amber-600 text-xs tracking-[0.3em] uppercase mb-3 transition-all duration-700 ${timelineVisible ? 'opacity-100' : 'opacity-0'}`}>
              Our Journey
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl text-gray-900 font-light mb-4 transition-all duration-700 delay-150 ${timelineVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              The Caballero Timeline
            </h2>
            <div className="w-20 h-px bg-amber-400 mx-auto" />
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-300 -translate-x-1/2" />
            <div className="space-y-12">
             {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                 {/* Dot */}
                 <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-brown rounded-full -translate-x-1/2 mt-2 z-10" />
                {/* Content */}
                 <div className={`flex-1 ml-10 md:ml-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                   <div className="bg-white rounded-2xl p-5 shadow-card">
                     <span className="section-subtitle text-[10px]">{m.year}</span>
                     <h3 className="font-serif text-lg text-charcoal font-semibold mt-1 mb-2">{m.title}</h3>
                     <p className="text-muted text-sm leading-relaxed">{m.desc}</p>
                   </div>
                 </div>
                 <div className="hidden md:block flex-1" />
               </div>
             ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
