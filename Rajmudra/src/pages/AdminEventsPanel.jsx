import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Trash2, 
  Plus, 
  Search, 
  Users, 
  Ticket, 
  IndianRupee, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  MapPin,
  TrendingUp,
  Eye
} from 'lucide-react';

export default function AdminEventsPanel({ events = [], setEvents, attendees = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEventForView, setSelectedEventForView] = useState(null);

  // New Event Form State for quick add
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Workshop',
    date: '',
    time: '',
    venue: '',
    totalSeats: 100,
    price: 0,
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'
  });

  // Calculate high-level stats
  const totalEvents = events.length;
  const totalSeatsAll = events.reduce((acc, ev) => acc + (Number(ev.totalSeats) || 0), 0);
  const totalAvailableSeats = events.reduce((acc, ev) => acc + (Number(ev.availableSeats) || 0), 0);
  const totalBookedSeats = totalSeatsAll - totalAvailableSeats;
  const totalEstimatedRevenue = events.reduce((acc, ev) => {
    const booked = (Number(ev.totalSeats) || 0) - (Number(ev.availableSeats) || 0);
    return acc + (booked * (Number(ev.price) || 0));
  }, 0);

  // Filter events
  const filteredEvents = events.filter((ev) => {
    const matchesSearch = ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ev.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || ev.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Actions
  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      if (setEvents) {
        setEvents(events.filter((ev) => ev.id !== id));
      }
    }
  };

  const handleUpdateSeats = (id, delta) => {
    if (!setEvents) return;
    setEvents(events.map((ev) => {
      if (ev.id === id) {
        const newTotal = Math.max(1, (ev.totalSeats || 0) + delta);
        const newAvailable = Math.max(0, Math.min(newTotal, (ev.availableSeats || 0) + delta));
        return {
          ...ev,
          totalSeats: newTotal,
          availableSeats: newAvailable
        };
      }
      return ev;
    }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.venue) return;

    const created = {
      ...newEvent,
      id: Date.now(),
      totalSeats: Number(newEvent.totalSeats) || 50,
      availableSeats: Number(newEvent.totalSeats) || 50,
      price: Number(newEvent.price) || 0
    };

    if (setEvents) {
      setEvents([created, ...events]);
    }
    setShowAddModal(false);
    setNewEvent({
      title: '',
      category: 'Workshop',
      date: '',
      time: '',
      venue: '',
      totalSeats: 100,
      price: 0,
      banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-500/30">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Administrator Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
              Admin Events Control Center
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Real-time monitoring, event publishing, capacity management, and pass verification metrics.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Events */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Events</p>
            <p className="text-2xl font-black text-slate-900">{totalEvents}</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Live &amp; Active
            </span>
          </div>
        </div>

        {/* Tickets / Seats Booked */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold shrink-0">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tickets Booked</p>
            <p className="text-2xl font-black text-slate-900">{totalBookedSeats} <span className="text-xs font-medium text-slate-400">/ {totalSeatsAll}</span></p>
            <span className="text-[10px] text-violet-600 font-bold">
              {totalSeatsAll > 0 ? `${Math.round((totalBookedSeats / totalSeatsAll) * 100)}% Booked` : '0%'}
            </span>
          </div>
        </div>

        {/* Verified Attendees */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gate Attendees</p>
            <p className="text-2xl font-black text-slate-900">{attendees.length}</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> {attendees.filter(a => a.checkedIn).length} Checked In
            </span>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Est. Revenue</p>
            <p className="text-2xl font-black text-slate-900">₹{totalEstimatedRevenue}</p>
            <span className="text-[10px] text-amber-600 font-bold">
              Across paid passes
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Management Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events by title or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {['All', 'Hackathon', 'Workshop', 'Seminar', 'Cultural'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
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

      {/* Events Admin Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-black text-slate-900 text-base">Active Events Registry</h3>
            <p className="text-xs text-slate-500">Manage seat allocations, pricing, and active listings.</p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {filteredEvents.length} Events Listed
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-sm">No events match your criteria</p>
            <p className="text-xs text-slate-400">Try creating a new event or clearing filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Event Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Schedule &amp; Venue</th>
                  <th className="px-6 py-4">Capacity / Booked</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-center">Quick Capacity Adjust</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEvents.map((ev) => {
                  const booked = (ev.totalSeats || 0) - (ev.availableSeats || 0);
                  const isSoldOut = ev.availableSeats <= 0;
                  return (
                    <tr key={ev.id} className="hover:bg-slate-50/70 transition">
                      {/* Title & Banner */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={ev.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'}
                            alt={ev.title}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-extrabold text-slate-900 text-sm">{ev.title}</p>
                            <span className="text-[10px] text-slate-400 font-mono">ID: #{ev.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {ev.category}
                        </span>
                      </td>

                      {/* Schedule & Venue */}
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-slate-600">
                          <p className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{ev.date} • {ev.time}</span>
                          </p>
                          <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate max-w-[180px]">{ev.venue}</span>
                          </p>
                        </div>
                      </td>

                      {/* Capacity / Booked */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className={isSoldOut ? 'text-red-600' : 'text-slate-700'}>
                              {ev.availableSeats} available
                            </span>
                            <span className="text-slate-400">{booked} booked</span>
                          </div>
                          <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${isSoldOut ? 'bg-red-500' : 'bg-indigo-600'}`}
                              style={{ width: `${Math.min(100, Math.round((booked / (ev.totalSeats || 1)) * 100))}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-black text-slate-900">
                        {ev.price === 0 ? (
                          <span className="text-emerald-600 font-extrabold">Free</span>
                        ) : (
                          `₹${ev.price}`
                        )}
                      </td>

                      {/* Quick Capacity Adjust */}
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => handleUpdateSeats(ev.id, -5)}
                            title="Decrease 5 seats"
                            className="px-2 py-0.5 rounded-lg bg-white text-slate-700 hover:bg-slate-200 font-extrabold text-xs shadow-xs transition"
                          >
                            -5
                          </button>
                          <span className="px-2 font-bold text-slate-700">{ev.totalSeats}</span>
                          <button
                            onClick={() => handleUpdateSeats(ev.id, 5)}
                            title="Increase 5 seats"
                            className="px-2 py-0.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-extrabold text-xs shadow-xs transition"
                          >
                            +5
                          </button>
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedEventForView(ev)}
                            title="Quick View"
                            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(ev.id)}
                            title="Delete Event"
                            className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">Add New Campus Event</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextGen AI Summit 2026"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  >
                    <option>Workshop</option>
                    <option>Hackathon</option>
                    <option>Seminar</option>
                    <option>Cultural</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ticket Price (₹)</label>
                  <input
                    type="number"
                    placeholder="0 for free"
                    value={newEvent.price}
                    onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 28 Aug 2026"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10:00 AM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Venue</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Main Auditorium"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Capacity</label>
                  <input
                    type="number"
                    required
                    placeholder="100"
                    value={newEvent.totalSeats}
                    onChange={(e) => setNewEvent({ ...newEvent, totalSeats: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Banner Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newEvent.banner}
                  onChange={(e) => setNewEvent({ ...newEvent, banner: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-sm"
                >
                  Save &amp; Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedEventForView && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100">
            <div className="relative h-44 w-full">
              <img
                src={selectedEventForView.banner}
                alt={selectedEventForView.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedEventForView(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center font-bold text-sm backdrop-blur-xs"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {selectedEventForView.category}
              </span>
              <h3 className="font-black text-lg text-slate-900 leading-snug">{selectedEventForView.title}</h3>
              <div className="space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>{selectedEventForView.date} • {selectedEventForView.time}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>{selectedEventForView.venue}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>Total: {selectedEventForView.totalSeats} | Available: {selectedEventForView.availableSeats}</span>
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedEventForView(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
