import React from "react";
import { MapPin, Utensils, Info } from "lucide-react";

export interface Event {
  date: string;
  dayOfWeek: string;
  time: string;
  title: string;
  location: string;
  source: string;
  food?: string;
  description?: string;
}

interface EventProps {
  event: Event;
  key: string;
}

export function Event({ event, key }: EventProps) {
  const handleCardClick = () => {
    window.open(event.source, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="group bg-white border border-gray-200 rounded-xl p-6 ml-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-blue-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="space-y-4">
        <div className="text-blue-600 font-medium">{event.time}</div>
        <h3 className="text-gray-900 leading-tight">
          <strong>{event.title}</strong>
        </h3>

        {/* Food Information */}
        {event.food && (
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 flex-shrink-0" stroke="red" />
            <span className="text-sm font-medium text-gray-700">
              {event.food}
            </span>
          </div>
        )}

        {/* Event Description */}
        {event.description && (
          <div className="flex items-start gap-2 text-gray-600">
            {/* <Info className="w-4 h-4 mt-0.5 flex-shrink-0" /> */}
            <p className="text-sm leading-relaxed">{event.description}</p>
          </div>
        )}

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 group-hover:text-blue-600 transition-colors duration-200">
          <MapPin className="w-4 h-4 group-hover:text-blue-600 transition-colors duration-200" />
          <span className="group-hover:underline group-hover:text-blue-600 transition-colors duration-200">
            {event.location}
          </span>
        </div>
      </div>
    </div>
  );
}
