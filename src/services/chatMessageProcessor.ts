
import { sanitizeInput } from "@/utils/security";
import { ChatMessage, InteractiveButton } from "@/hooks/useChatMessages";
import { EnhancedQueryRouter } from "./enhancedQueryRouter";
import { ButtonResponseProcessor } from "./processors/buttonResponseProcessor";
import { SearchResultsProcessor } from "./processors/searchResultsProcessor";
import { AIResponseProcessor } from "./processors/aiResponseProcessor";
import { RouteOptimizationProcessor } from "./processors/routeOptimizationProcessor";
import { DocumentProcessingProcessor } from "./processors/documentProcessingProcessor";
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
    console.log('ChatMessageProcessor: Processing message:', sanitizedMessage);
    
    // Step 1: Check for document processing requests first (highest priority)
    const documentProcessingHandled = DocumentProcessingProcessor.handle({
      userMessage: sanitizedMessage,
      addAIMessage,
      onNavigate
    });
    
    if (documentProcessingHandled) {
      console.log('ChatMessageProcessor: Document processing request handled successfully');
      return { queryType: 'document_processing', confidence: 95, requiresAI: false };
    }
    
    // Step 2: Check for route optimization requests (second priority)
    const routeOptimizationHandled = RouteOptimizationProcessor.handle({
      userMessage: sanitizedMessage,
      addAIMessage,
      onNavigate
    });
    
    if (routeOptimizationHandled) {
      console.log('ChatMessageProcessor: Route optimization request handled successfully');
      return { queryType: 'route_optimization', confidence: 95, requiresAI: false };
    }
    
    // Step 3: Analyze query and route appropriately
    console.log('ChatMessageProcessor: Analyzing query with enhanced router');
    const routingResult = EnhancedQueryRouter.analyzeQuery(sanitizedMessage, currentLoadId);
    
    console.log('ChatMessageProcessor: Query routing result:', {
      queryType: routingResult.queryType,
      confidence: routingResult.confidence,
      loadResultsCount: routingResult.loadResults?.length || 0,
      requiresAI: routingResult.requiresAI
    });

    // Step 4: Handle button responses without asking new questions
    if (routingResult.queryType === 'button_response') {
      console.log('ChatMessageProcessor: Handling button response');
      return await ButtonResponseProcessor.handle({
        routingResult,
        systemPrompt,
        chatHistory,
        userMessage,
        sendMessage,
        addAIMessage
      });
    }

    // Step 5: Handle pure search results without AI
    if (!routingResult.requiresAI && routingResult.loadResults && routingResult.loadResults.length > 0) {
      console.log('ChatMessageProcessor: Handling search results without AI');
      return SearchResultsProcessor.handle(routingResult, addAIMessage);
    }

    // Step 6: Handle AI-required responses
    if (routingResult.requiresAI) {
      console.log('ChatMessageProcessor: Handling AI-required response');
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

    console.log('ChatMessageProcessor: Returning routing result:', routingResult);
    return routingResult;
  }
}
