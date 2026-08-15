import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  Ticket, 
  Sparkles, 
  ArrowUpRight,
  FilterX,
  Code,
  BookOpen,
  Music,
  ChevronDown
} from 'lucide-react';

const CATEGORIES = ['All', 'Hackathon', 'Workshop', 'Seminar', 'Cultural'];
const TOTAL_FRAMES = 300;
const getFramePath = (index) => `/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

const HERO_STAGES = [
  {
    badge: '★ CAMPUS EVENT NETWORK',
    titleLine1: 'Discover',
    titleAccent: 'Unforgettable',
    titleLine2: 'Campus Events',
    subtitle: 'Find workshops, hackathons, seminars and cultural experiences happening around your campus. Get instant digital QR passes directly to your wallet.'
  },
  {
    badge: '★ INNOVATION & HACKATHONS',
    titleLine1: 'Build Next-Gen',
    titleAccent: 'Intelligent',
    titleLine2: 'Applications',
    subtitle: 'Join 24-hour hackathons, code sprints, and developer bootcamps guided by top tech industry mentors.'
  },
  {
    badge: '★ INSTANT SVG QR PASSES',
    titleLine1: 'Seamless Gate',
    titleAccent: 'Digital Entry',
    titleLine2: '& Verification',
    subtitle: 'Show your scannable digital QR pass at event entrances for instant real-time organizer verification.'
  }
];

export default function EventsPage({ events = [], onBookTicket }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const animFrameRef = useRef(null);

  // Preload frame images
  useEffect(() => {
    let isMounted = true;
    const loadedImages = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    const drawFrame = (index) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = imagesRef.current[index];
      if (img && (img.complete || img.naturalWidth > 0)) {
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        const width = window.innerWidth;
        const height = window.innerHeight;

        const targetW = Math.floor(width * dpr);
        const targetH = Math.floor(height * dpr);

        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }

        ctx.save();
        ctx.scale(dpr, dpr);

        const hRatio = width / img.width;
        const vRatio = height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (width - img.width * ratio) / 2;
        const centerShift_y = (height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
        ctx.restore();
      }
    };

    if (loadedImages[0]) {
      if (loadedImages[0].complete) {
        drawFrame(0);
      } else {
        loadedImages[0].onload = () => {
          if (isMounted) drawFrame(0);
        };
      }
    }

    const handleScroll = () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      animFrameRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;

        // Calculate progress purely within the hero block
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);

          let stageIdx = 0;
          if (progress > 0.66) stageIdx = 2;
          else if (progress > 0.33) stageIdx = 1;
          
          setCurrentStageIndex(stageIdx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

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

  const activeStage = HERO_STAGES[currentStageIndex];

  return (
    <div className="min-h-screen w-full bg-[#F7F3E8] text-[#171717] font-sans selection:bg-[#E7D39A] selection:text-[#171717]">
      
      {/* ================= 1. SCROLL PINNED CANVAS HERO ================= */}
      <div ref={containerRef} className="relative w-full h-[350vh]">
        
        {/* Fullscreen Sticky Viewport */}
        <div className="sticky top-0 left-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Background Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          />

          {/* Legibility Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50 pointer-events-none z-10" />

          {/* Centered Static-Position Text Overlay */}
          <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStageIndex}
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="space-y-6"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C99A2E]/90 text-white text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-xl border border-white/20">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>{activeStage.badge}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white leading-tight drop-shadow-2xl">
                  {activeStage.titleLine1}{' '}
                  <span className="text-[#E7D39A] italic font-serif">{activeStage.titleAccent}</span>{' '}
                  {activeStage.titleLine2}
                </h1>

                {/* Subtitle */}
                <p className="text-white/90 text-sm sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg">
                  {activeStage.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 z-20 flex flex-col items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white/80 animate-bounce">
            <span>Scroll to explore events</span>
            <ChevronDown className="w-4 h-4 text-[#E7D39A]" />
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN CATALOG & PILLARS CONTAINER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 space-y-24 sm:space-y-32">

        {/* CURATED VERTICALS / PILLARS SECTION */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C99A2E] bg-[#E7D39A]/30 px-4 py-1.5 rounded-full border border-[#C99A2E]/20 inline-block">
              CURATED VERTICALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#171717] tracking-tight">
              Campus Event Pillars
            </h2>
            <p className="text-xs sm:text-base text-[#777268]">
              Explore specialized tracks designed to elevate skillsets, technology innovation, and creative expression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <motion.div 
              className="bg-[#FFFCF5] p-8 sm:p-10 rounded-[2.5rem] border border-[#E7E0D2] shadow-sm hover:shadow-xl hover:border-[#C99A2E]/50 transition-all duration-500 space-y-6 group"
              whileHover={{ y: -6 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#E7D39A]/30 text-[#C99A2E] flex items-center justify-center border border-[#C99A2E]/20 group-hover:bg-[#C99A2E] group-hover:text-white transition-all duration-300">
                <Code className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C99A2E] tracking-widest uppercase">01 • TECH &amp; BUILD</span>
                <h3 className="text-2xl font-serif font-bold text-[#171717]">Hackathons &amp; Sprints</h3>
                <p className="text-xs sm:text-sm text-[#777268] leading-relaxed">
                  24-hour innovation marathons, AI competitions, and decentralized Web3 code sprints with mentorship.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedCategory('Hackathon')}
                className="text-xs font-bold text-[#C99A2E] hover:text-[#b58825] inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                Browse Hackathons <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div 
              className="bg-[#FFFCF5] p-8 sm:p-10 rounded-[2.5rem] border border-[#E7E0D2] shadow-sm hover:shadow-xl hover:border-[#C99A2E]/50 transition-all duration-500 space-y-6 group"
              whileHover={{ y: -6 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#E7D39A]/30 text-[#C99A2E] flex items-center justify-center border border-[#C99A2E]/20 group-hover:bg-[#C99A2E] group-hover:text-white transition-all duration-300">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C99A2E] tracking-widest uppercase">02 • LEARNING</span>
                <h3 className="text-2xl font-serif font-bold text-[#171717]">Workshops &amp; Labs</h3>
                <p className="text-xs sm:text-sm text-[#777268] leading-relaxed">
                  Hands-on developer masterclasses, cloud architecture seminars, and deep-dive technical bootcamps.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedCategory('Workshop')}
                className="text-xs font-bold text-[#C99A2E] hover:text-[#b58825] inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                Browse Workshops <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div 
              className="bg-[#FFFCF5] p-8 sm:p-10 rounded-[2.5rem] border border-[#E7E0D2] shadow-sm hover:shadow-xl hover:border-[#C99A2E]/50 transition-all duration-500 space-y-6 group"
              whileHover={{ y: -6 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#E7D39A]/30 text-[#C99A2E] flex items-center justify-center border border-[#C99A2E]/20 group-hover:bg-[#C99A2E] group-hover:text-white transition-all duration-300">
                <Music className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C99A2E] tracking-widest uppercase">03 • CULTURE</span>
                <h3 className="text-2xl font-serif font-bold text-[#171717]">Cultural &amp; Fests</h3>
                <p className="text-xs sm:text-sm text-[#777268] leading-relaxed">
                  Annual campus music festivals, live concert galas, drama performances, and art exhibitions.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedCategory('Cultural')}
                className="text-xs font-bold text-[#C99A2E] hover:text-[#b58825] inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                Browse Cultural <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* EVENTS CATALOG SECTION */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E0D2] pb-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C99A2E]">EXPLORE CATALOG</span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#171717] tracking-tight">
                Upcoming Events
              </h2>
              <p className="text-xs sm:text-base text-[#777268] font-normal">
                Select an upcoming experience to view live capacity and reserve your digital SVG QR pass.
              </p>
            </div>
            <span className="text-xs font-bold text-[#C99A2E] bg-[#E7D39A]/30 px-4 py-2 rounded-full border border-[#C99A2E]/20 self-start md:self-auto">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Available
            </span>
          </div>

          {/* Floating Search & Filter Toolbar */}
          <div className="bg-[#FFFCF5] p-5 sm:p-6 rounded-[2.5rem] border border-[#E7E0D2] shadow-sm flex flex-col sm:flex-row gap-5 justify-between items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#C99A2E] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events or venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-[#F7F3E8] border border-[#E7E0D2] focus:border-[#C99A2E] focus:ring-2 focus:ring-[#C99A2E]/30 rounded-2xl text-xs sm:text-sm text-[#171717] placeholder-[#777268] focus:outline-none transition-all duration-200"
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
                    className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#C99A2E] text-white shadow-md shadow-[#C99A2E]/30 scale-[1.02]'
                        : 'bg-[#F7F3E8] text-[#777268] hover:bg-[#E7D39A]/40 hover:text-[#171717]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

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
        <div className="pt-12 border-t border-[#E7E0D2] text-center text-xs font-serif italic text-[#777268] pb-10">
          Crafted for unforgettable campus experiences • Rajmudra Event Management Portal 2026
        </div>

      </div>
    </div>
  );
}

/* ================= EVENT CARD SUBCOMPONENT ================= */
function EventCard({ event, onBook }) {
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
      className="group bg-[#FFFCF5] rounded-[2.5rem] border border-[#E7E0D2] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#C99A2E]/50 transition-all duration-500 flex flex-col justify-between"
    >
      <div>
        {/* Poster Image with Hover Zoom */}
        <div className="relative h-64 w-full bg-[#F7F3E8] overflow-hidden">
          <img
            src={event.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'}
            alt={event.title}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60';
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-4 inset-x-4 flex justify-between items-center gap-2">
            <span className="bg-[#E7D39A] text-[#171717] text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
              {event.category}
            </span>
            <span
              className={`text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md ${
                isSoldOut
                  ? 'bg-rose-600 text-white'
                  : 'bg-[#171717] text-[#E7D39A]'
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
          <div className="space-y-2.5 text-xs text-[#777268]">
            <div className="flex items-center gap-2.5 font-medium">
              <Calendar className="w-4 h-4 text-[#C99A2E] shrink-0" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-2.5 font-medium">
              <MapPin className="w-4 h-4 text-[#C99A2E] shrink-0" />
              <span className="truncate text-[#171717] font-semibold">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2.5 font-medium">
              <Users className="w-4 h-4 text-[#C99A2E] shrink-0" />
              <span>{event.totalSeats} Total Capacity</span>
            </div>
          </div>

          {/* Capacity Progress */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] font-bold text-[#777268]">
              <span>Capacity Fill</span>
              <span className={occupancyPercentage > 85 ? 'text-rose-600' : 'text-[#C99A2E]'}>
                {occupancyPercentage}% Filled
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F7F3E8] rounded-full overflow-hidden border border-[#E7E0D2]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  occupancyPercentage > 85 ? 'bg-rose-600' : 'bg-[#C99A2E]'
                }`}
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 sm:p-7 pt-0 mt-auto">
        <div className="pt-4 border-t border-[#E7E0D2] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#777268] block font-bold">
              Pass Price
            </span>
            <span className="text-2xl font-serif font-black text-[#171717]">
              {event.price === 0 ? 'Free' : `₹${event.price}`}
            </span>
          </div>

          <motion.button
            type="button"
            onClick={onBook}
            disabled={isSoldOut}
            whileHover={!isSoldOut ? { scale: 1.04 } : {}}
            whileTap={!isSoldOut ? { scale: 0.96 } : {}}
            className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
              isSoldOut
                ? 'bg-[#E7E0D2] text-[#777268] cursor-not-allowed'
                : 'bg-[#C99A2E] hover:bg-[#b58825] text-white shadow-[#C99A2E]/20'
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

/* ================= EMPTY STATE SUBCOMPONENT ================= */
function EmptyState({ onReset }) {
  return (
    <motion.div 
      className="bg-[#FFFCF5] p-12 text-center rounded-[2.5rem] border border-[#E7E0D2] shadow-sm max-w-md mx-auto my-8 space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#E7D39A]/30 text-[#C99A2E] flex items-center justify-center mx-auto border border-[#C99A2E]/20">
        <Calendar className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h3 className="font-serif font-bold text-[#171717] text-lg">No Events Found</h3>
        <p className="text-xs text-[#777268] leading-relaxed">
          We couldn't find any events matching your current filter criteria. Try searching with different keywords.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#C99A2E] hover:bg-[#b58825] text-white text-xs font-bold transition shadow-md shadow-[#C99A2E]/20"
      >
        <FilterX className="w-4 h-4" />
        Reset Filters
      </button>
    </motion.div>
  );
}