import React, { useState } from 'react';
import { 
  Calendar, 
  Ticket, 
  PlusCircle, 
  LayoutDashboard, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Crown
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, ticketCount = 0 }) {
  const [hoveredTab, setHoveredTab] = useState(null);

  const navItems = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'tickets', label: 'My Tickets', icon: Ticket, badge: ticketCount },
    { id: 'create', label: 'Create Event', icon: PlusCircle },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin', label: 'Admin Panel', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/80 backdrop-blur-xl border-b border-[#E5B84B]/20 transition-all duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo - Golden Aura with Luxury Typography */}
        <div 
          onClick={() => setActiveTab('events')} 
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="relative">
            {/* Glow Aura behind logo icon */}
            <div className="absolute inset-0 bg-[#E5B84B] rounded-2xl blur-md opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-300" />
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#C59325] via-[#E5B84B] to-[#F3E5AB] flex items-center justify-center text-[#1A1614] shadow-md border border-[#F3E5AB]/40 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
              <Crown className="w-5 h-5 fill-current text-[#1A1614]" />
            </div>
          </div>
          <div>
            <span className="font-black text-xl sm:text-2xl tracking-tight block leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#D4A337] to-[#8C6207] group-hover:from-[#96660F] group-hover:to-[#D4A337] transition-all duration-300">
              Golden Aura
            </span>
            <span className="text-[10px] font-bold text-[#8C7A6B] block tracking-[0.2em] uppercase">
              Curated Luxury Events
            </span>
          </div>
        </div>

        {/* Floating Pill Capsule Navigation (Inspired by reference design) */}
        <div className="flex items-center gap-3">
          <nav className="relative bg-white/85 backdrop-blur-2xl border border-[#E5B84B]/30 shadow-lg shadow-[#E5B84B]/10 rounded-full p-1.5 flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full">
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
                      : 'text-[#5C4E46] hover:text-[#96660F] hover:bg-[#E5B84B]/15 hover:scale-105 active:scale-95'
                  }`}
                >
                  {/* Active Aura / Glow effect */}
                  {isActive && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#E5B84B] rounded-full blur-[1px] animate-pulse" />
                  )}

                  {/* Icon with smooth rotate/scale on hover */}
                  <Icon 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive 
                        ? 'text-[#1A1614] stroke-[2.5]' 
                        : isHovered 
                          ? 'text-[#B8860B] scale-110 -rotate-6' 
                          : 'text-[#8C7A6B]'
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

          {/* Quick CTA Action Button ("Book Consultation" in Golden Ochre) */}
          <div className="hidden lg:flex items-center pl-1">
            <button
              onClick={() => setActiveTab('events')}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-xs shadow-md shadow-[#D4A337]/30 hover:shadow-xl hover:shadow-[#D4A337]/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 border border-[#F3E5AB]/40"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current text-[#1A1614] group-hover:rotate-12 transition-transform duration-300" />
              <span>Book Consultation</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
