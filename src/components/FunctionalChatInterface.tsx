
import { forwardRef, useImperativeHandle, useRef } from "react";
import ChatInterfaceContainer from "./ChatInterfaceContainer";

interface FunctionalChatInterfaceProps {
  onNavigateToLoad?: (path: string) => void;
  onFocusChange?: (focused: boolean) => void;
  isFocused?: boolean;
  currentAction?: string;
}

export interface FunctionalChatInterfaceRef {
  fillInputAndFocus: (query: string) => void;
}

const FunctionalChatInterface = forwardRef<FunctionalChatInterfaceRef, FunctionalChatInterfaceProps>((props, ref) => {
  console.log('FunctionalChatInterface: Render with props:', {
    isFocused: props.isFocused,
    currentAction: props.currentAction
  });
  
  const containerRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    fillInputAndFocus: (query: string) => {
      if (containerRef.current) {
        containerRef.current.fillInputAndFocus(query);
      }
    }
  }));
  
  return <ChatInterfaceContainer ref={containerRef} {...props} />;
});

FunctionalChatInterface.displayName = "FunctionalChatInterface";

export default FunctionalChatInterface;
