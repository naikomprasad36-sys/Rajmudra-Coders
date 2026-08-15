import React, { useState } from 'react';
import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import MyTicketsPage from './pages/MyTicketsPage';
import CreateEventPage from './pages/CreateEventPage';
import DashboardPage from './pages/DashboardPage';

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

  // Action 1: Book a ticket
  const handleBookTicket = (event) => {
    if (event.availableSeats <= 0) return;

    const newTicketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticketData = {
      id: newTicketId,
      eventTitle: event.title,
      name: 'User (You)',
      date: event.date,
      time: event.time,
      venue: event.venue
    };

    setMyTickets([ticketData, ...myTickets]);
    setAttendees([
      ...attendees,
      { id: newTicketId, name: 'User (You)', email: 'user@campus.edu', checkedIn: false, time: '-' }
    ]);
    
    // Decrement available seats
    setEvents(events.map((ev) => ev.id === event.id ? { ...ev, availableSeats: ev.availableSeats - 1 } : ev));

    setActiveTab('tickets');
  };

  // Action 2: Add newly created event
  const handleAddEvent = (newEvent) => {
    setEvents([newEvent, ...events]);
    setActiveTab('events');
  };

  // Action 3: Toggle attendance in Dashboard
  const handleToggleCheckIn = (id) => {
    setAttendees(attendees.map((a) => {
      if (a.id === id) {
        const nextStatus = !a.checkedIn;
        return {
          ...a,
          checkedIn: nextStatus,
          time: nextStatus ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'
        };
      }
      return a;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        ticketCount={myTickets.length} 
      />

      <main className="max-w-6xl mx-auto p-6">
        {activeTab === 'events' && (
          <EventsPage events={events} onBookTicket={handleBookTicket} />
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
      </main>
    </div>
  );
}