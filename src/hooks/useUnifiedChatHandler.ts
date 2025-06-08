
import { useState } from "react";
import { useClaude } from "./useClaude";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "./useChatMessages";
import { EnhancedQueryRouter } from "@/services/enhancedQueryRouter";
import { SmartContextBuilder } from "@/services/smartContextBuilder";
import { validateAPIKey, storeAPIKey, getAPIKey, clearAPIKey, sanitizeInput } from "@/utils/security";

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
  const [message, setMessage] = useState("");
  const [loadResults, setLoadResults] = useState<any[]>([]);
  const [showingResults, setShowingResults] = useState(false);
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
    setShowingResults(false);

    try {
      console.log('Processing with unified chat system...');
      
      // Step 1: Analyze query and route appropriately
      const routingResult = EnhancedQueryRouter.analyzeQuery(sanitizedMessage, currentLoadId);
      
      console.log('Query routing result:', {
        queryType: routingResult.queryType,
        confidence: routingResult.confidence,
        loadResultsCount: routingResult.loadResults?.length || 0
      });

      // Step 2: Handle load search results if found
      if (routingResult.loadResults && routingResult.loadResults.length > 0) {
        setLoadResults(routingResult.loadResults);
        
        // Show results for multi-load scenarios or if user wants to see options
        if (routingResult.queryType === 'load_search' && routingResult.loadResults.length > 1) {
          setShowingResults(true);
          
          const resultSummary = `Found ${routingResult.loadResults.length} matching loads:\n\n` +
            routingResult.loadResults.map(result => 
              `• Load #${result.load.id} - ${result.load.broker} - ${result.load.status} (${result.matchReason})`
            ).join('\n') +
            '\n\nClick on any load above to get specific details, or ask me about any of these loads.';
          
          addAIMessage(resultSummary);
          
          toast({
            title: "Load Search Complete",
            description: `Found ${routingResult.loadResults.length} matching loads`,
          });
          return;
        }
      }

      // Step 3: Build smart context for AI
      const smartContext = await SmartContextBuilder.buildContext(
        sanitizedMessage,
        routingResult,
        currentLoadId
      );

      // Step 4: Send to Claude if AI response is needed
      if (routingResult.requiresAI) {
        const messages = [...chatHistory, { ...userMessage, content: smartContext.enhancedUserMessage }].map(msg => ({
          role: msg.type === "user" ? "user" as const : "assistant" as const,
          content: sanitizeInput(msg.content)
        }));

        console.log('Sending to Claude with enhanced context...');
        const response = await sendMessage(messages);
        
        addAIMessage(response);
        
        // Show context notification
        if (smartContext.contextType === 'specific_load' && smartContext.loadData) {
          toast({
            title: "Load Context Applied",
            description: `Responding with detailed context for Load #${smartContext.loadData.loadId}`,
          });
        } else if (smartContext.contextType === 'multiple_loads') {
          toast({
            title: "Multi-Load Analysis",
            description: `Analyzing ${smartContext.searchResults?.length} relevant loads`,
          });
        }
      }
      
    } catch (error) {
      console.error('Unified chat handler error:', error);
      
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
        title: "Error",
        description: "Failed to process your message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAPIKeySubmit = async (key: string) => {
    console.log('Setting up unified chat system...');
    
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
        title: "Unified Chat System Ready",
        description: "Your intelligent chat assistant is now ready with load search and context-aware responses.",
      });
      
    } catch (error) {
      console.error('API key setup error:', error);
      clearAPIKey();
      toast({
        title: "Setup Error",
        description: "There was an issue setting up the chat system. Please try again with a valid API key.",
        variant: "destructive"
      });
    }
  };

  const handleLoadSelect = (loadId: string) => {
    setShowingResults(false);
    if (onLoadSelect) {
      onLoadSelect(loadId);
    } else {
      // Auto-generate a query about the selected load
      setMessage(`Tell me about load #${loadId}`);
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
    handleAPIKeySubmit,
    loadResults,
    showingResults,
    handleLoadSelect
  };
};
