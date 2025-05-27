'use client';

import { useTRPC } from '@/trpc/client';
import { useCart } from '../hooks/use-cart';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import generateTenantURL from '@/utils/generate-tenant-url';
import CheckoutItem from '../components/checkout-item';
import CheckoutSidebar from '../components/checkout-sidebar';
import { InboxIcon, LoaderIcon } from 'lucide-react';

export default function CheckoutUi({ tenantSlug }: { tenantSlug: string }) {
  const { productIds, clearAllCart, removeProduct } = useCart(tenantSlug);

  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  );

  useEffect(() => {
    if (error?.data?.code === 'NOT_FOUND') {
      clearAllCart();
      toast.warning('Invalid product found, cart cleared');
    }
  }, [clearAllCart, error]);

  if (isLoading) {
    return (
      <div className="pt-4 lg:pt-12 px-4 lg:px-12">
        <div className="border border-black flex items-center justify-center p-8 flex-col gap-y-4 rounded-lg w-full bg-white">
          <LoaderIcon className="text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (data?.totalDocs === 0) {
    return (
      <div className="pt-4 lg:pt-12 px-4 lg:px-12">
        <div className="border border-black flex items-center justify-center p-8 flex-col gap-y-4 rounded-lg w-full bg-white">
          <InboxIcon />
          <p className="text-base font-medium">No Products</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 lg:pt-12 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border bg-white overflow-hidden rounded-md">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image?.url}
                productUrl={`${generateTenantURL(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantURL(product.tenant.slug)}
                isLast={index === data.docs.length - 1}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onCheckout={() => {}}
            isCanceled={true}
            isPending={false}
          />
        </div>
      </div>
    </div>
  );
}
