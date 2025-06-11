
import { sanitizeInput } from "@/utils/security";
import { ChatMessage, InteractiveButton } from "@/hooks/useChatMessages";
import { SmartContextBuilder } from "../smartContextBuilder";
import { InteractiveResponseService } from "../interactiveResponseService";
import { useToast } from "@/hooks/use-toast";

interface AIResponseProcessorParams {
  sanitizedMessage: string;
  routingResult: any;
  currentLoadId?: string;
  systemPrompt: string;
  chatHistory: ChatMessage[];
  userMessage: ChatMessage;
  sendMessage: (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => Promise<string>;
  addAIMessage: (content: string, interactiveButtons?: InteractiveButton[]) => ChatMessage;
  toast: ReturnType<typeof useToast>['toast'];
}

export class AIResponseProcessor {
  static async handle({
    sanitizedMessage,
    routingResult,
    currentLoadId,
    systemPrompt,
    chatHistory,
    userMessage,
    sendMessage,
    addAIMessage,
    toast
  }: AIResponseProcessorParams) {
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
