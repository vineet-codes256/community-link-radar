import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users, Calendar, Building, Lock, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "",
    location: "Mumbai",
    quote: "I moved to a new city and Nearby Connect helped me find like-minded people in my neighborhood. Made some great friends!"
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "",
    location: "Bengaluru",
    quote: "As a small business owner, I can connect with my local community and share promotions. It's been great for business!"
  },
  {
    id: 3,
    name: "Vikram Singh",
    avatar: "",
    location: "Delhi",
    quote: "I discovered a cycling group just 2km from my house! Now we meet every weekend for rides. Amazing platform!"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  
  // Handle the "Find your people" button click
  const handleFindPeople = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Successfully got location
          setIsLoadingLocation(false);
          navigate("/discover");
          toast({
            title: "Location detected",
            description: "We'll show you people nearby who match your interests.",
          });
        },
        (error) => {
          // Failed to get location
          setIsLoadingLocation(false);
          console.error("Geolocation error:", error);
          toast({
            variant: "destructive",
            title: "Location access denied",
            description: "Please enable location access to find people nearby.",
          });
        }
      );
    } else {
      setIsLoadingLocation(false);
      toast({
        variant: "destructive",
        title: "Location not supported",
        description: "Your browser doesn't support geolocation.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background to-transparent z-0" />
        
        <div className="container relative z-10">
          <div className="flex flex-col gap-6 max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
              Connect with your <span className="text-primary">local community</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>
              Discover nearby people, events, and businesses. Build meaningful connections within your neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Button 
                onClick={handleFindPeople}
                size="lg"
                disabled={isLoadingLocation}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoadingLocation ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
                    Finding your location...
                  </>
                ) : (
                  <>
                    <UserRound className="mr-2" />
                    Find your people
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="mt-16 md:mt-24 relative">
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />
            
            <div className="bg-card border rounded-xl shadow-lg overflow-hidden p-2 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 relative z-10">
                {/* Discovery Panel */}
                <div className="bg-muted/50 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">Local Discovery</h3>
                  </div>
                  <div className="bg-background rounded-md p-3 mb-3 border flex items-center">
                    <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Find people nearby...</span>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>P</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">Priya S.</div>
                        <div className="text-xs text-muted-foreground">500m away</div>
                      </div>
                      <Badge className="ml-auto" variant="outline">Art</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>R</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">Rahul M.</div>
                        <div className="text-xs text-muted-foreground">1.2km away</div>
                      </div>
                      <Badge className="ml-auto" variant="outline">Tech</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">Anita K.</div>
                        <div className="text-xs text-muted-foreground">1.8km away</div>
                      </div>
                      <Badge className="ml-auto" variant="outline">Food</Badge>
                    </div>
                  </div>
                </div>
                
                {/* Community Panel */}
                <div className="bg-muted/50 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-2">
                      <Users className="h-4 w-4 text-secondary" />
                    </div>
                    <h3 className="font-medium">Community Board</h3>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="bg-background rounded-md p-3 border">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium">Meera J.</div>
                      </div>
                      <p className="text-sm">Does anyone know a good plumber in Koramangala? Need urgent help!</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">Recommendations</Badge>
                        <span className="text-xs text-muted-foreground">5 replies</span>
                      </div>
                    </div>
                    <div className="bg-background rounded-md p-3 border">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>V</AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium">Vijay S.</div>
                      </div>
                      <p className="text-sm">There's a water shortage expected tomorrow in HSR Layout. Stock up!</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">Alert</Badge>
                        <span className="text-xs text-muted-foreground">12 replies</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Events Panel */}
                <div className="bg-muted/50 rounded-lg p-4 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-2">
                      <Calendar className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-medium">Local Events</h3>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="bg-background rounded-md p-3 border">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-muted rounded flex flex-col items-center justify-center">
                          <span className="text-xs font-medium">APR</span>
                          <span className="text-sm font-bold">20</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Weekend Farmers Market</h4>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>Cubbon Park</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-background rounded-md p-3 border">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-muted rounded flex flex-col items-center justify-center">
                          <span className="text-xs font-medium">APR</span>
                          <span className="text-sm font-bold">22</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Tech Networking Mixer</h4>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>The Leela, Indiranagar</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how Nearby Connect brings communities together
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Local Search</CardTitle>
                <CardDescription>
                  Discover people within a customizable radius based on your current location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/discover" className="text-primary flex items-center text-sm">
                  <span>Explore Nearby</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Community Board</CardTitle>
                <CardDescription>
                  Engage in discussions, share updates, and get recommendations from your neighborhood
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/community" className="text-primary flex items-center text-sm">
                  <span>View Community</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Event Sharing</CardTitle>
                <CardDescription>
                  Discover and share local events, from community gatherings to professional networking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/events" className="text-primary flex items-center text-sm">
                  <span>Browse Events</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Business Integration</CardTitle>
                <CardDescription>
                  Local businesses can connect with nearby customers and share promotions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/discover" className="text-primary flex items-center text-sm">
                  <span>Find Businesses</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Privacy Section */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold">Your Privacy Matters</h2>
              <p className="text-muted-foreground">
                At Nearby Connect, we prioritize your privacy and security. You have full control over your visibility 
                and who can send you connection requests. Your location is only shared when you want it to be.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </div>
                  <span>Control who can see your profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </div>
                  <span>Choose when to share your location</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </div>
                  <span>Manage who can send you connection requests</span>
                </li>
              </ul>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="bg-muted rounded-xl p-6 border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Privacy Settings</h3>
                    <Badge variant="outline">Preview</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                      </div>
                      <Badge>Friends Only</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                      <div>
                        <p className="font-medium">Location Sharing</p>
                        <p className="text-sm text-muted-foreground">When to share your precise location</p>
                      </div>
                      <Badge>When Using App</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                      <div>
                        <p className="font-medium">Connection Requests</p>
                        <p className="text-sm text-muted-foreground">Who can send you connection requests</p>
                      </div>
                      <Badge>Everyone</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from people who have found meaningful connections through Nearby Connect
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.location}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="animate-pulse-slow">
              <Link to="/discover">Join Nearby Connect Today</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Nearby Connect</span>
            </div>
            
            <p className="text-sm text-muted-foreground">© 2025 Nearby Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
