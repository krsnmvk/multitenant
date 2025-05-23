import { DEFAULT_VALUE } from '../constant';
import ProductCardLoading from './product-card-loading';

export default function ProductListLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: DEFAULT_VALUE }).map((_, i) => (
        <ProductCardLoading key={i} />
      ))}
    </div>
  );
}
