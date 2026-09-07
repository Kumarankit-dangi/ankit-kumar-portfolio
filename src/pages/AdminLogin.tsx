import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AdminLoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function AdminLogin({ onSuccess, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to sign in. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-navy-950">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent-600/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center shadow-lg shadow-accent-500/30 mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-navy-400 text-sm mt-2">
              Sign in to manage project enquiries
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 mb-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-navy-200 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-200 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-accent-600 to-accent-500 rounded-xl hover:shadow-lg hover:shadow-accent-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <button
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 mt-6 text-sm text-navy-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to website
          </button>
        </div>
      </motion.div>
    </div>
  );
}
