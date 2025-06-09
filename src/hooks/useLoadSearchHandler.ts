
import { useLoadResultsManager } from "./useLoadResultsManager";

interface UseLoadSearchHandlerProps {
  addAIMessage: (content: string) => void;
  onLoadSelect?: (loadId: string) => void;
}

export const useLoadSearchHandler = (props: UseLoadSearchHandlerProps) => {
  // Re-export the load results manager with the same interface for backward compatibility
  return useLoadResultsManager(props);
};
