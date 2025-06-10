
import { useCallback } from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatContentArea from "./ChatContentArea";
import ChatEscapeHandler from "./ChatEscapeHandler";
import ChatModeManager from "./ChatModeManager";
import ChatTitleManager from "./ChatTitleManager";
import ChatFocusManager from "./ChatFocusManager";
import ChatDemoHandler from "./ChatDemoHandler";
import ChatDemoResponseHandler from "./ChatDemoResponseHandler";
import { InputFocusHandle } from "@/hooks/useInputFocus";
import { ChatMessage } from "../hooks/useChatMessages";

interface ChatInterfaceMainProps {
  isFocused: boolean;
  currentAction?: string;
  onFocusChange?: (focused: boolean) => void;
  inputRef: React.RefObject<InputFocusHandle>;
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  originalHandleSendMessage: () => Promise<void>;
  loadResults: any[];
  showingResults: boolean;
  handleLoadSelect: (loadId: string) => void;
  chatHistory: ChatMessage[];
  isInDemoMode: boolean;
  setIsInDemoMode: (value: boolean) => void;
  demoStep: string | null;
  setDemoStep: (value: string | null) => void;
  addUserMessage: (content: string) => ChatMessage;
  addAIMessage: (content: string) => ChatMessage;
}

const ChatInterfaceMain = ({
  isFocused,
  currentAction,
  onFocusChange,
  inputRef,
  message,
  setMessage,
  isLoading,
  originalHandleSendMessage,
  loadResults,
  showingResults,
  handleLoadSelect,
  chatHistory,
  isInDemoMode,
  setIsInDemoMode,
  demoStep,
  setDemoStep,
  addUserMessage,
  addAIMessage
}: ChatInterfaceMainProps) => {
  return (
    <ChatModeManager>
      {({ mode, handleModeChange }) => (
        <ChatFocusManager 
          message={message} 
          isFocused={isFocused} 
          onFocusChange={onFocusChange}
        >
          {({ handleMessageChange, handleClose }) => {
            const demoResponseHandler = ChatDemoResponseHandler({
              isInDemoMode,
              demoStep,
              message,
              addUserMessage,
              addAIMessage,
              setMessage,
              setDemoStep,
              originalHandleSendMessage
            });

            const handleSend = async () => {
              if (onFocusChange) onFocusChange(true);
              
              if (isInDemoMode) {
                await demoResponseHandler.handleDemoResponse();
              } else {
                await originalHandleSendMessage();
              }
            };

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
                
                {/* Content area - only show when focused, with overflow-hidden to constrain scrolling */}
                {isFocused && (
                  <div className="flex-1 min-h-0 overflow-hidden">
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
                
                {/* Chat Input - always at bottom with consistent positioning */}
                <div className={`shrink-0 transition-all duration-300 ${
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
          }}
        </ChatFocusManager>
      )}
    </ChatModeManager>
  );
};

export default ChatInterfaceMain;
