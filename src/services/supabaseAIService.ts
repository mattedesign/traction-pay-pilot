
import { supabase } from "@/integrations/supabase/client";

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  content: string;
  error?: string;
}

export class SupabaseAIService {
  async sendMessage(
    messages: AIMessage[],
    systemPrompt: string = "You are a helpful AI assistant specialized in trucking operations, logistics, and transportation industry knowledge. Provide practical, accurate, and industry-specific advice."
  ): Promise<AIResponse> {
    try {
      console.log('=== Supabase AI Service Debug ===');
      console.log('Attempting Supabase Edge Function call...');
      console.log('Function: claude-chat');
      console.log('Messages count:', messages.length);
      console.log('System prompt length:', systemPrompt.length);
      
      const { data, error } = await supabase.functions.invoke('claude-chat', {
        body: {
          messages,
          systemPrompt
        }
      });

      console.log('Supabase function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        
        // Provide specific error messages for different scenarios
        if (error.message?.includes('Function not found')) {
          return {
            content: "❌ **Supabase Configuration Issue**\n\nThe Claude AI function is not deployed or configured properly. Please check the edge function deployment.",
            error: 'Function not found - claude-chat edge function may not be deployed'
          };
        }
        
        return {
          content: `❌ **Supabase Connection Failed**\n\n${error.message || 'Unknown error occurred'}\n\nPlease check the console for more details.`,
          error: error.message || 'Supabase connection failed'
        };
      }

      if (data?.error) {
        console.error('Edge function returned error:', data.error);
        
        if (data.error.includes('Invalid API key') || data.error.includes('Unauthorized')) {
          return {
            content: "❌ **API Key Configuration Error**\n\nThe Anthropic API key is not configured properly in Supabase secrets. Please check that ANTHROPIC_API_KEY is set in the edge function secrets.",
            error: 'API key not configured in Supabase'
          };
        } else if (data.error.includes('credit balance') || data.error.includes('credits')) {
          return {
            content: "❌ **Insufficient Credits**\n\nThe Anthropic API account has insufficient credits. Please add credits to your Anthropic account.",
            error: 'Insufficient credits'
          };
        } else if (data.error.includes('Rate limit')) {
          return {
            content: "❌ **Rate Limit Exceeded**\n\nThe Anthropic API rate limit has been exceeded. Please wait a moment before trying again.",
            error: 'Rate limit exceeded'
          };
        }
        
        return {
          content: `❌ **AI Service Error**\n\n${data.error}\n\nCheck the console logs for more details.`,
          error: data.error
        };
      }

      if (!data?.content) {
        console.error('Invalid response format:', data);
        return {
          content: "❌ **Invalid Response**\n\nReceived an invalid response from the AI service. Check console logs for details.",
          error: 'Invalid response format'
        };
      }

      console.log('Supabase Edge Function successful - response length:', data.content.length);
      return {
        content: data.content
      };
      
    } catch (error) {
      console.error('Supabase AI Service Error:', error);
      
      if (error instanceof Error) {
        // Network or connection errors
        if (error.message.includes('fetch') || error.message.includes('network')) {
          return {
            content: "❌ **Connection Error**\n\nUnable to connect to Supabase Edge Functions. Please check your internet connection and try again.",
            error: 'Network connection failed'
          };
        }
        
        // Timeout errors
        if (error.message.includes('timeout')) {
          return {
            content: "❌ **Request Timeout**\n\nThe request took too long to complete. The AI service may be experiencing high load. Please try again.",
            error: 'Request timeout'
          };
        }
        
        return {
          content: `❌ **Unexpected Error**\n\n${error.message}\n\nCheck the browser console for more details.`,
          error: error.message
        };
      }
      
      return {
        content: "❌ **Unknown Error**\n\nAn unexpected error occurred. Please check the browser console for details and try again.",
        error: 'Unknown error occurred'
      };
    }
  }
}
