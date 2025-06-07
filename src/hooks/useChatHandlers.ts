
import { useState } from "react";
import { useAI } from "./useAI";
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
  
  const { isLoading, isInitialized, initializeService, sendMessage } = useAI({ 
    systemPrompt 
  });

  const handleSendMessage = async () => {
    const sanitizedMessage = sanitizeInput(message);
    
    if (!sanitizedMessage.trim() || isLoading) return;

    if (!isInitialized) {
      toast({
        title: "API Key Required",
        description: "Please enter your Anthropic API key to use the AI assistant.",
        variant: "destructive"
      });
      return;
    }

    const userMessage = addUserMessage(sanitizedMessage);
    setMessage("");

    try {
      console.log('Sending secure message to AI via CORS proxy...');
      
      // Convert chat history to AI service format
      const messages = [...chatHistory, userMessage].map(msg => ({
        role: msg.type === "user" ? "user" as const : "assistant" as const,
        content: sanitizeInput(msg.content)
      }));

      const response = await sendMessage(messages);
      
      if (response.error) {
        console.error('AI Service returned error:', response.error);
        
        addAIMessage(response.content);
        
        if (response.error.includes('Network') || response.error.includes('CORS')) {
          toast({
            title: "Connection Issue",
            description: "CORS proxy might be down. Try refreshing the page or check your network connection.",
            variant: "destructive"
          });
        } else if (response.error.includes('401') || response.error.includes('authentication')) {
          toast({
            title: "Authentication Error",
            description: "Your API key may be invalid or expired. Please check your key.",
            variant: "destructive"
          });
          clearAPIKey(); // Clear potentially invalid key
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
      
      addAIMessage("❌ Connection failed. The CORS proxy might be temporarily unavailable. Please try again in a moment, or refresh the page to retry.");
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to AI service. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAPIKeySubmit = async (key: string) => {
    console.log('Setting up secure AI service with validated key...');
    
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
        title: "Secure AI Assistant Ready",
        description: "Your API key has been validated and stored securely. You can now start chatting.",
      });
      
    } catch (error) {
      console.error('API key setup error:', error);
      clearAPIKey(); // Clear any problematic key
      toast({
        title: "Setup Error",
        description: "There was an issue setting up the AI service. Please try again with a valid API key.",
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
