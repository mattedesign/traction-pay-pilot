
import APIKeyInput from "./APIKeyInput";

interface ChatSetupProps {
  onAPIKeySubmit: (key: string) => void;
  isLoading: boolean;
}

const ChatSetup = ({ onAPIKeySubmit, isLoading }: ChatSetupProps) => {
  return (
    <div className="space-y-4">
      <APIKeyInput onKeySubmit={onAPIKeySubmit} isLoading={isLoading} />
    </div>
  );
};

export default ChatSetup;
