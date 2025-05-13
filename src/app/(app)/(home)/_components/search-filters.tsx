import Categories from './categories';
import SearchInput from './search-input';

type Props = {
  data: any;
};

export default function SearchFilters({ data }: Props) {
  return (
    <div className="px-4 lg:px-12 flex flex-col w-full gap-4 border-b py-8">
      <SearchInput />
      <Categories data={data} />
    </div>
  );
}
