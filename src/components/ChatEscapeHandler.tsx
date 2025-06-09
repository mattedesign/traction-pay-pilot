
import { useEffect } from "react";

interface ChatEscapeHandlerProps {
  isFocused: boolean;
  onClose: () => void;
}

const ChatEscapeHandler = ({ isFocused, onClose }: ChatEscapeHandlerProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFocused) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isFocused, onClose]);

  return null;
};

export default ChatEscapeHandler;
