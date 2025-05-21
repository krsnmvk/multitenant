'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
};

export function formatAsCurrency(value: string) {
  const numericValue = value.replace(/[^0-9.]/g, '');
  const parts = numericValue.split('.');
  const formattedValue =
    parts[0] + (parts.length > 1 ? '.' + parts[1]?.slice(0, 2) : '');

  if (!formattedValue) return '';

  const numberValue = parseFloat(formattedValue);

  if (isNaN(numberValue)) return '';

  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
}

export default function PriceFilter({
  maxPrice,
  minPrice,
  onMaxPriceChange,
  onMinPriceChange,
}: Props) {
  function handleMinPriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const numericValue = e.target.value.replace(/[^0-9.]/g, '');
    onMinPriceChange(numericValue);
  }

  function handleMaxPriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const numericValue = e.target.value.replace(/[^0-9.]/g, '');
    onMaxPriceChange(numericValue);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label>Minimum Price</Label>
        <Input
          type="text"
          value={minPrice ? formatAsCurrency(minPrice) : ''}
          placeholder="$0"
          onChange={handleMinPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Maximum Price</Label>
        <Input
          type="text"
          value={maxPrice ? formatAsCurrency(maxPrice) : ''}
          placeholder=""
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
}
