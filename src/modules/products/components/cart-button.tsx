'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/modules/checkout/hooks/use-cart';

type Props = {
  tenantSlug: string;
  productId: string;
};

export default function CartButton({ tenantSlug, productId }: Props) {
  const cart = useCart(tenantSlug);

  return (
    <Button
      variant="elevated"
      className={cn(
        'flex-1',
        cart.isProductInCart(productId) ? 'bg-white' : 'bg-pink-400'
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? 'Remove from Cart' : 'Add to Cart'}
    </Button>
  );
}
