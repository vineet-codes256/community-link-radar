import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ExternalLink,
  Filter,
  Search as SearchIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useMemo, useCallback, memo } from 'react';

// Mock data for events
const events = [
  {
    id: 1,
    title: 'Weekend Farmers Market',
    image: '',
    date: 'Apr 20, 2025',
    time: '9:00 AM - 2:00 PM',
    location: 'Cubbon Park, Bengaluru',
    organizer: 'Local Farmers Association',
    attendees: 112,
    category: 'Community',
    description:
      'Fresh produce, handmade crafts, and local food. Support local farmers and artisans!',
  },
  {
    id: 2,
    title: 'Tech Networking Mixer',
    image: '',
    date: 'Apr 22, 2025',
    time: '6:30 PM - 9:00 PM',
    location: 'The Leela, Indiranagar',
    organizer: 'Bengaluru Tech Network',
    attendees: 86,
    category: 'Professional',
    description:
      'Connect with tech professionals across Bengaluru. Great opportunity for networking and career growth.',
  },
  {
    id: 3,
    title: 'Cultural Dance Performance',
    image: '',
    date: 'Apr 25, 2025',
    time: '7:00 PM - 9:30 PM',
    location: 'Chowdiah Memorial Hall',
    organizer: 'Karnataka Cultural Association',
    attendees: 230,
    category: 'Entertainment',
    description: "Traditional dance performances showcasing Karnataka's rich cultural heritage.",
  },
  {
    id: 4,
    title: 'Community Cleanup Drive',
    image: '',
    date: 'Apr 27, 2025',
    time: '8:00 AM - 11:00 AM',
    location: 'Ulsoor Lake',
    organizer: 'Clean Bengaluru Initiative',
    attendees: 45,
    category: 'Social',
    description:
      "Join us in cleaning up Ulsoor Lake. Equipment will be provided. Let's make our city cleaner!",
  },
  {
    id: 5,
    title: 'React & TypeScript Workshop',
    image: '',
    date: 'Apr 30, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'Microsoft Office, Koramangala',
    organizer: 'Vineet Rawat & Suneet Rawat',
    attendees: 67,
    category: 'Professional',
    description:
      'Hands-on workshop covering React 19 features, TypeScript best practices, and modern web development techniques.',
  },
  {
    id: 6,
    title: 'Startup Pitch Night',
    image: '',
    date: 'May 2, 2025',
    time: '7:00 PM - 10:00 PM',
    location: '91Springboard, Koramangala',
    organizer: 'Bengaluru Startup Community',
    attendees: 94,
    category: 'Professional',
    description:
      'Watch innovative startups pitch their ideas to investors and industry experts. Network with entrepreneurs and investors.',
  },
  {
    id: 7,
    title: 'Photography Walk & Exhibition',
    image: '',
    date: 'May 5, 2025',
    time: '8:00 AM - 6:00 PM',
    location: 'Lalbagh Botanical Garden',
    organizer: 'Bengaluru Photography Club',
    attendees: 156,
    category: 'Entertainment',
    description:
      'Morning photography walk followed by an exhibition of local photographers work. All skill levels welcome.',
  },
  {
    id: 8,
    title: 'Women in Tech Meetup',
    image: '',
    date: 'May 8, 2025',
    time: '6:00 PM - 8:30 PM',
    location: 'ThoughtWorks, Indiranagar',
    organizer: 'Women Who Code Bengaluru',
    attendees: 78,
    category: 'Professional',
    description:
      'Empowering women in technology through networking, mentorship, and skill-sharing. Open to all genders.',
  },
  {
    id: 9,
    title: 'Jazz Night at Blue Tokai',
    image: '',
    date: 'May 10, 2025',
    time: '8:00 PM - 11:00 PM',
    location: 'Blue Tokai, UB City',
    organizer: 'Bengaluru Jazz Collective',
    attendees: 203,
    category: 'Entertainment',
    description:
      'Live jazz performances by local and international artists. Great food, drinks, and atmosphere.',
  },
  {
    id: 10,
    title: 'Urban Gardening Workshop',
    image: '',
    date: 'May 12, 2025',
    time: '9:00 AM - 1:00 PM',
    location: 'Community Garden, JP Nagar',
    organizer: 'Green Bengaluru Initiative',
    attendees: 42,
    category: 'Community',
    description:
      'Learn how to start your own urban garden. Topics include container gardening, composting, and sustainable practices.',
  },
  {
    id: 11,
    title: 'AI & Machine Learning Conference',
    image: '',
    date: 'May 15, 2025',
    time: '9:00 AM - 6:00 PM',
    location: 'NIMHANS Convention Center',
    organizer: 'AI Bengaluru Community',
    attendees: 312,
    category: 'Professional',
    description:
      'Full-day conference on AI and ML trends, featuring keynote speakers, workshops, and networking opportunities.',
  },
  {
    id: 12,
    title: 'Street Food Festival',
    image: '',
    date: 'May 18, 2025',
    time: '5:00 PM - 10:00 PM',
    location: 'Commercial Street',
    organizer: 'Bengaluru Food Festival Committee',
    attendees: 487,
    category: 'Entertainment',
    description:
      'Celebrate Bengaluru diverse food culture with street food from across India and around the world.',
  },
  {
    id: 13,
    title: 'Mental Health Awareness Walk',
    image: '',
    date: 'May 20, 2025',
    time: '7:00 AM - 10:00 AM',
    location: 'Lalbagh Lake',
    organizer: 'Mind Matters Bengaluru',
    attendees: 89,
    category: 'Social',
    description:
      'Community walk to raise awareness about mental health. Free counseling sessions and information booths available.',
  },
  {
    id: 14,
    title: 'Blockchain & Web3 Meetup',
    image: '',
    date: 'May 22, 2025',
    time: '6:30 PM - 9:00 PM',
    location: 'Chainlabs, Koramangala',
    organizer: 'Web3 Bengaluru',
    attendees: 134,
    category: 'Professional',
    description:
      'Discuss latest developments in blockchain, DeFi, NFTs, and Web3 technologies. Technical talks and networking.',
  },
  {
    id: 15,
    title: 'Classical Music Concert',
    image: '',
    date: 'May 25, 2025',
    time: '6:30 PM - 8:30 PM',
    location: 'Bangalore Gayana Samaja',
    organizer: 'Karnataka Music Academy',
    attendees: 178,
    category: 'Entertainment',
    description:
      'Carnatic music concert featuring renowned artists. A celebration of South Indian classical music tradition.',
  },
  {
    id: 16,
    title: 'Coding Bootcamp for Kids',
    image: '',
    date: 'May 28, 2025',
    time: '10:00 AM - 3:00 PM',
    location: 'Coding School, HSR Layout',
    organizer: 'Code for Future',
    attendees: 35,
    category: 'Community',
    description:
      'Fun coding workshop for children aged 8-14. Learn programming basics through games and interactive projects.',
  },
];

interface EventCardProps {
  event: (typeof events)[0];
}

const EventCard = memo(({ event }: EventCardProps) => {
  const handleDetails = useCallback(() => {
    // Handle event details navigation
  }, []);

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <div className="aspect-video w-full bg-muted relative">
        {event.image ? (
          <img src={event.image} alt={event.title} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <Calendar className="h-12 w-12 text-primary/50" />
          </div>
        )}
        <Badge className="absolute top-2 right-2">{event.category}</Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 mt-1">
          <Calendar className="h-3.5 w-3.5" /> {event.date}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 py-2">
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{event.attendees} attending</span>
        </div>
        <p className="text-sm text-muted-foreground">{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">{event.organizer.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{event.organizer}</span>
        </div>
        <Button onClick={handleDetails}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
});

const Events = () => {
  const filteredEvents = useMemo(
    () => ({
      all: events,
      today: events.filter(event => event.date.includes('today')), // Mock filter
      thisWeek: events.slice(0, 3), // Mock filter - first 3 events
      weekend: events.filter(event => event.date.includes('weekend')), // Mock filter
    }),
    []
  );

  const handleSearch = useCallback(() => {
    // Handle search functionality
  }, []);

  const handleFilters = useCallback(() => {
    // Handle filters functionality
  }, []);

  const handleCreateEvent = useCallback(() => {
    // Handle create event functionality
  }, []);
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Local Events</h1>
          <p className="text-muted-foreground">
            Discover and participate in events happening in your community
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." className="pl-8" />
          </div>
          <Button variant="outline" className="lg:w-auto" onClick={handleFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button className="lg:w-auto" onClick={handleCreateEvent}>
            <Calendar className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="this-week">This Week</TabsTrigger>
            <TabsTrigger value="weekend">Weekend</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.all.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          {/* Other tab contents */}
          <TabsContent value="today" className="mt-0">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No events today</h3>
              <p className="text-muted-foreground">
                Check back later or explore events happening soon
              </p>
            </div>
          </TabsContent>

          <TabsContent value="this-week" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.thisWeek.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekend" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.weekend.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;
