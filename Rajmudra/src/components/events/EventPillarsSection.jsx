import React from 'react';
import { motion } from 'framer-motion';

export default function EventPillarsSection({ onSelectCategory }) {
  return (
    <section className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#C9932B] tracking-tight">
          Our Services
        </h2>
        <p className="text-xs sm:text-base text-[#756E65]">
          Tailored campus verticals designed to elevate developer skillsets, corporate networking, and grand fest celebrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pillar 1 */}
        <motion.div 
          className="bg-white p-6 sm:p-7 rounded-[2rem] border border-[#EFE8D8] shadow-xl shadow-amber-900/5 hover:shadow-2xl hover:shadow-[#C9932B]/15 transition-all duration-500 flex flex-col justify-between group"
          whileHover={{ y: -8 }}
        >
          <div>
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60"
                alt="Luxury Weddings & Cultural Fests"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#C9932B] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                01 • CULTURE
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#C9932B] text-center mb-2">
              Luxury Weddings &amp; Fests
            </h3>
            <p className="text-xs sm:text-sm text-[#756E65] text-center leading-relaxed mb-6">
              Elegant music galas, live concert celebrations, drama performances, and annual campus fests planned with premium decor.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => onSelectCategory('Cultural')}
            className="w-full py-3 rounded-full bg-[#C9932B] hover:bg-[#b58021] text-white text-xs font-bold transition-all shadow-md shadow-[#C9932B]/20 text-center cursor-pointer"
          >
            Browse Cultural Events
          </button>
        </motion.div>

        {/* Pillar 2 */}
        <motion.div 
          className="bg-white p-6 sm:p-7 rounded-[2rem] border border-[#EFE8D8] shadow-xl shadow-amber-900/5 hover:shadow-2xl hover:shadow-[#C9932B]/15 transition-all duration-500 flex flex-col justify-between group"
          whileHover={{ y: -8 }}
        >
          <div>
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60"
                alt="Corporate Events & Seminars"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#C9932B] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                02 • CORPORATE
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#C9932B] text-center mb-2">
              Corporate Events
            </h3>
            <p className="text-xs sm:text-sm text-[#756E65] text-center leading-relaxed mb-6">
              Professional conferences, cloud technology launches, developer labs, and networking summits with industry leaders.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => onSelectCategory('Seminar')}
            className="w-full py-3 rounded-full bg-[#C9932B] hover:bg-[#b58021] text-white text-xs font-bold transition-all shadow-md shadow-[#C9932B]/20 text-center cursor-pointer"
          >
            Browse Corporate Seminars
          </button>
        </motion.div>

        {/* Pillar 3 */}
        <motion.div 
          className="bg-white p-6 sm:p-7 rounded-[2rem] border border-[#EFE8D8] shadow-xl shadow-amber-900/5 hover:shadow-2xl hover:shadow-[#C9932B]/15 transition-all duration-500 flex flex-col justify-between group"
          whileHover={{ y: -8 }}
        >
          <div>
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60"
                alt="Hackathons & Birthday Parties"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#C9932B] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                03 • HACKATHONS
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#C9932B] text-center mb-2">
              Hackathons &amp; Parties
            </h3>
            <p className="text-xs sm:text-sm text-[#756E65] text-center leading-relaxed mb-6">
              Creative 24-hour coding sprints, AI hackathons, and high-energy celebrations tailored for every age and style.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => onSelectCategory('Hackathon')}
            className="w-full py-3 rounded-full bg-[#C9932B] hover:bg-[#b58021] text-white text-xs font-bold transition-all shadow-md shadow-[#C9932B]/20 text-center cursor-pointer"
          >
            Browse Hackathons
          </button>
        </motion.div>
      </div>
    </section>
  );
}
