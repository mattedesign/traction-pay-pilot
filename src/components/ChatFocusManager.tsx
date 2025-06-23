
import { useCallback, useMemo } from "react";

interface ChatFocusManagerProps {
  message: string;
  isFocused: boolean;
  onFocusChange?: (focused: boolean) => void;
  children: (props: {
    handleMessageChange: (newMessage: string) => void;
    handleClose: () => void;
  }) => React.ReactNode;
}

const ChatFocusManager = ({ 
  message, 
  isFocused, 
  onFocusChange, 
  children 
}: ChatFocusManagerProps) => {
  const handleMessageChange = useCallback((newMessage: string) => {
    // Don't trigger focus change on typing - only when messages are sent
    // This prevents the chat from expanding just by typing
  }, []);

  const handleClose = useCallback(() => {
    if (onFocusChange) {
      onFocusChange(false);
    }
  }, [onFocusChange]);

  const childProps = useMemo(() => ({
    handleMessageChange,
    handleClose
  }), [handleMessageChange, handleClose]);

  return <>{children(childProps)}</>;
};

export default ChatFocusManager;
