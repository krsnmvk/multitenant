import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Link from 'next/link';

type NavbarItems = {
  href: string;
  children: Readonly<React.ReactNode>;
};

type Props = {
  items: NavbarItems[];
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavbarSidebar({ items, onOpenChange, open }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left">
        <SheetHeader className="border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col h-full pb-4 overflow-hidden">
          {items.map(({ children, href }) => (
            <Link
              href={href}
              key={href}
              className="w-full flex items-center text-base font-medium text-left hover:bg-black hover:text-white p-4"
              onClick={() => onOpenChange(false)}
            >
              {children}
            </Link>
          ))}
          <div className="border-t">
            <Link
              href="/sign-in"
              className="w-full flex items-center text-base font-medium text-left hover:bg-black hover:text-white p-4"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="w-full flex items-center text-base font-medium text-left hover:bg-black hover:text-white p-4"
            >
              Start Selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
