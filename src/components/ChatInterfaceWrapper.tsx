
import React, { useState, useRef } from "react";
import { InputFocusHandle } from "@/hooks/useInputFocus";
import { useChatMessages } from "../hooks/useChatMessages";
import { useUnifiedChatHandler } from "../hooks/useUnifiedChatHandler";
import { getChatSystemPrompt } from "./ChatSystemPrompt";
import ChatInterfaceMain from "./ChatInterfaceMain";
import { CarrierProfile } from "@/pages/Index";

interface ChatInterfaceWrapperProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
  initialTopic?: string | null;
  onTopicChange?: (topic: string | null) => void;
}

const ChatInterfaceWrapper = ({
  carrierProfile,
  userProfile,
  initialTopic = null,
  onTopicChange
}: ChatInterfaceWrapperProps) => {
  const [isInDemoMode, setIsInDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<InputFocusHandle>(null);
  
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const systemPrompt = getChatSystemPrompt();

  // Handle topic changes and initial topic setting
  const handleFocusChange = (focused: boolean) => {
    setIsFocused(focused);
    if (onTopicChange && !focused) {
      onTopicChange(null);
    }
  };

  // Set up the unified chat handler
  const {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage: originalHandleSendMessage,
    handleAPIKeySubmit,
    loadResults,
    showingResults,
    handleLoadSelect,
    handleButtonClick
  } = useUnifiedChatHandler({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage,
    onLoadSelect: (loadId) => {
      // Handle load selection if needed
      console.log('Load selected:', loadId);
    }
  });

  // Initialize with topic if provided
  React.useEffect(() => {
    if (initialTopic && initialTopic !== 'null' && message === '') {
      const topicMessages: Record<string, string> = {
        load_status: "I need help checking the status of my loads",
        route_optimization: "I want to optimize my routes and save fuel",
        payment_questions: "I have questions about my invoices and payments"
      };
      
      const topicMessage = topicMessages[initialTopic];
      if (topicMessage) {
        setMessage(topicMessage);
        if (!isFocused) {
          setIsFocused(true);
        }
      }
    }
  }, [initialTopic, message, isFocused, setMessage]);

  if (!isInitialized) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-600">Setting up chat interface...</p>
      </div>
    );
  }

  return (
    <ChatInterfaceMain
      isFocused={isFocused}
      currentAction={initialTopic || undefined}
      onFocusChange={handleFocusChange}
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
      onButtonClick={handleButtonClick}
    />
  );
};

export default ChatInterfaceWrapper;
