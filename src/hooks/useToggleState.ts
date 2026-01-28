import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing toggle state with localStorage persistence
 *
 * @param sectionName - Unique identifier for the section (used in localStorage key)
 * @param defaultExpanded - Default state when no persisted value exists (defaults to true)
 * @returns Tuple of [isExpanded, toggle] where isExpanded is the current state and toggle is a stable function to toggle the state
 */
export function useToggleState(
  sectionName: string,
  defaultExpanded: boolean = true
): [boolean, () => void] {
  const storageKey = `wellness-section-${sectionName}`;

  // Initialize state from localStorage or use default
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    try {
      const storedValue = localStorage.getItem(storageKey);

      if (storedValue === null) {
        // No stored value, use default
        return defaultExpanded;
      }

      if (storedValue === 'true') {
        return true;
      } else if (storedValue === 'false') {
        return false;
      } else {
        // Invalid value, overwrite with default
        localStorage.setItem(storageKey, String(defaultExpanded));
        return defaultExpanded;
      }
    } catch (error) {
      // localStorage unavailable, fallback to in-memory state
      console.warn(`Failed to read from localStorage for ${storageKey}:`, error);
      return defaultExpanded;
    }
  });

  // Persist state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(isExpanded));
    } catch (error) {
      // localStorage quota exceeded or unavailable, continue with in-memory state
      console.warn(`Failed to write to localStorage for ${storageKey}:`, error);
    }
  }, [isExpanded, storageKey]);

  // Stable toggle function using useCallback
  const toggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return [isExpanded, toggle];
}
