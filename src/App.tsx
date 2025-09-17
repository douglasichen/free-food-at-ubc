import { useMemo } from 'react';
import { EventListItem } from './components/EventListItem';
import mockData from './mockData.json';

interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  location: string;
  description: string;
}

// Convert mockData to match the expected format
const mockEvents: Event[] = mockData.map(event => ({
  id: event.id.toString(),
  title: event.title,
  date: event.date,
  startTime: event.startTime,
  location: event.location,
  description: event.description,
}));

function formatDate(dateStr: string): { dayLabel: string; dayName: string } {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return { dayLabel: 'Today', dayName: today.toLocaleDateString('en-US', { weekday: 'long' }) };
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return { dayLabel: 'Tomorrow', dayName: tomorrow.toLocaleDateString('en-US', { weekday: 'long' }) };
  } else {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabel = `${monthNames[date.getMonth()]} ${date.getDate()}`;
    return { dayLabel, dayName: dayNames[date.getDay()] };
  }
}

export default function App() {
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: { events: Event[]; dayLabel: string; dayName: string } } = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    // Filter events to only include today and future events
    const filteredEvents = mockEvents.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0); // Start of event day
      return eventDate >= today;
    });
    
    filteredEvents.forEach(event => {
      const { dayLabel, dayName } = formatDate(event.date);
      const key = event.date;
      
      if (!groups[key]) {
        groups[key] = { events: [], dayLabel, dayName };
      }
      groups[key].events.push(event);
    });
    
    // Sort events within each day by start time
    Object.values(groups).forEach(group => {
      group.events.sort((a, b) => {
        const timeA = new Date(`1970/01/01 ${a.startTime}`).getTime();
        const timeB = new Date(`1970/01/01 ${b.startTime}`).getTime();
        return timeA - timeB;
      });
    });
    
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Free Food at UBC</h1>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-muted-foreground/20 rounded"></div>
            <div className="w-6 h-6 bg-muted-foreground/20 rounded"></div>
            <div className="w-6 h-6 bg-muted-foreground/20 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Timeline Events List */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div className="timeline-container">
          {Object.entries(groupedEvents).map(([date, group]) => (
            <div key={date} className="timeline-section mb-8">
              {/* Timeline Day Header */}
              <div className="timeline-title mb-4 relative pl-20">
                {/* Timeline dot for day header */}
                <div className="absolute left-20 top-1 w-3 h-3 bg-muted-foreground/80 rounded-full border-2 border-background"></div>
                <h2 className="text-muted-foreground text-sm font-medium">
                  {group.dayLabel} <span className="text-muted-foreground/60">{group.dayName}</span>
                </h2>
              </div>
              
              {/* Timeline Events */}
              <div className="timeline-events relative">
                {group.events.map((event) => (
                  <EventListItem 
                    key={event.id} 
                    event={event} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
