'use client';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useProductFilters } from '../hooks/use-product-filters';

export default function ProductList({ category }: { category?: string }) {
  const [filters] = useProductFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({ category, ...filters })
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data.docs.map(({ id, name, price }) => (
        <div key={id} className="border rounded-md bg-white p-4">
          <h2>{name}</h2>
          <h4>{price}</h4>
        </div>
      ))}
    </div>
  );
}
