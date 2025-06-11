
import { sanitizeInput } from "@/utils/security";
import { ChatMessage, InteractiveButton } from "@/hooks/useChatMessages";
import { InteractiveResponseService } from "../interactiveResponseService";

interface ButtonResponseProcessorParams {
  routingResult: any;
  systemPrompt: string;
  chatHistory: ChatMessage[];
  userMessage: ChatMessage;
  sendMessage: (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => Promise<string>;
  addAIMessage: (content: string, interactiveButtons?: InteractiveButton[]) => ChatMessage;
}

export class ButtonResponseProcessor {
  static async handle({
    routingResult,
    systemPrompt,
    chatHistory,
    userMessage,
    sendMessage,
    addAIMessage
  }: ButtonResponseProcessorParams) {
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
}
