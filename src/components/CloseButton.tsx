
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CloseButtonProps {
  onClose?: () => void;
  returnPath?: string;
}

const CloseButton = ({ onClose, returnPath = "/loads" }: CloseButtonProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(returnPath);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClose}
      className="w-8 h-8 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      title="Close"
    >
      <X className="w-4 h-4" />
    </Button>
  );
};

export default CloseButton;
