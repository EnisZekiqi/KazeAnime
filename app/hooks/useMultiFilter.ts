import { useState, useMemo, useEffect, useRef } from 'react';

type Filters<T> = {
  [K in keyof T]?: string | number | null;
};

export default function useMultiFilter<T extends Record<string, any>>(
  items: T[],
  filterKeys: (keyof T)[]
) {
  const [filters, setFiltersState] = useState<Filters<T>>({});
  const [isFiltering, setIsFiltering] = useState(false);

  // local debounce timer ref so it survives renders
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Set filter with key + value
  const setFilters = (key: keyof T, value: string | number | null) => {
    // mark filtering started
    setIsFiltering(true);

    setFiltersState((prev) => ({
      ...prev,
      [key]: value || null,
    }));

    // debounce turning off the filtering flag so rapid input updates show loader
    if (debounceTimer.current) clearTimeout(debounceTimer.current as any);
    debounceTimer.current = setTimeout(() => {
      setIsFiltering(false);
      debounceTimer.current = null;
    }, 250);
  };

  // Filter items reactively
  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    return items.filter((item) => {
      return filterKeys.every((key) => {
        const filterValue = filters[key];
        if (!filterValue) return true; // no filter = show all

        const itemValue = item[key];

        // Handle genres array
        if (Array.isArray(itemValue)) {
          return itemValue.some((g: any) =>
            g.name
              ?.toLowerCase()
              .includes((filterValue as string).toLowerCase())
          );
        }

        // Handle score number comparison
        if (typeof itemValue === 'number') {
          return itemValue >= Number(filterValue);
        }

        // Handle string match
        if (typeof itemValue === 'string') {
          return itemValue
            .toLowerCase()
            .includes((filterValue as string).toLowerCase());
        }

        return true;
      });
    });
  }, [items, filters, filterKeys]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current as any);
    };
  }, []);

  return { setFilters, filteredItems, isFiltering };
}
