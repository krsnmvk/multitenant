'use client';

import { useParams } from 'next/navigation';
import Categories from './categories';
import SearchInput from './search-input';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DEFAULT_BG_COLOR } from '../constant';
import BreadcrumbNavigation from './breadcrumb-navigation';

export default function SearchFilters() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params = useParams();
  const categoryId = params.category as string | undefined;
  const activeCategory = categoryId || 'all';

  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  );

  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const subcategoryId = params.subcategory as string | undefined;
  const activeSubcategoryName =
    activeCategoryData?.subcategories.find((sub) => sub.slug === subcategoryId)
      ?.name || null;

  return (
    <div
      className="px-4 lg:px-12 flex flex-col w-full gap-4 border-b py-8"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  );
}
