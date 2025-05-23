'use client';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar({ slug }: { slug: string }) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <nav className="border-b h-20 bg-white font-medium">
      <div className="max-w-(--breakpoint-xl) flex items-center justify-between mx-auto px-4 lg:px-12 h-full">
        <Link href={`/tenants/${slug}`} className="flex items-center gap-2">
          {data?.image?.url && (
            <Image
              src={data?.image?.url}
              alt={data?.name}
              width={32}
              height={32}
              className="rounded-full border size-8"
            />
          )}
          <h4 className="text-xl">{data.name}</h4>
        </Link>
      </div>
    </nav>
  );
}
