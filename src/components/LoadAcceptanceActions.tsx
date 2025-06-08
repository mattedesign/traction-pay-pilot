
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface LoadAcceptanceActionsProps {
  onAccept: () => void;
  onReject: () => void;
  isAccepting: boolean;
  isRejecting: boolean;
}

const LoadAcceptanceActions = ({ onAccept, onReject, isAccepting, isRejecting }: LoadAcceptanceActionsProps) => {
  return (
    <div className="flex space-x-3">
      <Button
        onClick={onAccept}
        disabled={isAccepting || isRejecting}
        className="flex-1"
      >
        <Check className="w-4 h-4 mr-2" />
        {isAccepting ? "Accepting..." : "Accept Load"}
      </Button>
      <Button
        variant="outline"
        onClick={onReject}
        disabled={isAccepting || isRejecting}
        className="flex-1"
      >
        <X className="w-4 h-4 mr-2" />
        {isRejecting ? "Rejecting..." : "Reject Load"}
      </Button>
    </div>
  );
};

export default LoadAcceptanceActions;
