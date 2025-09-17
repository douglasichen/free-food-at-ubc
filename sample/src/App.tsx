import { useMemo } from 'react';
import { EventListItem } from './components/EventListItem';
import { Plus, Rss, Search } from 'lucide-react';
import { Button } from './components/ui/button';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
}

// Mock data for UBC events with free food - sorted by date and time
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Computer Science Study Session',
    date: '2025-09-17', // Today
    time: '6:00 PM',
    location: 'ICCS Building, Room 206',
    description: 'Join us for a collaborative study session covering algorithms and data structures. Free pizza will be provided for all participants.',
    organizer: 'UBC Computer Science Students Association',
  },
  {
    id: '2',
    title: 'Mental Health Awareness Workshop',
    date: '2025-09-17', // Today
    time: '7:30 PM',
    location: 'Student Union Building, Room 140',
    description: 'Learn about mental health resources available on campus. Light refreshments and coffee will be served.',
    organizer: 'UBC Wellness Centre',
  },
  {
    id: '3',
    title: 'Morning Yoga & Breakfast',
    date: '2025-09-18', // Tomorrow
    time: '8:00 AM',
    location: 'Recreation Centre, Studio B',
    description: 'Start your week with a relaxing yoga session followed by a healthy breakfast. All skill levels welcome.',
    organizer: 'UBC Recreation',
  },
  {
    id: '4',
    title: 'Environmental Club Beach Cleanup',
    date: '2025-09-18', // Tomorrow
    time: '10:00 AM',
    location: 'Spanish Banks Beach',
    description: 'Help clean up Spanish Banks Beach and enjoy a sustainable lunch afterward. Transportation provided from campus.',
    organizer: 'UBC Environmental Students Association',
  },
  {
    id: '5',
    title: 'Career Fair Prep Workshop',
    date: '2025-09-18', // Tomorrow
    time: '5:30 PM',
    location: 'Life Sciences Centre, Room 1200',
    description: 'Learn how to make a great impression at career fairs. Workshop includes resume review, elevator pitch practice, and networking tips.',
    organizer: 'UBC Career Centre',
  },
  {
    id: '6',
    title: 'International Students Mixer',
    date: '2025-09-19', // Day after tomorrow
    time: '7:00 PM',
    location: 'Student Union Building, Ballroom',
    description: 'Connect with international students from around the world. Enjoy authentic dishes from various cultures while making new friends.',
    organizer: 'International Student Association',
  },
  {
    id: '7',
    title: 'Physics Research Symposium',
    date: '2025-09-20',
    time: '2:00 PM',
    location: 'Hennings Building, Room 200',
    description: 'Undergraduate and graduate students present their physics research. Coffee and refreshments during poster session.',
    organizer: 'UBC Physics & Astronomy Department',
  },
];

function formatDate(dateStr: string): { dayLabel: string; dayName: string } {
  const date = new Date(dateStr);
  const today = new Date('2025-09-17'); // Current date
  const tomorrow = new Date('2025-09-18');
  
  if (date.toDateString() === today.toDateString()) {
    return { dayLabel: 'Today', dayName: 'Wednesday' };
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return { dayLabel: 'Tomorrow', dayName: 'Thursday' };
  } else {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return { dayLabel: date.getDate().toString(), dayName: dayNames[date.getDay()] };
  }
}

export default function App() {
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: { events: Event[]; dayLabel: string; dayName: string } } = {};
    
    mockEvents.forEach(event => {
      const { dayLabel, dayName } = formatDate(event.date);
      const key = event.date;
      
      if (!groups[key]) {
        groups[key] = { events: [], dayLabel, dayName };
      }
      groups[key].events.push(event);
    });
    
    // Sort events within each day by time
    Object.values(groups).forEach(group => {
      group.events.sort((a, b) => {
        const timeA = new Date(`1970/01/01 ${a.time}`).getTime();
        const timeB = new Date(`1970/01/01 ${b.time}`).getTime();
        return timeA - timeB;
      });
    });
    
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <h1>Events</h1>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Submit Event
              </Button>
              <Button variant="ghost" size="sm">
                <Rss className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Events List */}
      <div className="container mx-auto px-6 py-6 max-w-4xl">
        {Object.entries(groupedEvents).map(([date, group]) => (
          <div key={date} className="mb-8">
            {/* Day Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/40"></div>
              <h2 className="text-muted-foreground">
                {group.dayLabel} <span className="text-muted-foreground/60">{group.dayName}</span>
              </h2>
            </div>
            
            {/* Events for this day */}
            <div className="bg-card rounded-lg border overflow-hidden">
              {group.events.map(event => (
                <EventListItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
        
        {/* Footer */}
        {/* <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>
            Can't find your event? Submit new events to help fellow students discover free food opportunities.
          </p>
        </div> */}
      </div>
    </div>
  );
}