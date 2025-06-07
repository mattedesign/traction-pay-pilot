
import ChatHistory from "./ChatHistory";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";
import { ChatMessage } from "../hooks/useChatMessages";

interface ChatContainerProps {
  isInitialized: boolean;
  isLoading: boolean;
  chatHistory: ChatMessage[];
  currentSuggestions: string[];
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onAPIKeySubmit: (key: string) => void;
}

const ChatContainer = ({
  isLoading,
  chatHistory,
  currentSuggestions,
  message,
  onMessageChange,
  onSendMessage
}: ChatContainerProps) => {
  return (
    <div className="space-y-4">
      <ChatHistory messages={chatHistory} isLoading={isLoading} />
      <SuggestedQuestions 
        questions={currentSuggestions} 
        onQuestionClick={onMessageChange}
      />
      <ChatInput
        message={message}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatContainer;
