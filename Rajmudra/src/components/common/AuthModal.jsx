import React from 'react';
import { X, Sparkles, User, Mail, Lock } from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  authMode,
  setAuthMode,
  authForm,
  setAuthForm,
  onSubmit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5B84B]/40 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/80 hover:bg-[#E5B84B]/20 text-[#5C4E46] hover:text-[#1A1614] transition border border-[#E5B84B]/20"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5B84B]/20 border border-[#E5B84B]/40 text-[#96660F] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Rajmudra Events Portal</span>
          </div>
          <h2 className="text-2xl font-black text-[#2C221E] tracking-tight">
            {authMode === 'login' ? 'Welcome Back!' : 'Join Rajmudra'}
          </h2>
          <p className="text-xs text-[#8C7A6B]">
            {authMode === 'login'
              ? 'Access your booked passes, registered events, and VIP tickets.'
              : 'Create an account to discover and book luxury events instantly.'}
          </p>

          <div className="flex bg-white/80 p-1 rounded-2xl border border-[#E5B84B]/30">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                authMode === 'login'
                  ? 'bg-gradient-to-r from-[#D4A337] to-[#E5B84B] text-[#1A1614] shadow-sm'
                  : 'text-[#5C4E46] hover:text-[#96660F]'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                authMode === 'signup'
                  ? 'bg-gradient-to-r from-[#D4A337] to-[#E5B84B] text-[#1A1614] shadow-sm'
                  : 'text-[#5C4E46] hover:text-[#96660F]'
              }`}
            >
              Sign In / Register
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-3.5 text-xs sm:text-sm">
          {authMode === 'signup' && (
            <div className="space-y-1">
              <label className="font-bold text-[#5C4E46] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#B8860B]" /> Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Patil"
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E5B84B]/30 rounded-xl focus:ring-2 focus:ring-[#D4A337] focus:border-[#D4A337] outline-none text-[#2C221E] placeholder:text-slate-400"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-[#5C4E46] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#B8860B]" /> Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E5B84B]/30 rounded-xl focus:ring-2 focus:ring-[#D4A337] focus:border-[#D4A337] outline-none text-[#2C221E] placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#5C4E46] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#B8860B]" /> Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E5B84B]/30 rounded-xl focus:ring-2 focus:ring-[#D4A337] focus:border-[#D4A337] outline-none text-[#2C221E] placeholder:text-slate-400"
            />
          </div>

          <div className="pt-1 flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#8C7A6B]">Quick Demo:</span>
            <button
              type="button"
              onClick={() => setAuthForm({ name: 'Rahul Patil', email: 'rahul@rajmudra.com', password: 'password123', role: 'attendee' })}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#E5B84B]/30 text-[10px] font-bold text-[#96660F] hover:bg-[#E5B84B]/15 transition"
            >
              Attendee Demo
            </button>
            <button
              type="button"
              onClick={() => setAuthForm({ name: 'Admin Host', email: 'admin@rajmudra.com', password: 'admin123', role: 'admin' })}
              className="px-2.5 py-1 rounded-lg bg-[#E5B84B]/20 border border-[#E5B84B]/40 text-[10px] font-bold text-[#96660F] hover:bg-[#E5B84B]/30 transition"
            >
              Admin Demo
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-sm shadow-lg shadow-[#D4A337]/30 transition transform hover:-translate-y-0.5 active:scale-95 mt-2"
          >
            {authMode === 'login' ? 'Log In to Account' : 'Complete Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
