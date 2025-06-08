
import { useState } from "react";
import { AIService } from "@/services/aiService";
import { getAPIKey, clearAPIKey } from "@/utils/security";

interface UseClaude {
  systemPrompt: string;
}

export const useClaude = ({ systemPrompt }: UseClaude) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [aiService, setAIService] = useState<AIService | null>(null);

  const initializeService = (apiKey: string) => {
    try {
      const service = new AIService(apiKey);
      setAIService(service);
      setIsInitialized(true);
      console.log('Claude AI service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Claude service:', error);
      clearAPIKey();
      setIsInitialized(false);
    }
  };

  const sendMessage = async (
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    enhancedSystemPrompt?: string
  ): Promise<string> => {
    if (!aiService || !isInitialized) {
      throw new Error('AI service not initialized');
    }

    setIsLoading(true);
    try {
      const promptToUse = enhancedSystemPrompt || systemPrompt;
      const response = await aiService.sendMessage(messages, promptToUse);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      return response.content;
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-initialize if API key exists
  useState(() => {
    const storedKey = getAPIKey();
    if (storedKey) {
      initializeService(storedKey);
    }
  });

  return {
    isLoading,
    isInitialized,
    initializeService,
    sendMessage
  };
};
