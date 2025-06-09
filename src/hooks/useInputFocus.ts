
import { useRef, useImperativeHandle, forwardRef } from "react";

export interface InputFocusHandle {
  focus: () => void;
}

export const useInputFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return {
    inputRef,
    focus
  };
};
