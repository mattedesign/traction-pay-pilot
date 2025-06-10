
import { useEffect } from "react";

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
  
  useEffect(() => {
    console.log('ChatDemoHandler: Effect triggered with:', {
      currentAction,
      isFocused,
      shouldTrigger: !!(currentAction && isFocused)
    });
    
    if (currentAction && isFocused) {
      console.log('ChatDemoHandler: Setting demo mode for action:', currentAction);
      setIsInDemoMode(true);
      
      switch (currentAction) {
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
    } else {
      console.log('ChatDemoHandler: Conditions not met, not triggering demo');
    }
  }, [currentAction, isFocused, setIsInDemoMode, setDemoStep, setMessage]);

  return null;
};

export default ChatDemoHandler;
