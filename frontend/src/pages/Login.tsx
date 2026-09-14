import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

export function Login() {
  const { login, loginAs, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = await login(email, password);
    if (ok) navigate('/');
    else setError('Invalid credentials. Use a demo button below!');
  };

  const handleDemo = (role: 'ADMIN' | 'USER') => {
    loginAs(role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface-0 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-violet/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-amber/8 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Card */}
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="glass rounded-3xl p-8 shadow-card">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-cyan/20 border border-accent-cyan/30 shadow-glow-cyan mb-4">
              <Wifi className="h-7 w-7 text-accent-cyan" />
            </div>
            <h1 className="text-2xl font-bold text-white glow-text-cyan">SmartHome</h1>
            <p className="text-sm text-gray-400 mt-1">Home Automation Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
            <div>
              <label htmlFor="login-email" className="block text-xs font-medium text-gray-400 mb-1.5">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={cn(
                  'w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600',
                  'bg-surface-2 border transition-colors duration-150',
                  'focus:outline-none focus:ring-2 focus:ring-accent-cyan/40',
                  error ? 'border-accent-red/50' : 'border-surface-border focus:border-accent-cyan/50',
                )}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-xs font-medium text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    'w-full px-4 py-3 pr-11 rounded-xl text-sm text-white placeholder-gray-600',
                    'bg-surface-2 border transition-colors duration-150',
                    'focus:outline-none focus:ring-2 focus:ring-accent-cyan/40',
                    error ? 'border-accent-red/50' : 'border-surface-border focus:border-accent-cyan/50',
                  )}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-accent-red bg-accent-red/10 border border-accent-red/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full mt-2"
              id="login-submit"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-surface-border" />
            <span className="text-xs text-gray-500">or try a demo account</span>
            <div className="flex-1 h-px bg-surface-border" />
          </div>

          {/* Demo buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id="demo-admin-btn"
              onClick={() => handleDemo('ADMIN')}
              className={cn(
                'py-3 px-4 rounded-xl text-sm font-medium transition-all duration-150',
                'bg-accent-amber/10 border border-accent-amber/30 text-accent-amber',
                'hover:bg-accent-amber/20 hover:border-accent-amber/50 hover:shadow-glow-amber',
              )}
            >
              👑 Login as Admin
            </button>
            <button
              id="demo-user-btn"
              onClick={() => handleDemo('USER')}
              className={cn(
                'py-3 px-4 rounded-xl text-sm font-medium transition-all duration-150',
                'bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan',
                'hover:bg-accent-cyan/20 hover:border-accent-cyan/50 hover:shadow-glow-cyan',
              )}
            >
              👤 Login as User
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          SmartHome Dashboard · Week 1 Preview
        </p>
      </div>
    </div>
  );
}
