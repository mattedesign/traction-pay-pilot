
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useClaude } from "./useClaude";
import { useMainMessageHandler } from "./useMainMessageHandler";
import { useAPIKeyHandler } from "./useAPIKeyHandler";
import { ChatMessage, InteractiveButton } from "./useChatMessages";
import { sanitizeInput } from "@/utils/security";
import { ChatMessageProcessor } from "@/services/chatMessageProcessor";
import { ButtonClickHandler } from "@/services/buttonClickHandler";

interface UseUnifiedChatHandlerProps {
  systemPrompt: string;
  chatHistory: ChatMessage[];
  addUserMessage: (content: string) => ChatMessage;
  addAIMessage: (content: string) => ChatMessage;
  currentLoadId?: string;
  onLoadSelect?: (loadId: string) => void;
  onNavigate?: (path: string) => void;
}

export const useUnifiedChatHandler = ({
  systemPrompt,
  chatHistory,
  addUserMessage,
  addAIMessage,
  currentLoadId,
  onLoadSelect,
  onNavigate
}: UseUnifiedChatHandlerProps) => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const { isLoading, isInitialized, sendMessage, initializeService } = useClaude({ systemPrompt });
  const { handleAPIKeySubmit } = useAPIKeyHandler({ initializeService });

  const {
    handleSendMessage: handleMainSendMessage,
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

  const handleSendMessage = async () => {
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

    const userMessage = addUserMessage(sanitizedMessage);
    setMessage("");

    try {
      // Use the enhanced chat message processor
      await ChatMessageProcessor.processMessage({
        sanitizedMessage,
        currentLoadId,
        chatHistory,
        userMessage,
        sendMessage,
        systemPrompt,
        addAIMessage,
        toast,
        onNavigate
      });
      
    } catch (error) {
      console.error('Error in unified chat handler:', error);
      addAIMessage("I apologize, but I encountered an error processing your request. Please try again.");
    }
  };

  const handleButtonClick = (button: InteractiveButton) => {
    console.log('useUnifiedChatHandler: Button clicked:', button);
    
    ButtonClickHandler.handle({
      button,
      onNavigate,
      onContinueChat: async (chatMessage: string) => {
        console.log('useUnifiedChatHandler: Auto-sending message:', chatMessage);
        setMessage(chatMessage);
        
        // Process the message directly
        const sanitizedMessage = sanitizeInput(chatMessage);
        if (!sanitizedMessage.trim() || isLoading || !isInitialized) return;

        const userMessage = addUserMessage(sanitizedMessage);
        setMessage("");

        try {
          await ChatMessageProcessor.processMessage({
            sanitizedMessage,
            currentLoadId,
            chatHistory,
            userMessage,
            sendMessage,
            systemPrompt,
            addAIMessage,
            toast,
            onNavigate
          });
        } catch (error) {
          console.error('Error in button click handler:', error);
          addAIMessage("I apologize, but I encountered an error processing your request. Please try again.");
        }
      }
    });
  };

  return {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage,
    handleAPIKeySubmit,
    loadResults,
    showingResults,
    handleLoadSelect,
    handleButtonClick
  };
};
