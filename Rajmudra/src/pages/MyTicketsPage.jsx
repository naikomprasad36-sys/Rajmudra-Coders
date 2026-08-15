import React, { useState, useMemo } from 'react';
import { Search, QrCode, Eye, EyeOff, Printer, Download, CheckCircle2, Calendar, MapPin, Ticket } from 'lucide-react';

export default function MyTicketsPage({ tickets = [], bookedPasses = [], onExploreClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showQrMap, setShowQrMap] = useState({});

  const toggleQr = (id) => {
    setShowQrMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Combine tickets from prop (live booked tickets + initial booked passes)
  const combinedPasses = useMemo(() => {
    const list = [...tickets, ...bookedPasses];
    const seen = new Set();
    return list.filter((item) => {
      if (!item || !item.id) return false;
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [tickets, bookedPasses]);

  const filteredPasses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return combinedPasses.filter((pass) => {
      const matchesSearch = 
        !query ||
        pass.eventTitle?.toLowerCase().includes(query) ||
        pass.venue?.toLowerCase().includes(query) ||
        pass.id?.toLowerCase().includes(query);
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        pass.category?.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [combinedPasses, searchQuery, selectedCategory]);

  const categories = ['All', 'Hackathon', 'Summit', 'Fest', 'Workshop'];

  return (
    <div className="relative min-h-[80vh] overflow-hidden px-4 sm:px-8 py-8 bg-[#FDFBF7]">
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
       
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-[2.8rem] blur-md opacity-40 group-hover:opacity-75 transition duration-500 pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-5 bg-gradient-to-br from-white via-amber-50/90 to-white backdrop-blur-2xl p-6 lg:p-7 rounded-[2.5rem] border-[3px] border-amber-500 shadow-[0_20px_50px_rgba(217,119,6,0.25)] overflow-hidden">
            
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-1/4 -bottom-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative w-full lg:w-[440px]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-2xl blur-sm opacity-30 group-focus-within:opacity-100 transition duration-300" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 font-bold" />
                <input
                  type="text"
                  placeholder="Search by event title, venue, or pass ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/95 border-2 border-amber-400 rounded-2xl text-xs text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20 transition-all shadow-md font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none z-10">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-3 rounded-2xl text-xs font-black tracking-wide transition-all duration-300 whitespace-nowrap shadow-md flex items-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white shadow-xl shadow-amber-500/40 scale-105 ring-2 ring-amber-300 border border-white/40'
                        : 'bg-white text-stone-700 border-2 border-amber-300/80 hover:bg-amber-100/80 hover:text-amber-950 hover:border-amber-500 hover:shadow-lg'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-amber-500'}`} />
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {filteredPasses.length === 0 ? (
          <div className="text-center py-20 bg-white/90 backdrop-blur-xl rounded-3xl border border-amber-500/30 shadow-xl space-y-4">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-600 border border-amber-500/30">
              <Ticket className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="text-lg font-bold text-[#2C2416]">No Passes Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">No digital passes match your search or filter criteria.</p>
            {onExploreClick && (
              <button
                onClick={onExploreClick}
                className="px-6 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md hover:bg-amber-600 transition-all"
              >
                Browse Events
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPasses.map((pass, index) => {
              const isQrVisible = showQrMap[pass.id] ?? true;

              return (
                <div
                  key={pass.id || index}
                  className="relative rounded-3xl bg-white/90 backdrop-blur-xl border border-amber-500/40 shadow-[0_15px_35px_rgba(245,158,11,0.2)] flex flex-col sm:flex-row items-stretch hover:shadow-[0_20px_45px_rgba(245,158,11,0.35)] transition-all duration-300 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FDFBF7] rounded-full border-r-2 border-amber-500/50 z-20 hidden sm:block" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FDFBF7] rounded-full border-l-2 border-amber-500/50 z-20 hidden sm:block" />

                  <div className="bg-gradient-to-b from-[#1E1914] via-[#2A231C] to-[#14100D] p-6 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-amber-500/30 relative min-w-[190px] z-10">
                    <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
                      {isQrVisible ? (
                        <QrCode className="w-full h-full text-[#1E1914]" />
                      ) : (
                        <div className="absolute inset-0 bg-stone-900/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-2">
                          <EyeOff className="w-6 h-6 text-amber-400 mb-1" />
                          <span className="text-[9px] font-bold text-amber-200">Hidden</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleQr(pass.id)}
                      className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-amber-400/95 hover:text-amber-300 transition-colors"
                    >
                      {isQrVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{isQrVisible ? 'Hide QR' : 'Show QR'}</span>
                    </button>

                    <div className="mt-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-lg text-[11px] font-mono font-bold text-amber-300 tracking-wider">
                      {pass.id}
                    </div>
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between space-y-4 relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-100/90 text-amber-900 text-[9px] font-black uppercase tracking-widest border border-amber-500/30 shadow-sm">
                          ● CONFIRMED PASS
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                          {pass.category || 'GENERAL'}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-[#1E1914] tracking-tight bg-gradient-to-r from-amber-600 via-amber-700 to-[#1E1914] bg-clip-text text-transparent drop-shadow-sm">
                          {pass.eventTitle}
                        </h3>
                        <div className="space-y-1.5 mt-2.5 text-xs text-stone-700 font-medium">
                          <p className="text-[11px] text-stone-600">Attendee: <span className="font-bold text-[#2C2416]">{pass.name}</span></p>
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="truncate">{pass.venue}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{pass.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => window.print()}
                          className="px-3.5 py-1.5 bg-white/90 hover:bg-amber-50 border border-amber-500/30 rounded-xl text-xs font-bold text-stone-800 flex items-center gap-1.5 transition-all shadow-sm"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-600" />
                          <span>Print</span>
                        </button>
                        <button 
                          onClick={() => alert(`Downloading pass ${pass.id}...`)}
                          className="px-3.5 py-1.5 bg-white/90 hover:bg-amber-50 border border-amber-500/30 rounded-xl text-xs font-bold text-stone-800 flex items-center gap-1.5 transition-all shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5 text-amber-600" />
                          <span>Save</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50/90 px-2.5 py-1 rounded-lg border border-emerald-500/30 shadow-sm">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
