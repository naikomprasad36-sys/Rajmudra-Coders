import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';
import { 
  initialEvents, 
  initialMyTickets, 
  initialAttendees, 
  initialBookedPasses 
} from './data/mockData';
import { 
  apiGetEvents, 
  apiGetTickets, 
  apiGetAttendees, 
  apiCreateEvent, 
  apiToggleCheckIn 
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('events');

  // Application Datasets
  const [events, setEvents] = useState(initialEvents);
  const [myTickets, setMyTickets] = useState(initialMyTickets);
  const [attendees, setAttendees] = useState(initialAttendees);
  const [bookedPasses] = useState(initialBookedPasses);

  // Sync dataset state with backend service on initial mount
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
    if (ticketOrEvent && ticketOrEvent.id && String(ticketOrEvent.id).startsWith('TKT-')) {
      setMyTickets((prev) => [ticketOrEvent, ...prev]);
      setAttendees((prev) => [
        ...prev,
        { id: ticketOrEvent.id, name: ticketOrEvent.name || 'User (You)', email: 'user@rajmudra.com', checkedIn: false, time: '-' }
      ]);
      return;
    }

    if (ticketOrEvent && ticketOrEvent.availableSeats !== undefined && ticketOrEvent.availableSeats <= 0) return;

    const newTicketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticketData = {
      id: newTicketId,
      eventTitle: ticketOrEvent?.title || 'Campus Event Pass',
      name: 'User (You)',
      date: ticketOrEvent?.date || '25 Aug 2026',
      time: ticketOrEvent?.time || '10:00 AM',
      venue: ticketOrEvent?.venue || 'Main Auditorium'
    };

    setMyTickets((prev) => [ticketData, ...prev]);
    setAttendees((prev) => [
      ...prev,
      { id: newTicketId, name: 'User (You)', email: 'user@campus.edu', checkedIn: false, time: '-' }
    ]);

    if (ticketOrEvent && ticketOrEvent.id) {
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

      <AppRoutes
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        events={events}
        setEvents={setEvents}
        myTickets={myTickets}
        attendees={attendees}
        bookedPasses={bookedPasses}
        onBookTicket={handleBookTicket}
        onAddEvent={handleAddEvent}
        onToggleCheckIn={handleToggleCheckIn}
        onBookFood={handleBookFood}
      />
    </div>
  );
}