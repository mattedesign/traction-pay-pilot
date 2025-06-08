
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Paperclip } from "lucide-react";
import { validateFile, ALLOWED_FILE_TYPES } from "@/utils/security";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  isPreview?: boolean;
  mode?: "search" | "chat";
}

const ChatInput = ({
  message,
  onMessageChange,
  onSendMessage,
  isLoading,
  isPreview = false,
  mode = "chat"
}: ChatInputProps) => {
  const {
    toast
  } = useToast();
  const getPlaceholder = () => {
    if (mode === "search") {
      return "Search for loads by ID, broker, route, or status...";
    }
    return "Ask about loads, routes, payments, compliance...";
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isPreview && !isLoading) {
      onSendMessage();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow natural typing without sanitization - sanitization happens when message is sent
    onMessageChange(e.target.value);
  };
  const handleAttachment = () => {
    if (isPreview) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ALLOWED_FILE_TYPES.all.join(',');
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const validation = validateFile(file);
        if (!validation.isValid) {
          toast({
            title: "File Upload Error",
            description: validation.error,
            variant: "destructive"
          });
          return;
        }
        console.log('Secure file selected:', {
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
        });
        toast({
          title: "File Validated",
          description: `${file.name} is ready for upload`
        });

        // Here you would implement the actual secure file upload
        // For now, we'll just log the validated file
      }
    };
    input.click();
  };
  const handleSend = () => {
    if (isPreview || isLoading || !message.trim()) return;
    onSendMessage();
  };
  return (
    <div className="relative">
      <Input
        placeholder={getPlaceholder()}
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="pl-12 pr-24 h-14 rounded-[18px]" // Increased height and custom border radius
        disabled={isLoading || isPreview}
        maxLength={1000}
        autoComplete="off"
      />
      
      {/* Attachment button on the left */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={isLoading || isPreview}
          onClick={handleAttachment}
          title="Upload secure document"
        >
          <Paperclip className="w-4 h-4" />
        </Button>
      </div>

      {/* Send button inside input on the right */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <Button 
          onClick={handleSend} 
          disabled={isLoading || !message.trim() || isPreview} 
          title="Send message" 
          className="rounded-xl h-8 px-3 text-sm font-medium disabled:opacity-100" // Remove opacity on disabled state
          style={{
            background: 'var(--Gradient-primary, linear-gradient(97deg, #8D58FE 5.35%, #6F7BF5 22.4%, #5399ED 50.15%, #43ACE8 77.04%, #15DFDB 94.96%))'
          }}
        >
          <span className="mr-1">send</span>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
