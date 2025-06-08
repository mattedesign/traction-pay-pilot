
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseAPIKeyHandlerProps {
  initializeService: (key?: string) => void;
}

export const useAPIKeyHandler = ({ initializeService }: UseAPIKeyHandlerProps) => {
  const { toast } = useToast();

  const handleAPIKeySubmit = useCallback(async (key: string) => {
    console.log('API key handling now managed by Supabase Edge Functions...');
    
    try {
      // Since API keys are now handled in Supabase Edge Functions,
      // we just need to initialize the service
      initializeService();
      
      toast({
        title: "Unified Chat System Ready",
        description: "Your intelligent chat assistant is now ready. API keys are securely managed via Supabase.",
      });
      
    } catch (error) {
      console.error('Service initialization error:', error);
      toast({
        title: "Setup Error",
        description: "There was an issue setting up the chat system. Please ensure Supabase is properly configured.",
        variant: "destructive"
      });
    }
  }, [initializeService, toast]);

  return {
    handleAPIKeySubmit
  };
};
