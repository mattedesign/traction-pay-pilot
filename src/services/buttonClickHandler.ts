
import { InteractiveButton } from "@/hooks/useChatMessages";

interface ButtonClickHandlerParams {
  button: InteractiveButton;
  onNavigate?: (path: string) => void;
  onContinueChat?: (message: string) => void;
}

export class ButtonClickHandler {
  static handle({ button, onNavigate, onContinueChat }: ButtonClickHandlerParams) {
    console.log('ButtonClickHandler: Processing button click:', button);

    switch (button.action) {
      case 'navigate':
        if (button.actionData?.path && onNavigate) {
          console.log('ButtonClickHandler: Navigating to:', button.actionData.path);
          onNavigate(button.actionData.path);
          
          // If there's a message to show, also trigger chat continuation
          if (button.actionData.message && onContinueChat) {
            onContinueChat(button.actionData.message);
          }
        }
        break;

      case 'continue_chat':
        if (button.actionData?.message && onContinueChat) {
          console.log('ButtonClickHandler: Continuing chat with:', button.actionData.message);
          onContinueChat(button.actionData.message);
        }
        break;

      default:
        console.warn('ButtonClickHandler: Unknown button action:', button.action);
    }
  }
}
