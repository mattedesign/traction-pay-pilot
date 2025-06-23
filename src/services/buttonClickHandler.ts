
import { InteractiveButton } from "@/hooks/useChatMessages";

interface ButtonClickHandlerParams {
  button: InteractiveButton;
  onNavigate?: (path: string) => void;
  onContinueChat?: (message: string) => void;
}

export class ButtonClickHandler {
  static handle({ button, onNavigate, onContinueChat }: ButtonClickHandlerParams) {
    console.log('ButtonClickHandler: Processing button click:', {
      buttonId: button.id,
      buttonText: button.text,
      action: button.action,
      actionData: button.actionData
    });

    switch (button.action) {
      case 'navigate':
        if (button.actionData?.path && onNavigate) {
          console.log('ButtonClickHandler: Navigating to:', button.actionData.path);
          onNavigate(button.actionData.path);
          
          // If there's a message to show, also trigger chat continuation
          if (button.actionData.message && onContinueChat) {
            console.log('ButtonClickHandler: Also sending message:', button.actionData.message);
            onContinueChat(button.actionData.message);
          }
        } else {
          console.warn('ButtonClickHandler: Navigate action missing required data:', {
            hasPath: !!button.actionData?.path,
            hasOnNavigate: !!onNavigate
          });
        }
        break;

      case 'continue_chat':
        if (button.actionData?.message && onContinueChat) {
          console.log('ButtonClickHandler: Continuing chat with message:', button.actionData.message);
          onContinueChat(button.actionData.message);
        } else {
          console.warn('ButtonClickHandler: Continue chat action missing required data:', {
            hasMessage: !!button.actionData?.message,
            hasOnContinueChat: !!onContinueChat
          });
        }
        break;

      default:
        console.warn('ButtonClickHandler: Unknown button action:', button.action);
    }
  }
}
