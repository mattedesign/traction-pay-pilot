
import { useRef, useImperativeHandle, useCallback, useEffect } from "react";
import { InputFocusHandle } from "@/hooks/useInputFocus";

interface UseChatInputFocusProps {
  ref: React.Ref<InputFocusHandle>;
  message: string;
  isPreview: boolean;
}

export const useChatInputFocus = ({ ref, message, isPreview }: UseChatInputFocusProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocusAttempt = useRef<number>(0);
  const focusTimeoutRef = useRef<NodeJS.Timeout>();

  useImperativeHandle(ref, () => ({
    focus: () => {
      // Debounce focus attempts to prevent rapid re-focus cycles
      const now = Date.now();
      if (now - lastFocusAttempt.current < 100) {
        return;
      }
      lastFocusAttempt.current = now;

      // Clear any pending focus timeout
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }

      // Use setTimeout to ensure DOM is ready and prevent focus conflicts
      focusTimeoutRef.current = setTimeout(() => {
        if (inputRef.current && !isPreview) {
          try {
            inputRef.current.focus();
            // Restore cursor position to end of text if there's content
            if (message) {
              const length = message.length;
              inputRef.current.setSelectionRange(length, length);
            }
          } catch (error) {
            console.warn('Focus attempt failed:', error);
          }
        }
      }, 10);
    }
  }));

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, []);

  return { inputRef };
};
