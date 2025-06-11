
import { useState } from "react";
import { useClaude } from "./useClaude";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage, InteractiveButton } from "./useChatMessages";
import { EnhancedQueryRouter } from "@/services/enhancedQueryRouter";
import { SmartContextBuilder } from "@/services/smartContextBuilder";
import { InteractiveResponseService } from "@/services/interactiveResponseService";
import { ChatStateManager } from "@/services/chatStateManager";
import { sanitizeInput, clearAPIKey } from "@/utils/security";

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
      console.log('Processing with enhanced chat system...');
      
      // Step 1: Analyze query and route appropriately
      const routingResult = EnhancedQueryRouter.analyzeQuery(sanitizedMessage, currentLoadId);
      
      console.log('Query routing result:', {
        queryType: routingResult.queryType,
        confidence: routingResult.confidence,
        loadResultsCount: routingResult.loadResults?.length || 0,
        requiresAI: routingResult.requiresAI
      });

      // Step 2: Handle button responses without asking new questions
      if (routingResult.queryType === 'button_response') {
        console.log('Handling button response without generating new questions...');
        
        const enhancedSystemMessage = `${systemPrompt}
        
**BUTTON RESPONSE CONTEXT**
The user just provided a button response (${sanitizedMessage}). This is a direct answer to a previous question.
DO NOT ask follow-up questions. Instead, provide helpful information or take the appropriate action based on their response.
If they said "yes", proceed with the suggested action. If they said "no", offer alternative assistance.
Keep your response concise and actionable.`;

        // Convert chat history to the expected format
        const chatMessages = [
          ...chatHistory.map(msg => ({
            role: msg.type === "user" ? "user" as const : "assistant" as const,
            content: sanitizeInput(msg.content)
          })),
          {
            role: "user" as const,
            content: sanitizeInput(userMessage.content)
          }
        ];

        const response = await sendMessage(chatMessages);
        
        // Process response but suppress any new interactive questions
        const processedResponse = InteractiveResponseService.processResponse(response);
        addAIMessage(processedResponse.mainContent);
        
        return routingResult;
      }

      // Step 3: Handle pure search results without AI
      if (!routingResult.requiresAI && routingResult.loadResults && routingResult.loadResults.length > 0) {
        console.log('Handling pure search results without AI...');
        
        if (routingResult.queryType === 'load_search' && routingResult.loadResults.length > 1) {
          // Multiple loads found - let the load search handler display them
          console.log('Multiple loads found, returning results for display');
          return routingResult;
        } else if (routingResult.queryType === 'specific_load' && routingResult.loadResults.length === 1) {
          // Single load found - provide basic info
          const load = routingResult.loadResults[0].load;
          const basicInfo = `**Load #${load.id} Information:**

📊 **Status:** ${load.status.replace('_', ' ').toUpperCase()}
🏢 **Broker:** ${load.broker}
💰 **Amount:** ${load.amount}
📍 **Route:** ${load.origin} → ${load.destination}
⏰ **Pickup:** ${load.pickupTime}
📏 **Distance:** ${load.distance}

Click "View Load Details" above for more information or ask me specific questions about this load.`;
          
          addAIMessage(basicInfo);
          return routingResult;
        }
      }

      // Step 4: Build smart context for AI (only if AI is needed)
      if (routingResult.requiresAI) {
        const smartContext = await SmartContextBuilder.buildContext(
          sanitizedMessage,
          routingResult,
          currentLoadId
        );

        // Enhanced system prompt to prevent repetitive questions
        const enhancedSystemMessage = `${systemPrompt}${smartContext.systemPromptAddition}

**QUESTION MANAGEMENT RULES**
1. Before asking any yes/no question, consider if the user has already provided enough information
2. If the user is asking for specific information, provide it directly without asking permission
3. Only ask questions when you genuinely need clarification to help them
4. If you must ask a question, ask only ONE question per response
5. Do not ask if they want to see something they specifically requested`;

        // Step 5: Send to Claude for AI response
        // Convert chat history to the expected format and add the enhanced user message
        const chatMessages = [
          ...chatHistory.map(msg => ({
            role: msg.type === "user" ? "user" as const : "assistant" as const,
            content: sanitizeInput(msg.content)
          })),
          {
            role: "user" as const,
            content: sanitizeInput(smartContext.enhancedUserMessage)
          }
        ];

        console.log('Sending to Claude with enhanced context and question management...');
        const response = await sendMessage(chatMessages);
        
        // Process response for interactive elements
        const processedResponse = InteractiveResponseService.processResponse(response);
        
        if (processedResponse.interactiveButtons) {
          addAIMessage(processedResponse.mainContent, processedResponse.interactiveButtons);
          if (processedResponse.questionContent) {
            // Add the question as a separate message to make it clear
            setTimeout(() => {
              addAIMessage(processedResponse.questionContent!);
            }, 100);
          }
        } else {
          addAIMessage(processedResponse.mainContent);
        }
        
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
