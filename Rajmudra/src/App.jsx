import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Tag, PlusCircle, Sparkles, Ticket, Lock, QrCode, Printer, Bookmark, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


function MyTicketsPage({ bookedPasses, onExploreClick }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hiddenQrs, setHiddenQrs] = useState({});

  const toggleQr = (id) => {
    setHiddenQrs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = ['All', 'Hackathon', 'Summit', 'Fest', 'Workshop', 'Cultural'];

  const filteredPasses = selectedCategory === 'All' 
    ? bookedPasses 
    : bookedPasses.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      
      <div className="bg-white/80 backdrop-blur-xl border-2 border-amber-500/30 rounded-3xl p-4 sm:p-6 mb-8 shadow-xl shadow-amber-500/5">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <input 
              type="text" 
              placeholder="Search by event title, venue, or pass ID..."
              className="w-full px-4 py-3 pl-10 bg-amber-50/50 border border-amber-500/40 rounded-2xl text-xs text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 font-medium"
            />
            <Sparkles className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/30 scale-105'
                    : 'bg-amber-50/60 text-stone-600 hover:bg-amber-100/60 border border-amber-500/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPasses.length > 0 ? (
          filteredPasses.map((pass, index) => (
            <motion.div
              key={pass.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative bg-gradient-to-r from-white/95 via-amber-50/30 to-white/95 backdrop-blur-xl border-2 border-amber-500/40 rounded-3xl overflow-hidden shadow-xl shadow-amber-500/10 flex flex-col sm:flex-row"
            >
              
              <div className="bg-[#1E1914] text-white p-6 sm:w-48 flex flex-col items-center justify-center relative border-b sm:border-b-0 sm:border-r border-amber-500/30">
                <div className="w-28 h-28 bg-white p-2 rounded-2xl shadow-inner flex items-center justify-center relative overflow-hidden">
                  <AnimatePresence>
                    {!hiddenQrs[pass.id] ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full bg-stone-900 rounded-xl flex items-center justify-center text-amber-400"
                      >
                        <QrCode className="w-20 h-20" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-amber-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-2 text-amber-200 text-[10px] font-bold"
                      >
                        <Lock className="w-5 h-5 mb-1" /> QR Hidden
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => toggleQr(pass.id)}
                  className="mt-3 text-[10px] font-bold tracking-wider uppercase text-amber-400 hover:text-amber-300 transition-colors"
                >
                  {hiddenQrs[pass.id] ? 'Show QR' : 'Hide QR'}
                </button>

                <div className="mt-2 px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 rounded-lg text-amber-300 text-[10px] font-mono font-bold">
                  {pass.id}
                </div>
              </div>

              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase rounded-full border border-amber-300">
                      • Confirmed Pass
                    </span>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      {pass.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#1E1914] tracking-tight mb-3">
                    {pass.eventTitle}
                  </h3>

                  <div className="space-y-1.5 text-xs text-stone-600 font-medium">
                    <p className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      <span>Attendee: <strong className="text-[#1E1914]">{pass.name}</strong></span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{pass.venue}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{pass.date}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-bold border border-amber-300/60 transition-all flex items-center gap-1">
                      <Printer className="w-3.5 h-3.5" /> Print
                    </button>
                    <button className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-bold border border-amber-300/60 transition-all flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5" /> Save
                    </button>
                  </div>

                  <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 text-center py-16 bg-white/60 backdrop-blur-xl rounded-3xl border border-amber-500/20">
            <p className="text-stone-500 text-sm font-bold">No passes found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}


function CreateEventPage({ onAddEvent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Workshop',
    date: '',
    time: '',
    venue: '',
    totalSeats: '',
    price: 0,
    banner: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.venue) return;

    onAddEvent({
      ...formData,
      id: Date.now(),
      totalSeats: Number(formData.totalSeats) || 50,
      availableSeats: Number(formData.totalSeats) || 50,
      price: Number(formData.price) || 0
    });
  };

  return (
    <div className="relative min-h-[75vh] overflow-hidden px-4 sm:px-6 py-6 flex items-center justify-center">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4], x: [0, 80, -40, 0], y: [0, 50, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-gradient-to-br from-amber-400/30 to-amber-600/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3], x: [0, -90, 50, 0], y: [0, -70, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-32 w-[35rem] h-[35rem] bg-gradient-to-tr from-amber-500/25 to-yellow-300/30 rounded-full blur-[120px]"
        />
      </div>

      <div 
        className="relative z-10 w-full max-w-xl flex items-center justify-center"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-gradient-to-r from-white/95 via-amber-50/40 to-white/95 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border-2 border-amber-500/50 shadow-[0_20px_50px_rgba(245,158,11,0.18)] relative"
        >
          
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-amber-700 to-[#1E1914] bg-clip-text text-transparent">
              Create New Event
            </h2>
            <p className="text-xs text-stone-500 font-medium mt-1">Fill in details to publish a luxury event on the Golden Aura portal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-amber-600" /> Event Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Golden Aura Royal Gala 2026"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white/90 border border-amber-500/40 rounded-xl text-xs text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-amber-600" /> Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/90 border border-amber-500/40 rounded-xl text-xs text-[#2C2416] focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 font-medium"
                >
                  <option>Workshop</option>
                  <option>Hackathon</option>
                  <option>Seminar</option>
                  <option>Cultural</option>
                  <option>Summit</option>
                  <option>Fest</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-amber-600" /> Total Capacity
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 100"
                  value={formData.totalSeats}
                  onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/90 border border-amber-500/40 rounded-xl text-xs text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-amber-600" /> Date
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 28 Aug 2026"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/90 border border-amber-500/40 rounded-xl text-xs text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-amber-600" /> Time
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 11:00 AM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/90 border border-amber-500/40 rounded-xl text-xs text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-amber-600" /> Venue / Hall
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Grand Ballroom, Golden Aura Resort"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white/90 border border-amber-500/40 rounded-xl text-xs text-[#2C2416] placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 font-medium"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs tracking-wide uppercase shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Publish Event
            </motion.button>
          </form>
        </motion.div>

        
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20 bg-gradient-to-br from-amber-900/40 via-amber-600/30 to-black/50 backdrop-blur-md rounded-3xl border-2 border-amber-400/60 shadow-[0_25px_60px_rgba(217,119,6,0.3)] flex flex-col items-center justify-center text-center p-6 pointer-events-none group"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-xl shadow-amber-500/50 mb-4 border border-white/40 group-hover:scale-110 transition-transform"
              >
                <Lock className="w-8 h-8 drop-shadow-md" />
              </motion.div>
              <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-amber-700 to-[#1E1914] bg-clip-text text-transparent">
              WELCOME
            </h2>
              <span className="mt-5 px-4 py-2 bg-white/25 backdrop-blur-md border border-white/50 text-white text-xs font-bold rounded-xl tracking-wider uppercase shadow-lg">
                Hover to Unlock 
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


export default function App() {
  const [activeTab, setActiveTab] = useState('tickets');
import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import MyTicketsPage from './pages/MyTicketsPage';
import CreateEventPage from './pages/CreateEventPage';
import DashboardPage from './pages/DashboardPage';
import AdminEventsPanel from './pages/adminpanel.jsx';
import SeatSelectionPage from './pages/SeatSelectionPage.jsx';
import FoodBookingPage from './pages/FoodBookingPage.jsx';
import { 
  apiGetEvents, 
  apiGetTickets, 
  apiGetAttendees, 
  apiCreateEvent, 
  apiToggleCheckIn 
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('events');

  const [bookedPasses, setBookedPasses] = useState([
    {
      id: 'RM-2026-001',
      eventTitle: 'Rajmudra Hackathon 2026',
      category: 'Hackathon',
      name: 'Vedika Mokase',
      venue: 'Pune Engineering College',
      date: '15 Aug 2026 at 10:00 AM',
    },
    {
      id: 'AI-2026-042',
      eventTitle: 'AI & Innovation Summit',
      category: 'Summit',
      name: 'Vedika Mokase',
      venue: 'Mumbai Convention Hall',
      date: '22 Aug 2026 at 2:30 PM',
    },
    {
      id: 'CYB-2026-089',
      eventTitle: 'Cyberpunk Tech Fest',
      category: 'Fest',
      name: 'Vedika Mokase',
      venue: 'Hinjawadi IT Park, Pune',
      date: '05 Sep 2026 at 11:00 AM',
    },
  ]);

  // Load backend data on mount
  useEffect(() => {
    async function loadData() {
      const serverEvents = await apiGetEvents(events);
      if (serverEvents && serverEvents.length > 0) setEvents(serverEvents);

      const serverTickets = await apiGetTickets(myTickets);
      if (serverTickets && serverTickets.length > 0) setMyTickets(serverTickets);

      const serverAttendees = await apiGetAttendees(attendees);
      if (serverAttendees && serverAttendees.length > 0) setAttendees(serverAttendees);
    }
    loadData();
  }, []);

  // Action 1: Book a ticket / Pass
  const handleBookTicket = (ticketOrEvent) => {
    // If passed ticket object from backend
    if (ticketOrEvent.id && String(ticketOrEvent.id).startsWith('TKT-')) {
      setMyTickets((prev) => [ticketOrEvent, ...prev]);
      setAttendees((prev) => [
        ...prev,
        { id: ticketOrEvent.id, name: ticketOrEvent.name || 'User (You)', email: 'user@rajmudra.com', checkedIn: false, time: '-' }
      ]);
      return;
    }

    if (ticketOrEvent.availableSeats !== undefined && ticketOrEvent.availableSeats <= 0) return;

    const newTicketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticketData = {
      id: newTicketId,
      eventTitle: ticketOrEvent.title,
      name: 'User (You)',
      date: ticketOrEvent.date || '25 Aug 2026',
      time: ticketOrEvent.time || '10:00 AM',
      venue: ticketOrEvent.venue || 'Main Auditorium'
    };

    setMyTickets((prev) => [ticketData, ...prev]);
    setAttendees((prev) => [
      ...prev,
  const handleAddEvent = (newEvent) => {
    const passFormat = {
      id: `GA-${Math.floor(1000 + Math.random() * 9000)}`,
      eventTitle: newEvent.title,
      category: newEvent.category,
      name: 'Vedika Mokase',
      venue: newEvent.venue,
      date: `${newEvent.date} at ${newEvent.time}`,
    };

    setBookedPasses([passFormat, ...bookedPasses]);
    setMyTickets([ticketData, ...myTickets]);
    setAttendees([
      ...attendees,
      { id: newTicketId, name: 'User (You)', email: 'user@campus.edu', checkedIn: false, time: '-' }
    ]);

    if (ticketOrEvent.id) {
      setEvents((prev) => prev.map((ev) => ev.id === ticketOrEvent.id ? { ...ev, availableSeats: Math.max(0, ev.availableSeats - 1) } : ev));
    }

    setActiveTab('tickets');
  };

  // Action 2: Add newly created event (synced with backend)
  const handleAddEvent = async (newEvent) => {
    const created = await apiCreateEvent(newEvent);
    setEvents((prev) => [created, ...prev]);
    setActiveTab('events');
  };

  // Action 3: Toggle attendance in Dashboard (synced with backend)
  const handleToggleCheckIn = async (id) => {
    const updated = await apiToggleCheckIn(id, attendees);
    setAttendees(updated);
  };

  // Action 4: Handle Food Booking confirmation
  const handleBookFood = (foodPass) => {
    setMyTickets((prev) => [foodPass, ...prev]);
  };
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2416] font-sans selection:bg-amber-500 selection:text-white pb-12">
      
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-amber-500/20 px-4 sm:px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black bg-gradient-to-r from-amber-600 via-amber-700 to-[#1E1914] bg-clip-text text-transparent">
              Golden Aura Portal
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'tickets'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25'
                  : 'text-stone-600 hover:text-amber-900'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>My Passes</span>
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25'
                  : 'text-stone-600 hover:text-amber-900'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Event</span>
            </button>
          </div>
        </div>
      </header>

     
      <main>
        {activeTab === 'tickets' ? (
          <MyTicketsPage 
            bookedPasses={bookedPasses} 
            onExploreClick={() => setActiveTab('create')} 
          />
        ) : (
          <CreateEventPage 
            onAddEvent={handleAddEvent} 
          />
        )}
      </main>
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ticketCount={myTickets.length}
      />

      {activeTab === 'events' ? (
        <EventsPage events={events} onBookTicket={handleBookTicket} />
      ) : (
        <main className="max-w-6xl mx-auto p-6 pt-24">
        <main className="max-w-6xl mx-auto p-6">
          {activeTab === 'seats' && (
            <SeatSelectionPage 
              events={events} 
              onBookTicket={handleBookTicket} 
              setActiveTab={setActiveTab} 
            />
          )}

          {activeTab === 'food' && (
            <FoodBookingPage 
              onBookFood={handleBookFood} 
              setActiveTab={setActiveTab} 
            />
          )}

          {activeTab === 'tickets' && (
            <MyTicketsPage tickets={myTickets} onBrowseClick={() => setActiveTab('events')} />
          )}

          {activeTab === 'create' && (
            <CreateEventPage onAddEvent={handleAddEvent} />
          )}

          {activeTab === 'dashboard' && (
            <DashboardPage attendees={attendees} onToggleCheckIn={handleToggleCheckIn} />
          )}

          {activeTab === 'admin' && (
            <AdminEventsPanel events={events} setEvents={setEvents} attendees={attendees} />
          )}
        </main>
      )}
    </div>
  );
}