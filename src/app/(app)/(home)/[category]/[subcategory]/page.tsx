import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ProductListUi from '@/modules/products/ui/product-list-ui';
import { SearchParams } from 'nuqs/server';
import { loadProductFilters } from '@/modules/products/nuqs/search-params';

type Props = {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<SearchParams>;
};
export default async function Page({ params, searchParams }: Props) {
  const { subcategory } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.fetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory, ...filters })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListUi category={subcategory} />
    </HydrationBoundary>
  );
}
