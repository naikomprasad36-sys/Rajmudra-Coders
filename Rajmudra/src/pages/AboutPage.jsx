import React from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Users, 
  Target, 
  Compass, 
  Heart, 
  Calendar, 
  UtensilsCrossed, 
  Armchair, 
  QrCode,
  ArrowRight
} from 'lucide-react';

export default function AboutPage({ onExploreEvents }) {
  const stats = [
    { label: 'Grand Events Organized', value: '50+', icon: Calendar },
    { label: 'Digital Passes Issued', value: '10,000+', icon: QrCode },
    { label: 'Gate Check-In Speed', value: '< 2 Sec', icon: ShieldCheck },
    { label: 'Guest Satisfaction', value: '4.9 / 5.0', icon: Award }
  ];

  const pillars = [
    {
      icon: Crown,
      title: 'Luxury & Grandeur',
      description: 'We craft immersive event environments infused with royal golden aesthetics, premium stage setups, and unforgettable atmosphere.'
    },
    {
      icon: QrCode,
      title: 'Seamless Digital Passes',
      description: 'Instant SVG QR ticket pass generation with live check-in monitoring for instant gate verification.'
    },
    {
      icon: Armchair,
      title: 'Interactive Seat Booking',
      description: 'Real-time hall and theater seat reservation across VIP Lounges, Premium, and Classic comfort rows.'
    },
    {
      icon: UtensilsCrossed,
      title: 'Royal Banquet Catering',
      description: 'Pre-bookable gourmet catering boxes and refreshments delivered directly to banquet tables.'
    }
  ];

  const team = [
    {
      name: 'Rajmudra Executive Board',
      role: 'Founders & Creative Directors',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=60',
      bio: 'Pioneering luxury campus galas, national hackathons, and corporate summits.'
    },
    {
      name: 'Engineering & Pass Lab',
      role: 'Digital Innovation Team',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60',
      bio: 'Building real-time event infrastructure, QR ticket verification, and backend sync.'
    },
    {
      name: 'Royal Hospitality Guild',
      role: 'Guest Operations & Catering',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=60',
      bio: 'Curating world-class banquet experiences and seamless attendee gate check-in.'
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-300 pb-16">
      
      {/* 1. HERO BANNER SECTION */}
      <div className="relative bg-gradient-to-r from-[#241D1A] via-[#352822] to-[#241D1A] text-white rounded-3xl p-8 sm:p-14 border border-[#E5B84B]/30 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#E5B84B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5B84B]/20 border border-[#E5B84B]/40 text-[#F3E5AB] text-xs font-black uppercase tracking-widest">
            <Crown className="w-4 h-4 text-[#E5B84B]" />
            <span>About Rajmudra Events</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5AB] to-[#E5B84B] leading-tight">
            Redefining Luxury &amp; Technological Grandeur
          </h1>

          <p className="text-[#D1C7BD] text-xs sm:text-base leading-relaxed font-medium">
            Rajmudra Events is a premier event management portal designed to blend opulent aesthetic design with cutting-edge real-time ticketing, seat selection, and digital pass verification.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={onExploreEvents}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4A337] via-[#E5B84B] to-[#D4A337] text-[#1A1614] font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-[#E5B84B]/20 hover:scale-105 transition transform active:scale-95"
            >
              <span>Explore Upcoming Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. STATS GRID SECTION */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-3xl border border-[#EFE8D8] shadow-lg shadow-amber-900/5 flex flex-col items-center text-center space-y-2 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C9932B] flex items-center justify-center font-bold border border-[#E5DAC6] group-hover:scale-110 transition">
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-2xl sm:text-3xl font-serif font-black text-[#1F1A14]">{stat.value}</p>
              <p className="text-xs text-[#756E65] font-semibold">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* 3. OUR STORY & MISSION */}
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#EFE8D8] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2ECE1] text-[#C9932B] text-xs font-bold border border-[#E5DAC6]">
            <Compass className="w-3.5 h-3.5" />
            <span>OUR VISION &amp; HERITAGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1F1A14] tracking-tight leading-snug">
            Crafting Extraordinary Experiences For Campus &amp; Beyond
          </h2>

          <p className="text-xs sm:text-sm text-[#756E65] leading-relaxed">
            Founded with the belief that every celebration, hackathon, and summit deserves royalty-tier execution, Rajmudra Events combines artistic vision with full-stack digital tools.
          </p>

          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-amber-100 text-[#C9932B] flex items-center justify-center shrink-0 mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1F1A14]">Precision Gate Control</h4>
                <p className="text-xs text-[#756E65]">Real-time attendance scanning and ticket verification.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-amber-100 text-[#C9932B] flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1F1A14]">Unmatched Guest Comfort</h4>
                <p className="text-xs text-[#756E65]">Interactive seat maps, royal banquet food ordering, and VIP lounge passes.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#C9932B]/30 to-[#E5C378]/30 rounded-[2.5rem] blur-xl opacity-70" />
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80"
            alt="Rajmudra Event Gala"
            className="relative rounded-[2rem] shadow-2xl border-4 border-white object-cover h-80 sm:h-96 w-full"
          />
        </div>
      </div>

      {/* 4. CORE PILLARS SECTION */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C9932B]">PILLARS OF EXCELLENCE</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1F1A14]">Why Rajmudra Stands Apart</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-[#241D1A] text-white p-7 rounded-3xl border border-[#E5B84B]/20 shadow-xl flex flex-col justify-between space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4A337] to-[#E5B84B] text-[#1A1614] flex items-center justify-center font-black shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-[#F3E5AB] group-hover:text-white transition">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#D1C7BD] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 5. TEAM & ORGANIZERS SECTION */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C9932B]">OUR ORGANIZING TEAMS</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1F1A14]">The Minds Behind The Aura</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-[#EFE8D8] overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-[#F3E5AB] uppercase tracking-wider">
                  {member.role}
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-serif font-black text-[#1F1A14]">{member.name}</h3>
                <p className="text-xs text-[#756E65] leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. CALL TO ACTION FOOTER */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-stone-950 rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-2xl border border-white/40">
        <div className="w-14 h-14 rounded-2xl bg-stone-950 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-serif font-black">Ready To Experience Golden Aura Events?</h2>
          <p className="text-xs sm:text-sm font-semibold text-stone-900">
            Discover upcoming hackathons, workshops, and grand galas, or publish your own event with live pass verification.
          </p>
        </div>
        <button
          onClick={onExploreEvents}
          className="px-8 py-3.5 bg-stone-950 hover:bg-stone-900 text-amber-300 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
        >
          <span>Browse Available Events</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
