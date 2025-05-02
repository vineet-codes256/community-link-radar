
import { useState, useEffect } from "react";
import { MapPin, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Search } from "@/components/ui/search";
import { calculateDistance, formatDistance } from "@/utils/locationUtils";

// Define user type for type safety
type NearbyUser = {
  id: string;
  name: string;
  avatar: string;
  distance: number;
  formatted_distance: string;
  interests: string[];
  bio: string;
  latitude: number;
  longitude: number;
};

const Discover = () => {
  const { user } = useAuth();
  const [searchRadius, setSearchRadius] = useState([5]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentLocation, setCurrentLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("Unknown location");
  
  // Temporary interests for demo
  const interestOptions = [
    "Photography", "Hiking", "Cooking", "Tech", "Gaming", 
    "Movies", "Fitness", "Reading", "Travel", "Music", 
    "Coffee", "Cycling", "Art", "Food", "Pets"
  ];

  // Get current user's location on component mount
  useEffect(() => {
    const fetchCurrentUserLocation = async () => {
      if (!user) return;
      
      try {
        // First get the user's stored location from the database
        const { data: locationData, error: locationError } = await supabase
          .from("user_locations")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (locationError && locationError.code !== "PGRST116") {
          console.error("Error fetching location:", locationError);
          return;
        }

        if (locationData) {
          setCurrentLocation({
            latitude: locationData.latitude,
            longitude: locationData.longitude
          });
        } else {
          // If no stored location, try to get current location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const coords = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                };
                setCurrentLocation(coords);
                
                // Save the detected location to database
                saveLocationToDatabase(coords);
              },
              (error) => {
                console.error("Geolocation error:", error);
                toast({ 
                  title: "Location error", 
                  description: "We couldn't detect your location. Some features may be limited." 
                });
              }
            );
          }
        }

        // Get user's profile to get location name
        const { data: profileData } = await supabase
          .from("profiles")
          .select("username") // Using username field for location name
          .eq("id", user.id)
          .single();
        
        if (profileData && profileData.username) {
          setLocationName(profileData.username);
        }
      } catch (error) {
        console.error("Error in location fetch:", error);
      }
    };

    fetchCurrentUserLocation();
  }, [user]);

  // Save detected location to database
  const saveLocationToDatabase = async (coords: {latitude: number, longitude: number}) => {
    if (!user) return;
    
    const { error } = await supabase
      .from("user_locations")
      .upsert({
        user_id: user.id,
        latitude: coords.latitude,
        longitude: coords.longitude,
        is_visible: true,
      });
    
    if (error) {
      console.error("Error saving location:", error);
    }
  };

  // Fetch nearby users based on current location and search radius
  useEffect(() => {
    const fetchNearbyUsers = async () => {
      if (!currentLocation || !user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Get all user locations and then filter by distance
        const { data: allLocations, error } = await supabase
          .from("user_locations")
          .select(`
            *,
            profiles:user_id (
              id,
              full_name,
              username,
              avatar_url
            )
          `)
          .neq("user_id", user.id) // Exclude current user
          .eq("is_visible", true);

        if (error) {
          console.error("Error fetching locations:", error);
          setLoading(false);
          return;
        }

        if (!allLocations || allLocations.length === 0) {
          setNearbyUsers([]);
          setLoading(false);
          return;
        }

        // Calculate distance and filter by radius
        const usersWithDistance = allLocations
          .map((loc) => {
            const distance = calculateDistance(
              currentLocation.latitude,
              currentLocation.longitude,
              loc.latitude,
              loc.longitude
            );
            
            // Generate random interests for demo (in a real app, these would come from the database)
            const randomInterests = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, 
              () => interestOptions[Math.floor(Math.random() * interestOptions.length)]
            );
            const uniqueInterests = [...new Set(randomInterests)];
            
            return {
              id: loc.profiles.id,
              name: loc.profiles.full_name || "Unnamed User",
              avatar: loc.profiles.avatar_url || "",
              distance,
              formatted_distance: formatDistance(distance),
              // These would come from the database in a real application
              interests: uniqueInterests,
              bio: `User near ${loc.profiles.username || "unknown location"}`,
              latitude: loc.latitude,
              longitude: loc.longitude
            };
          })
          .filter((user) => user.distance <= searchRadius[0])
          .sort((a, b) => a.distance - b.distance);

        setNearbyUsers(usersWithDistance);
      } catch (err) {
        console.error("Error processing nearby users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyUsers();
  }, [currentLocation, searchRadius, user]);

  // Filter users based on search term
  const filteredUsers = nearbyUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle connect button click
  const handleConnect = (userId: string, userName: string) => {
    toast({
      title: "Connection Request",
      description: `You've sent a connection request to ${userName}!`
    });
    // In a real app, this would send a connection request to the backend
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Discover People Nearby</h1>
          <p className="text-muted-foreground">Find and connect with interesting people in your vicinity</p>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-card rounded-lg p-4 my-6 shadow-sm gap-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span>Current location: <span className="font-medium">{locationName}</span></span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Search radius: {searchRadius[0]}km</span>
              <div className="w-full md:w-48">
                <Slider
                  max={20}
                  step={0.5}
                  value={searchRadius}
                  onValueChange={setSearchRadius}
                />
              </div>
            </div>
          </div>
          
          <div className="w-full mb-4">
            <Search 
              placeholder="Search people, interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full" 
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-b-2" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg mb-2">No people found nearby</p>
            <p className="text-muted-foreground">Try increasing your search radius or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <Card key={user.id} className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {user.formatted_distance}
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
                  <Button 
                    className="w-full" 
                    onClick={() => handleConnect(user.id, user.name)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
