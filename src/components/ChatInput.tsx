
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";
import { validateFile, ALLOWED_FILE_TYPES } from "@/utils/security";
import { useToast } from "@/hooks/use-toast";
import ModeDropdown from "./ModeDropdown";

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  isPreview?: boolean;
  mode?: "search" | "chat";
  onModeChange?: (mode: "search" | "chat") => void;
}

const ChatInput = ({
  message,
  onMessageChange,
  onSendMessage,
  isLoading,
  isPreview = false,
  mode = "chat",
  onModeChange
}: ChatInputProps) => {
  const { toast } = useToast();

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
      }
    };
    input.click();
  };

  const handleVoiceInput = () => {
    if (isPreview) return;
    toast({
      title: "Voice Input",
      description: "Voice input feature coming soon!"
    });
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
        className="pl-32 pr-36 py-3 h-12 rounded-[18px]" // Increased left padding more for gap, increased right padding for multiple buttons
        disabled={isLoading || isPreview}
        maxLength={1000}
        autoComplete="off"
      />
      
      {/* Mode dropdown on the left */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        {onModeChange ? (
          <ModeDropdown 
            mode={mode} 
            onModeChange={onModeChange}
            isPreview={isPreview}
          />
        ) : (
          <div className="h-8 w-16 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">
              {mode === "search" ? "Search" : "Chat"}
            </span>
          </div>
        )}
      </div>

      {/* Attachment button */}
      <div className="absolute right-24 top-1/2 transform -translate-y-1/2">
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

      {/* Voice input button */}
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={isLoading || isPreview}
          onClick={handleVoiceInput}
          title="Voice input"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
            <line x1="8" x2="16" y1="22" y2="22"/>
          </svg>
        </Button>
      </div>

      {/* Send button inside input on the right */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <Button 
          onClick={handleSend} 
          disabled={isLoading || !message.trim() || isPreview} 
          title="Send message" 
          className="rounded-lg h-9 px-3 text-sm font-medium disabled:opacity-100"
          style={{
            background: 'var(--Gradient-primary, linear-gradient(97deg, #8D58FE 5.35%, #6F7BF5 22.4%, #5399ED 50.15%, #43ACE8 77.04%, #15DFDB 94.96%))'
          }}
        >
          <span className="mr-1">Send</span>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
