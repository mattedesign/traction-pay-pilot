
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import ModeSelector from "./ModeSelector";

interface ChatPreviewProps {
  currentSuggestions: string[];
}

const ChatPreview = ({ currentSuggestions }: ChatPreviewProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-slate-50">
      <h3 className="font-semibold text-slate-900">AI Assistant Preview</h3>
      
      <ModeSelector 
        mode="search" 
        onModeChange={() => {}} 
        isPreview={true}
      />
      
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
        mode="search"
      />
    </div>
  );
};

export default ChatPreview;
