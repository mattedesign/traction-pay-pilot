
import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatSetup from "./ChatSetup";
import ChatDemoHandler from "./ChatDemoHandler";
import ChatHeader from "./ChatHeader";
import ChatContentArea from "./ChatContentArea";
import ChatEscapeHandler from "./ChatEscapeHandler";
import ChatModeManager from "./ChatModeManager";
import ChatTitleManager from "./ChatTitleManager";
import ChatFocusManager from "./ChatFocusManager";
import ChatDemoResponseHandler from "./ChatDemoResponseHandler";
import { useChatMessages } from "../hooks/useChatMessages";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";
import { useUnifiedChatHandler } from "../hooks/useUnifiedChatHandler";
import { getChatSystemPrompt } from "./ChatSystemPrompt";

interface FunctionalChatInterfaceProps {
  onNavigateToLoad?: (path: string) => void;
  onFocusChange?: (focused: boolean) => void;
  isFocused?: boolean;
  currentAction?: string;
}

const FunctionalChatInterface = ({ 
  onNavigateToLoad, 
  onFocusChange,
  isFocused = false,
  currentAction
}: FunctionalChatInterfaceProps) => {
  const [isInDemoMode, setIsInDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState<string | null>(null);
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const { currentSuggestions } = useSuggestedQuestions();

  const systemPrompt = getChatSystemPrompt();

  const {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage: originalHandleSendMessage,
    handleAPIKeySubmit,
    loadResults,
    showingResults,
    handleLoadSelect
  } = useUnifiedChatHandler({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage,
    onLoadSelect: (loadId) => {
      if (onNavigateToLoad) {
        onNavigateToLoad(`/load/${loadId}`);
      }
    }
  });

  // Show setup if not initialized
  if (!isInitialized) {
    return (
      <div className={`flex flex-col ${isFocused ? 'h-full' : 'h-auto'}`}>
        <ChatTitleManager currentAction={currentAction} mode="search">
          {(title) => (
            <ChatHeader 
              isFocused={isFocused}
              title="AI Assistant Setup"
              onClose={() => {
                if (onFocusChange) onFocusChange(false);
                setMessage("");
                setIsInDemoMode(false);
                setDemoStep(null);
              }}
            />
          )}
        </ChatTitleManager>
        <div className="flex-1 flex items-center justify-center p-4">
          <ChatSetup onAPIKeySubmit={handleAPIKeySubmit} isLoading={isLoading} />
        </div>
      </div>
    );
  }

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

            const finalHandleClose = () => {
              handleClose();
              setMessage("");
              setIsInDemoMode(false);
              setDemoStep(null);
            };

            const finalHandleMessageChange = (newMessage: string) => {
              setMessage(newMessage);
              handleMessageChange(newMessage);
            };

            return (
              <div className={`flex flex-col transition-all duration-300 ease-in-out ${
                isFocused ? 'h-full' : 'h-auto'
              }`}>
                <ChatEscapeHandler isFocused={isFocused} onClose={finalHandleClose} />
                
                <ChatDemoHandler
                  currentAction={currentAction}
                  isFocused={isFocused}
                  setIsInDemoMode={setIsInDemoMode}
                  setDemoStep={setDemoStep}
                  setMessage={setMessage}
                />
                
                {isFocused && (
                  <ChatTitleManager currentAction={currentAction} mode={mode}>
                    {(title) => (
                      <ChatHeader 
                        isFocused={isFocused}
                        title={title}
                        onClose={finalHandleClose}
                      />
                    )}
                  </ChatTitleManager>
                )}
                
                <ChatContentArea
                  isFocused={isFocused}
                  showingResults={showingResults}
                  loadResults={loadResults}
                  chatHistory={chatHistory}
                  isLoading={isLoading}
                  onLoadSelect={handleLoadSelect}
                />
                
                {/* Chat Input - Always at bottom with consistent positioning */}
                <div className="shrink-0 p-4">
                  <div className="w-full max-w-4xl mx-auto">
                    <ChatInput
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

export default FunctionalChatInterface;
