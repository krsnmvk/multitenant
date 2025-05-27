'use client';

import StarRating from '@/components/star-rating';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useTRPC } from '@/trpc/client';
import { formatCurrency } from '@/utils/format-currency';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link2Icon, StarIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

const CartButton = dynamic(() => import('../components/cart-button'), {
  ssr: false,
  loading: () => (
    <Button variant="elevated" className="bg-pink-400 flex-1" disabled>
      Add to Cart
    </Button>
  ),
});

type Props = {
  productId: string;
  tenantSlug: string;
};

export default function ProductUi({ productId, tenantSlug }: Props) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border bg-white rounded-sm overflow-hidden">
        <figure className="aspect-[3.9] relative border-b">
          <Image
            src={data.image?.url || './placeholder.svg'}
            alt={data.name}
            fill
            className="object-cover"
          />
        </figure>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6">
              <h1 className="text-4xl font-medium">{data.name}</h1>
            </div>
            <div className="flex border-y">
              <div className="flex items-center justify-center border-r px-6 py-4">
                <div className="px-2 py-1 bg-pink-400 w-fit relative border">
                  <p className="text-base font-medium">
                    {formatCurrency(data.price)}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center justify-center lg:border-r">
                <Link
                  href={`tenants/${tenantSlug}`}
                  className="flex items-center justify-center gap-2"
                >
                  {data.tenant.image && (
                    <Image
                      src={data.tenant.image.url || ''}
                      alt={data.tenant.name}
                      width={20}
                      height={20}
                      className="rounded-full border shrink-0 size-5"
                    />
                  )}
                  <span className="text-base font-medium underline">
                    {data.tenant.name}
                  </span>
                </Link>
              </div>
              <div className="px-6 py-4 lg:flex items-center justify-center hidden">
                <div className="flex items-center justify-center gap-1">
                  <StarRating rating={2.5} />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 lg:hidden items-center justify-center flex border-b">
              <div className="flex items-center justify-center gap-1">
                <StarRating rating={2.5} />
                <p className="text-base font-medium">{5} ratings</p>
              </div>
            </div>
            <div className="lg:p-6 p-4">
              {data.description ? (
                <p>{data.description}</p>
              ) : (
                <p className="text-base text-muted-foreground italic">
                  No products provided
                </p>
              )}
            </div>
          </div>
          <div className="col-span-2">
            <div className="h-full border-t lg:border-t-0 lg:border-l">
              <div className="flex flex-col gap-4 p-6 border-b">
                <div className="flex items-center gap-2">
                  <CartButton productId={productId} tenantSlug={tenantSlug} />
                  <Button variant="elevated" className="size-12">
                    <Link2Icon />
                  </Button>
                </div>
                <p className="text-center font-medium">
                  {data.refundPolicy === 'no-refunds'
                    ? 'No refunds'
                    : `${data.refundPolicy} money back guarantee`}
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Ratings</h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className="fill-black" />
                    <span>({5})</span>
                    <span className="text-base">{5} ratings</span>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <Fragment key={stars}>
                      <span className="text-base">
                        {stars} {stars === 1 ? 'star' : 'stars'}
                      </span>
                      <Progress value={1} className="h-[1lh]" />
                      <span>{0}%</span>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
