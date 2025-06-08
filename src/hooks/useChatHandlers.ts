
import { useState } from "react";
import { useClaude } from "./useClaude";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "./useChatMessages";
import { validateAPIKey, storeAPIKey, getAPIKey, clearAPIKey, sanitizeInput } from "@/utils/security";

interface UseChatHandlersProps {
  systemPrompt: string;
  chatHistory: ChatMessage[];
  addUserMessage: (content: string) => ChatMessage;
  addAIMessage: (content: string) => ChatMessage;
}

export const useChatHandlers = ({
  systemPrompt,
  chatHistory,
  addUserMessage,
  addAIMessage
}: UseChatHandlersProps) => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  
  const { isLoading, isInitialized, initializeService, sendMessage } = useClaude({ 
    systemPrompt 
  });

  const handleSendMessage = async () => {
    const sanitizedMessage = sanitizeInput(message);
    
    if (!sanitizedMessage.trim() || isLoading) return;

    if (!isInitialized) {
      toast({
        title: "Service Not Ready",
        description: "Please wait for the AI service to initialize.",
        variant: "destructive"
      });
      return;
    }

    const userMessage = addUserMessage(sanitizedMessage);
    setMessage("");

    try {
      console.log('Sending secure message to Claude via Supabase Edge Functions...');
      
      // Convert chat history to Claude service format
      const messages = [...chatHistory, userMessage].map(msg => ({
        role: msg.type === "user" ? "user" as const : "assistant" as const,
        content: sanitizeInput(msg.content)
      }));

      const response = await sendMessage(messages);
      
      addAIMessage(response);
      
    } catch (error) {
      console.error('Claude chat error:', error);
      
      let errorMessage = "❌ Connection failed. Please check the system configuration and try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('authentication')) {
          errorMessage = "❌ **Authentication Error**\n\nThere was an authentication issue with the AI service. Please try again.";
        } else if (error.message.includes('429')) {
          errorMessage = "❌ **Rate Limit Exceeded**\n\nYou've hit the rate limit for the AI service. Please wait a moment before trying again.";
        } else if (error.message.includes('Network') || error.message.includes('fetch')) {
          errorMessage = "❌ **Connection Error**\n\nUnable to connect to the AI service. Please check your internet connection and try again.";
        }
      }
      
      addAIMessage(errorMessage);
      
      toast({
        title: "AI Service Error",
        description: "Failed to get response from the AI assistant. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAPIKeySubmit = async () => {
    console.log('API key setup now managed by Supabase Edge Functions...');
    
    try {
      // Since API keys are now handled in Supabase Edge Functions,
      // we just need to ensure the service is initialized
      initializeService();
      
      toast({
        title: "AI Assistant Ready",
        description: "Your AI chat assistant is now ready. API keys are securely managed via Supabase.",
      });
      
    } catch (error) {
      console.error('Service initialization error:', error);
      toast({
        title: "Setup Error",
        description: "There was an issue setting up the chat system. Please ensure Supabase is properly configured.",
        variant: "destructive"
      });
    }
  };

  // Auto-initialize service on mount if not already initialized
  useState(() => {
    if (!isInitialized) {
      initializeService();
    }
  });

  return {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage,
    handleAPIKeySubmit
  };
};
