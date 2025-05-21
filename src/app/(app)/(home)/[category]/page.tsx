import { Suspense } from 'react';
import { getQueryClient, trpc } from '@/trpc/server';
import ProductList from '@/modules/products/components/product-list';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ProductListLoading from '@/modules/products/components/product-list-loading';
import ProductFilters from '@/modules/products/components/product-filters';

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
      <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListLoading />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
