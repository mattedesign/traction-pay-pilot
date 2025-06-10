
import { useRef, useCallback } from "react";

export interface InputFocusHandle {
  focus: () => void;
}

export const useInputFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocusTime = useRef<number>(0);

  const focus = useCallback(() => {
    // Prevent rapid focus attempts that can cause conflicts
    const now = Date.now();
    if (now - lastFocusTime.current < 50) {
      return;
    }
    lastFocusTime.current = now;

    if (inputRef.current) {
      try {
        // Use requestAnimationFrame to ensure DOM is stable
        requestAnimationFrame(() => {
          if (inputRef.current && document.activeElement !== inputRef.current) {
            inputRef.current.focus();
          }
        });
      } catch (error) {
        console.warn('Input focus failed:', error);
      }
    }
  }, []);

  return {
    inputRef,
    focus
  };
};
