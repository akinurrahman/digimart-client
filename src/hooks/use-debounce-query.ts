import { useQueryState } from "nuqs";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

export function useDebouncedQueryState(
  key: string,
  delay = 500,
  defaultValue = ""
) {
  const [, setQuery] = useQueryState(key, {
    defaultValue,
    history: "push",
  });

  const [value, setValue] = useState(defaultValue);

  const debouncedSetQuery = useMemo(
    () => debounce(setQuery, delay),
    [setQuery, delay]
  );

  useEffect(() => {
    debouncedSetQuery(value);
    return () => debouncedSetQuery.cancel();
  }, [value, debouncedSetQuery]);

  return [value, setValue] as const;
}
