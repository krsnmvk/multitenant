import { cn } from '@/lib/utils';
import { DEFAULT_VALUE } from '../constant';
import ProductCardLoading from './product-card-loading';

export default function ProductListLoading({
  narrowView,
}: {
  narrowView?: boolean;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4',
        narrowView && 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3'
      )}
    >
      {' '}
      {Array.from({ length: DEFAULT_VALUE }).map((_, i) => (
        <ProductCardLoading key={i} />
      ))}
    </div>
  );
}
