import React from 'react';
import { Ticket, Calendar, MapPin, Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function MyTicketsPage({ tickets, onBrowseClick }) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 shadow-sm">
        <Ticket className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="font-bold text-slate-700 text-lg">No Tickets Booked Yet</h3>
        <p className="text-xs text-slate-500 mt-1">Explore upcoming events and book your digital QR pass.</p>
        <button 
          onClick={onBrowseClick} 
          className="mt-5 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
        >
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Your Booked Passes</h2>
          <p className="text-xs text-slate-500 mt-0.5">Show your QR code at the event entrance for quick check-in.</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
          {tickets.length} {tickets.length === 1 ? 'Ticket' : 'Tickets'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tickets.map((t) => (
          <div key={t.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col sm:flex-row">
            {/* QR Section */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-6 flex flex-col items-center justify-center sm:w-48 text-center shrink-0">
              <div className="bg-white p-3 rounded-2xl shadow-lg">
                <QRCodeSVG value={t.id} size={110} />
              </div>
              <span className="font-mono font-bold text-xs mt-3 tracking-wider text-indigo-100">{t.id}</span>
            </div>

            {/* Pass Info */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <div className="space-y-2">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-emerald-200">
                  ✓ Confirmed Pass
                </span>
                <h3 className="font-bold text-slate-900 text-base leading-snug">{t.eventTitle}</h3>
                <p className="text-xs text-slate-500">Attendee: <span className="font-semibold text-slate-700">{t.name}</span></p>
                <div className="pt-2 space-y-1">
                  <p className="text-xs text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> {t.venue}
                  </p>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> {t.date} at {t.time}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => window.print()} 
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
              >
                <Printer className="w-4 h-4" /> Print / Save Pass
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
