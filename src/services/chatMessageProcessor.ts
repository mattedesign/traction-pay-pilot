
import { sanitizeInput } from "@/utils/security";
import { ChatMessage, InteractiveButton } from "@/hooks/useChatMessages";
import { EnhancedQueryRouter } from "./enhancedQueryRouter";
import { ButtonResponseProcessor } from "./processors/buttonResponseProcessor";
import { SearchResultsProcessor } from "./processors/searchResultsProcessor";
import { AIResponseProcessor } from "./processors/aiResponseProcessor";
import { useToast } from "@/hooks/use-toast";

interface ProcessMessageParams {
  sanitizedMessage: string;
  currentLoadId?: string;
  chatHistory: ChatMessage[];
  userMessage: ChatMessage;
  sendMessage: (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => Promise<string>;
  systemPrompt: string;
  addAIMessage: (content: string, interactiveButtons?: InteractiveButton[]) => ChatMessage;
  toast: ReturnType<typeof useToast>['toast'];
}

export class ChatMessageProcessor {
  static async processMessage({
    sanitizedMessage,
    currentLoadId,
    chatHistory,
    userMessage,
    sendMessage,
    systemPrompt,
    addAIMessage,
    toast
  }: ProcessMessageParams) {
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
      return await ButtonResponseProcessor.handle({
        routingResult,
        systemPrompt,
        chatHistory,
        userMessage,
        sendMessage,
        addAIMessage
      });
    }

    // Step 3: Handle pure search results without AI
    if (!routingResult.requiresAI && routingResult.loadResults && routingResult.loadResults.length > 0) {
      return SearchResultsProcessor.handle(routingResult, addAIMessage);
    }

    // Step 4: Handle AI-required responses
    if (routingResult.requiresAI) {
      return await AIResponseProcessor.handle({
        sanitizedMessage,
        routingResult,
        currentLoadId,
        systemPrompt,
        chatHistory,
        userMessage,
        sendMessage,
        addAIMessage,
        toast
      });
    }

    return routingResult;
  }
}
