'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  children: Readonly<React.ReactNode>;
};

export default function Navitem({ children, href }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'bg-transparent hover:bg-transparent border-transparent hover:border-primary rounded-full text-lg',
        pathname === href &&
          'bg-black text-white hover:bg-black hover:text-white'
      )}
    >
      {children}
    </Link>
  );
}
