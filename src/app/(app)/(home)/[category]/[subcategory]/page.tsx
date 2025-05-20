import { Suspense } from 'react';
import { getQueryClient, trpc } from '@/trpc/server';
import ProductList from '@/modules/products/components/product-list';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ProductListLoading from '@/modules/products/components/product-list-loading';

type Props = {
  params: Promise<{
    subcategory: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { subcategory } = await params;

  const queryClient = getQueryClient();
  void queryClient.fetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListLoading />}>
        <ProductList category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  );
}
