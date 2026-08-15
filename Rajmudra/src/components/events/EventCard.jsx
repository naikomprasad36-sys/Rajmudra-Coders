import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Ticket, ArrowUpRight } from 'lucide-react';

export default function EventCard({ event, onBook }) {
  const isSoldOut = event.availableSeats <= 0;
  const occupancyPercentage = Math.round(
    ((event.totalSeats - event.availableSeats) / (event.totalSeats || 1)) * 100
  );

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1 }
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[2rem] border border-[#EFE8D8] overflow-hidden shadow-xl shadow-amber-900/5 hover:shadow-2xl hover:shadow-[#C9932B]/15 hover:border-[#C9932B]/50 transition-all duration-500 flex flex-col justify-between"
    >
      <div>
        {/* Poster Image with Hover Zoom */}
        <div className="relative h-64 w-full bg-[#F9F6F0] overflow-hidden">
          <img
            src={event.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'}
            alt={event.title}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60';
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A14]/85 via-transparent to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-4 inset-x-4 flex justify-between items-center gap-2">
            <span className="bg-[#C9932B] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              {event.category}
            </span>
            <span
              className={`text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md ${
                isSoldOut
                  ? 'bg-rose-600 text-white'
                  : 'bg-[#1F1A14] text-[#E5C378]'
              }`}
            >
              {isSoldOut ? 'Sold Out' : `${event.availableSeats} Seats Left`}
            </span>
          </div>

          {/* Title on Poster Overlay */}
          <h3 className="absolute bottom-4 inset-x-5 text-white font-serif font-bold text-xl leading-snug line-clamp-2 drop-shadow-sm">
            {event.title}
          </h3>
        </div>

        {/* Details Section */}
        <div className="p-6 sm:p-7 space-y-4">
          <div className="space-y-2.5 text-xs text-[#756E65]">
            <div className="flex items-center gap-2.5 font-medium">
              <Calendar className="w-4 h-4 text-[#C9932B] shrink-0" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-2.5 font-medium">
              <MapPin className="w-4 h-4 text-[#C9932B] shrink-0" />
              <span className="truncate text-[#1F1A14] font-semibold">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2.5 font-medium">
              <Users className="w-4 h-4 text-[#C9932B] shrink-0" />
              <span>{event.totalSeats} Total Capacity</span>
            </div>
          </div>

          {/* Capacity Progress */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] font-bold text-[#756E65]">
              <span>Capacity Fill</span>
              <span className={occupancyPercentage > 85 ? 'text-rose-600' : 'text-[#C9932B]'}>
                {occupancyPercentage}% Filled
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F9F6F0] rounded-full overflow-hidden border border-[#EFE8D8]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  occupancyPercentage > 85 ? 'bg-rose-600' : 'bg-[#C9932B]'
                }`}
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 sm:p-7 pt-0 mt-auto">
        <div className="pt-4 border-t border-[#EFE8D8] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#756E65] block font-bold">
              Pass Price
            </span>
            <span className="text-2xl font-serif font-black text-[#1F1A14]">
              {event.price === 0 ? 'Free' : `₹${event.price}`}
            </span>
          </div>

          <motion.button
            type="button"
            onClick={onBook}
            disabled={isSoldOut}
            whileHover={!isSoldOut ? { scale: 1.04 } : {}}
            whileTap={!isSoldOut ? { scale: 0.96 } : {}}
            className={`px-6 py-3 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
              isSoldOut
                ? 'bg-[#EFE8D8] text-[#8C8377] cursor-not-allowed'
                : 'bg-[#C9932B] hover:bg-[#b58021] text-white shadow-md shadow-[#C9932B]/25 cursor-pointer'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>{isSoldOut ? 'Sold Out' : 'Book Pass'}</span>
            {!isSoldOut && <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
