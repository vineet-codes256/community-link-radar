
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { calculateDistance, formatDistance, calculateInterestMatch, formatMatchPercentage } from "@/utils/locationUtils";
import { NearbyUser } from "./types";

export const useNearbyUsers = (
  currentLocation: { latitude: number; longitude: number; } | null,
  searchRadius: number[],
  searchTerm: string,
  sortBy: 'distance' | 'match'
) => {
  const { user } = useAuth();
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch nearby users based on current location and search radius
  useEffect(() => {
    const fetchNearbyUsers = async () => {
      if (!currentLocation || !user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Get current user's interests
        const { data: currentUserData } = await supabase
          .from("profiles")
          .select("interests")
          .eq("id", user.id)
          .single();
          
        const userInterests = currentUserData?.interests || [];

        // Get all user locations and then filter by distance
        const { data: allLocations, error } = await supabase
          .from("user_locations")
          .select(`
            *,
            profiles!user_locations_user_id_fkey (
              id,
              full_name,
              username,
              avatar_url,
              interests,
              bio
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
            
            // Calculate interest match percentage
            const profileData = loc.profiles;
            const otherInterests = profileData?.interests || [];
            const matchPercentage = calculateInterestMatch(userInterests, otherInterests);
            
            return {
              id: profileData?.id || '',
              name: profileData?.full_name || "Unnamed User",
              avatar: profileData?.avatar_url || "",
              distance,
              formatted_distance: formatDistance(distance),
              interests: profileData?.interests || [],
              bio: profileData?.bio || `User near ${profileData?.username || "unknown location"}`,
              latitude: loc.latitude,
              longitude: loc.longitude,
              matchPercentage,
              formatted_match: formatMatchPercentage(matchPercentage)
            };
          })
          .filter((user) => user.distance <= searchRadius[0]);

        // Sort users based on selected sort criteria
        const sortedUsers = [...usersWithDistance].sort((a, b) => {
          if (sortBy === 'distance') {
            return a.distance - b.distance;
          } else {
            return b.matchPercentage - a.matchPercentage;
          }
        });

        setNearbyUsers(sortedUsers);
      } catch (err) {
        console.error("Error processing nearby users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyUsers();
  }, [currentLocation, searchRadius, user, sortBy]);

  // Filter users based on search term
  const filteredUsers = nearbyUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return { nearbyUsers: filteredUsers, loading };
};
