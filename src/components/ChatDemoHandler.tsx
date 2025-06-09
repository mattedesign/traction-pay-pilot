
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
    if (currentAction && isFocused) {
      setIsInDemoMode(true);
      
      switch (currentAction) {
        case "Track a Load":
          setMessage("Show me load status for #1234");
          setDemoStep("track-load");
          break;
        case "Check Payment Status":
          setMessage("Check Payment Status for Load #9012");
          setDemoStep("check-payment");
          break;
        case "Plan Optimal Route":
          setMessage("Plan optimal route");
          setDemoStep("plan-route-initial");
          break;
        case "QuickPay Available":
          setMessage("Show QuickPay available loads");
          setDemoStep("quickpay");
          break;
        default:
          setIsInDemoMode(false);
          setDemoStep(null);
      }
    }
  }, [currentAction, isFocused, setIsInDemoMode, setDemoStep, setMessage]);

  return null;
};

export default ChatDemoHandler;
