
import { useState, useCallback } from 'react';
import { AIService } from '../services/aiService';

interface UseAIOptions {
  systemPrompt?: string;
}

export const useAI = (options: UseAIOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [aiService, setAiService] = useState<AIService | null>(null);

  const initializeService = useCallback((key: string) => {
    setApiKey(key);
    setAiService(new AIService(key));
  }, []);

  const sendMessage = useCallback(async (
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
  ) => {
    if (!aiService) {
      throw new Error('AI service not initialized. Please provide API key.');
    }

    setIsLoading(true);
    try {
      const response = await aiService.sendMessage(messages, options.systemPrompt);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, [aiService, options.systemPrompt]);

  return {
    isLoading,
    apiKey,
    isInitialized: !!aiService,
    initializeService,
    sendMessage
  };
};
