import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export default function SearchInput({ disable }: { disable?: boolean }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute pointer-events-none left-3 top-1/2 -translate-y-3 size-5 text-neutral-400" />
        <Input className="pl-9" placeholder="Search products" />
      </div>
    </div>
  );
}
