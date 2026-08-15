import React from 'react';
import { Search } from 'lucide-react';

const CATEGORIES = ['All', 'Hackathon', 'Workshop', 'Seminar', 'Cultural'];

export default function EventsSearchFilter({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-[2rem] border border-[#EFE8D8] shadow-xl shadow-amber-900/5 flex flex-col sm:flex-row gap-5 justify-between items-stretch sm:items-center">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-[#C9932B] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search events or venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-[#F9F6F0] border border-[#EFE8D8] focus:border-[#C9932B] focus:ring-2 focus:ring-[#C9932B]/30 rounded-2xl text-xs sm:text-sm text-[#1F1A14] placeholder-[#8C8377] focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#C9932B] text-white shadow-md shadow-[#C9932B]/30 scale-[1.02]'
                  : 'bg-[#F9F6F0] text-[#756E65] hover:bg-[#F2ECE1] hover:text-[#1F1A14]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
