import React from "react";
import { useLocation } from "react-router-dom";
import { EventsList, Event } from "./components/EventsList";
import eventsData from "../data.json";
import { FaInstagram } from "react-icons/fa";

const sampleEvents: Event[] = eventsData as Event[];

export default function App() {
  const location = useLocation();
  const isNewPage = location.pathname === "/new";

  const filteredSampleEvents = sampleEvents.filter(
    (event) => !!event.new == !!isNewPage
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Fixed Discord Join Button */}
      <a
        className="cursor-pointer fixed text-white shadow-lg px-6  py-2 rounded-full font-medium flex items-center gap-2"
        href="https://www.instagram.com/freefoodatubc/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          zIndex: 20,
          right: "calc(50vw - min(310px, 45vw))",
          top: "1.4%",
          background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 25%, #ec4899 50%, #f97316 75%, #eab308 100%)",
          color: "white",
          padding: "5px 10px",
        }}
      >
        <FaInstagram />
        <b>Get Updates</b>
      </a>

      <div className="max-w-2xl mx-auto relative">
        <div className="mb-2">
          <h1 className="text-gray-900 mb-2">
            <span style={{ color: "RED", fontWeight: "bold"}}>{isNewPage ? "NEW " : ""}</span>Free Food <span className="text-blue-600">@ UBC</span>{" "}
          </h1>
          <p>
            Click events to <b style={{ color: "red" }}>RSVP</b>
          </p>
        </div>
        <EventsList events={filteredSampleEvents} />
        <div style={{ height: "35rem" }} />
      </div>
    </div>
  );
}
