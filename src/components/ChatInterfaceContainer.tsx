
import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
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

export interface ChatInterfaceContainerRef {
  fillInputAndFocus: (query: string) => void;
}

const ChatInterfaceContainer = forwardRef<ChatInterfaceContainerRef, ChatInterfaceContainerProps>(({ 
  onNavigateToLoad, 
  onFocusChange,
  isFocused = false,
  currentAction
}, ref) => {
  const [isInDemoMode, setIsInDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState<string | null>(null);
  const inputRef = useRef<InputFocusHandle>(null);
  const focusTimeoutRef = useRef<NodeJS.Timeout>();
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const { currentSuggestions } = useSuggestedQuestions();

  console.log('ChatInterfaceContainer: Render with props:', {
    isFocused,
    currentAction,
    isInDemoMode,
    demoStep
  });

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

  // Expose fillInputAndFocus method through ref
  useImperativeHandle(ref, () => ({
    fillInputAndFocus: (query: string) => {
      console.log('ChatInterfaceContainer: fillInputAndFocus called with:', query);
      setMessage(query);
      if (onFocusChange) {
        onFocusChange(true);
      }
      // Focus the input after a short delay to ensure state is updated
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }));

  // Enhanced focus handler with debug logging
  const focusInput = useCallback(() => {
    console.log('ChatInterfaceContainer: focusInput called, isFocused:', isFocused);
    
    // Clear any pending focus timeout
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
    }

    // Delay focus to ensure component is stable
    focusTimeoutRef.current = setTimeout(() => {
      console.log('ChatInterfaceContainer: Attempting to focus input, inputRef.current:', !!inputRef.current);
      if (inputRef.current && isFocused) {
        inputRef.current.focus();
        console.log('ChatInterfaceContainer: Input focused successfully');
      }
    }, 100);
  }, [isFocused]);

  // Auto-focus input when chat becomes focused
  useEffect(() => {
    console.log('ChatInterfaceContainer: Focus effect triggered, isFocused:', isFocused);
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
    console.log('ChatInterfaceContainer: Showing setup (not initialized)');
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

  console.log('ChatInterfaceContainer: Rendering main interface');

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
});

ChatInterfaceContainer.displayName = "ChatInterfaceContainer";

export default ChatInterfaceContainer;
