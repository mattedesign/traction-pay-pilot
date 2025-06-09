
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseLoadResultsManagerProps {
  addAIMessage: (content: string) => void;
  onLoadSelect?: (loadId: string) => void;
}

export const useLoadResultsManager = ({
  addAIMessage,
  onLoadSelect
}: UseLoadResultsManagerProps) => {
  const [loadResults, setLoadResults] = useState<any[]>([]);
  const [showingResults, setShowingResults] = useState(false);
  const { toast } = useToast();

  const handleLoadResults = (routingResult: any) => {
    if (routingResult.loadResults && routingResult.loadResults.length > 0) {
      setLoadResults(routingResult.loadResults);
      
      // Show results for search queries or multiple loads
      if (routingResult.queryType === 'load_search') {
        setShowingResults(true);
        
        if (routingResult.loadResults.length > 1) {
          // Multiple loads - show the search results interface
          console.log('Displaying multiple load search results');
          
          toast({
            title: "Load Search Complete",
            description: `Found ${routingResult.loadResults.length} matching loads`,
          });
        } else {
          // Single load from search - show it but also display the result card
          console.log('Displaying single load search result');
          setShowingResults(true);
          
          toast({
            title: "Load Found",
            description: `Found matching load #${routingResult.loadResults[0].load.id}`,
          });
        }

        return true; // Indicates that results were shown
      } else if (routingResult.queryType === 'specific_load' && !routingResult.requiresAI) {
        // Specific load found without AI analysis needed
        setShowingResults(true);
        
        toast({
          title: "Load Information",
          description: `Showing details for Load #${routingResult.loadResults[0].load.id}`,
        });
        
        return true;
      }
    }
    return false;
  };

  const handleLoadSelect = (loadId: string) => {
    setShowingResults(false);
    if (onLoadSelect) {
      onLoadSelect(loadId);
    }
    
    // Provide feedback to user
    toast({
      title: "Load Selected",
      description: `Navigating to Load #${loadId} details`,
    });
  };

  const resetResults = () => {
    setShowingResults(false);
    setLoadResults([]);
  };

  return {
    loadResults,
    showingResults,
    handleLoadResults,
    handleLoadSelect,
    resetResults
  };
};
