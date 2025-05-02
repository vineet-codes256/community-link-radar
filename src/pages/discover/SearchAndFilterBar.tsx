
import { MapPin, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";

interface SearchAndFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: 'distance' | 'match';
  setSortBy: (sort: 'distance' | 'match') => void;
}

export const SearchAndFilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy 
}: SearchAndFilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="w-full">
        <Search 
          placeholder="Search people, interests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="w-full" 
        />
      </div>
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <span className="text-sm">Sort by:</span>
        <div className="flex bg-muted rounded-md p-1">
          <Button 
            variant={sortBy === 'distance' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setSortBy('distance')}
            className="text-xs h-8"
          >
            <MapPin className="h-3 w-3 mr-1" /> Distance
          </Button>
          <Button 
            variant={sortBy === 'match' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setSortBy('match')}
            className="text-xs h-8"
          >
            <Percent className="h-3 w-3 mr-1" /> Match
          </Button>
        </div>
      </div>
    </div>
  );
};
