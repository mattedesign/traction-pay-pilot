
import ChatInterfaceContainer from "./ChatInterfaceContainer";

interface FunctionalChatInterfaceProps {
  onNavigateToLoad?: (path: string) => void;
  onFocusChange?: (focused: boolean) => void;
  isFocused?: boolean;
  currentAction?: string;
}

const FunctionalChatInterface = (props: FunctionalChatInterfaceProps) => {
  return <ChatInterfaceContainer {...props} />;
};

export default FunctionalChatInterface;
