
import { useState } from "react";
import { useClaude } from "./useClaude";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "./useChatMessages";
import { EnhancedQueryRouter } from "@/services/enhancedQueryRouter";
import { SmartContextBuilder } from "@/services/smartContextBuilder";
import { sanitizeInput, clearAPIKey } from "@/utils/security";

interface UseChatMessageHandlerProps {
  systemPrompt: string;
  chatHistory: ChatMessage[];
  addUserMessage: (content: string) => ChatMessage;
  addAIMessage: (content: string) => ChatMessage;
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
      console.log('Processing with unified chat system...');
      
      // Step 1: Analyze query and route appropriately
      const routingResult = EnhancedQueryRouter.analyzeQuery(sanitizedMessage, currentLoadId);
      
      console.log('Query routing result:', {
        queryType: routingResult.queryType,
        confidence: routingResult.confidence,
        loadResultsCount: routingResult.loadResults?.length || 0
      });

      // Step 2: Build smart context for AI
      const smartContext = await SmartContextBuilder.buildContext(
        sanitizedMessage,
        routingResult,
        currentLoadId
      );

      // Step 3: Send to Claude if AI response is needed
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

      return routingResult;
      
    } catch (error) {
      console.error('Chat message handler error:', error);
      
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

      throw error;
    }
  };

  return {
    isLoading,
    isInitialized,
    handleSendMessage
  };
};
