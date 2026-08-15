import React from 'react';
import { Users, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage({ attendees, onToggleCheckIn }) {
  const total = attendees.length;
  const checkedInCount = attendees.filter((a) => a.checkedIn).length;
  const remaining = total - checkedInCount;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-900">Live Attendance Monitor</h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Users className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Total Registered</p>
            <p className="text-2xl font-black text-slate-900">{total}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Checked In</p>
            <p className="text-2xl font-black text-slate-900">{checkedInCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-5 h-5" /></div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Remaining</p>
            <p className="text-2xl font-black text-slate-900">{remaining}</p>
          </div>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 text-sm">Gate Attendance List</h3>
          <span className="text-xs text-slate-500">Click status button to mark present</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="px-6 py-3">Pass ID</th>
                <th className="px-6 py-3">Attendee Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendees.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-3 font-mono font-bold text-indigo-600">{a.id}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800">{a.name}</td>
                  <td className="px-6 py-3 text-slate-500">{a.email}</td>
                  <td className="px-6 py-3 text-slate-500">{a.time}</td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => onToggleCheckIn(a.id)}
                      className={`px-3 py-1 rounded-full font-bold transition ${
                        a.checkedIn
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white'
                      }`}
                    >
                      {a.checkedIn ? '✓ Scanned / Present' : 'Mark Present'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
