
import { useState } from "react";

interface ChatModeManagerProps {
  children: (props: {
    mode: "search" | "chat";
    handleModeChange: (newMode: "search" | "chat") => void;
  }) => React.ReactNode;
}

const ChatModeManager = ({ children }: ChatModeManagerProps) => {
  const [mode, setMode] = useState<"search" | "chat">("search");

  const handleModeChange = (newMode: "search" | "chat") => {
    setMode(newMode);
    console.log('Mode changed to:', newMode);
  };

  return <>{children({ mode, handleModeChange })}</>;
};

export default ChatModeManager;
