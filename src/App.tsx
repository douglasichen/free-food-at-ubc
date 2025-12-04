/// <reference types="vite/client" />
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EventsList, Event } from "./components/EventsList";
import staticEvents from "../data.json";
import { FaInstagram } from "react-icons/fa";

const eventsApiUrl = import.meta.env.VITE_EVENTS_API_URL;

function translateDatetime(datetime: string): { month: string; dayNumber: string; dayOfWeek: string; time: string } {
  const date = new Date(datetime);
  const strMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const strDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    month: strMonths[date.getMonth()],
    dayNumber: date.getDate().toString(),
    dayOfWeek: strDays[date.getDay()],
    time: date.getHours().toString() + ":" + date.getMinutes().toString(),
  };
}

export default function App() {
  const location = useLocation();
  const isNewPage = location.pathname === "/new";
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch(eventsApiUrl).then((res) =>
      res.json().then((data) => {
        const rawEvents = data.events.map((event) => event.ai_data);
        const eventsWithFreeFood = rawEvents.filter(
          (event) => event?.free !== "no" && event?.has_food_or_drinks === true
        );

        console.log(eventsWithFreeFood);
        const structuredEventsFromApi: Event[] = eventsWithFreeFood.map((event) => {
          const { month, dayNumber, dayOfWeek, time } = translateDatetime(event.datetime);
          return {
            date: `${month} ${dayNumber}`,
            dayOfWeek,
            time,
            title: event.event_name,
            source: event.instagram_url,
            location: event.location,
            food: event.food,
            description: event.description,
          };
        });

        console.log(structuredEventsFromApi);

        const allEvents = [...structuredEventsFromApi, ...staticEvents];
        setEvents(allEvents);
      }).catch((err) => {
        console.error(err);
      })
    );
  }, []);

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
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 25%, #ec4899 50%, #f97316 75%, #eab308 100%)",
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
            <span style={{ color: "RED", fontWeight: "bold" }}>
              {isNewPage ? "NEW " : ""}
            </span>
            Free Food <span className="text-blue-600">@ UBC</span>{" "}
          </h1>
          <p>
            Click events to <b style={{ color: "red" }}>RSVP</b>
          </p>
        </div>
        <EventsList events={events} />
        <div style={{ height: "35rem" }} />
      </div>
    </div>
  );
}
