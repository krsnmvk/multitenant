import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils/format-currency';

type Props = {
  id: string;
  name: string;
  imageUrl?: string | null;
  authorUsername: string;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
};

export default function ProductCard({
  authorUsername,
  id,
  name,
  price,
  reviewCount,
  reviewRating,
  authorImageUrl,
  imageUrl,
}: Props) {
  const router = useRouter();

  function handleUserClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    router.push(`/tenants/${authorUsername}`);
  }

  return (
    <Link href={`/tenants/${authorUsername}/products/${id}`}>
      <div className="flex flex-col hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow h-full border overflow-hidden bg-white rounded-md">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex border-y flex-col gap-3 p-4 flex-1">
          <h2 className="text-lg line-clamp-4 font-medium">{name}</h2>
          <div className="flex items-center gap-2" onClick={handleUserClick}>
            {authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={authorUsername}
                width={16}
                height={16}
                className="rounded-full shrink-0 size-4 border"
              />
            )}
            <p className="text-sm underline font-medium">{authorUsername}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="fill-black size-3.5" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="relative px-2 py-1 border bg-pink-400 w-fit">
            <p className="text-sm font-medium">{formatCurrency(price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
