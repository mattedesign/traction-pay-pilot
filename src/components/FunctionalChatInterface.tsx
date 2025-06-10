
import ChatInterfaceContainer from "./ChatInterfaceContainer";

interface FunctionalChatInterfaceProps {
  onNavigateToLoad?: (path: string) => void;
  onFocusChange?: (focused: boolean) => void;
  isFocused?: boolean;
  currentAction?: string;
}

const FunctionalChatInterface = (props: FunctionalChatInterfaceProps) => {
  console.log('FunctionalChatInterface: Render with props:', {
    isFocused: props.isFocused,
    currentAction: props.currentAction
  });
  
  return <ChatInterfaceContainer {...props} />;
};

export default FunctionalChatInterface;
