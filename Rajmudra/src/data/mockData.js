export const initialEvents = [
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

export const initialMyTickets = [
  {
    id: 'TKT-9821',
    eventTitle: 'AI & Web3 National Hackathon 2026',
    name: 'Rahul Patil',
    date: '20 Aug 2026',
    time: '10:00 AM',
    venue: 'Main Auditorium'
  }
];

export const initialAttendees = [
  { id: 'TKT-9821', name: 'Rahul Patil', email: 'rahul@example.com', checkedIn: true, time: '09:45 AM' },
  { id: 'TKT-1044', name: 'Sneha Deshmukh', email: 'sneha@example.com', checkedIn: false, time: '-' },
  { id: 'TKT-3091', name: 'Amit Shinde', email: 'amit@example.com', checkedIn: false, time: '-' },
];

export const initialBookedPasses = [
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
];
