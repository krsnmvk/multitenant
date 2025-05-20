import SearchInput from './search-input';

export default function SearchFiltersLoading() {
  return (
    <div
      className="px-4 lg:px-12 flex flex-col w-full gap-4 border-b py-8"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <SearchInput disable />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
}
