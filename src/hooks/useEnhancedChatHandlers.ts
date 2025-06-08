
import { useState } from "react";
import { useClaude } from "./useClaude";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "./useChatMessages";
import { LoadDataService, LoadDataContext } from "@/services/loadDataService";
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

  const processMessageWithContext = async (userMessage: string): Promise<string> => {
    let enhancedMessage = userMessage;
    let contextData: LoadDataContext | null = null;

    // Extract load ID from message
    const extractedLoadId = LoadDataService.extractLoadIdFromMessage(userMessage);
    
    // Try to get load context from extracted ID or provided context
    const loadId = extractedLoadId || (loadContext ? loadContext.match(/Load #(\d+)/)?.[1] : null);
    
    if (loadId) {
      console.log(`Fetching context for Load #${loadId}`);
      contextData = await LoadDataService.getLoadContext(loadId);
      
      if (contextData) {
        const formattedContext = LoadDataService.formatLoadContextForAI(contextData);
        enhancedMessage = `${formattedContext}\n\n**USER QUESTION:** ${userMessage}`;
        
        toast({
          title: "Load Context Added",
          description: `Retrieved detailed information for Load #${loadId}`,
        });
      } else {
        // Load ID mentioned but not found
        enhancedMessage = `**NOTE:** User mentioned Load #${loadId} but this load was not found in the system.\n\n**USER QUESTION:** ${userMessage}`;
        
        toast({
          title: "Load Not Found",
          description: `Load #${loadId} was not found in the system`,
          variant: "destructive"
        });
      }
    } else if (loadContext) {
      // We're in a load-specific chat but no specific load mentioned
      const contextLoadId = loadContext.match(/Load #(\d+)/)?.[1];
      if (contextLoadId) {
        contextData = await LoadDataService.getLoadContext(contextLoadId);
        if (contextData) {
          const formattedContext = LoadDataService.formatLoadContextForAI(contextData);
          enhancedMessage = `${formattedContext}\n\n**USER QUESTION:** ${userMessage}`;
        }
      }
    }

    return enhancedMessage;
  };

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
      console.log('Processing message with enhanced context...');
      
      // Process message with load context
      const enhancedMessage = await processMessageWithContext(sanitizedMessage);
      
      // Convert chat history to Claude service format, using enhanced message for the latest
      const messages = [...chatHistory, { ...userMessage, content: enhancedMessage }].map(msg => ({
        role: msg.type === "user" ? "user" as const : "assistant" as const,
        content: sanitizeInput(msg.content)
      }));

      const response = await sendMessage(messages);
      
      addAIMessage(response);
      
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
    console.log('Setting up enhanced Claude AI service with validated key...');
    
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
        description: "Your Claude AI assistant is now ready with load context awareness.",
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
