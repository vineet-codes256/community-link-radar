import { MapPin, Percent, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { memo } from 'react';

interface SearchAndFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: 'distance' | 'match';
  setSortBy: (sort: 'distance' | 'match') => void;
}

export const SearchAndFilterBar = memo(
  ({ searchTerm, setSearchTerm, sortBy, setSortBy }: SearchAndFilterBarProps) => {
    return (
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="w-full relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search people, interests..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-10 sm:h-11 pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Sort by:</span>
          <div className="flex bg-muted rounded-md p-1 w-fit">
            <Button
              variant={sortBy === 'distance' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('distance')}
              className="text-xs h-8 px-2 sm:px-3"
            >
              <MapPin className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Distance</span>
              <span className="sm:hidden">Dist</span>
            </Button>
            <Button
              variant={sortBy === 'match' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('match')}
              className="text-xs h-8 px-2 sm:px-3"
            >
              <Percent className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Match</span>
              <span className="sm:hidden">Match</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
