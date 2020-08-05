import { useEffect, useState } from 'react';

/**
 *  From https://usehooks.com/useDebounce/
 * @param value The value to debounce
 * @param delayMs The delay in milliseconds before the new value becomes effective
 */
export function useDebounce<T>(value: T, delayMs: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delayMs);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delayMs] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
