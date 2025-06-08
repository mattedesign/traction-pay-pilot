
import ChatHistory from "./ChatHistory";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";
import LoadResultsPresenter from "./LoadResultsPresenter";
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
  loadResults?: any[];
  showingResults?: boolean;
  onLoadSelect?: (loadId: string) => void;
}

const ChatContainer = ({
  isLoading,
  chatHistory,
  currentSuggestions,
  message,
  onMessageChange,
  onSendMessage,
  loadResults = [],
  showingResults = false,
  onLoadSelect
}: ChatContainerProps) => {
  return (
    <div className="space-y-4">
      <ChatHistory messages={chatHistory} isLoading={isLoading} />
      
      {showingResults && loadResults.length > 0 && onLoadSelect && (
        <LoadResultsPresenter 
          results={loadResults}
          onLoadSelect={onLoadSelect}
          showingSearch={true}
        />
      )}
      
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
