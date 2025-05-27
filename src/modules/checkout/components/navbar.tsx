import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import generateTenantURL from '@/utils/generate-tenant-url';
import Link from 'next/link';

export default function Navbar({ slug }: { slug: string }) {
  return (
    <nav className="border-b h-20 bg-white font-medium">
      <div className="max-w-(--breakpoint-xl) flex items-center justify-between mx-auto px-4 lg:px-12 h-full">
        <span className="font-medium">Checkout</span>
        <Link
          href={generateTenantURL(slug)}
          className={cn(buttonVariants({ variant: 'elevated' }))}
        >
          Continue Shopping
        </Link>
      </div>
    </nav>
  );
}
