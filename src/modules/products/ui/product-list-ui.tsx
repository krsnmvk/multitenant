import { Suspense } from 'react';
import ProductFilters from '../components/product-filters';
import ProductSort from '../components/product-sort';
import ProductList from '../components/product-list';
import ProductListLoading from '../components/product-list-loading';

export default function ProductListUi({
  category,
  tenantSlug,
  narrowView,
}: {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}) {
  return (
    <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:gap-y-0 gap-y-2 lg:items-center justify-between">
        <h3 className="text-2xl font-medium">Curated for you</h3>
        <ProductSort />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
        <div className="lg:col-span-2 xl:col-span-2">
          <ProductFilters />
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<ProductListLoading narrowView={narrowView} />}>
            <ProductList
              category={category}
              tenantSlug={tenantSlug}
              narrowView={narrowView}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
