
import { useCallback } from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatContentArea from "./ChatContentArea";
import ChatEscapeHandler from "./ChatEscapeHandler";
import ChatTitleManager from "./ChatTitleManager";
import ChatDemoHandler from "./ChatDemoHandler";
import { InputFocusHandle } from "@/hooks/useInputFocus";
import { ChatMessage } from "../hooks/useChatMessages";

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
  handleSend
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
    <div className="h-full flex flex-col">
      <ChatEscapeHandler isFocused={isFocused} onClose={finalHandleClose} />
      
      <ChatDemoHandler
        currentAction={currentAction}
        isFocused={isFocused}
        setIsInDemoMode={setIsInDemoMode}
        setDemoStep={setDemoStep}
        setMessage={setMessage}
      />
      
      {/* Header - only show when focused */}
      {isFocused && (
        <div className="shrink-0">
          <ChatTitleManager currentAction={currentAction} mode={mode}>
            {(title) => (
              <ChatHeader 
                isFocused={isFocused}
                title={title}
                onClose={finalHandleClose}
              />
            )}
          </ChatTitleManager>
        </div>
      )}
      
      {/* Content area - only show when focused, with proper scrolling */}
      {isFocused && (
        <div className="flex-1 min-h-0">
          <ChatContentArea
            isFocused={isFocused}
            showingResults={showingResults}
            loadResults={loadResults}
            chatHistory={chatHistory}
            isLoading={isLoading}
            onLoadSelect={handleLoadSelect}
          />
        </div>
      )}
      
      {/* Chat Input - always at bottom with consistent positioning and proper pointer events */}
      <div className={`shrink-0 transition-all duration-300 pointer-events-auto z-30 ${
        isFocused ? 'p-4' : 'absolute bottom-0 left-0 right-0 p-4'
      }`}>
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
