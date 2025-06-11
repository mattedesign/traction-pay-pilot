
import { clearAPIKey } from "@/utils/security";
import { ChatMessage } from "@/hooks/useChatMessages";
import { useToast } from "@/hooks/use-toast";

export class ChatErrorHandler {
  static handleError(
    error: unknown,
    addAIMessage: (content: string) => ChatMessage,
    toast: ReturnType<typeof useToast>['toast']
  ) {
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
  }
}
