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

  const twoWeekFromNow = new Date();
  twoWeekFromNow.setDate(twoWeekFromNow.getDate() + 14);

  const dateEntries = Object.entries(eventsByDate).filter(
    ([_, dateEvents]) =>
      new Date(`${dateEvents[0].date} ${new Date().getFullYear()}`) <=
      twoWeekFromNow
  );

  return (
    <div>
      {dateEntries.map(([dateKey, dateEvents], index) => (
        <div key={dateKey}>
          {/* Date Header */}
          <div
            className="sticky top-0 z-10 bg-gray-50 py-4 mb-4 border-b border-gray-200"
            style={{
              left: 0,
              right: 0,
              marginLeft: "calc(-50vw + 50%)",
              marginRight: "calc(-50vw + 50%)",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-gray-900 font-normal text-lg">{dateKey}</h2>
            </div>
          </div>

          {/* Events for this date */}
          <div className="space-y-4 mb-8">
            {dateEvents.map((event, eventIndex) => (
              <EventCard key={`${dateKey}-${eventIndex}`} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
