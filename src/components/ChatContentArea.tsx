
import ChatHistory from "./ChatHistory";
import LoadResultsPresenter from "./LoadResultsPresenter";
import { ChatMessage, InteractiveButton } from "../hooks/useChatMessages";

interface ChatContentAreaProps {
  isFocused: boolean;
  showingResults: boolean;
  loadResults: any[];
  chatHistory: ChatMessage[];
  isLoading: boolean;
  onLoadSelect: (loadId: string) => void;
  onButtonClick?: (button: InteractiveButton) => void;
}

const ChatContentArea = ({
  isFocused,
  showingResults,
  loadResults,
  chatHistory,
  isLoading,
  onLoadSelect,
  onButtonClick
}: ChatContentAreaProps) => {
  if (!isFocused) return null;

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="max-w-4xl mx-auto">
        {/* Show search results if available */}
        {showingResults && loadResults.length > 0 && (
          <div className="p-4 border-b">
            <LoadResultsPresenter 
              results={loadResults}
              onLoadSelect={onLoadSelect}
            />
          </div>
        )}
        
        {/* Show chat history if available */}
        {chatHistory.length > 0 && (
          <div className="p-4">
            <ChatHistory 
              messages={chatHistory} 
              isLoading={isLoading} 
              onButtonClick={onButtonClick}
            />
          </div>
        )}
        
        {/* Show message when no content */}
        {!showingResults && chatHistory.length === 0 && (
          <div className="flex items-center justify-center p-4 text-center text-slate-500 text-sm min-h-32">
            Start a conversation or search for loads
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContentArea;
