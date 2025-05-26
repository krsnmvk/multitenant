import ProductUi from '@/modules/products/ui/product-ui';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

type Props = {
  params: Promise<{ productId: string; slug: string }>;
};

export default async function Page({ params }: Props) {
  const { productId, slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductUi tenantSlug={slug} productId={productId} />
    </HydrationBoundary>
  );
}
