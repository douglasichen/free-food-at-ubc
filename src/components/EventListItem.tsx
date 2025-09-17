import { MapPin } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  organizer: string;
}

interface EventListItemProps {
  event: Event;
}

export function EventListItem({ event }: EventListItemProps) {
  return (
    <div className="flex items-start gap-6 p-6 hover:bg-muted/20 transition-colors border-b border-border/40 last:border-b-0">
      {/* Time */}
      <div className="text-muted-foreground min-w-16">
        {event.startTime}
      </div>
      
      {/* Event Details */}
      <div className="flex-1 space-y-2">
        <h3 className="line-clamp-2">{event.title}</h3>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        
        <p className="text-muted-foreground line-clamp-2">{event.description}</p>
      </div>
    </div>
  );
}