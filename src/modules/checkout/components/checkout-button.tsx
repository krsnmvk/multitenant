import Link from 'next/link';
import { useCart } from '../hooks/use-cart';
import generateTenantURL from '@/utils/generate-tenant-url';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';

type Props = {
  className?: string;
  hideIfEmpty?: string;
  tenantSlug: string;
};

export default function CheckoutButton({
  tenantSlug,
  className,
  hideIfEmpty,
}: Props) {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) return null;

  return (
    <Link
      href={`${generateTenantURL(tenantSlug)}/checkout`}
      className={cn(
        buttonVariants({ variant: 'elevated' }),
        'bg-white',
        className
      )}
    >
      <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ''}
    </Link>
  );
}
