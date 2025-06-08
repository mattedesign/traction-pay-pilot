
import { useState, useEffect, useCallback } from "react";
import { SupabaseAIService } from "@/services/supabaseAIService";

interface UseClaude {
  systemPrompt: string;
}

export const useClaude = ({ systemPrompt }: UseClaude) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(true); // Always initialized since we use Supabase
  const [aiService] = useState<SupabaseAIService>(() => new SupabaseAIService());

  // Memoize the initialization function to prevent infinite loops
  const initializeService = useCallback((apiKey?: string) => {
    // No longer needed since we use Supabase Edge Functions
    // API key is handled securely in the edge function
    setIsInitialized(true);
    console.log('Claude AI service ready via Supabase Edge Functions');
  }, []);

  const sendMessage = async (
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Promise<string> => {
    if (!isInitialized) {
      throw new Error('AI service not initialized');
    }

    setIsLoading(true);
    try {
      const response = await aiService.sendMessage(messages, systemPrompt);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      return response.content;
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-initialize on mount
  useEffect(() => {
    initializeService();
  }, [initializeService]);

  return {
    isLoading,
    isInitialized,
    initializeService,
    sendMessage
  };
};
