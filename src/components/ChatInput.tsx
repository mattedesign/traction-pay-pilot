
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic } from "lucide-react";

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  isPreview?: boolean;
}

const ChatInput = ({ 
  message, 
  onMessageChange, 
  onSendMessage, 
  isLoading, 
  isPreview = false 
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isPreview) {
      onSendMessage();
    }
  };

  return (
    <div className="flex space-x-2">
      <Input 
        placeholder="Ask about loads, routes, payments, compliance..."
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1"
        disabled={isLoading || isPreview}
      />
      <Button variant="outline" size="icon" disabled={isLoading || isPreview}>
        <Mic className="w-4 h-4" />
      </Button>
      <Button 
        onClick={onSendMessage} 
        disabled={isLoading || !message.trim() || isPreview}
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
