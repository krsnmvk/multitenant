'use client';

import { Button } from '@/components/ui/button';
import { useProductFilters } from '../hooks/use-product-filters';
import { cn } from '@/lib/utils';

export default function ProductSort() {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className={cn(
          'rounded-full bg-white hover:bg-white border',
          filters.sort !== 'curated' &&
            'bg-transparent border-transparent hover:border-border hover:bg-transparent'
        )}
        onClick={() => setFilters({ sort: 'curated' })}
      >
        Curated
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className={cn(
          'rounded-full bg-white hover:bg-white border',
          filters.sort !== 'trending' &&
            'bg-transparent border-transparent hover:border-border hover:bg-transparent'
        )}
        onClick={() => setFilters({ sort: 'trending' })}
      >
        Trending
      </Button>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className={cn(
          'rounded-full bg-white hover:bg-white border',
          filters.sort !== 'hot_and_new' &&
            'bg-transparent border-transparent hover:border-border hover:bg-transparent'
        )}
        onClick={() => setFilters({ sort: 'hot_and_new' })}
      >
        Hot & New
      </Button>
    </div>
  );
}
