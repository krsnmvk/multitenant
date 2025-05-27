import Footer from '@/modules/tenants/components/footer';
import Navbar from '@/modules/tenants/components/navbar';
import NavbarLoading from '@/modules/tenants/components/navbar-loading';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

type Props = {
  children: Readonly<React.ReactNode>;
  params: Promise<{ slug: string }>;
};

export default async function TenantsHomeLayout({ children, params }: Props) {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f0]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavbarLoading />}>
          <Navbar slug={slug} />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
