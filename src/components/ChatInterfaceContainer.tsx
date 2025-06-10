
import { useState, useRef, useEffect, useCallback } from "react";
import { InputFocusHandle } from "@/hooks/useInputFocus";
import { useChatMessages } from "../hooks/useChatMessages";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";
import { useUnifiedChatHandler } from "../hooks/useUnifiedChatHandler";
import { getChatSystemPrompt } from "./ChatSystemPrompt";
import ChatInterfaceSetup from "./ChatInterfaceSetup";
import ChatInterfaceMain from "./ChatInterfaceMain";

interface ChatInterfaceContainerProps {
  onNavigateToLoad?: (path: string) => void;
  onFocusChange?: (focused: boolean) => void;
  isFocused?: boolean;
  currentAction?: string;
}

const ChatInterfaceContainer = ({ 
  onNavigateToLoad, 
  onFocusChange,
  isFocused = false,
  currentAction
}: ChatInterfaceContainerProps) => {
  const [isInDemoMode, setIsInDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState<string | null>(null);
  const inputRef = useRef<InputFocusHandle>(null);
  const focusTimeoutRef = useRef<NodeJS.Timeout>();
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const { currentSuggestions } = useSuggestedQuestions();

  const systemPrompt = getChatSystemPrompt();

  const {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage: originalHandleSendMessage,
    handleAPIKeySubmit,
    loadResults,
    showingResults,
    handleLoadSelect
  } = useUnifiedChatHandler({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage,
    onLoadSelect: (loadId) => {
      if (onNavigateToLoad) {
        onNavigateToLoad(`/load/${loadId}`);
      }
    }
  });

  // Stable focus handler that doesn't change on every render
  const focusInput = useCallback(() => {
    // Clear any pending focus timeout
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
    }

    // Delay focus to ensure component is stable
    focusTimeoutRef.current = setTimeout(() => {
      if (inputRef.current && isFocused) {
        inputRef.current.focus();
      }
    }, 100);
  }, [isFocused]);

  // Auto-focus input when chat becomes focused
  useEffect(() => {
    if (isFocused) {
      focusInput();
    }
    
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, [isFocused, focusInput]);

  // Show setup if not initialized
  if (!isInitialized) {
    return (
      <ChatInterfaceSetup
        currentAction={currentAction}
        isFocused={isFocused}
        onFocusChange={onFocusChange}
        onAPIKeySubmit={handleAPIKeySubmit}
        isLoading={isLoading}
        setMessage={setMessage}
        setIsInDemoMode={setIsInDemoMode}
        setDemoStep={setDemoStep}
      />
    );
  }

  return (
    <ChatInterfaceMain
      isFocused={isFocused}
      currentAction={currentAction}
      onFocusChange={onFocusChange}
      inputRef={inputRef}
      message={message}
      setMessage={setMessage}
      isLoading={isLoading}
      originalHandleSendMessage={originalHandleSendMessage}
      loadResults={loadResults}
      showingResults={showingResults}
      handleLoadSelect={handleLoadSelect}
      chatHistory={chatHistory}
      isInDemoMode={isInDemoMode}
      setIsInDemoMode={setIsInDemoMode}
      demoStep={demoStep}
      setDemoStep={setDemoStep}
      addUserMessage={addUserMessage}
      addAIMessage={addAIMessage}
    />
  );
};

export default ChatInterfaceContainer;
