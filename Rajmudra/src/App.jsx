import React, { useState, useEffect } from 'react';
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
    }
  ]);

  // User Tickets Data
  const [myTickets, setMyTickets] = useState([
    {
      id: 'TKT-9821',
      eventTitle: 'AI & Web3 National Hackathon 2026',
      name: 'Rahul Patil',
      date: '20 Aug 2026',
      time: '10:00 AM',
      venue: 'Main Auditorium'
    }
  ]);

  // Attendance Data
  const [attendees, setAttendees] = useState([
    { id: 'TKT-9821', name: 'Rahul Patil', email: 'rahul@example.com', checkedIn: true, time: '09:45 AM' },
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ticketCount={myTickets.length}
      />

      {activeTab === 'events' ? (
        <EventsPage events={events} onBookTicket={handleBookTicket} />
      ) : (
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