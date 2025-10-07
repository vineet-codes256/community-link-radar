import { UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { memo } from 'react';

interface EmptyStateProps {
  onRefreshLocation: () => void;
}

export const EmptyState = memo(({ onRefreshLocation }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <UserRound className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <p className="text-lg mb-2">No people found nearby</p>
      <p className="text-muted-foreground">Try increasing your search radius or check back later</p>
      <Button className="mt-6" onClick={onRefreshLocation}>
        Refresh Location
      </Button>
    </div>
  );
});
