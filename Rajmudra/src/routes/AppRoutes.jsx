import React from 'react';
import EventsPage from '../pages/EventsPage';
import SeatSelectionPage from '../pages/SeatSelectionPage';
import FoodBookingPage from '../pages/FoodBookingPage';
import MyTicketsPage from '../pages/MyTicketsPage';
import CreateEventPage from '../pages/CreateEventPage';
import DashboardPage from '../pages/DashboardPage';
import AdminEventsPanel from '../pages/adminpanel';

export default function AppRoutes({
  activeTab,
  setActiveTab,
  events,
  setEvents,
  myTickets,
  attendees,
  bookedPasses,
  onBookTicket,
  onAddEvent,
  onToggleCheckIn,
  onBookFood,
}) {
  if (activeTab === 'events') {
    return <EventsPage events={events} onBookTicket={onBookTicket} />;
  }

  return (
    <main className="max-w-6xl mx-auto p-6 pt-24">
      {activeTab === 'seats' && (
        <SeatSelectionPage 
          events={events} 
          onBookTicket={onBookTicket} 
          setActiveTab={setActiveTab} 
        />
      )}

      {activeTab === 'food' && (
        <FoodBookingPage 
          onBookFood={onBookFood} 
          setActiveTab={setActiveTab} 
        />
      )}

      {activeTab === 'tickets' && (
        <MyTicketsPage 
          tickets={myTickets} 
          bookedPasses={bookedPasses}
          onBrowseClick={() => setActiveTab('events')} 
          onExploreClick={() => setActiveTab('create')} 
        />
      )}

      {activeTab === 'create' && (
        <CreateEventPage onAddEvent={onAddEvent} />
      )}

      {activeTab === 'dashboard' && (
        <DashboardPage attendees={attendees} onToggleCheckIn={onToggleCheckIn} />
      )}

      {activeTab === 'admin' && (
        <AdminEventsPanel events={events} setEvents={setEvents} attendees={attendees} />
      )}
    </main>
  );
}
