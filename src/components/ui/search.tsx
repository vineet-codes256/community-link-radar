'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconClassName?: string;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, iconClassName, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <SearchIcon
          className={cn('absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground', iconClassName)}
        />
        <Input type="search" className={cn('pl-8', className)} ref={ref} {...props} />
      </div>
    );
  }
);
Search.displayName = 'Search';

export { Search };
