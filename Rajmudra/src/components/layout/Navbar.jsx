import React, { useState } from 'react';
import { 
  Calendar, 
  Ticket, 
  PlusCircle, 
  LayoutDashboard, 
  ShieldCheck, 
  Crown,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Armchair,
  UtensilsCrossed,
  Menu,
  X,
  SlidersHorizontal,
  ChevronRight,
  Info,
  Lock
} from 'lucide-react';
import AuthModal from '../common/AuthModal';

export default function Navbar({ activeTab, setActiveTab, ticketCount = 0, user, setUser }) {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [isAdminLoginMode, setIsAdminLoginMode] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'attendee'
  });
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Primary Public Navigation Tabs
  const primaryNavItems = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'seats', label: 'Seat Selection', icon: Armchair },
    { id: 'food', label: 'Food Booking', icon: UtensilsCrossed },
    { id: 'tickets', label: 'My Tickets', icon: Ticket, badge: ticketCount },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  // Admin & Management Tools (Hamburger Menu)
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

  // Open User Auth Modal (For Normal Attendees)
  const handleOpenUserAuth = (mode = 'login') => {
    setIsAdminLoginMode(false);
    setAuthMode(mode);
    setAuthForm({ name: '', email: '', password: '', role: 'attendee' });
    setIsAuthModalOpen(true);
  };

  // Open Dedicated Admin Auth Modal (Requires rajmudra@gmail.com & rajmudra)
  const handleOpenAdminAuth = () => {
    setIsAdminLoginMode(true);
    setAuthMode('login');
    setAuthForm({ name: '', email: '', password: '', role: 'admin' });
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    if (setUser) setUser(null);
    setIsUserMenuOpen(false);
    setIsHamburgerOpen(false);
  };

  const handleHamburgerButtonClick = () => {
    if (user?.role === 'admin') {
      setIsHamburgerOpen(!isHamburgerOpen);
    } else {
      handleOpenAdminAuth();
    }
  };

  const handleHamburgerSelect = (id) => {
    if (user?.role === 'admin') {
      setActiveTab(id);
      setIsHamburgerOpen(false);
    } else {
      setIsHamburgerOpen(false);
      handleOpenAdminAuth();
    }
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#120E0C]/90 backdrop-blur-xl border-b border-[#E5B84B]/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('events')} 
            className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#E5B84B] rounded-2xl blur-md opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-300" />
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#C59325] via-[#E5B84B] to-[#F3E5AB] flex items-center justify-center text-[#1A1614] shadow-[0_0_15px_rgba(229,184,75,0.4)] border border-[#F3E5AB]/40 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
                <Crown className="w-5 h-5 fill-current text-[#1A1614]" />
              </div>
            </div>
            <div>
              <span className="font-serif font-black text-xl sm:text-2xl tracking-tight block leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#E5B84B] to-[#D4A337] drop-shadow-md">
                Rajmudra Events
              </span>
              <span className="text-[9px] font-bold text-[#E5B84B]/90 block tracking-[0.25em] uppercase drop-shadow-sm">
                Luxury &amp; Grand Experiences
              </span>
            </div>
          </div>

          {/* Professional Navigation Capsule */}
          <nav className="hidden lg:flex relative bg-[#1A1614]/90 backdrop-blur-2xl border border-[#E5B84B]/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)] rounded-full p-1 lg:p-1.5 items-center gap-0.5 lg:gap-1 scrollbar-none shrink-0">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isHovered = hoveredTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`group relative px-2.5 lg:px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-bold transition-all duration-300 flex items-center gap-1.5 select-none shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4A337] via-[#E5B84B] to-[#D4A337] text-[#1A1614] shadow-[0_2px_10px_rgba(212,163,55,0.4)] scale-[1.02]'
                      : 'text-white/80 hover:text-[#F3E5AB] hover:bg-white/10 active:scale-95'
                  }`}
                >
                  {isActive && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#E5B84B] rounded-full blur-[1px] animate-pulse" />
                  )}

                  <Icon 
                    className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300 ${
                      isActive 
                        ? 'text-[#1A1614] stroke-[2.5]' 
                        : isHovered 
                          ? 'text-[#E5B84B] scale-110 -rotate-6' 
                          : 'text-[#E5B84B]/75'
                    }`} 
                  />

                  <span className={`tracking-wide transition-colors duration-200 ${isActive ? 'font-black text-[#1A1614]' : ''}`}>
                    {item.label}
                  </span>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span 
                      className={`ml-0.5 text-[9px] lg:text-[10px] px-1.5 py-0.2 rounded-full font-black shadow-sm transition-all duration-300 ${
                        isActive
                          ? 'bg-[#1A1614] text-[#F3E5AB] border border-[#E5B84B]/40'
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

          {/* Right Section: Admin Lock Button + User Auth / Profile Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* 1. SEPARATE ADMIN SECTION LOCK BUTTON */}
            <div className="relative">
              <button
                type="button"
                onClick={handleHamburgerButtonClick}
                title={user?.role === 'admin' ? 'Organizer & Admin Suite' : 'Admin Login Required (rajmudra@gmail.com)'}
                className={`relative px-3 sm:px-3.5 py-2 rounded-full border text-xs font-black flex items-center gap-1.5 transition-all duration-300 shadow-md ${
                  user?.role === 'admin'
                    ? 'bg-gradient-to-r from-[#D4A337] via-[#E5B84B] to-[#D4A337] text-[#1A1614] border-[#F3E5AB] shadow-[#E5B84B]/30 scale-105'
                    : 'bg-[#1A1614] text-[#F3E5AB] border-[#E5B84B]/40 hover:border-[#E5B84B] hover:bg-[#2C221E]'
                }`}
              >
                {user?.role === 'admin' ? (
                  isHamburgerOpen ? (
                    <X className="w-4 h-4 text-[#1A1614] stroke-[2.5]" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-[#1A1614] stroke-[2.5]" />
                  )
                ) : (
                  <Lock className="w-4 h-4 text-[#E5B84B]" />
                )}

                <span className="hidden sm:inline font-black tracking-wide">
                  {user?.role === 'admin' ? 'Admin Tools' : 'Admin Lock'}
                </span>
              </button>

              {/* Admin Tools Dropdown Drawer (Only unlocked when Boss Admin logs in) */}
              {isHamburgerOpen && user?.role === 'admin' && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-[#1F1916]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-[#E5B84B]/40 p-3.5 space-y-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3.5 py-2.5 border-b border-[#E5B84B]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#D1C7BD] block">Management Suite</span>
                      <h4 className="text-sm font-extrabold text-[#F3E5AB]">👑 Boss Admin Controls</h4>
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
                    <p className="text-[10px] text-[#F3E5AB] font-bold">
                      👑 Authenticated as Boss (rajmudra@gmail.com)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. SEPARATE USER AUTHENTICATION / PROFILE BADGE */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full border shadow-md transition-all duration-200 backdrop-blur-md ${
                    user.role === 'admin'
                      ? 'bg-gradient-to-r from-[#D4A337] via-[#E5B84B] to-[#D4A337] text-[#1A1614] border-[#F3E5AB]'
                      : 'bg-[#1A1614]/90 text-[#F3E5AB] border-[#E5B84B]/40 hover:border-[#E5B84B]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shadow-xs ${
                    user.role === 'admin' 
                      ? 'bg-[#1A1614] text-[#F3E5AB]' 
                      : 'bg-gradient-to-tr from-[#D4A337] to-[#F3E5AB] text-[#1A1614]'
                  }`}>
                    {user.role === 'admin' ? '👑' : user.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-xs font-black drop-shadow-sm max-w-[110px] truncate hidden sm:inline">
                    {user.role === 'admin' ? '👑 Boss' : user.name}
                  </span>

                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${user.role === 'admin' ? 'text-[#1A1614]' : 'text-[#E5B84B]'} ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1A1614]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-[#E5B84B]/40 p-2 space-y-1 z-50 text-white animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-[#E5B84B]/20">
                      <p className="text-xs font-black text-[#F3E5AB] flex items-center justify-between">
                        <span>{user.role === 'admin' ? '👑 Boss' : user.name}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#E5B84B]/20 text-[#E5B84B] uppercase font-bold">
                          {user.role}
                        </span>
                      </p>
                      <p className="text-[10px] text-[#D1C7BD] truncate mt-0.5">{user.email}</p>
                    </div>

                    <button
                      onClick={() => { setActiveTab('tickets'); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#D1C7BD] hover:bg-[#E5B84B]/20 hover:text-[#F3E5AB] flex items-center gap-2 transition"
                    >
                      <Ticket className="w-3.5 h-3.5 text-[#E5B84B]" />
                      <span>My Passes &amp; Tickets</span>
                    </button>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => { setActiveTab('admin'); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#D1C7BD] hover:bg-[#E5B84B]/20 hover:text-[#F3E5AB] flex items-center gap-2 transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#E5B84B]" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <div className="pt-1 border-t border-[#E5B84B]/15">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/20 flex items-center gap-2 transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Single Combined User Sign In / Log In Button */
              <button
                onClick={() => handleOpenUserAuth('login')}
                className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-xs shadow-md shadow-[#D4A337]/30 hover:shadow-xl hover:shadow-[#D4A337]/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 border border-[#F3E5AB]/40 shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#1A1614]" />
                <span>User Sign In / Log In</span>
              </button>
            )}

          </div>

        </div>

        {/* Mobile & Tablet View Tab Bar */}
        <div className="lg:hidden border-t border-[#E5B84B]/30 px-4 py-2 bg-[#1A1614]/95 backdrop-blur-md overflow-x-auto scrollbar-none flex items-center justify-between gap-1.5">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4A337] to-[#E5B84B] text-[#1A1614] shadow-sm font-black'
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => { setIsAuthModalOpen(false); }}
        authMode={authMode}
        setAuthMode={setAuthMode}
        authForm={authForm}
        setAuthForm={setAuthForm}
        isAdminLoginMode={isAdminLoginMode}
        onSuccessLogin={(loggedInUser) => {
          if (setUser) setUser(loggedInUser);
        }}
      />
    </>
  );
}
