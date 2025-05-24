import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

export default function Footer() {
  return (
    <nav className="border-t bg-white font-medium">
      <div className="max-w-(--breakpoint-xl) flex gap-1.5 py-4 items-center mx-auto px-4 lg:px-12 h-full">
        <h4>Powered by</h4>
        <Link href="/">
          <span className={cn('text-2xl font-medium', poppins.className)}>
            funroad
          </span>
        </Link>
      </div>
    </nav>
  );
}
