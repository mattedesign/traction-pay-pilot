
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import { InputFocusHandle } from "@/hooks/useInputFocus";
import { useChatInputFocus } from "@/hooks/useChatInputFocus";
import { useChatInputHandlers } from "@/hooks/useChatInputHandlers";
import { useChatInputPlaceholder } from "@/hooks/useChatInputPlaceholder";
import ChatInputActions from "./ChatInputActions";
import ChatInputModeSection from "./ChatInputModeSection";

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
  const { inputRef } = useChatInputFocus({ ref, message, isPreview });
  const { getPlaceholder } = useChatInputPlaceholder(mode);
  const { handleKeyPress, handleInputChange } = useChatInputHandlers({
    onMessageChange,
    onSendMessage,
    isPreview,
    isLoading,
    message
  });

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
      
      <ChatInputModeSection
        mode={mode}
        onModeChange={onModeChange}
        isPreview={isPreview}
      />

      <ChatInputActions
        isLoading={isLoading}
        isPreview={isPreview}
        message={message}
        onSendMessage={onSendMessage}
      />
    </div>
  );
});

ChatInput.displayName = "ChatInput";

export default ChatInput;
