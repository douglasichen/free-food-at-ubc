import { MapPin } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  location: string;
  description: string;
}

interface EventListItemProps {
  event: Event;
}

export function EventListItem({ event }: EventListItemProps) {
  return (
    <div className="timeline-event-item">
      {/* Time positioned to the left of timeline */}
      <div className="absolute left-0 top-0 text-muted-foreground text-sm font-medium w-16">
        {event.startTime}
      </div>
      
      {/* Timeline dot */}
      <div className="absolute left-20 top-1 w-3 h-3 bg-muted-foreground/80 rounded-full border-2 border-background"></div>
      
      {/* Event content positioned to the right of timeline */}
      <div className="ml-28">
        <div className="space-y-1">
          {/* Title */}
          <h3 className="text-base font-semibold text-foreground leading-tight">{event.title}</h3>
          
          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{event.location}</span>
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  );
}
