'use client';

import { useState, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// import { useDropdownPosition } from '@/utils/use-dropdown-position';
import SubcategoryMenu from './subcategory-menu';
import Link from 'next/link';
import { CategoriesGetManyOutput } from '@/modules/types/categories-type';

type Props = {
  category: CategoriesGetManyOutput[1];
  isActive: boolean;
  isNavigationHovered: boolean;
};

export default function CategoryDropdown({
  category,
  isActive,
  isNavigationHovered,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  function onMouseEnter() {
    if (category.subcategories) {
      setIsOpen(true);
    }
  }

  function onMouseLeave() {
    setIsOpen(false);
  }

  // function toggleDropdown() {
  //   if (category.subcategories.docs?.length) {
  //     setIsOpen(!isOpen);
  //   }
  // }

  return (
    <div
      // onClick={toggleDropdown}
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            'h-11 bg-transparent border-transparent hover:bg-white text-black hover:border-primary rounded-full',
            isActive && !isNavigationHovered && 'bg-white border-primary',
            isOpen &&
              'border-primary shadow-[4px_4px_0px_0px] -translate-x-[4px] -translate-y-[4px]'
          )}
        >
          <Link href={`/${category.slug === 'all' ? '' : category.slug}`}>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              'opacity-0 w-0 absolute -bottom-3 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-b-black border-l-transparent border-r-transparent left-1/2 translate-x-1/2',
              isOpen && 'opacity-100'
            )}
          />
        )}
      </div>
      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        // position={getDropdownPosition()}
      />
    </div>
  );
}
