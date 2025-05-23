import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { SearchParams } from 'nuqs/server';
import { loadProductFilters } from '@/modules/products/nuqs/search-params';
import ProductListUi from '@/modules/products/ui/product-list-ui';
import { DEFAULT_VALUE } from '@/modules/products/constant';

type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<SearchParams>;
};

export default async function Page({ params, searchParams }: Props) {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category,
      limit: DEFAULT_VALUE,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListUi category={category} />
    </HydrationBoundary>
  );
}
