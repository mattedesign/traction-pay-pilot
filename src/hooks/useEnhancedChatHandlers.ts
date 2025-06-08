
import { useState } from "react";
import { useClaude } from "./useClaude";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "./useChatMessages";
import { IntelligentResponseService } from "@/services/intelligentResponseService";
import { validateAPIKey, storeAPIKey, getAPIKey, clearAPIKey, sanitizeInput } from "@/utils/security";

interface UseEnhancedChatHandlersProps {
  systemPrompt: string;
  chatHistory: ChatMessage[];
  addUserMessage: (content: string) => ChatMessage;
  addAIMessage: (content: string) => ChatMessage;
  loadContext?: string;
}

export const useEnhancedChatHandlers = ({
  systemPrompt,
  chatHistory,
  addUserMessage,
  addAIMessage,
  loadContext
}: UseEnhancedChatHandlersProps) => {
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
      console.log('Processing message with intelligent response system...');
      
      // Use intelligent response service to analyze and prepare context
      const responseContext = await IntelligentResponseService.analyzeAndPrepareResponse(
        sanitizedMessage,
        loadContext
      );
      
      console.log('Response context prepared:', {
        hasContext: responseContext.hasLoadContext,
        loadId: responseContext.loadContext?.loadId
      });
      
      // Build enhanced system prompt
      let enhancedSystemPrompt = systemPrompt;
      if (responseContext.systemPromptAddition) {
        enhancedSystemPrompt += '\n\n' + responseContext.systemPromptAddition;
      }
      
      // Prepare message for Claude
      const messageForClaude = responseContext.messageEnhancement;
      
      // Convert chat history to Claude service format
      const messages = [...chatHistory, { ...userMessage, content: messageForClaude }].map(msg => ({
        role: msg.type === "user" ? "user" as const : "assistant" as const,
        content: sanitizeInput(msg.content)
      }));

      console.log('Sending to Claude with enhanced context...');
      const response = await sendMessage(messages, enhancedSystemPrompt);
      
      addAIMessage(response);
      
      // Show context notification if load context was used
      if (responseContext.hasLoadContext && responseContext.loadContext) {
        toast({
          title: "Enhanced Context Applied",
          description: `Using detailed context for Load #${responseContext.loadContext.loadId}`,
        });
      }
      
    } catch (error) {
      console.error('Enhanced chat error:', error);
      
      let errorMessage = "❌ Connection failed. Please check your Anthropic API key and try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('authentication')) {
          errorMessage = "❌ **Authentication Error**\n\nYour Anthropic API key appears to be invalid or expired. Please check your key and try again.";
          clearAPIKey();
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
    console.log('Setting up enhanced Claude AI service with intelligent routing...');
    
    try {
      if (!validateAPIKey(key)) {
        toast({
          title: "Invalid API Key",
          description: "Please enter a valid Anthropic API key starting with 'sk-ant-'",
          variant: "destructive"
        });
        return;
      }

      storeAPIKey(key);
      initializeService(key);
      
      toast({
        title: "Enhanced Claude AI Ready",
        description: "Your Claude AI assistant is now ready with intelligent load context awareness and query routing.",
      });
      
    } catch (error) {
      console.error('API key setup error:', error);
      clearAPIKey();
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
