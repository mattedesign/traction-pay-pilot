
interface ChatFocusManagerProps {
  message: string;
  isFocused: boolean;
  onFocusChange?: (focused: boolean) => void;
  children: (props: {
    handleMessageChange: (newMessage: string) => void;
    handleClose: () => void;
  }) => React.ReactNode;
}

const ChatFocusManager = ({ 
  message, 
  isFocused, 
  onFocusChange, 
  children 
}: ChatFocusManagerProps) => {
  const handleMessageChange = (newMessage: string) => {
    if (onFocusChange) {
      onFocusChange(newMessage.length > 0 || isFocused);
    }
  };

  const handleClose = () => {
    if (onFocusChange) {
      onFocusChange(false);
    }
  };

  return <>{children({ handleMessageChange, handleClose })}</>;
};

export default ChatFocusManager;
