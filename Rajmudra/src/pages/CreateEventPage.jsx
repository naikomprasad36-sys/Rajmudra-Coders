import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Tag, Sparkles, Lock, ShieldCheck, Crown, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateEventPage({ onAddEvent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Workshop',
    date: '',
    time: '',
    venue: '',
    totalSeats: '',
    price: 0,
    banner: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.venue) return;

    onAddEvent({
      ...formData,
      id: Date.now(),
      totalSeats: Number(formData.totalSeats) || 50,
      availableSeats: Number(formData.totalSeats) || 50,
      price: Number(formData.price) || 0
    });
  };

  return (
    <div className="relative min-h-[82vh] overflow-hidden px-4 sm:px-6 py-8 flex items-center justify-center">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, 90, -50, 0],
            y: [0, 60, -40, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[35rem] h-[35rem] bg-gradient-to-br from-amber-400/40 via-yellow-500/30 to-amber-600/40 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.25, 0.65, 0.25],
            x: [0, -100, 60, 0],
            y: [0, -80, 50, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-32 w-[38rem] h-[38rem] bg-gradient-to-tr from-amber-500/35 via-orange-400/25 to-yellow-300/35 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 70, -70, 0],
            y: [0, 70, -50, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 left-1/4 w-[32rem] h-[32rem] bg-amber-600/25 rounded-full blur-[110px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-xl flex items-center justify-center">
       
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-gradient-to-b from-white/95 via-amber-50/50 to-white/95 backdrop-blur-3xl p-6 sm:p-8 rounded-[2.5rem] border-2 border-amber-500/50 shadow-[0_25px_60px_rgba(245,158,11,0.22)] relative"
        >
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-all flex items-center gap-1.5 text-xs font-black shadow-md border border-amber-300/60"
            title="Lock Portal"
          >
            <Lock className="w-3.5 h-3.5 text-amber-700" /> Lock Portal
          </button>

          <div className="flex items-center gap-3.5 mb-6 pr-24">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/40 border border-amber-200/50">
              <Crown className="w-6 h-6 drop-shadow-sm" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider rounded-md border border-amber-300">
                  Exclusive Creator Hub
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1E1914] tracking-tight mt-1 bg-gradient-to-r from-amber-600 via-amber-800 to-[#1E1914] bg-clip-text text-transparent">
                Publish Royal Event
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-600" /> Event Title &amp; Signature Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Golden Aura Royal Gala &amp; Tech Summit 2026"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-white/95 border-2 border-amber-500/30 rounded-2xl text-xs sm:text-sm text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20 transition-all shadow-sm font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-black text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600" /> Category Tier
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white/95 border-2 border-amber-500/30 rounded-2xl text-xs sm:text-sm text-[#2C2416] focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20 transition-all shadow-sm font-bold cursor-pointer"
                >
                  <option>Workshop</option>
                  <option>Hackathon</option>
                  <option>Seminar</option>
                  <option>Cultural</option>
                  <option>Summit</option>
                  <option>Fest</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-600" /> Grand Capacity (Seats)
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 250"
                  value={formData.totalSeats}
                  onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                  className="w-full px-4 py-3 bg-white/95 border-2 border-amber-500/30 rounded-2xl text-xs sm:text-sm text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20 transition-all shadow-sm font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-black text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" /> Royal Event Date
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 28 Aug 2026"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-white/95 border-2 border-amber-500/30 rounded-2xl text-xs sm:text-sm text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20 transition-all shadow-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Schedule Time
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 11:00 AM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 bg-white/95 border-2 border-amber-500/30 rounded-2xl text-xs sm:text-sm text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20 transition-all shadow-sm font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-stone-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" /> Elite Venue / Hall Location
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Grand Imperial Ballroom, Golden Aura Resort"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-4 py-3 bg-white/95 border-2 border-amber-500/30 rounded-2xl text-xs sm:text-sm text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20 transition-all shadow-sm font-bold"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-3 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black rounded-2xl text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-amber-500/35 transition-all flex items-center justify-center gap-2 border border-amber-200/40"
            >
              <Sparkles className="w-4 h-4" /> Broadcast &amp; Publish Event 
            </motion.button>
          </form>
        </motion.div>

       
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
              transition={{ duration: 0.35 }}
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 z-20 bg-gradient-to-br from-amber-950/75 via-amber-900/60 to-black/80 backdrop-blur-lg rounded-[2.5rem] border-2 border-amber-400/80 shadow-[0_30px_70px_rgba(217,119,6,0.4)] flex flex-col items-center justify-center text-center p-8 cursor-pointer group overflow-hidden"
            >
             
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.18)_0%,transparent_70%)] pointer-events-none" />

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-white shadow-2xl shadow-amber-500/60 mb-5 border-2 border-white/60 group-hover:scale-110 transition-transform"
              >
                <Lock className="w-10 h-10 drop-shadow-lg" />
              </motion.div>
              
              <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-[10px] font-black uppercase tracking-widest mb-2 shadow-inner">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Secure Luxury Access Portal
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide drop-shadow-lg mb-2">
                Golden Aura Shield
              </h3>
              <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-sm drop-shadow leading-relaxed mb-6">
                This portal is securely locked. Click anywhere on this shield to unlock and create your elite luxury event.
              </p>
              
              <motion.span 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs sm:text-sm font-black rounded-2xl tracking-widest uppercase transition-all shadow-xl shadow-amber-500/40 border border-white/80 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-stone-950" /> Unlock Portal Now 
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
