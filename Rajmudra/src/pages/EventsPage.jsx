import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Ticket, Tag } from 'lucide-react';

export default function EventsPage({ events, onBookTicket }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hackathon', 'Workshop', 'Seminar', 'Cultural'];

  const filteredEvents = events.filter((ev) => {
    const matchesSearch = ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ev.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 shadow-md">
        <div className="max-w-2xl space-y-2">
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full inline-block">
            Campus Events Portal
          </span>
          <h1 className="text-3xl font-black tracking-tight">Discover & Attend Top Campus Events</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Reserve digital QR passes instantly for technical hackathons, hands-on workshops, and cultural fests.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 shadow-sm">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700">No Events Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try searching for a different keyword or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((ev) => {
            const isSoldOut = ev.availableSeats <= 0;
            return (
              <div
                key={ev.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Banner Header */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={ev.banner}
                    alt={ev.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                    {ev.category}
                  </span>

                  <span className={`absolute top-3 right-3 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm ${
                    isSoldOut 
                      ? 'bg-red-500 text-white' 
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {isSoldOut ? 'Sold Out' : `${ev.availableSeats} Seats Available`}
                  </span>

                  <h3 className="absolute bottom-3 left-4 right-4 text-white font-bold text-lg leading-snug drop-shadow">
                    {ev.title}
                  </h3>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{ev.date} • {ev.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="truncate">{ev.venue}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Total Seats: {ev.totalSeats}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Ticket Price</span>
                      <span className="text-sm font-black text-slate-900">
                        {ev.price === 0 ? 'Free' : `₹${ev.price}`}
                      </span>
                    </div>

                    <button
                      onClick={() => onBookTicket(ev)}
                      disabled={isSoldOut}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                        isSoldOut
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <Ticket className="w-4 h-4" />
                      {isSoldOut ? 'Sold Out' : 'Book Ticket'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
