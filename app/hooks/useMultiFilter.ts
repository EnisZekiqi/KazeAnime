import { useState,useMemo } from "react";

export default function useMultiFilter<T>(items: T[], keys: (keyof T)[]) {
  // 1️⃣ state: what the user types in the search bar
  const [filters, setFilters] = useState("");

  

  // 2️⃣ memoized filtering logic
  const filteredItems = useMemo(() => {
    if (!filters) return items; // no search => return all

    return items.filter((item) =>
      keys.some((key) => { 
        const value = item[key]; // access item by key safely
        if (typeof value === "string") {
          return value.toLowerCase().includes(filters.toLowerCase());
        }
        return false;
      })
    );
  }, [filters, items, keys]); // only re-run if these change

  // 3️⃣ return what we need
  return {
    setFilters,      // lets us update the filter
    filteredItems,   // filtered data
  };
}
