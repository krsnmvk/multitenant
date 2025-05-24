import { DEFAULT_VALUE } from '@/modules/products/constant';
import { loadProductFilters } from '@/modules/products/nuqs/search-params';
import ProductListUi from '@/modules/products/ui/product-list-ui';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { SearchParams } from 'nuqs/server';

type Props = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_VALUE,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListUi tenantSlug={slug} narrowView />
    </HydrationBoundary>
  );
}
