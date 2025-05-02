
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";

export const useLocationData = () => {
  const { user } = useAuth();
  const [currentLocation, setCurrentLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [locationName, setLocationName] = useState("Unknown location");

  // Get current user's location on component mount
  useEffect(() => {
    fetchCurrentUserLocation();
  }, [user]);

  // Fetch current user location
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

  // Handle refresh location
  const handleRefreshLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Updating location",
        description: "Please wait while we update your location..."
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setCurrentLocation(coords);
          saveLocationToDatabase(coords);
          
          toast({
            title: "Location updated",
            description: "Your location has been refreshed successfully."
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({ 
            variant: "destructive",
            title: "Location error", 
            description: "We couldn't update your location. Please check your browser settings." 
          });
        }
      );
    }
  };

  return { currentLocation, locationName, fetchCurrentUserLocation, handleRefreshLocation };
};
