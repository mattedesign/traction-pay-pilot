
import { useState } from "react";
import ChatInput from "./ChatInput";
import ModeSelector from "./ModeSelector";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatHistory from "./ChatHistory";
import ChatSetup from "./ChatSetup";
import LoadResultsPresenter from "./LoadResultsPresenter";
import { useChatMessages } from "../hooks/useChatMessages";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";
import { useUnifiedChatHandler } from "../hooks/useUnifiedChatHandler";

interface FunctionalChatInterfaceProps {
  onNavigateToLoad?: (path: string) => void;
  onFocusChange?: (focused: boolean) => void;
  isFocused?: boolean;
}

const FunctionalChatInterface = ({ 
  onNavigateToLoad, 
  onFocusChange,
  isFocused = false 
}: FunctionalChatInterfaceProps) => {
  const [mode, setMode] = useState<"search" | "chat">("search");
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const { currentSuggestions } = useSuggestedQuestions();

  // Enhanced system prompt that supports both modes
  const systemPrompt = `You are an AI assistant specialized in trucking operations and load management. You can operate in two modes:

**SEARCH MODE**: Help users find and analyze specific loads by ID, broker, route, or status. Provide detailed load information, status updates, and actionable insights.

**CHAT MODE**: Provide general trucking advice, compliance guidance, route optimization, and industry knowledge including:
- DOT regulations and compliance (HOS, ELD, safety requirements)
- Route optimization and fuel efficiency
- Equipment maintenance and safety
- Freight operations and logistics
- Payment processing and factoring
- Professional communication

Always provide practical, actionable advice in a clear, professional tone. Focus on safety, compliance, and profitability.`;

  const {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage,
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

  const handleModeChange = (newMode: "search" | "chat") => {
    setMode(newMode);
    console.log('Mode changed to:', newMode);
  };

  const handleQuestionClick = (question: string) => {
    setMessage(question);
    if (onFocusChange) onFocusChange(true);
  };

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
    if (onFocusChange) {
      onFocusChange(newMessage.length > 0 || isFocused);
    }
  };

  const handleSend = async () => {
    if (onFocusChange) onFocusChange(true);
    await handleSendMessage();
  };

  // Show setup if not initialized
  if (!isInitialized) {
    return (
      <div className="space-y-4 h-full">
        <ModeSelector mode={mode} onModeChange={handleModeChange} />
        <ChatSetup onAPIKeySubmit={handleAPIKeySubmit} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Mode Selector - Always visible */}
      <div className="flex-shrink-0">
        <ModeSelector mode={mode} onModeChange={handleModeChange} />
      </div>
      
      {/* Chat History - Only show when focused and has messages */}
      {isFocused && chatHistory.length > 0 && (
        <div className="flex-1 min-h-0 overflow-hidden">
          <ChatHistory messages={chatHistory} isLoading={isLoading} />
        </div>
      )}

      {/* Load Results - Show when available */}
      {showingResults && loadResults.length > 0 && (
        <div className="flex-shrink-0">
          <LoadResultsPresenter 
            results={loadResults}
            onLoadSelect={handleLoadSelect}
          />
        </div>
      )}
      
      {/* Suggested Questions - Show when not focused or no chat history */}
      {(!isFocused || chatHistory.length === 0) && (
        <div className="flex-shrink-0">
          <SuggestedQuestions 
            questions={currentSuggestions.slice(0, 3)} 
            onQuestionClick={handleQuestionClick}
          />
        </div>
      )}
      
      {/* Chat Input - Always at bottom */}
      <div className="flex-shrink-0">
        <ChatInput
          message={message}
          onMessageChange={handleMessageChange}
          onSendMessage={handleSend}
          isLoading={isLoading}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default FunctionalChatInterface;
