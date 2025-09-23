import React from "react";
import { EventsList, Event } from "./components/EventsList";
import eventsData from "../data.json";

const sampleEvents: Event[] = eventsData as Event[];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Free Food <span className="text-blue-600">@ UBC</span> </h1>
        </div>
        <EventsList events={sampleEvents} />
      </div>
    </div>
  );
}
