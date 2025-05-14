import { CustomCategory } from '@/utils/custom-category';
import Link from 'next/link';

type Props = {
  category: CustomCategory;
  isOpen: boolean;
  position: { top: number; left: number };
};

export default function SubcategoryMenu({ category, isOpen, position }: Props) {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const bgColor = category.color || '#f5f5f5';

  return (
    <div
      className="z-50 fixed"
      style={{ top: position.top, left: position.left }}
    >
      <div className="w-60 h-3" />
      <div
        style={{ backgroundColor: bgColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[-2px]"
      >
        <div>
          {category.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className="w-full flex items-center justify-between text-left hover:bg-black hover:text-white underline p-2"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
