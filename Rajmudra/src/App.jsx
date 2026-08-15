import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import MyTicketsPage from './MyTicketsPage';
import CreateEventPage from './CreateEventPage';
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

  // Initial Events Data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'AI & Web3 National Hackathon 2026',
      category: 'Hackathon',
      date: '20 Aug 2026',
      time: '10:00 AM',
      venue: 'Main Auditorium, Campus',
      totalSeats: 100,
      availableSeats: 42,
      price: 0,
      banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      title: 'Full Stack React Masterclass',
      category: 'Workshop',
      date: '25 Aug 2026',
      time: '02:00 PM',
      venue: 'Lab 304, CS Department',
      totalSeats: 50,
      availableSeats: 12,
      price: 199,
      banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      title: 'Rajmudra Golden Gala & Cultural Eve',
      category: 'Fest',
      date: '05 Sep 2026',
      time: '06:00 PM',
      venue: 'Grand Imperial Arena',
      totalSeats: 250,
      availableSeats: 88,
      price: 299,
      banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60'
    }
  ]);

  // User Tickets Data / Booked Passes
  const [myTickets, setMyTickets] = useState([
    {
      id: 'RM-2026-001',
      eventTitle: 'AI & Web3 National Hackathon 2026',
      category: 'Hackathon',
      name: 'User (You)',
      venue: 'Main Auditorium, Campus',
      date: '20 Aug 2026 at 10:00 AM',
      time: '10:00 AM'
    },
    {
      id: 'RM-2026-042',
      eventTitle: 'Full Stack React Masterclass',
      category: 'Workshop',
      name: 'User (You)',
      venue: 'Lab 304, CS Department',
      date: '25 Aug 2026 at 02:00 PM',
      time: '02:00 PM'
    }
  ]);

  // Attendance Data
  const [attendees, setAttendees] = useState([
    { id: 'RM-2026-001', name: 'User (You)', email: 'user@rajmudra.com', checkedIn: true, time: '09:45 AM' },
    { id: 'TKT-1044', name: 'Sneha Deshmukh', email: 'sneha@example.com', checkedIn: false, time: '-' },
    { id: 'TKT-3091', name: 'Amit Shinde', email: 'amit@example.com', checkedIn: false, time: '-' },
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
      setActiveTab('tickets');
      return;
    }

    if (ticketOrEvent.availableSeats !== undefined && ticketOrEvent.availableSeats <= 0) return;

    const newTicketId = `RM-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticketData = {
      id: newTicketId,
      eventTitle: ticketOrEvent.title || ticketOrEvent.eventTitle || 'Campus Event',
      category: ticketOrEvent.category || 'General',
      name: ticketOrEvent.name || 'User (You)',
      date: ticketOrEvent.date ? `${ticketOrEvent.date} at ${ticketOrEvent.time || '10:00 AM'}` : '25 Aug 2026 at 10:00 AM',
      time: ticketOrEvent.time || '10:00 AM',
      venue: ticketOrEvent.venue || 'Main Auditorium'
    };

    setMyTickets((prev) => [ticketData, ...prev]);
    setAttendees((prev) => [
      ...prev,
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
    setEvents((prev) => [created || newEvent, ...prev]);
    setActiveTab('events');
  };

  // Action 3: Toggle attendance in Dashboard (synced with backend)
  const handleToggleCheckIn = async (id) => {
    const updated = await apiToggleCheckIn(id, attendees);
    setAttendees(updated || attendees);
  };

  // Action 4: Handle Food Booking confirmation
  const handleBookFood = (foodPass) => {
    setMyTickets((prev) => [foodPass, ...prev]);
    setActiveTab('tickets');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2416] font-sans selection:bg-amber-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ticketCount={myTickets.length}
      />

      {activeTab === 'events' ? (
        <EventsPage events={events} onBookTicket={handleBookTicket} />
      ) : (
        <main className="max-w-7xl mx-auto p-4 sm:p-6">
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
            <MyTicketsPage 
              bookedPasses={myTickets} 
              tickets={myTickets} 
              onExploreClick={() => setActiveTab('events')} 
              onBrowseClick={() => setActiveTab('events')} 
            />
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