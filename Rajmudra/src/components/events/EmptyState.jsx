import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FilterX } from 'lucide-react';

export default function EmptyState({ onReset }) {
  return (
    <motion.div 
      className="bg-white p-12 text-center rounded-[2rem] border border-[#EFE8D8] shadow-xl shadow-amber-900/5 max-w-md mx-auto my-8 space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#F2ECE1] text-[#C9932B] flex items-center justify-center mx-auto border border-[#E5DAC6]">
        <Calendar className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h3 className="font-serif font-bold text-[#1F1A14] text-lg">No Events Found</h3>
        <p className="text-xs text-[#756E65] leading-relaxed">
          We couldn't find any events matching your current filter criteria. Try searching with different keywords.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9932B] hover:bg-[#b58021] text-white text-xs font-bold transition shadow-md shadow-[#C9932B]/20 cursor-pointer"
      >
        <FilterX className="w-4 h-4" />
        Reset Filters
      </button>
    </motion.div>
  );
}
