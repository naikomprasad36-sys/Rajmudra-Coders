import React from 'react';
import { Ticket, Calendar, MapPin, Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function MyTicketsPage({ tickets, onBrowseClick }) {
  if (tickets.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
        <Ticket className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="font-bold text-slate-700">No Tickets Booked Yet</h3>
        <p className="text-xs text-slate-500 mt-1">Explore upcoming events and book your digital QR pass.</p>
        <button 
          onClick={onBrowseClick} 
          className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
        >
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-900">Your Booked Passes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tickets.map((t) => (
          <div key={t.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col sm:flex-row">
            {/* QR Section */}
            <div className="bg-indigo-600 text-white p-6 flex flex-col items-center justify-center sm:w-48 text-center shrink-0">
              <div className="bg-white p-2.5 rounded-2xl shadow-md">
                <QRCodeSVG value={t.id} size={110} />
              </div>
              <span className="font-mono font-bold text-xs mt-3 text-indigo-100">{t.id}</span>
            </div>

            {/* Pass Info */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <div className="space-y-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full">
                  Confirmed Pass
                </span>
                <h3 className="font-bold text-slate-900 text-base">{t.eventTitle}</h3>
                <p className="text-xs text-slate-500">Attendee: <span className="font-semibold text-slate-700">{t.name}</span></p>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" /> {t.venue}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" /> {t.date} at {t.time}
                </p>
              </div>

              <button 
                onClick={() => window.print()} 
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save Pass
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}