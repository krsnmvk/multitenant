export function useDropdownPosition(
  ref: React.RefObject<HTMLDivElement | null>
) {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240;

    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    if (left + dropdownWidth > window.innerWidth) {
      left = rect.right + window.scrollX - dropdownWidth;
    }

    if (left < 0) {
      left = window.innerWidth - dropdownWidth - 16;
    }

    if (left < 0) left = 16;

    return { left, top };
  };

  return {
    getDropdownPosition,
  };
}
