
import { useClaude } from "./useClaude";
import { ChatMessage } from "./useChatMessages";
import { useAPIKeyHandler } from "./useAPIKeyHandler";
import { useMessageState } from "./useMessageState";
import { useMainMessageHandler } from "./useMainMessageHandler";

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
  const { message, setMessage } = useMessageState();
  
  const { isLoading, isInitialized, initializeService } = useClaude({ 
    systemPrompt 
  });

  const { handleAPIKeySubmit } = useAPIKeyHandler({
    initializeService
  });

  const {
    handleSendMessage,
    loadResults,
    showingResults,
    handleLoadSelect
  } = useMainMessageHandler({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage,
    currentLoadId,
    onLoadSelect,
    isInitialized,
    isLoading,
    message,
    setMessage
  });

  return {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage,
    handleAPIKeySubmit,
    loadResults,
    showingResults,
    handleLoadSelect
  };
};
