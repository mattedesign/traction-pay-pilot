
import { useState } from "react";
import { useAI } from "./useAI";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "./useChatMessages";
import { sanitizeInput } from "@/utils/security";

interface UseEnhancedChatHandlerProps {
  systemPrompt: string;
  chatHistory: ChatMessage[];
  addUserMessage: (content: string) => ChatMessage;
  addAIMessage: (content: string) => ChatMessage;
  currentLoadId?: string;
  onLoadSelect?: (loadId: string) => void;
}

export const useEnhancedChatHandler = ({
  systemPrompt,
  chatHistory,
  addUserMessage,
  addAIMessage,
  currentLoadId
}: UseEnhancedChatHandlerProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  
  const {
    isLoading,
    sendMessage
  } = useAI({ systemPrompt, preferSupabase: true });

  // System is always initialized since we're using Supabase Edge Functions
  const isInitialized = true;

  const handleSendMessage = async () => {
    const sanitizedMessage = sanitizeInput(message);
    
    if (!sanitizedMessage.trim() || isLoading) return;

    setMessage("");
    const userMessage = addUserMessage(sanitizedMessage);

    try {
      // Prepare conversation context - map ChatMessage type to role format
      const conversationMessages = chatHistory
        .slice(-10) // Keep last 10 messages for context
        .map(msg => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        }));

      // Add current message
      conversationMessages.push({
        role: 'user' as const,
        content: sanitizedMessage
      });

      // Add load context if available
      let contextualPrompt = systemPrompt;
      if (currentLoadId) {
        contextualPrompt += `\n\nCurrent context: You are helping with ${currentLoadId}. Provide specific advice and information related to this load when relevant.`;
      }

      const response = await sendMessage(conversationMessages);
      addAIMessage(response);
      
    } catch (error) {
      console.error('Enhanced chat handler error:', error);
      
      let errorMessage = "❌ I'm having trouble connecting right now. ";
      
      if (error instanceof Error) {
        if (error.message.includes('Function not found')) {
          errorMessage += "The AI service is not properly configured. Please contact support.";
        } else if (error.message.includes('API key')) {
          errorMessage += "There's an issue with the AI service configuration. Please contact support.";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage += "Please check your internet connection.";
        } else {
          errorMessage += "Please try again in a moment.";
        }
      } else {
        errorMessage += "Please try again in a moment.";
      }
      
      addAIMessage(errorMessage);
      
      toast({
        title: "Connection Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage
  };
};
