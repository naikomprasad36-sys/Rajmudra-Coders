import React, { useState } from 'react';
import { X, Sparkles, User, Mail, ShieldCheck, KeyRound, ArrowRight, Loader2, CheckCircle2, Lock } from 'lucide-react';
import { apiSendOtp, apiVerifyOtp, apiAdminLogin, apiAdminVerifyOtp } from '../../services/api';

export default function AuthModal({
  isOpen,
  onClose,
  authMode,
  setAuthMode,
  authForm,
  setAuthForm,
  onSuccessLogin,
  isAdminLoginMode = false
}) {
  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [adminOtpStep, setAdminOtpStep] = useState(false); // false (credentials) | true (OTP entry)
  const [otpCode, setOtpCode] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  // Handle Admin Step 1: Login Credentials Check & Send OTP to naikomprasad777@gmail.com
  const handleAdminSubmitCredentials = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const res = await apiAdminLogin(authForm.email, adminPassword);
      if (res && res.success) {
        if (res.requireOtp) {
          setAdminOtpStep(true);
          setOtpCode(''); // Never auto-fill OTP! Keep blank
          setStatusMessage(res.message || '✉️ Verification OTP dispatched to naikomprasad777@gmail.com');
        } else if (res.user) {
          setStatusMessage('👑 Admin Verified! Welcome Boss.');
          setTimeout(() => {
            if (onSuccessLogin) onSuccessLogin(res.user);
            onClose();
            resetForm();
          }, 400);
        }
      } else {
        setErrorMessage(res?.message || '❌ Invalid Admin Credentials! Access Denied.');
      }
    } catch (err) {
      setErrorMessage('❌ Invalid Admin Credentials! Access Denied.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Admin Step 2: Verify Admin OTP sent to naikomprasad777@gmail.com or Master 937179
  const handleAdminVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage('Please enter the 6-digit Admin verification code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await apiAdminVerifyOtp(otpCode);
      if (res && res.success) {
        setStatusMessage('👑 Admin Verified! Welcome Boss.');
        setTimeout(() => {
          if (onSuccessLogin) onSuccessLogin(res.user);
          onClose();
          resetForm();
        }, 400);
      } else {
        setErrorMessage(res?.message || '❌ Invalid or expired Admin OTP code.');
      }
    } catch (err) {
      setErrorMessage('❌ Admin OTP Verification Failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 1: Send Real Email OTP for User Authentication
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const res = await apiSendOtp(authForm.email);
      if (res && res.success) {
        setStatusMessage(`Verification code sent to ${authForm.email}`);
        setStep('otp');
        setOtpCode(''); // Keep blank for manual typing
      } else {
        setErrorMessage(res?.message || 'Failed to send OTP. Try again.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Please enter the OTP code sent to your email.');
      setStep('otp');
      setOtpCode('');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP & Complete User Login
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await apiVerifyOtp({
        email: authForm.email,
        otp: otpCode,
        name: authForm.name,
        role: 'attendee'
      });

      if (res && res.success) {
        setStatusMessage('OTP verified successfully!');
        setTimeout(() => {
          if (onSuccessLogin) onSuccessLogin(res.user);
          onClose();
          resetForm();
        }, 500);
      } else {
        setErrorMessage(res?.message || 'Invalid verification code.');
      }
    } catch (err) {
      setErrorMessage('Verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep('email');
    setAdminOtpStep(false);
    setOtpCode('');
    setAdminPassword('');
    setStatusMessage(null);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#E5B84B]/40 relative">
        <button
          onClick={() => { onClose(); resetForm(); }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/80 hover:bg-[#E5B84B]/20 text-[#5C4E46] hover:text-[#1A1614] transition border border-[#E5B84B]/20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5B84B]/20 border border-[#E5B84B]/40 text-[#96660F] text-xs font-bold">
            {isAdminLoginMode ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Admin Master 2-Step Security</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Rajmudra User OTP Portal</span>
              </>
            )}
          </div>

          <h2 className="text-2xl font-black text-[#2C221E] tracking-tight">
            {isAdminLoginMode 
              ? (adminOtpStep ? '👑 Enter Admin Email OTP' : '👑 Boss Admin Authorization') 
              : (authMode === 'login' ? 'User Welcome Back!' : 'Join Rajmudra')}
          </h2>
          <p className="text-xs text-[#8C7A6B]">
            {isAdminLoginMode
              ? (adminOtpStep
                  ? 'Enter the 6-digit OTP code sent to naikomprasad777@gmail.com.'
                  : 'Enter your Admin email and password to unlock Admin Tools.')
              : (step === 'email'
                  ? 'Enter your email address to log in or register as a guest attendee.'
                  : `Enter the 6-digit OTP code sent to ${authForm.email}.`)}
          </p>
        </div>

        {/* Status Banners */}
        {statusMessage && (
          <div className="p-3 rounded-2xl bg-amber-100/90 border border-amber-400/50 text-amber-950 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-bold leading-relaxed">
            {errorMessage}
          </div>
        )}

        {/* 1. DEDICATED ADMIN LOGIN FORM */}
        {isAdminLoginMode ? (
          !adminOtpStep ? (
            /* Admin Credentials Form (Step 1) */
            <form onSubmit={handleAdminSubmitCredentials} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-[#5C4E46] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#B8860B]" /> Admin Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter Email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#E5B84B]/40 rounded-xl focus:ring-2 focus:ring-[#D4A337] focus:border-[#D4A337] outline-none text-[#2C221E] font-medium placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#5C4E46] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#B8860B]" /> Admin Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#E5B84B]/40 rounded-xl focus:ring-2 focus:ring-[#D4A337] focus:border-[#D4A337] outline-none text-[#2C221E] font-medium placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-sm shadow-lg shadow-[#D4A337]/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Admin OTP to Email...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify Credentials &amp; Send OTP</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Admin OTP Verification Form (Step 2 - Blank input, zero code display) */
            <form onSubmit={handleAdminVerifyOtpSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#5C4E46] flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-[#B8860B]" /> Enter Admin OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => setAdminOtpStep(false)}
                    className="text-[11px] font-bold text-amber-800 hover:underline"
                  >
                    Back
                  </button>
                </div>

                <input
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  placeholder="------"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-[#E5B84B] rounded-2xl focus:ring-4 focus:ring-[#D4A337]/30 outline-none text-[#2C221E] font-mono text-center tracking-[0.4em] font-black text-xl shadow-inner placeholder:tracking-[0.4em] placeholder:text-slate-300"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-sm shadow-lg shadow-[#D4A337]/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Admin OTP...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify Admin OTP &amp; Unlock Access</span>
                  </>
                )}
              </button>
            </form>
          )
        ) : (
          /* 2. USER EMAIL OTP AUTHENTICATION FORM */
          <>
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
                User Log In
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
                User Sign Up
              </button>
            </div>

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
                    <Mail className="w-3.5 h-3.5 text-[#B8860B]" /> User Email Address
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-sm shadow-lg shadow-[#D4A337]/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Email OTP...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>Send User Verification OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* OTP verification for user - Blank input, zero code display */
              <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-[#5C4E46] flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-[#B8860B]" /> Enter 6-Digit Email OTP
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="text-[11px] font-bold text-amber-800 hover:underline"
                    >
                      Change Email
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    placeholder="------"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#E5B84B] rounded-2xl focus:ring-4 focus:ring-[#D4A337]/30 outline-none text-[#2C221E] font-mono text-center tracking-[0.4em] font-black text-xl shadow-inner placeholder:tracking-[0.4em] placeholder:text-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-sm shadow-lg shadow-[#D4A337]/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying OTP...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify OTP &amp; Complete User Log In</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
