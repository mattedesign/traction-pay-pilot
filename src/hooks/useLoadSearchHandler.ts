
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseLoadSearchHandlerProps {
  addAIMessage: (content: string) => void;
  onLoadSelect?: (loadId: string) => void;
}

export const useLoadSearchHandler = ({
  addAIMessage,
  onLoadSelect
}: UseLoadSearchHandlerProps) => {
  const [loadResults, setLoadResults] = useState<any[]>([]);
  const [showingResults, setShowingResults] = useState(false);
  const { toast } = useToast();

  const handleLoadResults = (routingResult: any) => {
    if (routingResult.loadResults && routingResult.loadResults.length > 0) {
      setLoadResults(routingResult.loadResults);
      
      // Show results for multi-load scenarios or if user wants to see options
      if (routingResult.queryType === 'load_search' && routingResult.loadResults.length > 1) {
        setShowingResults(true);
        
        const resultSummary = `Found ${routingResult.loadResults.length} matching loads:\n\n` +
          routingResult.loadResults.map((result: any) => 
            `• Load #${result.load.id} - ${result.load.broker} - ${result.load.status} (${result.matchReason})`
          ).join('\n') +
          '\n\nClick on any load above to get specific details, or ask me about any of these loads.';
        
        addAIMessage(resultSummary);
        
        toast({
          title: "Load Search Complete",
          description: `Found ${routingResult.loadResults.length} matching loads`,
        });

        return true; // Indicates that results were shown
      }
    }
    return false;
  };

  const handleLoadSelect = (loadId: string) => {
    setShowingResults(false);
    if (onLoadSelect) {
      onLoadSelect(loadId);
    }
  };

  const resetResults = () => {
    setShowingResults(false);
  };

  return {
    loadResults,
    showingResults,
    handleLoadResults,
    handleLoadSelect,
    resetResults
  };
};
