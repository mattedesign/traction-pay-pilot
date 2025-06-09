
import { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
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
      <div className={`flex flex-col space-y-4 ${isFocused ? 'h-full' : ''}`}>
        {isFocused && (
          <div className="bg-white border-b shadow-sm p-4 shrink-0">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <h1 className="text-xl font-semibold text-slate-900">AI Assistant Setup</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8"
                title="Close chat (Esc)"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        <div className="flex-1 flex items-center justify-center p-4">
          <ChatSetup onAPIKeySubmit={handleAPIKeySubmit} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col space-y-4 ${isFocused ? 'h-full' : ''}`}>
      {/* Header Bar for Full Screen Mode */}
      {isFocused && (
        <div className="bg-white border-b shadow-sm p-4 shrink-0">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <h1 className="text-xl font-semibold text-slate-900">
              {mode === "search" ? "Load Search" : "AI Assistant"}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
              title="Close chat (Esc)"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Chat History and Load Results container - Fills available space when focused */}
      {isFocused && (
        <div className="flex-1 min-h-0 overflow-y-auto bg-slate-50 w-full">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            {/* Show search results if available */}
            {showingResults && loadResults.length > 0 && (
              <div className="p-4 border-b">
                <LoadResultsPresenter 
                  results={loadResults}
                  onLoadSelect={handleLoadSelect}
                />
              </div>
            )}
            
            {/* Show chat history if available */}
            {chatHistory.length > 0 && (
              <ChatHistory messages={chatHistory} isLoading={isLoading} />
            )}
            
            {/* Show message when no content */}
            {!showingResults && chatHistory.length === 0 && (
              <div className="p-4 text-center text-slate-500 text-sm">
                Start a conversation or search for loads
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Chat Input - Always at bottom with removed background */}
      <div className="shrink-0 p-4">
        <div className="w-full max-w-4xl mx-auto">
          <ChatInput
            message={message}
            onMessageChange={handleMessageChange}
            onSendMessage={handleSend}
            isLoading={isLoading}
            mode={mode}
            onModeChange={handleModeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionalChatInterface;
