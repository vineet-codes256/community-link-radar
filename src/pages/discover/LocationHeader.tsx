import { MapPin, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { memo } from 'react';

interface LocationHeaderProps {
  locationName: string;
  searchRadius: number[];
  setSearchRadius: (radius: number[]) => void;
  onRefreshLocation: () => void;
}

export const LocationHeader = memo(
  ({ locationName, searchRadius, setSearchRadius, onRefreshLocation }: LocationHeaderProps) => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-card rounded-lg p-3 sm:p-4 my-4 sm:my-6 shadow-sm gap-3 sm:gap-4">
        <div className="flex items-center min-w-0 flex-1">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 flex-shrink-0" />
          <span className="text-sm sm:text-base truncate">
            Current location: <span className="font-medium">{locationName}</span>
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            Search radius:
          </span>
          <select
            value={searchRadius[0]}
            onChange={e => setSearchRadius([Number(e.target.value)])}
            className="px-2 py-1 text-xs sm:text-sm border rounded-md bg-background"
          >
            <option value={1}>1 km</option>
            <option value={2}>2 km</option>
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={20}>20 km</option>
          </select>
        </div>
      </div>
    );
  }
);
