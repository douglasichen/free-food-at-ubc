import React from "react";
import { Event as EventCard, type Event } from "./Event";

export type { Event } from "./Event";

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = `${event.date} ${event.dayOfWeek}`;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  const dateEntries = Object.entries(eventsByDate);

  return (
    <div className="relative">
      {/* Vertical dotted line */}
      <div className="absolute left-1 top-6 bottom-0 w-px border-l-2 border-dotted border-blue-300"></div>

      <div className="space-y-8">
        {dateEntries.map(([dateKey, dateEvents], index) => (
          <div key={dateKey} className="relative space-y-4">
            {/* Date Header */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <h2 className="text-gray-900 font-normal">{dateKey}</h2>
            </div>

            {/* Events for this date */}
            <div className="space-y-4">
              {dateEvents.map((event, eventIndex) => (
                <EventCard key={eventIndex.toString()} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
