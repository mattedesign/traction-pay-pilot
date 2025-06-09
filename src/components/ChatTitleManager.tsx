
interface ChatTitleManagerProps {
  currentAction?: string;
  mode: "search" | "chat";
  children: (title: string) => React.ReactNode;
}

const ChatTitleManager = ({ currentAction, mode, children }: ChatTitleManagerProps) => {
  const getDynamicTitle = () => {
    if (currentAction) {
      return currentAction;
    }
    return mode === "search" ? "Search" : "Chat";
  };

  return <>{children(getDynamicTitle())}</>;
};

export default ChatTitleManager;
