
import ChatHistory from "./ChatHistory";
import SuggestedQuestions from "./SuggestedQuestions";
import MultiFunctionInput from "./MultiFunctionInput";
import SearchResultsDisplay from "./SearchResultsDisplay";
import { ChatMessage } from "../hooks/useChatMessages";
import { LoadSearchResult } from "@/services/loadSearchService";
import { useState } from "react";

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
  const [searchResults, setSearchResults] = useState<LoadSearchResult[]>([]);
  const [showingSearch, setShowingSearch] = useState(false);

  const handleSearchResults = (results: LoadSearchResult[]) => {
    setSearchResults(results);
    setShowingSearch(true);
  };

  const handleChatMessage = (message: string) => {
    setShowingSearch(false);
    onChatMessage(message);
  };

  const handleLoadSelect = (loadId: string) => {
    if (onLoadSelect) {
      onLoadSelect(loadId);
    }
  };

  return (
    <div className="space-y-4">
      <ChatHistory messages={chatHistory} isLoading={isLoading} />
      
      {showingSearch && searchResults.length > 0 && (
        <SearchResultsDisplay 
          results={searchResults}
          onLoadSelect={handleLoadSelect}
        />
      )}
      
      <SuggestedQuestions 
        questions={currentSuggestions} 
        onQuestionClick={handleChatMessage}
      />
      
      <MultiFunctionInput
        onSearchResults={handleSearchResults}
        onChatMessage={handleChatMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatContainer;
