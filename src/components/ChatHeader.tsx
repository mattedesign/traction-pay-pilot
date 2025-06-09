
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ChatHeaderProps {
  isFocused: boolean;
  title: string;
  onClose: () => void;
}

const ChatHeader = ({ isFocused, title, onClose }: ChatHeaderProps) => {
  if (!isFocused) return null;

  return (
    <div className="bg-white border-b shadow-sm p-4 shrink-0">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold text-slate-900">
          {title}
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
          title="Close chat (Esc)"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
