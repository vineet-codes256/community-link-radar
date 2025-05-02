
import { useState } from "react";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocationData } from "./useLocationData";
import { useNearbyUsers } from "./useNearbyUsers";
import { LocationHeader } from "./LocationHeader";
import { SearchAndFilterBar } from "./SearchAndFilterBar";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { UserCard } from "./UserCard";

const Discover = () => {
  const [searchRadius, setSearchRadius] = useState([5]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'distance' | 'match'>('distance');
  
  const { currentLocation, locationName, handleRefreshLocation } = useLocationData();
  const { nearbyUsers, loading } = useNearbyUsers(currentLocation, searchRadius, searchTerm, sortBy);

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Find Your People</h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshLocation} 
              className="flex items-center gap-2"
            >
              <Compass className="h-4 w-4" />
              Update Location
            </Button>
          </div>
          <p className="text-muted-foreground">Discover people nearby who share your interests</p>
          
          <LocationHeader 
            locationName={locationName}
            searchRadius={searchRadius}
            setSearchRadius={setSearchRadius}
            onRefreshLocation={handleRefreshLocation}
          />
          
          <SearchAndFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {loading ? (
          <LoadingState />
        ) : nearbyUsers.length === 0 ? (
          <EmptyState onRefreshLocation={handleRefreshLocation} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
