
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";

interface ChatPreviewProps {
  currentSuggestions: string[];
}

const ChatPreview = ({ currentSuggestions }: ChatPreviewProps) => {
  return (
    <div className="space-y-4">
      <SuggestedQuestions 
        questions={currentSuggestions} 
        onQuestionClick={() => {}} 
        isPreview={true}
      />
      <ChatInput
        message=""
        onMessageChange={() => {}}
        onSendMessage={() => {}}
        isLoading={false}
        isPreview={true}
      />
      <p className="text-xs text-slate-500 text-center">
        Click a demo scenario above to interact with the AI assistant
      </p>
    </div>
  );
};

export default ChatPreview;
