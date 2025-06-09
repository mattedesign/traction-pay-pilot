
import ChatHistory from "./ChatHistory";
import LoadResultsPresenter from "./LoadResultsPresenter";
import { ChatMessage } from "../hooks/useChatMessages";

interface ChatContentAreaProps {
  isFocused: boolean;
  showingResults: boolean;
  loadResults: any[];
  chatHistory: ChatMessage[];
  isLoading: boolean;
  onLoadSelect: (loadId: string) => void;
}

const ChatContentArea = ({
  isFocused,
  showingResults,
  loadResults,
  chatHistory,
  isLoading,
  onLoadSelect
}: ChatContentAreaProps) => {
  if (!isFocused) return null;

  return (
    <div className="flex-1 min-h-0 overflow-hidden bg-slate-50 w-full">
      <div className="h-full max-w-4xl mx-auto flex flex-col">
        {/* Show search results if available */}
        {showingResults && loadResults.length > 0 && (
          <div className="shrink-0 p-4 border-b">
            <LoadResultsPresenter 
              results={loadResults}
              onLoadSelect={onLoadSelect}
            />
          </div>
        )}
        
        {/* Show chat history if available - takes remaining space */}
        {chatHistory.length > 0 && (
          <div className="flex-1 min-h-0 overflow-y-auto p-4">
            <ChatHistory messages={chatHistory} isLoading={isLoading} />
          </div>
        )}
        
        {/* Show message when no content */}
        {!showingResults && chatHistory.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-4 text-center text-slate-500 text-sm">
            Start a conversation or search for loads
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContentArea;
