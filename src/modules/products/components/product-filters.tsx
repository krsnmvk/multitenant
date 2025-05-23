'use client';

import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import PriceFilter from './price-filter';
import { useProductFilters } from '../hooks/use-product-filters';
import TagsFilter from './tags-filter';

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

  function onClear() {
    setFilters({
      minPrice: '',
      maxPrice: '',
      tags: [],
    });
  }

  const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'sort') return false;

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    if (typeof value === 'string') return value !== '';

    return value !== null;
  });

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p>Product Filters</p>
        {hasAnyFilters && (
          <button
            type="button"
            onClick={() => onClear()}
            className="underline cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
      <div className="p-4">
        <ProductFilter title="Price">
          <PriceFilter
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onMinPriceChange={(value) => onChange('minPrice', value)}
            onMaxPriceChange={(value) => onChange('maxPrice', value)}
          />
        </ProductFilter>
        <ProductFilter title="Tags" className="border-b-0">
          <TagsFilter
            value={filters.tags}
            onChange={(value) => onChange('tags', value)}
          />
        </ProductFilter>
      </div>
    </div>
  );
}
