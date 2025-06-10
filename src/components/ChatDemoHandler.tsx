
import { useEffect, useRef, useState } from "react";

interface ChatDemoHandlerProps {
  currentAction?: string;
  isFocused?: boolean;
  setIsInDemoMode: (value: boolean) => void;
  setDemoStep: (value: string | null) => void;
  setMessage: (value: string) => void;
}

const ChatDemoHandler = ({
  currentAction,
  isFocused,
  setIsInDemoMode,
  setDemoStep,
  setMessage
}: ChatDemoHandlerProps) => {
  // State to persist the current action even during race conditions
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  // Update pending action when currentAction changes
  useEffect(() => {
    if (currentAction) {
      console.log('ChatDemoHandler: New action received, setting pending:', currentAction);
      setPendingAction(currentAction);
    }
  }, [currentAction]);
  
  // Handle demo setup with improved race condition handling
  useEffect(() => {
    console.log('ChatDemoHandler: Effect triggered with:', {
      currentAction,
      isFocused,
      pendingAction,
      shouldTrigger: !!(pendingAction && isFocused)
    });
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // If we have a pending action and are focused, set up demo
    if (pendingAction && isFocused) {
      console.log('ChatDemoHandler: Setting up demo for action:', pendingAction);
      
      // Add small delay to ensure all state is stable
      timeoutRef.current = setTimeout(() => {
        setIsInDemoMode(true);
        
        switch (pendingAction) {
          case "Track a Load":
            console.log('ChatDemoHandler: Setting up Track a Load demo');
            setMessage("Show me load status for #1234");
            setDemoStep("track-load");
            break;
          case "Check Payment Status":
            console.log('ChatDemoHandler: Setting up Check Payment Status demo');
            setMessage("Check Payment Status for Load #9012");
            setDemoStep("check-payment");
            break;
          case "Plan Optimal Route":
            console.log('ChatDemoHandler: Setting up Plan Optimal Route demo');
            setMessage("Plan optimal route");
            setDemoStep("plan-route-initial");
            break;
          case "QuickPay Available":
            console.log('ChatDemoHandler: Setting up QuickPay demo');
            setMessage("Show QuickPay available loads");
            setDemoStep("quickpay");
            break;
          default:
            console.log('ChatDemoHandler: Unknown action, disabling demo mode');
            setIsInDemoMode(false);
            setDemoStep(null);
        }
        
        // Clear pending action after processing
        setPendingAction(null);
      }, 50);
    } else if (!isFocused) {
      // If chat loses focus, clear pending action
      console.log('ChatDemoHandler: Chat unfocused, clearing pending action');
      setPendingAction(null);
    } else if (!pendingAction && !currentAction) {
      console.log('ChatDemoHandler: No action available, ensuring demo mode is disabled');
      setIsInDemoMode(false);
      setDemoStep(null);
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pendingAction, isFocused, setIsInDemoMode, setDemoStep, setMessage]);

  return null;
};

export default ChatDemoHandler;
