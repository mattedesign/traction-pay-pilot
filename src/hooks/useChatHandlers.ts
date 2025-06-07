
import { useState } from "react";
import { useAI } from "./useAI";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "./useChatMessages";

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
  
  const { isLoading, isInitialized, initializeService, sendMessage } = useAI({ 
    systemPrompt 
  });

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    if (!isInitialized) {
      toast({
        title: "API Key Required",
        description: "Please enter your Anthropic API key to use the AI assistant.",
        variant: "destructive"
      });
      return;
    }

    const userMessage = addUserMessage(message);
    setMessage("");

    try {
      console.log('Preparing to send message to AI...');
      
      // Convert chat history to AI service format
      const messages = [...chatHistory, userMessage].map(msg => ({
        role: msg.type === "user" ? "user" as const : "assistant" as const,
        content: msg.content
      }));

      const response = await sendMessage(messages);
      
      if (response.error) {
        console.error('AI Service returned error:', response.error);
        
        // Add error message to chat
        addAIMessage(response.content);
        
        // Show different toast messages based on error type
        if (response.error.includes('CORS') || response.error.includes('Network')) {
          toast({
            title: "Browser Security Limitation",
            description: "Direct API calls are blocked. Consider using Supabase integration for secure AI functionality.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "AI Service Error",
            description: response.error,
            variant: "destructive"
          });
        }
        return;
      }

      addAIMessage(response.content);
      
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message to chat
      addAIMessage("❌ Connection failed. This browser-based implementation has limitations due to CORS policies. For production use, consider setting up a backend service or using Lovable's Supabase integration.");
      
      toast({
        title: "Connection Error",
        description: "Browser security limitations prevent direct API calls. Consider using a backend service.",
        variant: "destructive"
      });
    }
  };

  const handleAPIKeySubmit = async (key: string) => {
    console.log('Setting up AI service with provided key...');
    
    try {
      initializeService(key);
      
      toast({
        title: "AI Assistant Ready",
        description: "Your API key has been configured. You can now start chatting with the AI assistant.",
      });
      
    } catch (error) {
      console.error('API key setup error:', error);
      toast({
        title: "Setup Error",
        description: "There was an issue setting up the AI service. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage,
    handleAPIKeySubmit
  };
};
