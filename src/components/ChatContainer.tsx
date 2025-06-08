
import { useState } from "react";
import ChatHistory from "./ChatHistory";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";
import ModeSelector from "./ModeSelector";
import LoadResultsPresenter from "./LoadResultsPresenter";
import { ChatMessage } from "../hooks/useChatMessages";
import { useUnifiedChatHandler } from "../hooks/useUnifiedChatHandler";

interface ChatContainerProps {
  isInitialized: boolean;
  isLoading: boolean;
  chatHistory: ChatMessage[];
  currentSuggestions: string[];
  onChatMessage: (message: string) => void;
  onAPIKeySubmit: (key: string) => void;
  onLoadSelect?: (loadId: string) => void;
}

const ChatContainer = ({
  isLoading,
  chatHistory,
  currentSuggestions,
  onChatMessage,
  onLoadSelect
}: ChatContainerProps) => {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"search" | "chat">("search");

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
      <ModeSelector 
        mode={mode} 
        onModeChange={setMode}
      />
      
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
