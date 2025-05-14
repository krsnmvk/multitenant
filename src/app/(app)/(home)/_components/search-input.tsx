'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { CustomCategory } from '@/utils/custom-category';
import { ListFilterIcon, SearchIcon } from 'lucide-react';
import CategoriesSidebar from './categories-sidebar';
import { Button } from '@/components/ui/button';

type Props = {
  disable?: boolean;
  data: CustomCategory[];
};

export default function SearchInput({ disable, data }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        data={data}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
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
    </div>
  );
}
