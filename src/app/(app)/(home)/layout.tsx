import { Props } from '@/utils/props';
import Navbar from '@/modules/home/components/navbar';
import Footer from '@/modules/home/components/footer';
import SearchFilters from '@/modules/home/components/search-filters';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import SearchFiltersLoading from '@/modules/home/components/search-filters-loading';

export default function HomeLayout({ children }: Props) {
  const queryClient = getQueryClient();
  void queryClient.fetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}
