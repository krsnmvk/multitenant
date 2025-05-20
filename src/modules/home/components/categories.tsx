'use client';

import { useEffect, useRef, useState } from 'react';
import CategoryDropdown from './category-dropdown';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ListFilterIcon } from 'lucide-react';
import CategoriesSidebar from './categories-sidebar';
import { CategoriesGetManyOutput } from '@/modules/types/categories-type';
import { useParams } from 'next/navigation';

type Props = {
  data: CategoriesGetManyOutput;
};

export default function Categories({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setvisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const params = useParams();
  const categoryId = params.category as string | undefined;

  const activeCategory = categoryId || 'all';
  const activeCategoryIndex = data.findIndex(
    (cat) => cat.slug === activeCategory
  );

  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) {
        return;
      }

      const containerWidth = containerRef?.current?.offsetWidth;
      const viewAllWidth = viewAllRef?.current?.offsetWidth;
      const avilableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);

      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if (totalWidth + width > avilableWidth) break;

        totalWidth += width;
        visible++;
      }

      setvisibleCount(visible);
    };

    const reseizeObserver = new ResizeObserver(calculateVisible);
    reseizeObserver.observe(containerRef.current!);

    return () => reseizeObserver.disconnect();
  }, [data.length]);

  return (
    <div className="relative w-full">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChangeAction={setIsSidebarOpen}
      />
      <div
        ref={measureRef}
        className="absolute flex opacity-0 pointer-events-none"
        style={{ position: 'fixed', top: -999, left: -999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center"
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}
        <div ref={viewAllRef} className="shrink-0">
          <Button
            variant="elevated"
            className={cn(
              'h-11 hover:border bg-transparent border-transparent hover:bg-white text-black hover:border-primary rounded-full',
              isActiveCategoryHidden &&
                !isAnyHovered &&
                'bg-white border-primary'
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            <span>View All</span>
            <ListFilterIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
