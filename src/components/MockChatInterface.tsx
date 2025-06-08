
import { useState, forwardRef, useImperativeHandle } from "react";
import ChatInput from "./ChatInput";
import MockModeSelector from "./MockModeSelector";
import SuggestedQuestions from "./SuggestedQuestions";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";

interface MockChatInterfaceProps {
  loadContext?: string;
  onNavigateToLoad?: (path: string) => void;
  onFocusChange?: (focused: boolean) => void;
}

export interface MockChatInterfaceRef {
  simulateTrackLoad: () => void;
  simulatePlanRoute: () => void;
}

const MockChatInterface = forwardRef<MockChatInterfaceRef, MockChatInterfaceProps>(
  ({ loadContext, onNavigateToLoad, onFocusChange }, ref) => {
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState<"search" | "chat">("search");
    const { currentSuggestions } = useSuggestedQuestions();

    useImperativeHandle(ref, () => ({
      simulateTrackLoad: () => {
        setMessage("Track load #1234");
        if (onFocusChange) onFocusChange(true);
      },
      simulatePlanRoute: () => {
        setMessage("What's the best route from Phoenix to Los Angeles?");
        if (onFocusChange) onFocusChange(true);
      }
    }));

    const handleSendMessage = () => {
      console.log('Mock send message:', message, 'Mode:', mode);
      
      // Simulate navigation for load queries
      if (message.includes("load #") && onNavigateToLoad) {
        const loadMatch = message.match(/load #(\d+)/i);
        if (loadMatch) {
          onNavigateToLoad(`/load/${loadMatch[1]}`);
        }
      }
      
      setMessage("");
      if (onFocusChange) onFocusChange(false);
    };

    const handleQuestionClick = (question: string) => {
      console.log('Mock question clicked:', question);
      setMessage(question);
      if (onFocusChange) onFocusChange(true);
    };

    const handleMessageChange = (newMessage: string) => {
      setMessage(newMessage);
      if (onFocusChange) {
        onFocusChange(newMessage.length > 0);
      }
    };

    return (
      <div className="space-y-4">
        <MockModeSelector mode={mode} />
        
        <SuggestedQuestions 
          questions={currentSuggestions.slice(0, 3)} 
          onQuestionClick={handleQuestionClick}
          isPreview={true}
        />
        
        <ChatInput
          message={message}
          onMessageChange={handleMessageChange}
          onSendMessage={handleSendMessage}
          isLoading={false}
          isPreview={true}
          mode={mode}
        />
        
        {loadContext && (
          <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
            Context: {loadContext}
          </div>
        )}
      </div>
    );
  }
);

MockChatInterface.displayName = "MockChatInterface";

export default MockChatInterface;
