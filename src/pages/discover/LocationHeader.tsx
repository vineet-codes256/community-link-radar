
import { MapPin, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";

interface LocationHeaderProps {
  locationName: string;
  searchRadius: number[];
  setSearchRadius: (radius: number[]) => void;
  onRefreshLocation: () => void;
}

export const LocationHeader = ({ locationName, searchRadius, setSearchRadius, onRefreshLocation }: LocationHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-card rounded-lg p-4 my-6 shadow-sm gap-4">
      <div className="flex items-center">
        <MapPin className="h-5 w-5 text-primary mr-2" />
        <span>Current location: <span className="font-medium">{locationName}</span></span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
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
  );
};
