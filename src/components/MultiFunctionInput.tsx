
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Search, MessageCircle } from "lucide-react";
import { LoadSearchService, LoadSearchResult } from "@/services/loadSearchService";

interface MultiFunctionInputProps {
  onSearchResults: (results: LoadSearchResult[]) => void;
  onChatMessage: (message: string) => void;
  isLoading: boolean;
}

type InputMode = 'search' | 'chat';

const MultiFunctionInput = ({ 
  onSearchResults, 
  onChatMessage, 
  isLoading 
}: MultiFunctionInputProps) => {
  const [mode, setMode] = useState<InputMode>('search');
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;

    if (mode === 'search') {
      // Perform load search using mock data
      const searchResults = LoadSearchService.searchLoads(input);
      onSearchResults(searchResults);
    } else {
      // Send to Claude chat
      onChatMessage(input);
    }

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-3">
      {/* Mode Selection */}
      <div className="flex gap-2">
        <Badge
          variant={mode === 'search' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setMode('search')}
        >
          <Search className="w-3 h-3 mr-1" />
          Search Loads
        </Badge>
        <Badge
          variant={mode === 'chat' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setMode('chat')}
        >
          <MessageCircle className="w-3 h-3 mr-1" />
          AI Chat
        </Badge>
      </div>

      {/* Input Area */}
      <div className="flex space-x-2">
        <Input
          placeholder={
            mode === 'search' 
              ? "Search loads by ID, broker, route, status..."
              : "Ask Claude about trucking, logistics, compliance..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
          variant={mode === 'search' ? 'outline' : 'default'}
        >
          {mode === 'search' ? (
            <Search className="w-4 h-4" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Mode Description */}
      <p className="text-xs text-slate-500">
        {mode === 'search' 
          ? "Search through your load data instantly - no AI required"
          : "Chat with Claude AI for trucking advice and general questions"
        }
      </p>
    </div>
  );
};

export default MultiFunctionInput;
