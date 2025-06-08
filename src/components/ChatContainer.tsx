
import { useState } from "react";
import ChatHistory from "./ChatHistory";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";
import ModeSelector from "./ModeSelector";
import { ChatMessage } from "../hooks/useChatMessages";

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
  onChatMessage
}: ChatContainerProps) => {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"search" | "chat">("search");

  const handleSendMessage = () => {
    if (message.trim()) {
      onChatMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="space-y-4">
      <ModeSelector 
        mode={mode} 
        onModeChange={setMode}
      />
      
      <ChatHistory messages={chatHistory} isLoading={isLoading} />
      
      <SuggestedQuestions 
        questions={currentSuggestions} 
        onQuestionClick={onChatMessage}
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
