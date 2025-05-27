import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';

export default function NavbarLoading() {
  return (
    <nav className="border-b h-20 bg-white font-medium">
      <div className="max-w-(--breakpoint-xl) flex items-center justify-between mx-auto px-4 lg:px-12 h-full">
        <div />
        <Button variant="elevated" disabled className="bg-white">
          <ShoppingCartIcon className="text-black" />
        </Button>
      </div>
    </nav>
  );
}
