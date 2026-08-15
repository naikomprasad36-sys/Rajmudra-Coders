import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 300;
const INITIAL_PRELOAD_COUNT = 25; // Instant load first 25 frames for immediate playback
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

export default function HeroCanvasSection() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedSetRef = useRef(new Set());
  const currentFrameRef = useRef(0);
  const animFrameRef = useRef(null);
  const lastRenderedIndexRef = useRef(0);

  // Resize canvas to match high DPI displays (called only on resize/mount, NOT on scroll)
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const targetW = Math.floor(width * dpr);
    const targetH = Math.floor(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
  };

  // Draw frame on canvas with zero-lag fallback to nearest loaded frame
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;
    let img = images[index];

    // Fallback: If requested frame isn't loaded yet, find nearest loaded frame
    if (!img || (!img.complete && !loadedSetRef.current.has(index))) {
      let found = null;
      for (let offset = 1; offset < 40; offset++) {
        const prevIdx = index - offset;
        if (prevIdx >= 0 && images[prevIdx] && (images[prevIdx].complete || loadedSetRef.current.has(prevIdx))) {
          found = images[prevIdx];
          break;
        }
        const nextIdx = index + offset;
        if (nextIdx < TOTAL_FRAMES && images[nextIdx] && (images[nextIdx].complete || loadedSetRef.current.has(nextIdx))) {
          found = images[nextIdx];
          break;
        }
      }
      if (found) {
        img = found;
      } else {
        img = images[lastRenderedIndexRef.current];
      }
    }

    if (img && (img.complete || img.naturalWidth > 0)) {
      lastRenderedIndexRef.current = index;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const width = window.innerWidth;
      const height = window.innerHeight;

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

  useEffect(() => {
    let isMounted = true;
    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    // Phase 1: Preload initial keyframes immediately for instant rendering
    for (let i = 0; i < INITIAL_PRELOAD_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedSetRef.current.add(i);
        if (isMounted && i === 0) drawFrame(0);
      };
      images[i] = img;
    }

    // Phase 2: Progressively load remaining frames in small idle batches (prevents network queue hanging)
    let batchIndex = INITIAL_PRELOAD_COUNT;
    const BATCH_SIZE = 15;

    const loadNextBatch = () => {
      if (!isMounted || batchIndex >= TOTAL_FRAMES) return;
      const limit = Math.min(TOTAL_FRAMES, batchIndex + BATCH_SIZE);

      for (let i = batchIndex; i < limit; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        const idx = i;
        img.onload = () => {
          loadedSetRef.current.add(idx);
        };
        images[idx] = img;
      }
      batchIndex = limit;

      if (batchIndex < TOTAL_FRAMES) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadNextBatch, { timeout: 300 });
        } else {
          setTimeout(loadNextBatch, 50);
        }
      }
    };

    // Trigger progressive batch preloader shortly after mount
    const timerId = setTimeout(loadNextBatch, 100);

    // Initial canvas setup
    resizeCanvas();

    // Scroll Handler (Optimized with RAF)
    const handleScroll = () => {
      if (animFrameRef.current) return;

      animFrameRef.current = requestAnimationFrame(() => {
        animFrameRef.current = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;

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

    const handleResize = () => {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isMounted = false;
      clearTimeout(timerId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const activeStage = HERO_STAGES[currentStageIndex];

  return (
    <div ref={containerRef} className="relative w-full h-[400vh]">
      {/* Fullscreen Sticky Viewport */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />

        {/* Legibility Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50 pointer-events-none z-10" />

        {/* Centered Text Overlay */}
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
  );
}
