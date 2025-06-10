
import ChatModeManager from "./ChatModeManager";
import ChatFocusManager from "./ChatFocusManager";
import ChatInterfaceLayout from "./ChatInterfaceLayout";
import { useChatInterfaceHandlers } from "@/hooks/useChatInterfaceHandlers";
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
  const { handleSend } = useChatInterfaceHandlers({
    isInDemoMode,
    demoStep,
    message,
    addUserMessage,
    addAIMessage,
    setMessage,
    setDemoStep,
    originalHandleSendMessage,
    onFocusChange
  });

  return (
    <ChatModeManager>
      {({ mode, handleModeChange }) => (
        <ChatFocusManager 
          message={message} 
          isFocused={isFocused} 
          onFocusChange={onFocusChange}
        >
          {({ handleMessageChange, handleClose }) => (
            <ChatInterfaceLayout
              isFocused={isFocused}
              currentAction={currentAction}
              inputRef={inputRef}
              message={message}
              setMessage={setMessage}
              isLoading={isLoading}
              loadResults={loadResults}
              showingResults={showingResults}
              handleLoadSelect={handleLoadSelect}
              chatHistory={chatHistory}
              isInDemoMode={isInDemoMode}
              setIsInDemoMode={setIsInDemoMode}
              demoStep={demoStep}
              setDemoStep={setDemoStep}
              mode={mode}
              handleModeChange={handleModeChange}
              handleMessageChange={handleMessageChange}
              handleClose={handleClose}
              handleSend={handleSend}
            />
          )}
        </ChatFocusManager>
      )}
    </ChatModeManager>
  );
};

export default ChatInterfaceMain;
