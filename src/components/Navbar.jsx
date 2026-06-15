import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User as UserIcon, LogOut, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, wishlist, user, logout } = useStore();
  const location = useLocation();
  
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#c24b10] shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group shrink-0"
            >
              <img src="/logoremove.png" alt="Caballero Logo" className="w-25 h-20 object-contain brightness-0 invert" />
              <div className="hidden md:block">
                <span className="font-serif text-xl font-bold tracking-wider text-white block leading-none">Caballero</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/70 font-medium">Casual</span>
              </div>
            </Link>

            {/* Center: Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 relative group ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* User Account */}
              <div className="hidden lg:flex items-center gap-4 border-r border-white/20 pr-4 mr-2">
                {user ? (
                  <div className="flex items-center gap-4">
                    <Link to="/my-orders" className="text-[10px] tracking-widest font-bold text-white uppercase hover:text-white/80 transition-opacity">My Orders</Link>
                    <span className="text-[10px] tracking-widest font-bold text-white uppercase">Hi, {user.name.split(' ')[0]}</span>
                    <button onClick={logout} className="p-2 text-white/70 hover:text-red-400 transition-colors" title="Logout">
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link to="/login" className="text-[10px] tracking-[0.1em] uppercase font-bold text-white/70 hover:text-white transition-colors">Login</Link>
                    <Link to="/signup" className="px-5 py-2.5 bg-white text-stone-900 text-[10px] tracking-[0.2em] uppercase font-bold rounded-full hover:bg-stone-100 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0">Join</Link>
                  </div>
                )}
              </div>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2 text-white/70 hover:text-rose-400 transition-colors duration-300"
                aria-label="Wishlist"
              >
                <Heart size={20} className={wishlist?.length > 0 ? "fill-white text-white" : ""} />
                {wishlist?.length > 0 && (
                  <span className="absolute top-1 right-1 bg-white text-stone-900 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                to="/cart"
                id="cart-btn"
                className="relative p-2.5 bg-white/10 text-white rounded-full hover:bg-white hover:text-stone-900 transition-all duration-300"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-stone-900 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#c24b10]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                id="mobile-menu-btn"
                className="lg:hidden p-2 text-charcoal ml-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden bg-[#c24b10] border-t border-white/10 ${
            mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `py-3 px-4 text-xs tracking-widest uppercase font-bold border-b border-white/5 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/60'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link 
              to="/wishlist" 
              className="py-3 px-4 text-xs tracking-widest uppercase font-bold border-b border-white/5 text-white/60 flex justify-between items-center"
              onClick={() => setMobileOpen(false)}
            >
               Wishlist
               {wishlist?.length > 0 && <span className="bg-white text-stone-900 text-[10px] px-2 py-0.5 rounded-full">{wishlist.length}</span>}
            </Link>
            
            {user && (
              <Link 
                to="/my-orders" 
                className="py-3 px-4 text-xs tracking-widest uppercase font-bold border-b border-white/5 text-white/60"
                onClick={() => setMobileOpen(false)}
              >
                 My Orders
              </Link>
            )}
            
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="py-3 px-4 text-xs tracking-widest uppercase font-bold border-b border-white/5 text-white/60">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="py-3 px-4 text-xs tracking-widest uppercase font-bold border-b border-white/5 text-white/60">Sign Up</Link>
              </>
            ) : (
              <button 
                onClick={() => { logout(); setMobileOpen(false); }} 
                className="py-3 px-4 text-left text-xs tracking-widest uppercase font-bold border-b border-white/5 text-white/60"
              >
                Logout
              </button>
            )}

            <Link
              to="/admin-portal"
              className="py-3 px-4 text-sm tracking-widest uppercase font-medium text-muted"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;