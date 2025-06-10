
import { useCallback } from "react";
import ChatDemoResponseHandler from "@/components/ChatDemoResponseHandler";
import { ChatMessage } from "./useChatMessages";

interface UseChatInterfaceHandlersProps {
  isInDemoMode: boolean;
  demoStep: string | null;
  message: string;
  addUserMessage: (content: string) => ChatMessage;
  addAIMessage: (content: string) => ChatMessage;
  setMessage: (message: string) => void;
  setDemoStep: (step: string | null) => void;
  originalHandleSendMessage: () => Promise<void>;
  onFocusChange?: (focused: boolean) => void;
}

export const useChatInterfaceHandlers = ({
  isInDemoMode,
  demoStep,
  message,
  addUserMessage,
  addAIMessage,
  setMessage,
  setDemoStep,
  originalHandleSendMessage,
  onFocusChange
}: UseChatInterfaceHandlersProps) => {
  const demoResponseHandler = ChatDemoResponseHandler({
    isInDemoMode,
    demoStep,
    message,
    addUserMessage,
    addAIMessage,
    setMessage,
    setDemoStep,
    originalHandleSendMessage
  });

  const handleSend = useCallback(async () => {
    console.log('ChatInterfaceHandlers: handleSend called with:', {
      isInDemoMode,
      demoStep,
      message,
      hasOnFocusChange: !!onFocusChange
    });
    
    if (onFocusChange) {
      console.log('ChatInterfaceHandlers: Calling onFocusChange(true)');
      onFocusChange(true);
    }
    
    if (isInDemoMode) {
      console.log('ChatInterfaceHandlers: Handling demo response');
      await demoResponseHandler.handleDemoResponse();
    } else {
      console.log('ChatInterfaceHandlers: Handling original message');
      await originalHandleSendMessage();
    }
  }, [onFocusChange, isInDemoMode, demoResponseHandler, originalHandleSendMessage, demoStep, message]);

  return {
    handleSend
  };
};
