import React, { useState } from "react";
import MyTicketsPage from "./MyTicketsPage";
import CreateEventPage from "./CreateEventPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("tickets");

  // Demo Ticket Data
  const [tickets] = useState([
    {
      id: "RM-2026-001",
      name: "Vedika Mokase",
      eventTitle: "Rajmudra Hackathon 2026",
      venue: "Pune Engineering College",
      date: "15 Aug 2026",
      time: "10:00 AM",
    },
    {
      id: "RM-2026-002",
      name: "Vedika Mokase",
      eventTitle: "AI & Innovation Summit",
      venue: "Mumbai Convention Hall",
      date: "22 Aug 2026",
      time: "2:30 PM",
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-indigo-700 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <h1 className="text-2xl font-black">
          Rajmudra Coders
        </h1>

        <div className="flex gap-3">

          <button
            onClick={() => setCurrentPage("tickets")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              currentPage === "tickets"
                ? "bg-white text-indigo-700"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            My Tickets
          </button>

          <button
            onClick={() => setCurrentPage("create")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              currentPage === "create"
                ? "bg-white text-indigo-700"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            Create Event
          </button>

        </div>
      </nav>

      {/* Page */}
      <main className="max-w-6xl mx-auto p-6">

        {currentPage === "tickets" && (
          <MyTicketsPage
            tickets={tickets}
            onBrowseClick={() => setCurrentPage("create")}
          />
        )}

        {currentPage === "create" && (
          <CreateEventPage
            onBack={() => setCurrentPage("tickets")}
          />
        )}

      </main>
    </div>
  );
}