import React from 'react';

export default function GoldenShowcaseBanner() {
  return (
    <section className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-14 border border-[#EFE8D8] shadow-xl shadow-amber-950/5 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-7 space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C9932B] bg-[#F2ECE1] px-4 py-1.5 rounded-full inline-block border border-[#E5DAC6]">
          ★ GOLDEN AURA EVENT EXPERIENCES
        </span>
        <h2 className="text-4xl sm:text-6xl font-serif font-black text-[#1F1A14] leading-[1.1] tracking-tight">
          Create <span className="text-[#C9932B] italic font-serif">Unforgettable</span> Events With Style
        </h2>
        <p className="text-sm sm:text-base text-[#756E65] leading-relaxed max-w-xl">
          Luxury hackathons, corporate tech conferences, birthday celebrations, and grand campus experiences planned with elegance and perfection.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('events-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full bg-[#C9932B] hover:bg-[#b58021] text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-[#C9932B]/30 hover:scale-105 cursor-pointer"
          >
            Book Consultation
          </button>
          <span className="text-xs text-[#8C8377] font-medium italic">
            • Instant Digital SVG QR Passes &amp; Live Verification
          </span>
        </div>
      </div>

      <div className="lg:col-span-5 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#C9932B]/30 to-[#E5C378]/30 rounded-[2.5rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1000&auto=format&fit=crop&q=80"
          alt="Golden Aura Luxury Event"
          className="relative rounded-[2rem] shadow-2xl border-4 border-white object-cover h-80 sm:h-96 w-full transform group-hover:scale-[1.02] transition-all duration-500"
        />
      </div>
    </section>
  );
}
