import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Login = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(form.email, form.password);
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
          <h1 className="font-serif text-3xl text-charcoal font-bold mb-1">Welcome Back</h1>
          <p className="text-muted text-sm">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-luxury p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <AlertCircle size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 00000 00000"
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-3 text-sm border border-beige rounded-xl bg-cream focus:outline-none focus:border-brown transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-charcoal text-white text-sm tracking-widest uppercase font-medium rounded-xl hover:bg-brown transition-colors duration-300 disabled:opacity-60 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brown font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
