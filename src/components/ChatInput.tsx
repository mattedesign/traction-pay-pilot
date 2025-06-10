
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Mic } from "lucide-react";
import { validateFile, ALLOWED_FILE_TYPES } from "@/utils/security";
import { useToast } from "@/hooks/use-toast";
import ModeDropdown from "./ModeDropdown";
import { forwardRef, useImperativeHandle, useCallback, useRef, useEffect } from "react";
import { useInputFocus, InputFocusHandle } from "@/hooks/useInputFocus";

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  isPreview?: boolean;
  mode?: "search" | "chat";
  onModeChange?: (mode: "search" | "chat") => void;
}

const ChatInput = forwardRef<InputFocusHandle, ChatInputProps>(({
  message,
  onMessageChange,
  onSendMessage,
  isLoading,
  isPreview = false,
  mode = "chat",
  onModeChange
}, ref) => {
  const { toast } = useToast();
  const { inputRef, focus } = useInputFocus();
  const lastFocusAttempt = useRef<number>(0);
  const focusTimeoutRef = useRef<NodeJS.Timeout>();

  useImperativeHandle(ref, () => ({
    focus: () => {
      // Debounce focus attempts to prevent rapid re-focus cycles
      const now = Date.now();
      if (now - lastFocusAttempt.current < 100) {
        return;
      }
      lastFocusAttempt.current = now;

      // Clear any pending focus timeout
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }

      // Use setTimeout to ensure DOM is ready and prevent focus conflicts
      focusTimeoutRef.current = setTimeout(() => {
        if (inputRef.current && !isPreview) {
          try {
            inputRef.current.focus();
            // Restore cursor position to end of text if there's content
            if (message) {
              const length = message.length;
              inputRef.current.setSelectionRange(length, length);
            }
          } catch (error) {
            console.warn('Focus attempt failed:', error);
          }
        }
      }, 10);
    }
  }));

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, []);

  const getPlaceholder = useCallback(() => {
    if (mode === "search") {
      return "Search for loads by ID, broker, route, or status...";
    }
    return "Ask about loads, routes, payments, compliance...";
  }, [mode]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isPreview && !isLoading && message.trim()) {
      e.preventDefault();
      onSendMessage();
    }
  }, [isPreview, isLoading, message, onSendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onMessageChange(e.target.value);
  }, [onMessageChange]);

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
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder={getPlaceholder()}
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="pl-32 pr-44 py-3 h-12 rounded-[18px]"
        disabled={isLoading || isPreview}
        maxLength={1000}
        autoComplete="off"
        spellCheck={false}
        data-form-type="other"
        data-lpignore="true"
      />
      
      {/* Mode dropdown on the left */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        {onModeChange ? (
          <div className="pointer-events-auto">
            <ModeDropdown 
              mode={mode} 
              onModeChange={onModeChange}
              isPreview={isPreview}
            />
          </div>
        ) : (
          <div className="h-8 w-16 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">
              {mode === "search" ? "Search" : "Chat"}
            </span>
          </div>
        )}
      </div>

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
    </div>
  );
});

ChatInput.displayName = "ChatInput";

export default ChatInput;
