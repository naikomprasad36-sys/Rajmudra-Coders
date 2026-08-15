import React, { useState } from 'react';
import { 
  Calendar, 
  Ticket, 
  PlusCircle, 
  LayoutDashboard, 
  Sparkles, 
  ShieldCheck, 
  Crown,
  LogIn,
  UserPlus,
  User,
  X,
  Lock,
  Mail,
  LogOut,
  ChevronDown,
  Armchair,
  UtensilsCrossed,
  Menu,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, ticketCount = 0 }) {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'attendee'
  });
  
  // Logged-in user state (mock state for interactive UI)
  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // 1. Primary Public Navigation Tabs (Shown in main navbar)
  const primaryNavItems = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'seats', label: 'Seat Selection', icon: Armchair },
    { id: 'food', label: 'Food Booking', icon: UtensilsCrossed },
    { id: 'tickets', label: 'My Tickets', icon: Ticket, badge: ticketCount },
  ];

  // 2. Admin & Management Tools (Exclusively inside the Hamburger Menu)
  const hamburgerItems = [
    { 
      id: 'create', 
      label: 'Create Event', 
      icon: PlusCircle, 
      desc: 'Publish and launch a new luxury event' 
    },
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      desc: 'Live attendance scan & check-in monitor' 
    },
    { 
      id: 'admin', 
      label: 'Admin Panel', 
      icon: ShieldCheck, 
      desc: 'Seat capacity, pricing & revenue control' 
    },
  ];

  const isManagementActive = hamburgerItems.some((item) => item.id === activeTab);

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.password) return;

    setUser({
      name: authMode === 'signup' && authForm.name ? authForm.name : (authForm.email.split('@')[0] || 'User'),
      email: authForm.email,
      role: authForm.role
    });

    setIsAuthModalOpen(false);
    setAuthForm({ name: '', email: '', password: '', role: 'attendee' });
  };

  const handleLogout = () => {
    setUser(null);
    setIsUserMenuOpen(false);
  };

  const handleHamburgerSelect = (id) => {
    setActiveTab(id);
    setIsHamburgerOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo - Rajmudra Events / Golden Aura */}
          <div 
            onClick={() => setActiveTab('events')} 
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#E5B84B] rounded-2xl blur-md opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300" />
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#C59325] via-[#E5B84B] to-[#F3E5AB] flex items-center justify-center text-[#1A1614] shadow-md border border-[#F3E5AB]/40 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
                <Crown className="w-5 h-5 fill-current text-[#1A1614]" />
              </div>
            </div>
            <div>
              <span className="font-black text-xl sm:text-2xl tracking-tight block leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#E5B84B] to-[#D4A337] drop-shadow-md">
                Rajmudra Events
              </span>
              <span className="text-[10px] font-bold text-[#E5B84B]/90 block tracking-[0.2em] uppercase drop-shadow-sm">
                Luxury &amp; Grand Experiences
              </span>
            </div>
          </div>

          {/* Floating Pill Capsule Navigation Tabs */}
          <nav className="hidden md:flex relative bg-black/40 backdrop-blur-2xl border border-white/20 shadow-xl shadow-black/20 rounded-full p-1.5 items-center gap-1 sm:gap-1.5 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isHovered = hoveredTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`group relative px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 select-none shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4A337] via-[#E5B84B] to-[#D4A337] text-[#1A1614] shadow-md shadow-[#D4A337]/35 scale-[1.03]'
                      : 'text-white/80 hover:text-white hover:bg-white/15 hover:scale-105 active:scale-95'
                  }`}
                >
                  {/* Active Aura / Glow dot */}
                  {isActive && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#E5B84B] rounded-full blur-[1px] animate-pulse" />
                  )}

                  {/* Icon */}
                  <Icon 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive 
                        ? 'text-[#1A1614] stroke-[2.5]' 
                        : isHovered 
                          ? 'text-[#E5B84B] scale-110 -rotate-6' 
                          : 'text-white/70'
                    }`} 
                  />

                  {/* Label */}
                  <span className={`tracking-wide transition-colors duration-200 ${isActive ? 'font-black text-[#1A1614]' : ''}`}>
                    {item.label}
                  </span>

                  {/* Badge Notification */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span 
                      className={`ml-0.5 text-[10px] px-1.5 py-0.2 rounded-full font-black shadow-sm transition-all duration-300 ${
                        isActive
                          ? 'bg-[#1A1614] text-[#F3E5AB]'
                          : 'bg-gradient-to-r from-[#D4A337] to-[#B8860B] text-white animate-pulse'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section: Hamburger Menu + Auth Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* Hamburger Button for Admin, Dashboard & Create Event */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
                title="Organizer & Admin Tools"
                className={`relative px-3.5 py-2.5 rounded-full border text-xs font-black flex items-center gap-2 transition-all duration-300 shadow-sm ${
                  isHamburgerOpen || isManagementActive
                    ? 'bg-gradient-to-r from-[#D4A337] via-[#E5B84B] to-[#D4A337] text-[#1A1614] border-[#F3E5AB] shadow-md shadow-[#E5B84B]/30 scale-105'
                    : 'bg-white/90 text-[#5C4E46] border-[#E5B84B]/40 hover:bg-[#E5B84B]/15 hover:text-[#96660F] hover:border-[#E5B84B]'
                }`}
              >
                {/* Pulsing indicator if currently in management tab */}
                {isManagementActive && !isHamburgerOpen && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                )}

                {isHamburgerOpen ? (
                  <X className="w-4 h-4 text-[#1A1614] stroke-[2.5]" />
                ) : (
                  <Menu className={`w-4 h-4 transition-transform duration-300 ${isManagementActive ? 'text-[#1A1614]' : 'text-[#B8860B]'}`} />
                )}

                <span className="hidden sm:inline font-black tracking-wide">
                  {isManagementActive ? 'Admin Tools' : 'Menu'}
                </span>
              </button>

              {/* Hamburger Dropdown Drawer (Create Event, Dashboard, Admin Panel) */}
              {isHamburgerOpen && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-[#241D1A] rounded-3xl shadow-2xl border border-[#E5B84B]/40 p-3.5 space-y-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3.5 py-2.5 border-b border-[#E5B84B]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#D1C7BD] block">Management Suite</span>
                      <h4 className="text-sm font-extrabold text-[#F3E5AB]">Admin & Host Controls</h4>
                    </div>
                    <SlidersHorizontal className="w-4 h-4 text-[#E5B84B]" />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {hamburgerItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleHamburgerSelect(item.id)}
                          className={`w-full p-3 rounded-2xl text-left transition-all duration-200 flex items-center justify-between group border ${
                            isActive
                              ? 'bg-[#E5B84B]/20 border-[#E5B84B]/60 text-white shadow-md'
                              : 'bg-[#1A1614] border-[#E5B84B]/15 hover:border-[#E5B84B]/40 hover:bg-[#2C221E] text-[#D1C7BD]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                              isActive
                                ? 'bg-gradient-to-tr from-[#D4A337] to-[#E5B84B] text-[#1A1614]'
                                : 'bg-[#2C221E] text-[#E5B84B] border border-[#E5B84B]/30'
                            }`}>
                              <Icon className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <div>
                              <p className={`font-extrabold text-xs sm:text-sm leading-tight ${isActive ? 'text-[#F3E5AB]' : 'text-white group-hover:text-[#F3E5AB]'}`}>
                                {item.label}
                              </p>
                              <p className="text-[10px] text-[#A39485] line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </div>

                          <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-[#E5B84B]' : 'text-[#6B5B52]'}`} />
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 bg-[#1A1614] rounded-2xl border border-[#E5B84B]/15 text-center">
                    <p className="text-[10px] text-[#A39485]">
                      🔒 Secure role-based management panel
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Auth Buttons / User Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/50 border border-white/20 hover:border-[#E5B84B] shadow-sm transition-all duration-200 backdrop-blur-md"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D4A337] to-[#F3E5AB] flex items-center justify-center text-[#1A1614] font-black text-xs shadow-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-[#2C221E] max-w-[90px] truncate hidden sm:inline">
                    {user.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 p-2 space-y-1 z-50 text-white animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-xs font-black text-white">{user.name}</p>
                      <p className="text-[10px] text-white/60 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { setActiveTab('tickets'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:bg-white/15 hover:text-[#E5B84B] flex items-center gap-2 transition"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>My Passes &amp; Tickets</span>
                    </button>
                    <button
                      onClick={() => { setActiveTab('admin'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:bg-white/15 hover:text-[#E5B84B] flex items-center gap-2 transition"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Admin Dashboard</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/20 flex items-center gap-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => handleOpenAuth('login')}
                  className="px-3 sm:px-4 py-2 rounded-full text-xs font-bold text-[#5C4E46] hover:text-[#96660F] hover:bg-[#E5B84B]/15 border border-transparent hover:border-[#E5B84B]/40 transition-all duration-300 flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span className="hidden sm:inline">Log In</span>
                </button>

                <button
                  onClick={() => handleOpenAuth('signup')}
                  className="relative group overflow-hidden px-3.5 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-xs shadow-md shadow-[#D4A337]/30 hover:shadow-xl hover:shadow-[#D4A337]/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 border border-[#F3E5AB]/40"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#1A1614]" />
                  <span>Sign In</span>
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Mobile View Tab Bar for Primary Tabs */}
        <div className="md:hidden border-t border-[#E5B84B]/20 px-4 py-2 bg-white/60 overflow-x-auto flex items-center gap-1.5">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4A337] to-[#E5B84B] text-[#1A1614] shadow-sm'
                    : 'text-white/80 hover:bg-white/15'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Auth Modal (Log In & Sign In / Register) */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5B84B]/40 relative">
            <button
              onClick={() => setIsAuthModalOpen(false)}
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

            <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs sm:text-sm">
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
      )}
    </>
  );
}
