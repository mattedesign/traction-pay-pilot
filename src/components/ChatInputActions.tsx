
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Mic } from "lucide-react";
import { validateFile, ALLOWED_FILE_TYPES } from "@/utils/security";
import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";

interface ChatInputActionsProps {
  isLoading: boolean;
  isPreview: boolean;
  message: string;
  onSendMessage: () => void;
}

const ChatInputActions = ({
  isLoading,
  isPreview,
  message,
  onSendMessage
}: ChatInputActionsProps) => {
  const { toast } = useToast();

  const handleAttachment = useCallback(() => {
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
  }, [isPreview, toast]);

  const handleVoiceInput = useCallback(() => {
    if (isPreview) return;
    toast({
      title: "Voice Input",
      description: "Voice input feature coming soon!"
    });
  }, [isPreview, toast]);

  const handleSend = useCallback(() => {
    if (isPreview || isLoading || !message.trim()) return;
    onSendMessage();
  }, [isPreview, isLoading, message, onSendMessage]);

  return (
    <>
      {/* Attachment button */}
      <div className="absolute right-32 top-1/2 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={isLoading || isPreview}
          onClick={handleAttachment}
          title="Upload secure document"
          tabIndex={-1}
        >
          <Paperclip className="w-4 h-4" />
        </Button>
      </div>

      {/* Voice input button */}
      <div className="absolute right-24 top-1/2 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={isLoading || isPreview}
          onClick={handleVoiceInput}
          title="Voice input"
          tabIndex={-1}
        >
          <Mic className="w-4 h-4" />
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
          tabIndex={-1}
        >
          <span className="mr-1">Send</span>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export default ChatInputActions;
