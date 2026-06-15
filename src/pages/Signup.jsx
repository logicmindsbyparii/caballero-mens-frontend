import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Signup = () => {
  const { signup } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    const result = await signup({ 
      name: form.name, 
      email: form.email, 
      password: form.password, 
      phone: form.phone 
    });
    setLoading(false);
    
    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/logo.jpeg" alt="Logo" className="w-20 h-20 mx-auto mb-6 object-contain" />
          <h1 className="font-serif text-3xl text-charcoal font-bold mb-1">Create Account</h1>
          <p className="text-muted text-sm">Join the Caballero community</p>
        </div>

        <div className="bg-white rounded-2xl shadow-luxury p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <AlertCircle size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 00000 00000"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-beige rounded-xl bg-cream focus:outline-none focus:border-brown transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-beige rounded-xl bg-cream focus:outline-none focus:border-brown transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-beige rounded-xl bg-cream focus:outline-none focus:border-brown transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create password"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-beige rounded-xl bg-cream focus:outline-none focus:border-brown transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-beige rounded-xl bg-cream focus:outline-none focus:border-brown transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-charcoal text-white text-sm tracking-widest uppercase font-medium rounded-xl hover:bg-brown transition-colors duration-300 disabled:opacity-60 mt-2"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-brown font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
