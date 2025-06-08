
import { useState, useCallback } from 'react';
import { EnhancedAIService } from '../services/enhancedAIService';
import { EmailContent } from '../types/emailAnalysis';

interface UseClaudeOptions {
  systemPrompt?: string;
}

export const useClaude = (options: UseClaudeOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [claudeService, setClaudeService] = useState<EnhancedAIService | null>(null);

  const initializeService = useCallback((key: string) => {
    setApiKey(key);
    setClaudeService(new EnhancedAIService(key));
  }, []);

  const sendMessage = useCallback(async (
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
  ) => {
    if (!claudeService) {
      throw new Error('Claude service not initialized. Please provide API key.');
    }

    setIsLoading(true);
    try {
      const response = await claudeService.sendMessage(messages, options.systemPrompt);
      return typeof response === 'string' ? response : response.content;
    } finally {
      setIsLoading(false);
    }
  }, [claudeService, options.systemPrompt]);

  const analyzeEmail = useCallback(async (emailContent: EmailContent) => {
    if (!claudeService) {
      throw new Error('Claude service not initialized. Please provide API key.');
    }

    setIsLoading(true);
    try {
      return await claudeService.analyzeEmail(emailContent);
    } finally {
      setIsLoading(false);
    }
  }, [claudeService]);

  const generateEmailResponse = useCallback(async (
    originalEmail: {
      subject: string;
      body: string;
      from: string;
    },
    context: {
      loadId?: string;
      customerHistory?: any[];
      urgentIssues?: string[];
    }
  ) => {
    if (!claudeService) {
      throw new Error('Claude service not initialized. Please provide API key.');
    }

    setIsLoading(true);
    try {
      return await claudeService.generateEmailResponse(originalEmail, context);
    } finally {
      setIsLoading(false);
    }
  }, [claudeService]);

  return {
    isLoading,
    apiKey,
    isInitialized: !!claudeService,
    initializeService,
    sendMessage,
    analyzeEmail,
    generateEmailResponse
  };
};
