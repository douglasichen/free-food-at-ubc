import React from "react";
import { MapPin } from "lucide-react";

export interface Event {
  id: string;
  date: string;
  dayOfWeek: string;
  time: string;
  title: string;
  location: string;
  source: string;
}

interface EventProps {
  event: Event;
  key: string;
}

export function Event({ event, key }: EventProps) {
  const handleCardClick = () => {
    window.open(event.source, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="group bg-white border border-gray-200 rounded-xl p-6 ml-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-blue-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="space-y-3">
        <div className="text-blue-600">{event.time}</div>
        <h3 className="text-gray-900 leading-tight">
          <strong>{event.title}</strong>
        </h3>
        <div className="flex items-center gap-2 text-gray-500 group-hover:text-blue-600 transition-colors duration-200">
          <MapPin className="w-4 h-4 group-hover:text-blue-600 transition-colors duration-200" />
          <span className="group-hover:underline group-hover:text-blue-600 transition-colors duration-200">{event.location}</span>
        </div>
      </div>
    </div>
  );
}
