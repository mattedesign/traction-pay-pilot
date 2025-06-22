
import { useState, useCallback } from 'react';
import { AIService } from '../services/aiService';
import { SupabaseAIService } from '../services/supabaseAIService';

interface UseAIOptions {
  systemPrompt?: string;
  preferSupabase?: boolean;
}

export const useAI = (options: UseAIOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [clientService, setClientService] = useState<AIService | null>(null);
  const [supabaseService] = useState<SupabaseAIService>(() => new SupabaseAIService());
  const [useSupabase, setUseSupabase] = useState(options.preferSupabase ?? true);

  const initializeClientService = useCallback((key: string) => {
    setApiKey(key);
    setClientService(new AIService(key));
    console.log('Client-side AI service initialized');
  }, []);

  const sendMessage = useCallback(async (
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
  ) => {
    setIsLoading(true);
    
    try {
      // Try Supabase first if preferred
      if (useSupabase) {
        console.log('Attempting Supabase Edge Function...');
        const response = await supabaseService.sendMessage(messages, options.systemPrompt);
        
        if (!response.error) {
          console.log('Supabase Edge Function successful');
          return response.content;
        }
        
        console.log('Supabase failed, falling back to client service:', response.error);
        
        // If client service is not available, throw the Supabase error
        if (!clientService) {
          throw new Error(response.error || 'No AI service available');
        }
      }
      
      // Fallback to client service or use it directly
      if (clientService) {
        console.log('Using client-side AI service...');
        const response = await clientService.sendMessage(messages, options.systemPrompt);
        
        if (response.error) {
          throw new Error(response.error);
        }
        
        return response.content;
      }
      
      throw new Error('No AI service available');
      
    } finally {
      setIsLoading(false);
    }
  }, [clientService, supabaseService, options.systemPrompt, useSupabase]);

  const toggleService = useCallback(() => {
    setUseSupabase(!useSupabase);
    console.log('Switched to', !useSupabase ? 'Supabase' : 'client-side', 'service');
  }, [useSupabase]);

  return {
    isLoading,
    apiKey,
    isClientInitialized: !!clientService,
    isSupabaseAvailable: true, // Always available since Supabase is configured
    useSupabase,
    initializeClientService,
    toggleService,
    sendMessage
  };
};
