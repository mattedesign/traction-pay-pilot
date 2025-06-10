
import { useCallback } from "react";

interface UseChatInputHandlersProps {
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isPreview: boolean;
  isLoading: boolean;
  message: string;
}

export const useChatInputHandlers = ({
  onMessageChange,
  onSendMessage,
  isPreview,
  isLoading,
  message
}: UseChatInputHandlersProps) => {
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isPreview && !isLoading && message.trim()) {
      e.preventDefault();
      onSendMessage();
    }
  }, [isPreview, isLoading, message, onSendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onMessageChange(e.target.value);
  }, [onMessageChange]);

  return {
    handleKeyPress,
    handleInputChange
  };
};
