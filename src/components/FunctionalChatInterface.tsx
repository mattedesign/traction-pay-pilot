
import { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ModeSelector from "./ModeSelector";
import ChatHistory from "./ChatHistory";
import ChatSetup from "./ChatSetup";
import LoadResultsPresenter from "./LoadResultsPresenter";
import { useChatMessages } from "../hooks/useChatMessages";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";
import { useUnifiedChatHandler } from "../hooks/useUnifiedChatHandler";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFocused) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isFocused]);

  const handleClose = () => {
    if (onFocusChange) {
      onFocusChange(false);
    }
    setMessage("");
  };

  const handleModeChange = (newMode: "search" | "chat") => {
    setMode(newMode);
    console.log('Mode changed to:', newMode);
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <ModeSelector mode={mode} onModeChange={handleModeChange} />
          {isFocused && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
              title="Close chat (Esc)"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <ChatSetup onAPIKeySubmit={handleAPIKeySubmit} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mode Selector with Close Button */}
      <div className="flex items-center justify-between">
        <ModeSelector mode={mode} onModeChange={handleModeChange} />
        {isFocused && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
            title="Close chat (Esc)"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {/* Chat History - Show when focused and has messages, with fixed height and scroll */}
      {isFocused && chatHistory.length > 0 && (
        <div className="h-48 overflow-y-auto border rounded-lg bg-slate-50">
          <ChatHistory messages={chatHistory} isLoading={isLoading} />
        </div>
      )}

      {/* Load Results - Show when available */}
      {showingResults && loadResults.length > 0 && (
        <div className="max-h-32 overflow-y-auto">
          <LoadResultsPresenter 
            results={loadResults}
            onLoadSelect={handleLoadSelect}
          />
        </div>
      )}
      
      {/* Chat Input - Always at bottom */}
      <ChatInput
        message={message}
        onMessageChange={handleMessageChange}
        onSendMessage={handleSend}
        isLoading={isLoading}
        mode={mode}
      />
    </div>
  );
};

export default FunctionalChatInterface;
