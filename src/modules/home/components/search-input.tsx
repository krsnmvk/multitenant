'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ListFilterIcon, SearchIcon } from 'lucide-react';
import CategoriesSidebar from './categories-sidebar';
import { Button, buttonVariants } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookmarkCheckIcon } from 'lucide-react';

type Props = {
  disable?: boolean;
};

export default function SearchInput({ disable }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChangeAction={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute pointer-events-none left-3 top-1/2 -translate-y-3 size-5 text-neutral-400" />
        <Input
          className="pl-9"
          placeholder="Search products"
          disabled={disable}
        />
      </div>
      <Button
        variant="outline"
        className="lg:hidden shrink-0 size-12"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {data?.user && (
        <Link
          href="/library"
          className={cn(buttonVariants({ variant: 'elevated' }))}
        >
          <BookmarkCheckIcon />
          <span>Library</span>
        </Link>
      )}
    </div>
  );
}
