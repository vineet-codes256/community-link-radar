import { Calendar, MapPin, Clock, Users, ExternalLink, Filter, Search as SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Mock data for events
const events = [
  {
    id: 1,
    title: "Weekend Farmers Market",
    image: "",
    date: "Apr 20, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "Cubbon Park, Bengaluru",
    organizer: "Local Farmers Association",
    attendees: 112,
    category: "Community",
    description: "Fresh produce, handmade crafts, and local food. Support local farmers and artisans!"
  },
  {
    id: 2,
    title: "Tech Networking Mixer",
    image: "",
    date: "Apr 22, 2025",
    time: "6:30 PM - 9:00 PM",
    location: "The Leela, Indiranagar",
    organizer: "Bengaluru Tech Network",
    attendees: 86,
    category: "Professional",
    description: "Connect with tech professionals across Bengaluru. Great opportunity for networking and career growth."
  },
  {
    id: 3,
    title: "Cultural Dance Performance",
    image: "",
    date: "Apr 25, 2025",
    time: "7:00 PM - 9:30 PM",
    location: "Chowdiah Memorial Hall",
    organizer: "Karnataka Cultural Association",
    attendees: 230,
    category: "Entertainment",
    description: "Traditional dance performances showcasing Karnataka's rich cultural heritage."
  },
  {
    id: 4,
    title: "Community Cleanup Drive",
    image: "",
    date: "Apr 27, 2025",
    time: "8:00 AM - 11:00 AM",
    location: "Ulsoor Lake",
    organizer: "Clean Bengaluru Initiative",
    attendees: 45,
    category: "Social",
    description: "Join us in cleaning up Ulsoor Lake. Equipment will be provided. Let's make our city cleaner!"
  }
];

const Events = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Local Events</h1>
          <p className="text-muted-foreground">Discover and participate in events happening in your community</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." className="pl-8" />
          </div>
          <Button variant="outline" className="lg:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button className="lg:w-auto">
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
              {events.map(event => (
                <Card key={event.id} className="h-full hover:shadow-md transition-shadow">
                  <div className="aspect-video w-full bg-muted relative">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="object-cover w-full h-full" 
                      />
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
                    <Button>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Other tab contents */}
          <TabsContent value="today" className="mt-0">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No events today</h3>
              <p className="text-muted-foreground">Check back later or explore events happening soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="this-week" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Show a subset of the events */}
              {events.slice(0, 3).map(event => (
                /* Same card structure as in "all" tab */
                <Card key={event.id} className="h-full hover:shadow-md transition-shadow">
                  <div className="aspect-video w-full bg-muted relative">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
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
                    <Button>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="weekend" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Show weekend events */}
              {events.filter(e => e.id === 1 || e.id === 4).map(event => (
                /* Same card structure as in "all" tab */
                <Card key={event.id} className="h-full hover:shadow-md transition-shadow">
                  <div className="aspect-video w-full bg-muted relative">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
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
                    <Button>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;
