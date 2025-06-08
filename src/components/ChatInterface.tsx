
import ChatContainer from "./ChatContainer";
import ChatPreview from "./ChatPreview";
import ChatSetup from "./ChatSetup";
import { useChatMessages } from "../hooks/useChatMessages";
import { useChatHandlers } from "../hooks/useChatHandlers";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";

interface ChatInterfaceProps {
  isPreview?: boolean;
  loadContext?: string;
}

const ChatInterface = ({ isPreview = false, loadContext }: ChatInterfaceProps) => {
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const { currentSuggestions } = useSuggestedQuestions();
  
  const systemPrompt = `You are Claude, an expert AI assistant specialized in trucking operations, logistics, and transportation industry. You have deep knowledge of:

- DOT regulations and compliance (HOS, ELD, safety requirements)
- Load management and freight operations
- Route optimization and fuel efficiency
- Payment terms, factoring, and cash flow management
- Equipment maintenance and inspections
- Border crossings and international freight
- Detention time and accessorial charges
- Truck stops, parking, and driver amenities
- Email communication analysis and response generation
- Load discrepancy identification and resolution

Provide practical, accurate, and industry-specific advice. Be conversational but professional. Always prioritize safety and legal compliance in your recommendations.

You can analyze emails, generate professional responses, identify discrepancies in load data, and provide comprehensive trucking industry guidance.

${loadContext ? `Context: Currently discussing ${loadContext}` : ''}`;

  const {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage,
    handleAPIKeySubmit
  } = useChatHandlers({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage
  });

  if (isPreview) {
    return <ChatPreview currentSuggestions={currentSuggestions} />;
  }

  if (!isInitialized) {
    return <ChatSetup onAPIKeySubmit={handleAPIKeySubmit} isLoading={isLoading} />;
  }

  return (
    <ChatContainer
      isInitialized={isInitialized}
      isLoading={isLoading}
      chatHistory={chatHistory}
      currentSuggestions={currentSuggestions}
      message={message}
      onMessageChange={setMessage}
      onSendMessage={handleSendMessage}
      onAPIKeySubmit={handleAPIKeySubmit}
    />
  );
};

export default ChatInterface;
