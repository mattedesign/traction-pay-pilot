
import ChatSetup from "./ChatSetup";
import ChatTitleManager from "./ChatTitleManager";
import ChatHeader from "./ChatHeader";

interface ChatInterfaceSetupProps {
  currentAction?: string;
  isFocused: boolean;
  onFocusChange?: (focused: boolean) => void;
  onAPIKeySubmit: (key: string) => void;
  isLoading: boolean;
  setMessage: (message: string) => void;
  setIsInDemoMode: (value: boolean) => void;
  setDemoStep: (value: string | null) => void;
}

const ChatInterfaceSetup = ({
  currentAction,
  isFocused,
  onFocusChange,
  onAPIKeySubmit,
  isLoading,
  setMessage,
  setIsInDemoMode,
  setDemoStep
}: ChatInterfaceSetupProps) => {
  return (
    <div className="h-full flex flex-col">
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
        <ChatSetup onAPIKeySubmit={onAPIKeySubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterfaceSetup;
