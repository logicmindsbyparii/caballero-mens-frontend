import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';


const AdminLogin = () => {
  const { adminLogin } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate request
    const result = adminLogin(form.username, form.password);
    setLoading(false);
    if (result.success) {
      navigate('/admin-portal', { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6">
            <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="20" y="20" width="60" height="10" fill="#2C2C2C"/>
              <rect x="30" y="10" width="40" height="12" fill="#2C2C2C"/>
              <rect x="30" y="30" width="3" height="28" fill="#2C2C2C"/>
              <rect x="67" y="30" width="3" height="28" fill="#2C2C2C"/>
              <rect x="30" y="55" width="40" height="3" fill="#2C2C2C"/>
            </svg>
          </div>
          <h1 className="font-serif text-3xl text-charcoal font-bold mb-1">Owner Portal</h1>
          <p className="text-muted text-sm">Sign in to manage your store</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-luxury p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          {/* Credentials hint */}
          <div className="bg-beige border border-brown/20 rounded-xl px-4 py-3 mb-6 text-xs text-muted">
            <strong className="text-brown">Demo Credentials:</strong><br />
            Username: <code className="text-charcoal">caballero_admin</code><br />
            Password: <code className="text-charcoal">Caballero@2025</code>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">
                Username
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  id="admin-username"
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-beige rounded-xl bg-cream focus:outline-none focus:border-brown transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  id="admin-password"
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
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-charcoal text-white text-sm tracking-widest uppercase font-medium rounded-xl hover:bg-brown transition-colors duration-300 disabled:opacity-60 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
