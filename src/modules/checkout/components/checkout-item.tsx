import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/format-currency';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  id: string;
  name: string;
  image?: string | null;
  productUrl: string;
  tenantUrl: string;
  isLast?: boolean;
  tenantName: string;
  price: number;
  onRemove: () => void;
};

export default function CheckoutItem({
  name,
  onRemove,
  price,
  productUrl,
  tenantName,
  tenantUrl,
  image,
  isLast,
}: Props) {
  return (
    <div
      className={cn(
        'grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b',
        isLast && 'border-b-0'
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={image || '/placeholder.svg'}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
        <div className="flex flex-col">
          <Link href={productUrl} className="font-medium underline">
            {name}
          </Link>
          <Link href={tenantUrl} className="font-medium underline">
            {tenantName}
          </Link>
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
        <h6 className="font-medium">{formatCurrency(price)}</h6>
        <button
          type="button"
          className="underline font-medium cursor-pointer"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
