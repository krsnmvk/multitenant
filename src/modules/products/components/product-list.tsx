'use client';

import { useTRPC } from '@/trpc/client';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useProductFilters } from '../hooks/use-product-filters';
import ProductCard from './product-card';
import { DEFAULT_VALUE } from '../constant';
import { Button } from '@/components/ui/button';
import { InboxIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductList({
  category,
  tenantSlug,
  narrowView,
}: {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}) {
  const [filters] = useProductFilters();

  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        { ...filters, category, tenantSlug, limit: DEFAULT_VALUE },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 rounded-lg w-full bg-white">
        <InboxIcon />
        <p className="text-base font-medium">No Products</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4',
          narrowView && 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3'
        )}
      >
        {data.pages
          .flatMap((page) => page.docs)
          .map(({ id, name, price, image, tenant }) => (
            <ProductCard
              key={id}
              id={id}
              name={name}
              imageUrl={image?.url}
              authorUsername={tenant?.name}
              price={price}
              reviewCount={5}
              reviewRating={5}
              authorImageUrl={tenant?.image?.url}
            />
          ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            variant="elevated"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="text-base disabled:opacity-50 bg-white"
          >
            Load more...
          </Button>
        )}
      </div>
    </>
  );
}
