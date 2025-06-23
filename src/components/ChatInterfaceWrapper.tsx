
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputFocusHandle } from "@/hooks/useInputFocus";
import { useChatMessages, InteractiveButton } from "../hooks/useChatMessages";
import { useUnifiedChatHandler } from "../hooks/useUnifiedChatHandler";
import { getChatSystemPrompt } from "./ChatSystemPrompt";
import { ButtonClickHandler } from "@/services/buttonClickHandler";
import ChatInterfaceMain from "./ChatInterfaceMain";
import { CarrierProfile } from "@/pages/Index";

interface ChatInterfaceWrapperProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
  initialTopic?: string | null;
  initialMessage?: string;
  onTopicChange?: (topic: string | null) => void;
  onNavigate?: (path: string) => void;
}

const ChatInterfaceWrapper = ({
  carrierProfile,
  userProfile,
  initialTopic = null,
  initialMessage = "",
  onTopicChange,
  onNavigate
}: ChatInterfaceWrapperProps) => {
  const [isInDemoMode, setIsInDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState<string | null>(null);
  const inputRef = useRef<InputFocusHandle>(null);
  const navigate = useNavigate();
  
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const systemPrompt = getChatSystemPrompt();

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
    handleButtonClick: originalHandleButtonClick
  } = useUnifiedChatHandler({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage,
    onLoadSelect: (loadId) => {
      console.log('Load selected:', loadId);
    },
    onNavigate: onNavigate || ((path: string) => navigate(path))
  });

  // Enhanced button click handler with navigation support
  const handleButtonClick = (button: InteractiveButton) => {
    console.log('ChatInterfaceWrapper: Button clicked:', button);
    
    ButtonClickHandler.handle({
      button,
      onNavigate: onNavigate || ((path: string) => navigate(path)),
      onContinueChat: (message: string) => {
        console.log('ChatInterfaceWrapper: Continuing chat with:', message);
        setMessage(message);
      }
    });

    // Also call the original handler for any additional processing
    if (originalHandleButtonClick) {
      originalHandleButtonClick(button);
    }
  };

  // Initialize with topic or message if provided
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
      }
    } else if (initialMessage && initialMessage !== '' && message === '') {
      setMessage(initialMessage);
    }
  }, [initialTopic, initialMessage, message, setMessage]);

  if (!isInitialized) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-600">Setting up chat interface...</p>
      </div>
    );
  }

  return (
    <ChatInterfaceMain
      isFocused={true} // Always focused within the drawer
      currentAction={initialTopic || undefined}
      onFocusChange={() => {}} // No-op since we're in a drawer
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
