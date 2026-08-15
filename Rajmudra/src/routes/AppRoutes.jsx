import React from 'react';
import { ShieldAlert, KeyRound, Sparkles } from 'lucide-react';
import EventsPage from '../pages/EventsPage';
import SeatSelectionPage from '../pages/SeatSelectionPage';
import FoodBookingPage from '../pages/FoodBookingPage';
import MyTicketsPage from '../pages/MyTicketsPage';
import CreateEventPage from '../pages/CreateEventPage';
import DashboardPage from '../pages/DashboardPage';
import AdminEventsPanel from '../pages/AdminEventsPanel';
import AboutPage from '../pages/AboutPage';

export default function AppRoutes({
  activeTab,
  setActiveTab,
  events,
  setEvents,
  myTickets,
  attendees,
  bookedPasses,
  user,
  setUser,
  onBookTicket,
  onAddEvent,
  onToggleCheckIn,
  onBookFood,
}) {
  if (activeTab === 'events') {
    return <EventsPage events={events} onBookTicket={onBookTicket} />;
  }

  // Guard management tabs for Admin role
  const isManagementTab = ['create', 'dashboard', 'admin'].includes(activeTab);
  const isAdmin = user?.role === 'admin';

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

      {activeTab === 'about' && (
        <AboutPage onExploreEvents={() => setActiveTab('events')} />
      )}

      {/* Restricted Access Screen if trying to open Admin Tools without Admin Login */}
      {isManagementTab && !isAdmin && (
        <div className="bg-gradient-to-r from-[#241D1A] via-[#352822] to-[#241D1A] text-white rounded-3xl p-8 sm:p-12 border border-[#E5B84B]/40 shadow-2xl text-center space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto my-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E5B84B]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D4A337] to-[#F3E5AB] text-[#1A1614] flex items-center justify-center mx-auto shadow-lg border border-[#F3E5AB]/40">
            <ShieldAlert className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5B84B]/20 border border-[#E5B84B]/40 text-[#F3E5AB] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#E5B84B]" />
              <span>Role Access Protection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5AB] to-[#E5B84B]">
              Admin Authentication Required
            </h2>
            <p className="text-xs sm:text-sm text-[#D1C7BD] max-w-md mx-auto leading-relaxed">
              Management tools like <span className="text-[#F3E5AB] font-bold">Create Event</span>, <span className="text-[#F3E5AB] font-bold">Gate Attendance Monitor</span>, and <span className="text-[#F3E5AB] font-bold">Admin Control Center</span> are reserved for verified host administrators.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                if (setUser) {
                  setUser({ name: 'Boss', email: 'rajmudra@gmail.com', role: 'admin' });
                }
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D4A337] via-[#C59325] to-[#B8860B] hover:from-[#E5B84B] hover:to-[#D4A337] text-[#1A1614] font-black text-xs sm:text-sm shadow-lg shadow-[#D4A337]/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Log In as Boss Admin (rajmudra@gmail.com)</span>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-[#F3E5AB] font-bold text-xs sm:text-sm border border-[#E5B84B]/30 transition"
            >
              Back to Public Events
            </button>
          </div>
        </div>
      )}

      {/* Admin Protected Views */}
      {isManagementTab && isAdmin && (
        <>
          {activeTab === 'create' && (
            <CreateEventPage onAddEvent={onAddEvent} />
          )}

          {activeTab === 'dashboard' && (
            <DashboardPage events={events} attendees={attendees} onToggleCheckIn={onToggleCheckIn} />
          )}

          {activeTab === 'admin' && (
            <AdminEventsPanel events={events} setEvents={setEvents} attendees={attendees} />
          )}
        </>
      )}
    </main>
  );
}
