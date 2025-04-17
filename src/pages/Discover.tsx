
import { MapPin, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

// Mock data for nearby users
const nearbyUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "",
    distance: "0.3 km",
    interests: ["Photography", "Hiking", "Cooking"],
    bio: "Photographer and foodie exploring the city one bite at a time."
  },
  {
    id: 2,
    name: "Rahul Patel",
    avatar: "",
    distance: "0.5 km",
    interests: ["Tech", "Gaming", "Movies"],
    bio: "Software developer by day, gamer by night. Always up for a movie discussion."
  },
  {
    id: 3,
    name: "Ananya Gupta",
    avatar: "",
    distance: "0.8 km",
    interests: ["Fitness", "Reading", "Travel"],
    bio: "Fitness enthusiast and avid reader. Ask me for book recommendations!"
  },
  {
    id: 4, 
    name: "Vikram Singh",
    avatar: "",
    distance: "1.2 km",
    interests: ["Music", "Coffee", "Cycling"],
    bio: "Music lover and coffee addict. Let's go for a bike ride!"
  }
];

const Discover = () => {
  const [searchRadius, setSearchRadius] = useState([1]);
  
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Discover People Nearby</h1>
          <p className="text-muted-foreground">Find and connect with interesting people in your vicinity</p>
          
          <div className="flex items-center justify-between bg-card rounded-lg p-4 my-6 shadow-sm">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span>Current location: <span className="font-medium">Koramangala, Bengaluru</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Search radius: {searchRadius}km</span>
              <div className="w-48">
                <Slider
                  defaultValue={[1]}
                  max={5}
                  step={0.1}
                  value={searchRadius}
                  onValueChange={setSearchRadius}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyUsers.map(user => (
            <Card key={user.id} className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> {user.distance}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{user.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <Badge key={interest} variant="secondary">{interest}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
