import { useEffect, useState } from 'react';

// Custom hook to delay updating a value until user input has paused for a set time
export function useDebounce<T>(value: T, delay: number = 500): T {
    // Hold the delayed value in local state and starting with the initial input
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    // Reset the timer whenever the input value or delay duration changes
    useEffect(() => {
        // Wait for the specified delay before updating the debounced value
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cancel the pending timer if the value changes again before the time runs out
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    // Return the debounced value to the component
    return debouncedValue;
}
