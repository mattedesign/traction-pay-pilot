
import { useCallback } from "react";
import ChatInput from "./ChatInput";
import ChatContentArea from "./ChatContentArea";
import ChatEscapeHandler from "./ChatEscapeHandler";
import ChatDemoHandler from "./ChatDemoHandler";
import { InputFocusHandle } from "@/hooks/useInputFocus";
import { ChatMessage, InteractiveButton } from "../hooks/useChatMessages";

interface ChatInterfaceLayoutProps {
  isFocused: boolean;
  currentAction?: string;
  inputRef: React.RefObject<InputFocusHandle>;
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  loadResults: any[];
  showingResults: boolean;
  handleLoadSelect: (loadId: string) => void;
  chatHistory: ChatMessage[];
  isInDemoMode: boolean;
  setIsInDemoMode: (value: boolean) => void;
  demoStep: string | null;
  setDemoStep: (value: string | null) => void;
  mode: "search" | "chat";
  handleModeChange: (mode: "search" | "chat") => void;
  handleMessageChange: (newMessage: string) => void;
  handleClose: () => void;
  handleSend: () => Promise<void>;
  onButtonClick?: (button: InteractiveButton) => void;
}

const ChatInterfaceLayout = ({
  isFocused,
  currentAction,
  inputRef,
  message,
  setMessage,
  isLoading,
  loadResults,
  showingResults,
  handleLoadSelect,
  chatHistory,
  isInDemoMode,
  setIsInDemoMode,
  demoStep,
  setDemoStep,
  mode,
  handleModeChange,
  handleMessageChange,
  handleClose,
  handleSend,
  onButtonClick
}: ChatInterfaceLayoutProps) => {
  const finalHandleClose = useCallback(() => {
    handleClose();
    setMessage("");
    setIsInDemoMode(false);
    setDemoStep(null);
  }, [handleClose, setMessage, setIsInDemoMode, setDemoStep]);

  const finalHandleMessageChange = useCallback((newMessage: string) => {
    setMessage(newMessage);
    handleMessageChange(newMessage);
  }, [setMessage, handleMessageChange]);

  return (
    <div className="flex flex-col h-full">
      <ChatEscapeHandler isFocused={isFocused} onClose={finalHandleClose} />
      
      <ChatDemoHandler
        currentAction={currentAction}
        isFocused={isFocused}
        setIsInDemoMode={setIsInDemoMode}
        setDemoStep={setDemoStep}
        setMessage={setMessage}
      />
      
      {/* Content area takes up most of the space */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ChatContentArea
          isFocused={isFocused}
          showingResults={showingResults}
          loadResults={loadResults}
          chatHistory={chatHistory}
          isLoading={isLoading}
          onLoadSelect={handleLoadSelect}
          onButtonClick={onButtonClick}
        />
      </div>
      
      {/* Input area at the bottom */}
      <div className="shrink-0 p-4 border-t bg-white">
        <div className="w-full max-w-4xl mx-auto">
          <ChatInput
            ref={inputRef}
            message={message}
            onMessageChange={finalHandleMessageChange}
            onSendMessage={handleSend}
            isLoading={isLoading}
            mode={mode}
            onModeChange={handleModeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterfaceLayout;
