
import { useState, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";
import ModeSelector from "./ModeSelector";
import LoadResultsPresenter from "./LoadResultsPresenter";
import { ChatMessage } from "../hooks/useChatMessages";
import { useUnifiedChatHandler } from "../hooks/useUnifiedChatHandler";
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
}

const ChatContainer = ({
  isLoading,
  chatHistory,
  currentSuggestions,
  onChatMessage,
  onLoadSelect,
  onClose
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
      <div className="flex items-center justify-between">
        <ModeSelector 
          mode={mode} 
          onModeChange={setMode}
        />
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
      
      <SuggestedQuestions 
        questions={currentSuggestions} 
        onQuestionClick={handleQuestionClick}
      />
      
      <ChatInput
        message={message}
        onMessageChange={setMessage}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        mode={mode}
      />
    </div>
  );
};

export default ChatContainer;
