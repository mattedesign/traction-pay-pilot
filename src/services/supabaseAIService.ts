
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
      console.log('Sending request to Claude via Supabase Edge Function...');
      
      const { data, error } = await supabase.functions.invoke('claude-chat', {
        body: {
          messages,
          systemPrompt
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to call AI service');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      return {
        content: data.content
      };
    } catch (error) {
      console.error('Supabase AI Service Error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid API key')) {
          return {
            content: "❌ **API Key Error**\n\nThe Anthropic API key is invalid or not configured. Please check the Supabase secrets configuration.",
            error: 'Invalid API key'
          };
        } else if (error.message.includes('Rate limit')) {
          return {
            content: "❌ **Rate Limit Exceeded**\n\nThe Anthropic API rate limit has been exceeded. Please wait a moment before trying again.",
            error: 'Rate limit exceeded'
          };
        }
      }
      
      return {
        content: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
