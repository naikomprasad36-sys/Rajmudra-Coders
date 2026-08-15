import React, { useState, useMemo } from 'react';
import { Users, CheckCircle, Clock, Calendar, Filter, Search, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function DashboardPage({ events = [], attendees = [], onToggleCheckIn }) {
  const [selectedEventId, setSelectedEventId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all available events list (from events prop + unique event titles in attendees)
  const eventOptions = useMemo(() => {
    const map = new Map();
    events.forEach((ev) => {
      if (ev && ev.id) {
        map.set(String(ev.id), ev.title);
      }
    });
    // Also include any attendee events not in events array
    attendees.forEach((att) => {
      if (att.eventId && att.eventTitle) {
        map.set(String(att.eventId), att.eventTitle);
      } else if (att.eventTitle && !map.has(att.eventTitle)) {
        map.set(att.eventTitle, att.eventTitle);
      }
    });
    return Array.from(map.entries()).map(([id, title]) => ({ id, title }));
  }, [events, attendees]);

  // Filter attendees event-wise
  const filteredAttendees = useMemo(() => {
    return attendees.filter((a) => {
      // Event filter check
      let matchesEvent = true;
      if (selectedEventId !== 'all') {
        matchesEvent = 
          String(a.eventId) === String(selectedEventId) ||
          a.eventTitle === selectedEventId ||
          (events.find(e => String(e.id) === String(selectedEventId))?.title === a.eventTitle);
      }

      // Search query check
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !query ||
        a.name?.toLowerCase().includes(query) ||
        a.email?.toLowerCase().includes(query) ||
        a.id?.toLowerCase().includes(query) ||
        a.eventTitle?.toLowerCase().includes(query);

      return matchesEvent && matchesSearch;
    });
  }, [attendees, selectedEventId, searchQuery, events]);

  // Dynamic Event Metrics
  const total = filteredAttendees.length;
  const checkedInCount = filteredAttendees.filter((a) => a.checkedIn).length;
  const remaining = total - checkedInCount;
  const checkInPercent = total > 0 ? Math.round((checkedInCount / total) * 100) : 0;

  const currentSelectedTitle = selectedEventId === 'all' 
    ? 'All Events' 
    : (eventOptions.find(e => String(e.id) === String(selectedEventId))?.title || 'Selected Event');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner with Event Selector */}
      <div className="bg-gradient-to-r from-[#241D1A] via-[#352822] to-[#241D1A] text-white rounded-3xl p-6 sm:p-8 border border-[#E5B84B]/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5B84B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B84B]/20 border border-[#E5B84B]/40 text-[#F3E5AB] text-xs font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#E5B84B]" />
              <span>Event-Wise Attendance Monitor</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5AB] to-[#E5B84B]">
              Gate Scanner &amp; Check-In Hub
            </h1>
            <p className="text-[#D1C7BD] text-xs sm:text-sm max-w-xl">
              Filter attendees event-wise, monitor live scanning metrics, and update entry status in real time.
            </p>
          </div>

          {/* Event-Wise Selector Dropdown */}
          <div className="bg-[#1A1614] p-4 rounded-2xl border border-[#E5B84B]/40 shadow-lg min-w-[260px] sm:min-w-[300px]">
            <label className="block text-[11px] font-black uppercase tracking-wider text-[#E5B84B] mb-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Select Event:
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full bg-[#241D1A] text-[#F3E5AB] font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#E5B84B]/30 outline-none focus:ring-2 focus:ring-[#E5B84B] transition cursor-pointer"
            >
              <option value="all">🌟 All Events ({attendees.length} Attendees)</option>
              {eventOptions.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  📅 {ev.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Registered</p>
            <p className="text-3xl font-black text-slate-900">{total}</p>
            <span className="text-[10px] font-bold text-indigo-600 truncate block max-w-[150px]">
              {currentSelectedTitle}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100"><CheckCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Checked In</p>
            <p className="text-3xl font-black text-slate-900">{checkedInCount}</p>
            <span className="text-[10px] font-bold text-emerald-600">
              {checkInPercent}% Gate Present
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Remaining Entry</p>
            <p className="text-3xl font-black text-slate-900">{remaining}</p>
            <span className="text-[10px] font-bold text-amber-600">
              Pending Scan
            </span>
          </div>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
        
        {/* Table Header & Search */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-black text-slate-900 text-base">Gate Attendance Roster</h3>
            <p className="text-xs text-slate-500">
              Showing {filteredAttendees.length} attendees for <span className="font-bold text-amber-700">{currentSelectedTitle}</span>
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, pass ID, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Table List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Pass ID</th>
                <th className="px-6 py-3.5">Attendee Name</th>
                <th className="px-6 py-3.5">Event Title</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Entry Time</th>
                <th className="px-6 py-3.5 text-right">Gate Status / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAttendees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                    No attendee pass records found matching the selected event filter.
                  </td>
                </tr>
              ) : (
                filteredAttendees.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-mono font-black text-amber-700">{a.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{a.name}</td>
                    <td className="px-6 py-4 font-semibold text-slate-600 max-w-[200px] truncate">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold">
                        {a.eventTitle || 'Campus Event Pass'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{a.email}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono">{a.time}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onToggleCheckIn(a.id)}
                        className={`px-4 py-1.5 rounded-full font-extrabold text-xs transition-all shadow-sm ${
                          a.checkedIn
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
                            : 'bg-[#241D1A] text-[#F3E5AB] hover:bg-amber-600 hover:text-white border border-[#E5B84B]/40'
                        }`}
                      >
                        {a.checkedIn ? '✓ Scanned / Present' : 'Mark Present'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
