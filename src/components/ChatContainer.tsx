
import { useState, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";
import LoadResultsPresenter from "./LoadResultsPresenter";
import ModeSelector from "./ModeSelector";
import { ChatMessage } from "../hooks/useChatMessages";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ChatContainerProps {
  isInitialized: boolean;
  isLoading: boolean;
  chatHistory: ChatMessage[];
  currentSuggestions: string[];
  onChatMessage: (message: string) => void;
  onAPIKeySubmit: (key: string) => void;
  onLoadSelect?: (loadId: string) => void;
  onClose?: () => void;
  showSearch?: boolean;
}

const ChatContainer = ({
  isLoading,
  chatHistory,
  currentSuggestions,
  onChatMessage,
  onLoadSelect,
  onClose,
  showSearch = true
}: ChatContainerProps) => {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"search" | "chat">("search");

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleSendMessage = () => {
    if (message.trim()) {
      onChatMessage(message);
      setMessage("");
    }
  };

  const handleQuestionClick = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header with close button only */}
      <div className="flex items-center justify-end">
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
            title="Close chat (Esc)"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <div className="flex-1 min-h-0">
        <ChatHistory messages={chatHistory} isLoading={isLoading} />
      </div>

      {/* Show mode selector only if search is enabled */}
      {showSearch && (
        <ModeSelector 
          mode={mode} 
          onModeChange={setMode} 
        />
      )}
      
      <SuggestedQuestions 
        questions={currentSuggestions} 
        onQuestionClick={handleQuestionClick}
      />
      
      <ChatInput
        message={message}
        onMessageChange={setMessage}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        mode={showSearch ? mode : "chat"}
        onModeChange={setMode}
      />
    </div>
  );
};

export default ChatContainer;
