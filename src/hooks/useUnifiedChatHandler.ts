
import { useState } from "react";
import { useClaude } from "./useClaude";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "./useChatMessages";
import { useChatMessageHandler } from "./useChatMessageHandler";
import { useLoadSearchHandler } from "./useLoadSearchHandler";
import { useAPIKeyHandler } from "./useAPIKeyHandler";
import { sanitizeInput } from "@/utils/security";

interface UseUnifiedChatHandlerProps {
  systemPrompt: string;
  chatHistory: ChatMessage[];
  addUserMessage: (content: string) => ChatMessage;
  addAIMessage: (content: string) => ChatMessage;
  currentLoadId?: string;
  onLoadSelect?: (loadId: string) => void;
}

export const useUnifiedChatHandler = ({
  systemPrompt,
  chatHistory,
  addUserMessage,
  addAIMessage,
  currentLoadId,
  onLoadSelect
}: UseUnifiedChatHandlerProps) => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  
  const { isLoading, isInitialized, initializeService } = useClaude({ 
    systemPrompt 
  });

  const { handleSendMessage } = useChatMessageHandler({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage,
    currentLoadId
  });

  const { 
    loadResults, 
    showingResults, 
    handleLoadResults, 
    handleLoadSelect: handleInternalLoadSelect,
    resetResults 
  } = useLoadSearchHandler({
    addAIMessage,
    onLoadSelect
  });

  const { handleAPIKeySubmit } = useAPIKeyHandler({
    initializeService
  });

  const handleMainSendMessage = async () => {
    const sanitizedMessage = sanitizeInput(message);
    
    if (!sanitizedMessage.trim() || isLoading) return;

    if (!isInitialized) {
      toast({
        title: "API Key Required",
        description: "Please enter your Anthropic API key to use Claude AI assistant.",
        variant: "destructive"
      });
      return;
    }

    setMessage("");
    resetResults();

    try {
      const routingResult = await handleSendMessage(sanitizedMessage);
      
      // Handle load search results if found
      const resultsShown = handleLoadResults(routingResult);
      if (resultsShown) {
        return; // Don't continue if we're showing search results
      }
      
    } catch (error) {
      // Error handling is done in the chat message handler
    }
  };

  const handleLoadSelect = (loadId: string) => {
    handleInternalLoadSelect(loadId);
    if (!onLoadSelect) {
      // Auto-generate a query about the selected load
      setMessage(`Tell me about load #${loadId}`);
    }
  };

  return {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage: handleMainSendMessage,
    handleAPIKeySubmit,
    loadResults,
    showingResults,
    handleLoadSelect
  };
};
