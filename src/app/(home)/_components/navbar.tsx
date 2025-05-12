'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import Navitem from './navbar-item';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import NavbarSidebar from './navbar-sidebar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

const navitems = [
  { href: '/', children: 'Home' },
  { href: '/about', children: 'About' },
  { href: '/features', children: 'Features' },
  { href: '/pricing', children: 'Pricing' },
  { href: '/contact', children: 'Contact' },
];

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="flex justify-between h-20 border-b font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn('text-5xl font-semibold', poppins.className)}>
          funroad
        </span>
      </Link>
      <NavbarSidebar
        open={isSidebarOpen}
        items={navitems}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="hidden md:flex gap-4 items-center">
        {navitems.map(({ children, href }) => (
          <Navitem key={href} href={href}>
            {children}
          </Navitem>
        ))}
      </div>
      <div className="hidden md:flex">
        <Button
          asChild
          className="border-l border-t-0 border-b-0 border-r-0 bg-white text-black h-full px-12 hover:bg-pink-400 transition-colors rounded-none text-lg"
        >
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button
          asChild
          className="border-l border-t-0 border-b-0 border-r-0 bg-black text-white h-full px-12 hover:bg-pink-400 transition-colors rounded-none text-lg"
        >
          <Link href="/sign-up">Start Selling</Link>
        </Button>
      </div>
      <div className="lg:hidden flex items-center justify-center">
        <Button
          variant="ghost"
          className="size-12"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
}
