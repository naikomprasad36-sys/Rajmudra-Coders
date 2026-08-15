const API_BASE_URL = 'http://localhost:5000/api';

// Helper to make API requests with graceful local fallback
async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[API Service] Request to ${endpoint} failed or backend offline. Using local mode.`, error.message);
    return null;
  }
}

// 1. Events API
export const apiGetEvents = async (fallbackEvents) => {
  const res = await request('/events');
  if (res && res.success && res.data) return res.data;
  return fallbackEvents;
};

export const apiCreateEvent = async (eventData) => {
  const res = await request('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
  if (res && res.success && res.data) return res.data;
  return { ...eventData, id: Date.now() };
};

export const apiDeleteEvent = async (id) => {
  const res = await request(`/events/${id}`, { method: 'DELETE' });
  return res && res.success;
};

// 2. Seat Booking API
export const apiGetReservedSeats = async (eventId, defaultReserved = []) => {
  const res = await request(`/seats/${eventId}`);
  if (res && res.success && res.reservedSeats) return res.reservedSeats;
  return defaultReserved;
};

export const apiBookSeats = async (bookingData) => {
  const res = await request('/seats/book', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
  if (res && res.success && res.data) {
    return { success: true, ticket: res.data };
  }
  // Local fallback ticket generation
  const fallbackTicket = {
    id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
    eventTitle: `${bookingData.eventTitle || 'Grand Event'} (Seats: ${bookingData.selectedSeats.join(', ')})`,
    name: bookingData.userName || 'User (You)',
    date: bookingData.date || '25 Aug 2026',
    time: bookingData.time || '10:00 AM',
    venue: bookingData.venue || 'Main Auditorium',
    seats: bookingData.selectedSeats,
    totalPrice: bookingData.grandTotal || 0,
    type: 'seat'
  };
  return { success: true, ticket: fallbackTicket };
};

// 3. Food Booking API
export const apiBookFood = async (foodOrderData) => {
  const res = await request('/food/book', {
    method: 'POST',
    body: JSON.stringify(foodOrderData),
  });
  if (res && res.success && res.data && res.ticket) {
    return { success: true, order: res.data, ticket: res.ticket };
  }
  // Local fallback food ticket generation
  const orderId = `FD-${Math.floor(1000 + Math.random() * 9000)}`;
  const fallbackTicket = {
    id: orderId,
    eventTitle: `Royal Catering (${foodOrderData.items.map(i => `${i.qty}x ${i.title}`).join(', ')})`,
    name: foodOrderData.userName || 'User (You)',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    venue: foodOrderData.table || 'Main Banquet Table',
    type: 'food'
  };
  return { 
    success: true, 
    order: { ...foodOrderData, id: orderId }, 
    ticket: fallbackTicket 
  };
};

// 4. Tickets & Attendees API
export const apiGetTickets = async (fallbackTickets) => {
  const res = await request('/tickets');
  if (res && res.success && res.data) return res.data;
  return fallbackTickets;
};

export const apiGetAttendees = async (fallbackAttendees) => {
  const res = await request('/attendees');
  if (res && res.success && res.data) return res.data;
  return fallbackAttendees;
};

export const apiToggleCheckIn = async (id, currentAttendees) => {
  const res = await request('/attendees/checkin', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
  if (res && res.success && res.data) return res.data;
  
  // Local toggle fallback
  return currentAttendees.map((a) => {
    if (a.id === id) {
      const nextStatus = !a.checkedIn;
      return {
        ...a,
        checkedIn: nextStatus,
        time: nextStatus ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'
      };
    }
    return a;
  });
};
