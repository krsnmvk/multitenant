'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { CategoriesGetManyOutput } from '@/modules/types/categories-type';

type Props = {
  open: boolean;
  onOpenChangeAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CategoriesSidebar({ onOpenChangeAction, open }: Props) {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());

  const [parentCategories, setParentCategories] =
    useState<CategoriesGetManyOutput | null>();
  const [selectedCategories, setSelectedCategories] = useState<
    CategoriesGetManyOutput[1] | null
  >();

  const currentCategories = parentCategories ?? data ?? [];

  const router = useRouter();

  function handleCategoryClick(category: CategoriesGetManyOutput[1]) {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategories(category);
    } else {
      if (parentCategories && selectedCategories) {
        router.push(`/${selectedCategories.slug}/${category.slug}`);
      } else {
        if (category.slug === 'all') {
          router.push('/');
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  }

  function handleOpenChange(open: boolean) {
    setSelectedCategories(null);
    setParentCategories(null);
    onOpenChangeAction(open);
  }

  function hancleBackClick() {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategories(null);
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        style={{ backgroundColor: selectedCategories?.color || 'white' }}
      >
        <SheetHeader className="border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-hidden pb-2">
          {parentCategories && (
            <Button
              onClick={hancleBackClick}
              variant="ghost"
              className="hover:bg-black hover:text-white rounded-none w-full p-4 text-left flex items-center justify-start  text-base font-medium"
            >
              <ChevronLeftIcon className="size-4" />
              <span>Back</span>
            </Button>
          )}
          {currentCategories.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.slug}
              variant="ghost"
              className="hover:bg-black hover:text-white w-full justify-between rounded-none p-4 text-left flex items-center text-base font-medium"
            >
              <span>{category.name}</span>
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </Button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
