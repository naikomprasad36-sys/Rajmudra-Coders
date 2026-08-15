import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory / Persistent Store
let events = [
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
];

let tickets = [
  {
    id: 'TKT-9821',
    eventTitle: 'AI & Web3 National Hackathon 2026',
    name: 'Rahul Patil',
    date: '20 Aug 2026',
    time: '10:00 AM',
    venue: 'Main Auditorium',
    seats: ['A3', 'A4'],
    type: 'seat'
  }
];

let foodOrders = [
  {
    id: 'FD-1082',
    items: [
      { id: 'F1', title: 'Shahi Royal Thali & Banquet Feast', qty: 2, price: 699 }
    ],
    total: 1468,
    table: 'VIP Table 4',
    date: '20 Aug 2026',
    status: 'Confirmed'
  }
];

let attendees = [
  { id: 'TKT-9821', name: 'Rahul Patil', email: 'rahul@example.com', checkedIn: true, time: '09:45 AM' },
  { id: 'TKT-1044', name: 'Sneha Deshmukh', email: 'sneha@example.com', checkedIn: false, time: '-' },
  { id: 'TKT-3091', name: 'Amit Shinde', email: 'amit@example.com', checkedIn: false, time: '-' },
];

// Reserved seats map per event
let reservedSeatsMap = {
  1: ['A2', 'A5', 'C3', 'C4', 'D7', 'E1', 'E2'],
  2: ['A1', 'B2', 'B3', 'C5']
};

// ================= API ROUTES =================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Rajmudra Events Backend is running smoothly' });
});

// 1. Events APIs
app.get('/api/events', (req, res) => {
  res.json({ success: true, count: events.length, data: events });
});

app.post('/api/events', (req, res) => {
  const newEvent = {
    ...req.body,
    id: Date.now(),
    totalSeats: Number(req.body.totalSeats) || 50,
    availableSeats: Number(req.body.totalSeats) || 50,
    price: Number(req.body.price) || 0
  };
  events = [newEvent, ...events];
  res.status(201).json({ success: true, message: 'Event created successfully', data: newEvent });
});

app.delete('/api/events/:id', (req, res) => {
  const id = Number(req.params.id);
  events = events.filter((ev) => ev.id !== id);
  res.json({ success: true, message: 'Event deleted successfully' });
});

// 2. Seat Booking APIs
app.get('/api/seats/:eventId', (req, res) => {
  const eventId = Number(req.params.eventId);
  const reserved = reservedSeatsMap[eventId] || ['A2', 'C3'];
  res.json({ success: true, eventId, reservedSeats: reserved });
});

app.post('/api/seats/book', (req, res) => {
  const { eventId, selectedSeats, userName, userEmail, grandTotal } = req.body;

  if (!selectedSeats || selectedSeats.length === 0) {
    return res.status(400).json({ success: false, message: 'No seats selected' });
  }

  const targetEvent = events.find((ev) => ev.id === Number(eventId)) || events[0];
  const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;

  const newTicket = {
    id: ticketId,
    eventTitle: `${targetEvent?.title || 'Grand Event'} (Seats: ${selectedSeats.join(', ')})`,
    name: userName || 'User (You)',
    email: userEmail || 'user@rajmudra.com',
    date: targetEvent?.date || '25 Aug 2026',
    time: targetEvent?.time || '10:00 AM',
    venue: targetEvent?.venue || 'Main Auditorium',
    seats: selectedSeats,
    totalPrice: grandTotal || targetEvent?.price || 0,
    type: 'seat'
  };

  // Update reserved seats
  const currentReserved = reservedSeatsMap[eventId] || [];
  reservedSeatsMap[eventId] = [...currentReserved, ...selectedSeats];

  // Update available seats count
  events = events.map((ev) => {
    if (ev.id === Number(eventId)) {
      return { ...ev, availableSeats: Math.max(0, (ev.availableSeats || 0) - selectedSeats.length) };
    }
    return ev;
  });

  // Save ticket and attendee
  tickets = [newTicket, ...tickets];
  attendees = [
    ...attendees,
    { id: ticketId, name: newTicket.name, email: newTicket.email, checkedIn: false, time: '-' }
  ];

  res.status(201).json({
    success: true,
    message: 'Seat booking confirmed successfully!',
    data: newTicket
  });
});

// 3. Food Booking APIs
app.get('/api/food/orders', (req, res) => {
  res.json({ success: true, count: foodOrders.length, data: foodOrders });
});

app.post('/api/food/book', (req, res) => {
  const { items, table, userName, userEmail, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No food items provided' });
  }

  const orderId = `FD-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder = {
    id: orderId,
    items,
    total: total || items.reduce((sum, i) => sum + (i.price * i.qty), 0),
    table: table || 'Main Banquet Table',
    userName: userName || 'User (You)',
    userEmail: userEmail || 'user@rajmudra.com',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'Confirmed'
  };

  foodOrders = [newOrder, ...foodOrders];

  // Also create a digital ticket pass for the food booking
  const foodPass = {
    id: orderId,
    eventTitle: `Royal Catering (${items.map(i => `${i.qty}x ${i.title}`).join(', ')})`,
    name: newOrder.userName,
    date: newOrder.date,
    time: newOrder.time,
    venue: newOrder.table,
    type: 'food'
  };

  tickets = [foodPass, ...tickets];

  res.status(201).json({
    success: true,
    message: 'Food booking confirmed successfully!',
    data: newOrder,
    ticket: foodPass
  });
});

// 4. Tickets & Attendees APIs
app.get('/api/tickets', (req, res) => {
  res.json({ success: true, count: tickets.length, data: tickets });
});

app.get('/api/attendees', (req, res) => {
  res.json({ success: true, count: attendees.length, data: attendees });
});

app.post('/api/attendees/checkin', (req, res) => {
  const { id } = req.body;
  attendees = attendees.map((a) => {
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
  res.json({ success: true, data: attendees });
});

app.listen(PORT, () => {
  console.log(`✨ Rajmudra Events Backend Server running on http://localhost:${PORT}`);
});
