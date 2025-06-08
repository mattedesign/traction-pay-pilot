
import { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";
import ChatSetup from "./ChatSetup";
import { useChatMessages } from "../hooks/useChatMessages";
import { useChatMessageHandler } from "../hooks/useChatMessageHandler";
import { useAPIKeyHandler } from "../hooks/useAPIKeyHandler";
import { useClaude } from "../hooks/useClaude";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LoadSpecificChatInterfaceProps {
  loadContext?: string;
  onFocusChange?: (focused: boolean) => void;
  isFocused?: boolean;
  onClose?: () => void;
}

const LoadSpecificChatInterface = ({ 
  loadContext,
  onFocusChange,
  isFocused = false,
  onClose
}: LoadSpecificChatInterfaceProps) => {
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const [message, setMessage] = useState("");

  // Load-specific system prompt focused on chat mode only
  const systemPrompt = `You are an AI assistant specialized in trucking operations and load management. You are currently helping with ${loadContext || 'this specific load'}.

Provide detailed analysis, advice, and insights about:
- Load status and tracking information
- Route optimization and delivery planning
- Documentation and compliance requirements
- Communication with brokers and customers
- Payment and invoicing status
- Potential issues or discrepancies
- DOT regulations and compliance
- Equipment maintenance and safety

Always provide practical, actionable advice in a clear, professional tone. Focus on safety, compliance, and profitability for this specific load.`;

  const { isLoading, isInitialized, initializeService } = useClaude({ 
    systemPrompt 
  });

  const { handleSendMessage } = useChatMessageHandler({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage,
    currentLoadId: loadContext?.replace('Load #', '')
  });

  const { handleAPIKeySubmit } = useAPIKeyHandler({
    initializeService
  });

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFocused && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isFocused, onClose]);

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
    if (onFocusChange) {
      onFocusChange(newMessage.length > 0 || isFocused);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    
    if (onFocusChange) onFocusChange(true);
    
    try {
      await handleSendMessage(message);
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Show setup if not initialized
  if (!isInitialized) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          {isFocused && onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
              title="Close chat (Esc)"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <ChatSetup onAPIKeySubmit={handleAPIKeySubmit} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Close Button only */}
      <div className="flex items-center justify-end">
        {isFocused && onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
            title="Close chat (Esc)"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {/* Chat History - Show when focused and has messages, with fixed height and scroll */}
      {isFocused && chatHistory.length > 0 && (
        <div className="h-48 overflow-y-auto border rounded-lg bg-slate-50">
          <ChatHistory messages={chatHistory} isLoading={isLoading} />
        </div>
      )}
      
      {/* Chat Input - Always at bottom, no search mode */}
      <ChatInput
        message={message}
        onMessageChange={handleMessageChange}
        onSendMessage={handleSend}
        isLoading={isLoading}
        mode="chat"
      />
    </div>
  );
};

export default LoadSpecificChatInterface;
