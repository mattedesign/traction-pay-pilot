
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateAPIKey, storeAPIKey, getAPIKey, clearAPIKey } from "@/utils/security";

interface UseAPIKeyHandlerProps {
  initializeService: (key: string) => void;
}

export const useAPIKeyHandler = ({ initializeService }: UseAPIKeyHandlerProps) => {
  const { toast } = useToast();

  const handleAPIKeySubmit = async (key: string) => {
    console.log('Setting up unified chat system...');
    
    try {
      if (!validateAPIKey(key)) {
        toast({
          title: "Invalid API Key",
          description: "Please enter a valid Anthropic API key starting with 'sk-ant-'",
          variant: "destructive"
        });
        return;
      }

      storeAPIKey(key);
      initializeService(key);
      
      toast({
        title: "Unified Chat System Ready",
        description: "Your intelligent chat assistant is now ready with load search and context-aware responses.",
      });
      
    } catch (error) {
      console.error('API key setup error:', error);
      clearAPIKey();
      toast({
        title: "Setup Error",
        description: "There was an issue setting up the chat system. Please try again with a valid API key.",
        variant: "destructive"
      });
    }
  };

  // Auto-load stored API key on hook initialization
  useEffect(() => {
    const storedKey = getAPIKey();
    if (storedKey) {
      initializeService(storedKey);
    }
  }, [initializeService]);

  return {
    handleAPIKeySubmit
  };
};
