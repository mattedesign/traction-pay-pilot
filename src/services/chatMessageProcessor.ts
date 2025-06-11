
import { sanitizeInput } from "@/utils/security";
import { ChatMessage, InteractiveButton } from "@/hooks/useChatMessages";
import { EnhancedQueryRouter } from "./enhancedQueryRouter";
import { SmartContextBuilder } from "./smartContextBuilder";
import { InteractiveResponseService } from "./interactiveResponseService";
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
      return await this.handleButtonResponse({
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
      return this.handlePureSearchResults(routingResult, addAIMessage);
    }

    // Step 4: Handle AI-required responses
    if (routingResult.requiresAI) {
      return await this.handleAIResponse({
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

  private static async handleButtonResponse({
    routingResult,
    systemPrompt,
    chatHistory,
    userMessage,
    sendMessage,
    addAIMessage
  }: {
    routingResult: any;
    systemPrompt: string;
    chatHistory: ChatMessage[];
    userMessage: ChatMessage;
    sendMessage: (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => Promise<string>;
    addAIMessage: (content: string, interactiveButtons?: InteractiveButton[]) => ChatMessage;
  }) {
    console.log('Handling button response without generating new questions...');
    
    const enhancedSystemMessage = `${systemPrompt}
    
**BUTTON RESPONSE CONTEXT**
The user just provided a button response (${userMessage.content}). This is a direct answer to a previous question.
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

  private static handlePureSearchResults(routingResult: any, addAIMessage: (content: string) => ChatMessage) {
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

    return routingResult;
  }

  private static async handleAIResponse({
    sanitizedMessage,
    routingResult,
    currentLoadId,
    systemPrompt,
    chatHistory,
    userMessage,
    sendMessage,
    addAIMessage,
    toast
  }: {
    sanitizedMessage: string;
    routingResult: any;
    currentLoadId?: string;
    systemPrompt: string;
    chatHistory: ChatMessage[];
    userMessage: ChatMessage;
    sendMessage: (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => Promise<string>;
    addAIMessage: (content: string, interactiveButtons?: InteractiveButton[]) => ChatMessage;
    toast: ReturnType<typeof useToast>['toast'];
  }) {
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

    return routingResult;
  }
}
