
import { sanitizeInput } from "@/utils/security";
import { ChatMessage, InteractiveButton } from "@/hooks/useChatMessages";
import { EnhancedQueryRouter } from "./enhancedQueryRouter";
import { ButtonResponseProcessor } from "./processors/buttonResponseProcessor";
import { SearchResultsProcessor } from "./processors/searchResultsProcessor";
import { AIResponseProcessor } from "./processors/aiResponseProcessor";
import { RouteOptimizationProcessor } from "./processors/routeOptimizationProcessor";
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
  onNavigate?: (path: string) => void;
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
    toast,
    onNavigate
  }: ProcessMessageParams) {
    console.log('Processing with enhanced chat system...');
    
    // Step 1: Check for route optimization requests first
    const routeOptimizationHandled = RouteOptimizationProcessor.handle({
      userMessage: sanitizedMessage,
      addAIMessage,
      onNavigate
    });
    
    if (routeOptimizationHandled) {
      return { queryType: 'route_optimization', confidence: 95, requiresAI: false };
    }
    
    // Step 2: Analyze query and route appropriately
    const routingResult = EnhancedQueryRouter.analyzeQuery(sanitizedMessage, currentLoadId);
    
    console.log('Query routing result:', {
      queryType: routingResult.queryType,
      confidence: routingResult.confidence,
      loadResultsCount: routingResult.loadResults?.length || 0,
      requiresAI: routingResult.requiresAI
    });

    // Step 3: Handle button responses without asking new questions
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

    // Step 4: Handle pure search results without AI
    if (!routingResult.requiresAI && routingResult.loadResults && routingResult.loadResults.length > 0) {
      return SearchResultsProcessor.handle(routingResult, addAIMessage);
    }

    // Step 5: Handle AI-required responses
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
