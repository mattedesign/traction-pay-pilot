
import { useState, useEffect } from "react";
import ChatHistory from "./ChatHistory";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";
import LoadResultsPresenter from "./LoadResultsPresenter";
import { ChatMessage } from "../hooks/useChatMessages";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { InteractiveButton } from "../hooks/useChatMessages";

interface ChatContainerProps {
  isInitialized: boolean;
  isLoading: boolean;
  chatHistory: ChatMessage[];
  currentSuggestions: string[];
  onChatMessage: (message: string) => void;
  onAPIKeySubmit: (key: string) => void;
  onLoadSelect?: (loadId: string) => void;
  onClose?: () => void;
  onNavigate?: (path: string) => void;
}

const ChatContainer = ({
  isLoading,
  chatHistory,
  currentSuggestions,
  onChatMessage,
  onLoadSelect,
  onClose,
  onNavigate
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

  const handleButtonClick = (button: InteractiveButton) => {
    console.log('Interactive button clicked:', button);
    
    if (button.action === 'navigate' && button.actionData?.path && onNavigate) {
      // Send the button response as a user message first
      if (button.actionData.message) {
        onChatMessage(button.actionData.message);
      }
      // Navigate to the specified path
      onNavigate(button.actionData.path);
    } else if (button.action === 'continue_chat' && button.actionData?.message) {
      // Send the button response as a user message
      onChatMessage(button.actionData.message);
    }
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
        <ChatHistory 
          messages={chatHistory} 
          isLoading={isLoading} 
          onButtonClick={handleButtonClick}
        />
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
        onModeChange={setMode}
      />
    </div>
  );
};

export default ChatContainer;
