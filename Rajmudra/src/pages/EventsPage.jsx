import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

import { 
  HeroCanvasSection, 
  GoldenShowcaseBanner, 
  EventPillarsSection, 
  EventsSearchFilter, 
  EventCard, 
  EmptyState 
} from '../components';

export default function EventsPage({ events = [], onBookTicket }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter logic
  const filteredEvents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return events.filter((ev) => {
      const matchesSearch = 
        !query || 
        ev.title?.toLowerCase().includes(query) ||
        ev.venue?.toLowerCase().includes(query);

      const matchesCategory = 
        selectedCategory === 'All' || 
        ev.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F3E8] text-[#171717] font-sans selection:bg-[#E7D39A] selection:text-[#171717]">
      {/* 1. SCROLL PINNED CANVAS HERO (OPTIMIZED FOR 60FPS) */}
      <HeroCanvasSection />

      {/* 2. MAIN CATALOG & PILLARS CONTAINER (GOLDEN AURA THEME) */}
      <div className="bg-[#F9F6F0] min-h-screen text-[#1F1A14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 space-y-24 sm:space-y-32">
          {/* SHOWCASE HERO BANNER */}
          <GoldenShowcaseBanner />

          {/* OUR SERVICES / EVENT PILLARS SECTION */}
          <EventPillarsSection onSelectCategory={setSelectedCategory} />

          {/* EVENTS CATALOG SECTION */}
          <section id="events-catalog" className="space-y-10 pt-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EFE8D8] pb-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9932B]">GOLDEN CATALOG</span>
                <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#1F1A14] tracking-tight">
                  Upcoming Campus Events
                </h2>
                <p className="text-xs sm:text-base text-[#756E65] font-normal">
                  Select an upcoming experience to view live capacity and reserve your digital SVG QR pass.
                </p>
              </div>
              <span className="text-xs font-bold text-[#C9932B] bg-[#F2ECE1] px-5 py-2.5 rounded-full border border-[#E5DAC6] self-start md:self-auto shadow-sm">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Available
              </span>
            </div>

            {/* Floating Search & Filter Toolbar */}
            <EventsSearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {/* Events Grid or Empty State */}
            {filteredEvents.length === 0 ? (
              <EmptyState onReset={handleResetFilters} />
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onBook={() => onBookTicket(event)}
                  />
                ))}
              </motion.div>
            )}
          </section>

          {/* Footer */}
          <div className="pt-12 border-t border-[#EFE8D8] text-center text-xs font-serif italic text-[#8C8377] pb-10">
            Crafted for unforgettable campus experiences • Golden Aura Event Management Portal 2026
          </div>
        </div>
      </div>
    </div>
  );
}