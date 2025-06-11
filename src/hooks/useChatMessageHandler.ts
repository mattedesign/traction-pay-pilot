
import { useState } from "react";
import { useClaude } from "./useClaude";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage, InteractiveButton } from "./useChatMessages";
import { ChatMessageProcessor } from "@/services/chatMessageProcessor";
import { ChatErrorHandler } from "@/services/chatErrorHandler";

interface UseChatMessageHandlerProps {
  systemPrompt: string;
  chatHistory: ChatMessage[];
  addUserMessage: (content: string) => ChatMessage;
  addAIMessage: (content: string, interactiveButtons?: InteractiveButton[]) => ChatMessage;
  currentLoadId?: string;
}

export const useChatMessageHandler = ({
  systemPrompt,
  chatHistory,
  addUserMessage,
  addAIMessage,
  currentLoadId
}: UseChatMessageHandlerProps) => {
  const { toast } = useToast();
  const { isLoading, isInitialized, sendMessage } = useClaude({ systemPrompt });

  const handleSendMessage = async (sanitizedMessage: string) => {
    const userMessage = addUserMessage(sanitizedMessage);

    try {
      const routingResult = await ChatMessageProcessor.processMessage({
        sanitizedMessage,
        currentLoadId,
        chatHistory,
        userMessage,
        sendMessage,
        systemPrompt,
        addAIMessage,
        toast
      });

      return routingResult;
      
    } catch (error) {
      ChatErrorHandler.handleError(error, addAIMessage, toast);
      throw error;
    }
  };

  return {
    isLoading,
    isInitialized,
    handleSendMessage
  };
};
