import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, showToast } = useShop();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      showToast(`Password reset link sent to ${email || 'your email'}!`);
      setMode('login');
      return;
    }

    if (mode === 'register') {
      if (!name || !email) {
        showToast('Please enter your name and email', 'warning');
        return;
      }
      login(email, 'customer', name);
      return;
    }

    // Login mode
    if (!email) {
      showToast('Please enter your email', 'warning');
      return;
    }
    const isAdmin = email.toLowerCase().includes('admin');
    login(email, isAdmin ? 'admin' : 'customer', name || email.split('@')[0]);
  };

  const handleDemoCustomer = () => {
    login('elena.rostova@example.com', 'customer', 'Elena Rostova');
  };

  const handleDemoAdmin = () => {
    login('admin@shopease.com', 'admin', 'Store Administrator');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-1 mb-6">
            <h2 className="text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'register' && 'Create Your Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h2>
            <p className="text-xs text-neutral-500">
              {mode === 'login' && 'Sign in to access your orders, saved addresses & wishlist.'}
              {mode === 'register' && 'Join ShopEase for fast checkout and private seasonal drops.'}
              {mode === 'forgot' && 'Enter your email address to receive password instructions.'}
            </p>
          </div>

          {/* Quick Demo Login Badges */}
          <div className="mb-6 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
            <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-center">
              Quick 1-Click Demo Profiles
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="py-2 px-2.5 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-neutral-500" />
                <span>Customer Demo</span>
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="py-2 px-2.5 bg-white dark:bg-neutral-900 text-amber-600 dark:text-amber-400 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-950"
                  />
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>{mode === 'login' ? 'Sign In' : mode === 'register' ? 'Register Account' : 'Send Instructions'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Toggle Modes */}
          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-center text-xs text-neutral-500">
            {mode === 'login' && (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-semibold text-neutral-950 dark:text-white underline ml-1"
                >
                  Create one now
                </button>
              </p>
            )}

            {mode === 'register' && (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-semibold text-neutral-950 dark:text-white underline ml-1"
                >
                  Sign in
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-neutral-950 dark:text-white underline"
              >
                Back to sign in
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
