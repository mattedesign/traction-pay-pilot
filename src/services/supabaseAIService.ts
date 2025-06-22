
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
      console.log('Attempting Supabase Edge Function call...');
      
      const { data, error } = await supabase.functions.invoke('claude-chat', {
        body: {
          messages,
          systemPrompt
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        
        // Provide specific error messages for different scenarios
        if (error.message?.includes('Function not found')) {
          return {
            content: "❌ **Supabase Configuration Issue**\n\nThe Claude AI function is not deployed or configured properly. Please use client-side connection with your API key.",
            error: 'Function not found - please use client-side connection'
          };
        }
        
        return {
          content: `❌ **Supabase Connection Failed**\n\n${error.message || 'Unknown error occurred'}\n\nPlease try the client-side connection with your API key.`,
          error: error.message || 'Supabase connection failed'
        };
      }

      if (data?.error) {
        console.error('Edge function returned error:', data.error);
        
        if (data.error.includes('Invalid API key')) {
          return {
            content: "❌ **API Key Configuration Error**\n\nThe Anthropic API key is not configured in Supabase secrets. Please use client-side connection with your API key.",
            error: 'API key not configured in Supabase'
          };
        } else if (data.error.includes('credit balance') || data.error.includes('credits')) {
          return {
            content: "❌ **Insufficient Credits**\n\nThe Anthropic API account has insufficient credits. Please add credits or use your own API key.",
            error: 'Insufficient credits'
          };
        } else if (data.error.includes('Rate limit')) {
          return {
            content: "❌ **Rate Limit Exceeded**\n\nThe Anthropic API rate limit has been exceeded. Please wait a moment or use your own API key.",
            error: 'Rate limit exceeded'
          };
        }
        
        return {
          content: `❌ **AI Service Error**\n\n${data.error}\n\nPlease try using your own API key for direct connection.`,
          error: data.error
        };
      }

      if (!data?.content) {
        return {
          content: "❌ **Invalid Response**\n\nReceived an invalid response from the AI service. Please try again or use client-side connection.",
          error: 'Invalid response format'
        };
      }

      console.log('Supabase Edge Function successful');
      return {
        content: data.content
      };
      
    } catch (error) {
      console.error('Supabase AI Service Error:', error);
      
      if (error instanceof Error) {
        // Network or connection errors
        if (error.message.includes('fetch') || error.message.includes('network')) {
          return {
            content: "❌ **Connection Error**\n\nUnable to connect to Supabase Edge Functions. Please check your internet connection or try the client-side connection.",
            error: 'Network connection failed'
          };
        }
        
        // Timeout errors
        if (error.message.includes('timeout')) {
          return {
            content: "❌ **Request Timeout**\n\nThe request took too long to complete. Please try again or use client-side connection for faster response.",
            error: 'Request timeout'
          };
        }
        
        return {
          content: `❌ **Unexpected Error**\n\n${error.message}\n\nPlease try the client-side connection with your API key.`,
          error: error.message
        };
      }
      
      return {
        content: "❌ **Unknown Error**\n\nAn unexpected error occurred. Please try the client-side connection with your API key.",
        error: 'Unknown error occurred'
      };
    }
  }
}
