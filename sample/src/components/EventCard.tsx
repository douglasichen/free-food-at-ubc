import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Utensils } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  foodType: string;
  description: string;
  organization: string;
  category: 'academic' | 'club' | 'social' | 'career';
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'club':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'social':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'career':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2">{event.title}</CardTitle>
          <Badge className={getCategoryColor(event.category)}>
            {event.category}
          </Badge>
        </div>
        <p className="text-muted-foreground">{event.organization}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{event.date} at {event.time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Utensils className="h-4 w-4 text-green-600" />
          <Badge variant="secondary" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            {event.foodType}
          </Badge>
        </div>
        
        <p className="text-muted-foreground line-clamp-3">{event.description}</p>
      </CardContent>
    </Card>
  );
}