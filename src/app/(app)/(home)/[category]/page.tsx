import { Suspense } from 'react';
import { getQueryClient, trpc } from '@/trpc/server';
import ProductList from '@/modules/products/components/product-list';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ProductListLoading from '@/modules/products/components/product-list-loading';

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { category } = await params;

  const queryClient = getQueryClient();
  void queryClient.fetchQuery(trpc.products.getMany.queryOptions({ category }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListLoading />}>
        <ProductList category={category} />
      </Suspense>
    </HydrationBoundary>
  );
}
