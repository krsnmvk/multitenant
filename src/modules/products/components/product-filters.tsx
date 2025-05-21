'use client';

import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import PriceFilter from './price-filter';
import { useProductFilters } from '../hooks/use-product-filters';

type Props = {
  title: string;
  className?: string;
  children?: Readonly<React.ReactNode>;
};

function ProductFilter({ title, children, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={(cn('border-b flex flex-col gap-2'), className)}>
      <div
        className="flex items-center justify-between cursor-pointer mb-2"
        onClick={() => setIsOpen((curr) => !curr)}
      >
        <h4 className="font-medium">{title}</h4>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
}

export default function ProductFilters() {
  const [filters, setFilters] = useProductFilters();

  function onChange(key: keyof typeof filters, value: unknown) {
    setFilters({ ...filters, [key]: value });
  }

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p>Product Filters</p>
        <button type="button" className="underline cursor-pointer">
          Clear
        </button>
      </div>
      <div className="p-4">
        <ProductFilter title="Price" className="border-b-0">
          <PriceFilter
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onMinPriceChange={(value) => onChange('minPrice', value)}
            onMaxPriceChange={(value) => onChange('maxPrice', value)}
          />
        </ProductFilter>
      </div>
    </div>
  );
}
