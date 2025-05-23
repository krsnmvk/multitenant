import { Checkbox } from '@/components/ui/checkbox';
import { useTRPC } from '@/trpc/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { DEFAULT_VALUE } from '../constant';

type Props = {
  value?: string[] | null;
  onChange: (value: string[]) => void;
};

export default function TagsFilter({ onChange, value }: Props) {
  const trpc = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: DEFAULT_VALUE,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  function onClick(tag: string) {
    if (value?.includes(tag)) {
      onChange(value.filter((t) => t !== tag) || []);
    } else {
      onChange([...(value || []), tag]);
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <Loader2Icon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map(({ id, name }) => (
            <div
              key={id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onClick(name)}
            >
              <h4>{name}</h4>
              <Checkbox
                checked={value?.includes(name)}
                onCheckedChange={() => onClick(name)}
              />
            </div>
          ))
        )
      )}
      {hasNextPage && (
        <button
          type="button"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage}
          className="underline text-start justify-start font-medium disabled:opacity-50 cursor-pointer"
        >
          Load more...
        </button>
      )}
    </div>
  );
}
