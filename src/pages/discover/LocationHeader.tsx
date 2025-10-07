import { MapPin, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';

interface LocationHeaderProps {
  locationName: string;
  searchRadius: number[];
  setSearchRadius: (radius: number[]) => void;
  onRefreshLocation: () => void;
}

export const LocationHeader = ({
  locationName,
  searchRadius,
  setSearchRadius,
  onRefreshLocation,
}: LocationHeaderProps) => {
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
          Search radius: {searchRadius[0]}km
        </span>
        <div className="w-full xs:w-32 sm:w-48">
          <Slider max={20} step={0.5} value={searchRadius} onValueChange={setSearchRadius} />
        </div>
      </div>
    </div>
  );
};
