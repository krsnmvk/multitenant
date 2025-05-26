import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  rating: number;
  className?: string;
  iconClassName?: string;
  text?: string;
};

const MAX_RATING = 5;
const MIN_RATING = 0;

export default function StarRating({
  rating,
  className,
  iconClassName,
  text,
}: Props) {
  const safeRating = Math.max(MIN_RATING, Math.min(rating, MAX_RATING));

  return (
    <div className={cn('flex items-center gap-x-1', className)}>
      {Array.from({ length: MAX_RATING }).map((_, i) => (
        <StarIcon
          key={i}
          className={cn(
            'size-4',
            iconClassName,
            i < safeRating && 'fill-black'
          )}
        />
      ))}
      {text && <p>{text}</p>}
    </div>
  );
}
