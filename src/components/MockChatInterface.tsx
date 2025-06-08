
import { useState } from "react";
import ChatInput from "./ChatInput";
import MockModeSelector from "./MockModeSelector";
import SuggestedQuestions from "./SuggestedQuestions";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";

interface MockChatInterfaceProps {
  loadContext?: string;
}

const MockChatInterface = ({ loadContext }: MockChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"search" | "chat">("search");
  const { currentSuggestions } = useSuggestedQuestions();

  const handleSendMessage = () => {
    console.log('Mock send message:', message, 'Mode:', mode);
    setMessage("");
  };

  const handleQuestionClick = (question: string) => {
    console.log('Mock question clicked:', question);
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
        onMessageChange={setMessage}
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
};

export default MockChatInterface;
