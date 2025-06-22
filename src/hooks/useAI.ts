
import { useState, useCallback } from 'react';
import { SupabaseAIService } from '../services/supabaseAIService';

interface UseAIOptions {
  systemPrompt?: string;
  preferSupabase?: boolean;
}

export const useAI = (options: UseAIOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [supabaseService] = useState<SupabaseAIService>(() => new SupabaseAIService());

  const sendMessage = useCallback(async (
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
  ) => {
    setIsLoading(true);
    
    try {
      console.log('=== AI Service Debug Info ===');
      console.log('Using Supabase Edge Function for AI...');
      console.log('Messages being sent:', messages);
      console.log('System prompt:', options.systemPrompt);
      
      const response = await supabaseService.sendMessage(messages, options.systemPrompt);
      
      console.log('Response received:', response);
      
      if (response.error) {
        console.error('AI service returned error:', response.error);
        throw new Error(response.error);
      }
      
      console.log('Supabase Edge Function successful');
      return response.content;
      
    } catch (error) {
      console.error('AI Service Error Details:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [supabaseService, options.systemPrompt]);

  return {
    isLoading,
    isSupabaseAvailable: true,
    sendMessage
  };
};
