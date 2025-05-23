import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { SearchParams } from 'nuqs/server';
import { loadProductFilters } from '@/modules/products/nuqs/search-params';
import ProductListUi from '@/modules/products/ui/product-list-ui';
import { DEFAULT_VALUE } from '@/modules/products/constant';

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_VALUE,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListUi />
    </HydrationBoundary>
  );
}
