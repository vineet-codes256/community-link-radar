import { useState } from 'react';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocationData } from './useLocationData';
import { useNearbyUsers } from './useNearbyUsers';
import { LocationHeader } from './LocationHeader';
import { SearchAndFilterBar } from './SearchAndFilterBar';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';
import { UserCard } from './UserCard';
import { useDebounce } from '@/hooks/use-debounce';

const Discover = () => {
  const [searchRadius, setSearchRadius] = useState([5]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'match'>('distance');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { currentLocation, locationName, handleRefreshLocation } = useLocationData();
  const { nearbyUsers, loading } = useNearbyUsers(
    currentLocation,
    searchRadius,
    debouncedSearchTerm,
    sortBy
  );

  // Breadcrumb structured data
  const breadcrumbScript = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.karmicinnovations.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Discover',
        item: 'https://www.karmicinnovations.com/discover',
      },
    ],
  };

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbScript) }}
      />
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold">Find Your People</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshLocation}
              className="flex items-center gap-2 w-fit"
            >
              <Compass className="h-4 w-4" />
              <span className="hidden sm:inline">Update Location</span>
              <span className="sm:hidden">Location</span>
            </Button>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Discover people nearby who share your interests
          </p>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
