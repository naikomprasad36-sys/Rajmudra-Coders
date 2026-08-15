import React, { useState } from 'react';
import { X, Sparkles, User, Mail, ShieldCheck, KeyRound, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { apiSendOtp, apiVerifyOtp } from '../../services/api';

export default function AuthModal({
  isOpen,
  onClose,
  authMode,
  setAuthMode,
  authForm,
  setAuthForm,
  onSuccessLogin
}) {
  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [otpCode, setOtpCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [sentOtpPreview, setSentOtpPreview] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  // Step 1: Send OTP to Email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSending(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const res = await apiSendOtp(authForm.email);
      if (res && res.success) {
        setSentOtpPreview(res.otp);
        setStatusMessage(`Verification code sent to ${authForm.email}`);
        setStep('otp');
        if (res.otp) setOtpCode(res.otp); // Pre-fill generated OTP for instant testing convenience
      } else {
        setErrorMessage(res?.message || 'Failed to send OTP. Try again.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Using local mode.');
      setStep('otp');
      setOtpCode('123456');
    } finally {
      setIsSending(false);
    }
  };

  // Step 2: Verify OTP & Complete Login / Registration
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    try {
      const res = await apiVerifyOtp({
        email: authForm.email,
        otp: otpCode,
        name: authForm.name,
        role: authForm.role
      });

      if (res && res.success) {
        setStatusMessage('OTP verified successfully!');
        setTimeout(() => {
          if (onSuccessLogin) {
            onSuccessLogin(res.user);
          }
          onClose();
          resetForm();
        }, 500);
      } else {
        setErrorMessage(res?.message || 'Invalid verification code.');
      }
    } catch (err) {
      setErrorMessage('Verification failed.');
    } finally {
      setIsVerifying(false);
    }
  };

  const resetForm = () => {
    setStep('email');
    setOtpCode('');
    setSentOtpPreview(null);
    setStatusMessage(null);
    setErrorMessage(null);
  };

  const handleQuickDemo = (demoUser) => {
    setAuthForm({
      name: demoUser.name,
      email: demoUser.email,
      password: 'password123',
      role: demoUser.role
    });
    setStep('otp');
    setOtpCode('123456');
    setSentOtpPreview('123456');
    setStatusMessage(`Demo OTP auto-loaded for ${demoUser.email}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5B84B]/40 relative">
        <button
          onClick={() => { onClose(); resetForm(); }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/80 hover:bg-[#E5B84B]/20 text-[#5C4E46] hover:text-[#1A1614] transition border border-[#E5B84B]/20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5B84B]/20 border border-[#E5B84B]/40 text-[#96660F] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Rajmudra Email OTP Authentication</span>
          </div>

          <h2 className="text-2xl font-black text-[#2C221E] tracking-tight">
            {authMode === 'login' ? 'Welcome Back!' : 'Join Rajmudra'}
          </h2>
          <p className="text-xs text-[#8C7A6B]">
            {step === 'email'
              ? 'Enter your email address to receive a 6-digit verification OTP code.'
              : `Enter the 6-digit OTP code sent to ${authForm.email}.`}
          </p>

          {/* Mode Switcher */}
          <div className="flex bg-white/80 p-1 rounded-2xl border border-[#E5B84B]/30">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setStep('email'); }}
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
              onClick={() => { setAuthMode('signup'); setStep('email'); }}
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

        {/* Banners */}
        {statusMessage && (
          <div className="p-3 rounded-2xl bg-amber-100/90 border border-amber-400/50 text-amber-950 text-xs font-bold flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{statusMessage}</span>
            </div>
            {sentOtpPreview && (
              <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-white font-mono text-[10px]">
                OTP: {sentOtpPreview}
              </span>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* STEP 1: Email Form */}
        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs sm:text-sm">
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

            <div className="pt-1 flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#8C7A6B]">Quick Demos:</span>
              <button
                type="button"
                onClick={() => handleQuickDemo({ name: 'Rahul Patil', email: 'rahul@rajmudra.com', role: 'attendee' })}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E5B84B]/30 text-[10px] font-bold text-[#96660F] hover:bg-[#E5B84B]/15 transition"
              >
                Attendee Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo({ name: 'Admin Host', email: 'admin@rajmudra.com', role: 'admin' })}
                className="px-2.5 py-1 rounded-lg bg-[#E5B84B]/20 border border-[#E5B84B]/40 text-[10px] font-bold text-[#96660F] hover:bg-[#E5B84B]/30 transition"
              >
                Admin Demo
              </button>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-sm shadow-lg shadow-[#D4A337]/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dispatching Email OTP...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Send Email Verification OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: OTP Verification Form */
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#5C4E46] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#B8860B]" /> Enter 6-Digit Email OTP
                </label>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-[10px] font-bold text-amber-700 hover:underline"
                >
                  Change Email
                </button>
              </div>

              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-[#E5B84B] rounded-2xl focus:ring-4 focus:ring-[#D4A337]/20 outline-none text-[#2C221E] font-mono text-center tracking-[0.4em] font-black text-lg shadow-inner"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-[#8C7A6B]">
              <span>Did not receive code?</span>
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-amber-800 hover:text-amber-950 font-black underline"
              >
                Resend OTP
              </button>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-sm shadow-lg shadow-[#D4A337]/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying OTP Code...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify OTP &amp; Log In</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
