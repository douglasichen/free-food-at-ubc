/// <reference types="vite/client" />
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EventsList, Event } from "./components/EventsList";
import { EventSkeleton } from "./components/Event";
import staticEvents from "../data.json";
import { FaInstagram } from "react-icons/fa";

const eventsApiUrl = import.meta.env.VITE_EVENTS_API_URL;

function translateDatetime(datetime: string): { month: string; dayNumber: string; dayOfWeek: string; time: string } {
  const date = new Date(datetime);
  const strMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const strDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    month: strMonths[date.getMonth()],
    dayNumber: date.getDate().toString(),
    dayOfWeek: strDays[date.getDay()],
    time: (() => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours === 0 ? 12 : hours; // the hour '0' should be '12'
      const minutesStr = minutes.toString().padStart(2, "0");
      return `${hours}:${minutesStr} ${ampm}`;
    })(),
  };
}

export default function App() {
  const location = useLocation();
  const isNewPage = location.pathname === "/new";
  const isAllEventsPage = location.pathname === "/all-events";
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(eventsApiUrl).then((res) =>
      res.json().then((data) => {
        const rawEvents = data.events.map((event) => event.ai_data);
        console.log(`rawEvents:`, rawEvents);
        const eventsWithFreeFood = rawEvents.filter(
          (event) => (event?.free === "yes" || event?.free === "unsure") && event?.has_food_or_drinks === true && event?.food_or_drinks && event?.food_or_drinks !== ""
        );

        const eventsToDisplay = isAllEventsPage ? rawEvents : eventsWithFreeFood;
        const structuredEventsFromApi = eventsToDisplay.map((event) => {
          const { month, dayNumber, dayOfWeek, time } = translateDatetime(event.datetime);
          return {
            datetime: event.datetime,
            date: `${month} ${dayNumber}`,
            dayOfWeek,
            time,
            title: event.event_name,
            source: event.instagram_url,
            location: event.location,
            food: event.food_or_drinks,
            description: event.description,
          };
        });

        const allEvents = isAllEventsPage ? structuredEventsFromApi : [...structuredEventsFromApi, ...staticEvents];
        const sortedEvents = allEvents.sort((a, b) => {
          const dateA = new Date(a.datetime);
          const dateB = new Date(b.datetime);
          const isDecemberA = dateA.getMonth() === 11;
          const isDecemberB = dateB.getMonth() === 11;
          if (isDecemberA && !isDecemberB) return -1;
          if (!isDecemberA && isDecemberB) return 1;
          return dateA.getTime() - dateB.getTime();
        });
        console.log(sortedEvents);
        setEvents(sortedEvents);
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        setLoading(false);
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
        {loading ? (
          <div role="status" aria-label="Loading events">
            <div className="py-4 mb-4 border-b border-gray-200">
              <div className="skeleton" style={{ width: "40%", height: 20 }} />
            </div>
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <EventSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <EventsList events={events} showAll={isAllEventsPage} />
        )}
        <div style={{ height: "35rem" }} />
      </div>
    </div>
  );
}
