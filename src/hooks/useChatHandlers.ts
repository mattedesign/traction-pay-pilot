
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
        title: "API Key Required",
        description: "Please enter your Anthropic API key to use Claude AI assistant.",
        variant: "destructive"
      });
      return;
    }

    const userMessage = addUserMessage(sanitizedMessage);
    setMessage("");

    try {
      console.log('Sending secure message to Claude via enhanced AI service...');
      
      // Convert chat history to Claude service format
      const messages = [...chatHistory, userMessage].map(msg => ({
        role: msg.type === "user" ? "user" as const : "assistant" as const,
        content: sanitizeInput(msg.content)
      }));

      const response = await sendMessage(messages);
      
      addAIMessage(response);
      
    } catch (error) {
      console.error('Claude chat error:', error);
      
      let errorMessage = "❌ Connection failed. Please check your Anthropic API key and try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('authentication')) {
          errorMessage = "❌ **Authentication Error**\n\nYour Anthropic API key appears to be invalid or expired. Please check your key and try again.";
          clearAPIKey(); // Clear potentially invalid key
        } else if (error.message.includes('429')) {
          errorMessage = "❌ **Rate Limit Exceeded**\n\nYou've hit the rate limit for the Anthropic API. Please wait a moment before trying again.";
        } else if (error.message.includes('Network') || error.message.includes('fetch')) {
          errorMessage = "❌ **Connection Error**\n\nUnable to connect to the Anthropic API. Please check your internet connection and try again.";
        }
      }
      
      addAIMessage(errorMessage);
      
      toast({
        title: "Claude AI Error",
        description: "Failed to get response from Claude. Please check your API key and try again.",
        variant: "destructive"
      });
    }
  };

  const handleAPIKeySubmit = async (key: string) => {
    console.log('Setting up secure Claude AI service with validated key...');
    
    try {
      if (!validateAPIKey(key)) {
        toast({
          title: "Invalid API Key",
          description: "Please enter a valid Anthropic API key starting with 'sk-ant-'",
          variant: "destructive"
        });
        return;
      }

      // Store key securely
      storeAPIKey(key);
      
      initializeService(key);
      
      toast({
        title: "Claude AI Assistant Ready",
        description: "Your Anthropic API key has been validated and stored securely. You can now start chatting with Claude.",
      });
      
    } catch (error) {
      console.error('API key setup error:', error);
      clearAPIKey(); // Clear any problematic key
      toast({
        title: "Setup Error",
        description: "There was an issue setting up Claude AI service. Please try again with a valid API key.",
        variant: "destructive"
      });
    }
  };

  // Auto-load stored API key on hook initialization
  useState(() => {
    const storedKey = getAPIKey();
    if (storedKey) {
      initializeService(storedKey);
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
