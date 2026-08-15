import React, { useState, useEffect } from 'react';
import { 
  Armchair, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  Ticket, 
  Info, 
  ChevronRight, 
  ShieldCheck, 
  Calendar, 
  MapPin,
  Loader2
} from 'lucide-react';
import { apiGetReservedSeats, apiBookSeats } from '../services/api';

export default function SeatSelectionPage({ events = [], onBookTicket, setActiveTab }) {
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || 1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState(['A2', 'A5', 'C3', 'C4', 'D7', 'E1', 'E2']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  const selectedEvent = events.find((e) => e.id === Number(selectedEventId)) || events[0] || {
    id: 1,
    title: 'Grand Royal Gala 2026',
    date: '25 Aug 2026',
    time: '07:00 PM',
    venue: 'Royal Ballroom, The Imperial',
    price: 499
  };

  // Fetch live reserved seats from backend whenever selected event changes
  useEffect(() => {
    async function loadReserved() {
      const seats = await apiGetReservedSeats(selectedEventId, ['A2', 'A5', 'C3', 'C4', 'D7', 'E1', 'E2']);
      setReservedSeats(seats);
    }
    loadReserved();
  }, [selectedEventId]);

  // Seat Configuration: Rows A-B (VIP), C-D (Premium), E-F (Classic)
  const rows = [
    { row: 'A', tier: 'VIP Royal Lounge', price: 999, seats: 8 },
    { row: 'B', tier: 'VIP Royal Lounge', price: 999, seats: 8 },
    { row: 'C', tier: 'Gold Premium', price: 599, seats: 10 },
    { row: 'D', tier: 'Gold Premium', price: 599, seats: 10 },
    { row: 'E', tier: 'Classic Comfort', price: 299, seats: 12 },
    { row: 'F', tier: 'Classic Comfort', price: 299, seats: 12 },
  ];

  const toggleSeat = (seatId, price, tier) => {
    if (reservedSeats.includes(seatId)) return;

    if (selectedSeats.some((s) => s.id === seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        alert('You can select a maximum of 8 seats per booking.');
        return;
      }
      setSelectedSeats([...selectedSeats, { id: seatId, price, tier }]);
    }
  };

  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + tax;

  // Confirm booking & sync with backend
  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const seatIds = selectedSeats.map((s) => s.id);
      const result = await apiBookSeats({
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        selectedSeats: seatIds,
        userName: 'User (You)',
        userEmail: 'user@rajmudra.com',
        grandTotal,
        date: selectedEvent.date,
        time: selectedEvent.time,
        venue: selectedEvent.venue
      });

      if (result && result.ticket) {
        setConfirmedTicket(result.ticket);
        setReservedSeats((prev) => [...prev, ...seatIds]);
        
        if (onBookTicket) {
          onBookTicket(result.ticket);
        }

        setBookingSuccess(true);
        setTimeout(() => {
          if (setActiveTab) setActiveTab('tickets');
        }, 2200);
      }
    } catch (err) {
      console.error('Failed to book seats:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#241D1A] via-[#352822] to-[#241D1A] text-white rounded-3xl p-8 border border-[#E5B84B]/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B84B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B84B]/20 border border-[#E5B84B]/40 text-[#F3E5AB] text-xs font-bold">
              <Armchair className="w-3.5 h-3.5 text-[#E5B84B]" />
              <span>Interactive Theater & Hall Seating</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5AB] to-[#E5B84B]">
              Select Your Preferred Seats
            </h1>
            <p className="text-[#D1C7BD] text-xs sm:text-sm max-w-xl">
              Live seat reservation connected to backend database. Choose seats across VIP Lounges, Premium, and Classic tiers.
            </p>
          </div>

          {/* Event Selector Dropdown */}
          <div className="bg-[#1A1614]/80 p-3 rounded-2xl border border-[#E5B84B]/30 backdrop-blur-md">
            <label className="block text-[11px] font-bold text-[#D1C7BD] mb-1">Select Event:</label>
            <select
              value={selectedEventId}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
                setSelectedSeats([]);
              }}
              className="bg-[#241D1A] text-[#F3E5AB] font-bold text-xs px-3 py-2 rounded-xl border border-[#E5B84B]/30 outline-none focus:ring-2 focus:ring-[#E5B84B] w-full sm:w-64"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id} className="bg-[#241D1A] text-white">
                  {ev.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Seat Selection Layout: Left Seat Grid, Right Booking Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Seat Map Stage & Grid */}
        <div className="lg:col-span-2 bg-[#241D1A]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#E5B84B]/30 shadow-xl space-y-8">
          
          {/* Stage / Screen Indicator */}
          <div className="space-y-2 text-center">
            <div className="w-4/5 mx-auto h-3 rounded-t-full bg-gradient-to-r from-transparent via-[#E5B84B] to-transparent shadow-lg shadow-[#E5B84B]/30" />
            <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#D1C7BD]">
              ✧ Grand Stage / Performance Deck ✧
            </p>
          </div>

          {/* Seat Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 pb-4 border-b border-[#E5B84B]/20 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-lg bg-[#3A2E28] border border-[#E5B84B]/40 shadow-xs" />
              <span className="text-[#D1C7BD]">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-[#D4A337] to-[#F3E5AB] text-[#1A1614] font-black flex items-center justify-center text-[10px] shadow-sm">
                ✓
              </div>
              <span className="text-[#F3E5AB] font-bold">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-lg bg-slate-800/80 border border-slate-700 opacity-40 cursor-not-allowed" />
              <span className="text-slate-500">Reserved / Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-[#D4A337] to-[#E5B84B] border border-[#F3E5AB]/40 shadow-xs" />
              <span className="text-[#E5B84B] font-bold">VIP Lounge (₹999)</span>
            </div>
          </div>

          {/* Seating Grid */}
          <div className="space-y-4 overflow-x-auto py-2">
            {rows.map((rowInfo) => (
              <div key={rowInfo.row} className="flex items-center justify-center gap-2 sm:gap-3 min-w-[500px]">
                {/* Row Identifier */}
                <div className="w-7 text-center font-black text-xs text-[#E5B84B]">
                  {rowInfo.row}
                </div>

                {/* Seats in Row */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {Array.from({ length: rowInfo.seats }).map((_, idx) => {
                    const seatNumber = idx + 1;
                    const seatId = `${rowInfo.row}${seatNumber}`;
                    const isReserved = reservedSeats.includes(seatId);
                    const isSelected = selectedSeats.some((s) => s.id === seatId);

                    return (
                      <button
                        key={seatId}
                        type="button"
                        disabled={isReserved}
                        onClick={() => toggleSeat(seatId, rowInfo.price, rowInfo.tier)}
                        title={`${seatId} - ${rowInfo.tier} (₹${rowInfo.price})`}
                        className={`group relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-[11px] font-bold transition-all duration-200 ${
                          isReserved
                            ? 'bg-slate-800/60 text-slate-600 border border-slate-700 cursor-not-allowed'
                            : isSelected
                              ? 'bg-gradient-to-tr from-[#D4A337] via-[#E5B84B] to-[#F3E5AB] text-[#1A1614] font-black scale-110 shadow-lg shadow-[#E5B84B]/40 ring-2 ring-[#F3E5AB]'
                              : 'bg-[#3A2E28] hover:bg-[#E5B84B]/20 text-[#D1C7BD] hover:text-[#F3E5AB] border border-[#E5B84B]/30 hover:scale-105 active:scale-95'
                        }`}
                      >
                        {isSelected ? '✓' : seatNumber}
                      </button>
                    );
                  })}
                </div>

                {/* Tier Label */}
                <div className="w-24 text-right text-[10px] font-bold text-[#8C7A6B] truncate">
                  ₹{rowInfo.price}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <p className="text-[11px] text-[#A39485]">
              💡 Tip: Click seats to select or unselect. Reserved seats are automatically synchronized with the backend.
            </p>
          </div>
        </div>

        {/* Right Column: Live Selection & Pricing Summary */}
        <div className="bg-[#241D1A]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#E5B84B]/30 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5B84B]/20 pb-4">
              <div>
                <h3 className="text-lg font-black text-[#F3E5AB] tracking-wide">Booking Summary</h3>
                <p className="text-xs text-[#8C7A6B]">Reserved Seating Details</p>
              </div>
              <Crown className="w-5 h-5 text-[#E5B84B]" />
            </div>

            {/* Event Meta Card */}
            <div className="bg-[#1A1614] p-4 rounded-2xl border border-[#E5B84B]/20 space-y-2">
              <h4 className="font-extrabold text-sm text-white line-clamp-1">{selectedEvent.title}</h4>
              <div className="space-y-1 text-xs text-[#D1C7BD]">
                <p className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E5B84B]" />
                  <span>{selectedEvent.date} • {selectedEvent.time}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E5B84B]" />
                  <span className="truncate">{selectedEvent.venue}</span>
                </p>
              </div>
            </div>

            {/* Selected Seats Chips */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#D1C7BD] flex items-center justify-between">
                <span>Selected Seats ({selectedSeats.length}):</span>
                {selectedSeats.length > 0 && (
                  <button
                    onClick={() => setSelectedSeats([])}
                    className="text-[10px] text-rose-400 hover:underline font-bold"
                  >
                    Clear All
                  </button>
                )}
              </label>

              {selectedSeats.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-[#1A1614] border border-dashed border-[#E5B84B]/20 text-[#8C7A6B] text-xs">
                  No seats selected yet. Click any seat on the grid to reserve.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 bg-[#1A1614] rounded-2xl border border-[#E5B84B]/20">
                  {selectedSeats.map((s) => (
                    <span
                      key={s.id}
                      className="px-3 py-1.5 rounded-xl bg-[#E5B84B]/15 border border-[#E5B84B]/40 text-[#F3E5AB] font-black text-xs flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{s.id}</span>
                      <span className="text-[10px] font-normal text-[#D1C7BD]">(₹{s.price})</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bill Breakdown */}
            {selectedSeats.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#E5B84B]/20 text-xs text-[#D1C7BD]">
                <div className="flex justify-between">
                  <span>Seats Subtotal</span>
                  <span className="font-bold text-white">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Service Fee (18%)</span>
                  <span className="font-bold text-white">₹{tax}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#F3E5AB] pt-2 border-t border-[#E5B84B]/20">
                  <span>Total Amount</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            )}
          </div>

          {/* Success Banner or Action Button */}
          <div>
            {bookingSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-center space-y-1 animate-in zoom-in-95">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="font-extrabold text-sm">Pass #{confirmedTicket?.id || 'TKT-LIVE'} Confirmed!</p>
                <p className="text-[11px] text-emerald-400/80">Backend verified • Redirecting to tickets...</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={selectedSeats.length === 0 || isSubmitting}
                className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-300 shadow-xl ${
                  selectedSeats.length === 0 || isSubmitting
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-[#D4A337] via-[#E5B84B] to-[#D4A337] text-[#1A1614] shadow-[#D4A337]/30 hover:scale-[1.02] active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting Backend...</span>
                  </>
                ) : (
                  <>
                    <Ticket className="w-4 h-4" />
                    <span>Confirm & Reserve ({selectedSeats.length} Seats)</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
