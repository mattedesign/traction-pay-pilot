
import ChatContainer from "./ChatContainer";
import ChatPreview from "./ChatPreview";
import { useChatMessages } from "../hooks/useChatMessages";
import { useEnhancedChatHandler } from "../hooks/useEnhancedChatHandler";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";
import { useNavigate } from "react-router-dom";

interface ChatInterfaceProps {
  isPreview?: boolean;
  loadContext?: string;
}

const ChatInterface = ({ isPreview = false, loadContext }: ChatInterfaceProps) => {
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const { currentSuggestions } = useSuggestedQuestions();
  const navigate = useNavigate();
  
  // Enhanced system prompt for trucking operations
  const systemPrompt = `You are an AI assistant specialized in trucking operations and load management. You help carriers with:

**OPERATIONAL GUIDANCE**:
- Route optimization and fuel efficiency
- Load search and acceptance decisions
- DOT regulations and compliance (HOS, ELD, safety)
- Equipment maintenance and safety protocols

**BUSINESS SUPPORT**:
- Payment processing and factoring advice
- Cash flow management and financing
- Performance metrics and optimization
- Growth planning and fleet expansion

**COMMUNICATION**:
- Professional interaction with brokers and shippers
- Documentation and paperwork guidance
- Dispute resolution and problem solving

Always provide practical, actionable advice focused on safety, compliance, and profitability. Keep responses clear and industry-specific.`;

  const {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage
  } = useEnhancedChatHandler({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage,
    currentLoadId: loadContext,
    onLoadSelect: (loadId) => navigate(`/load/${loadId}`)
  });

  const handleChatMessage = async (userMessage: string) => {
    setMessage(userMessage);
    await handleSendMessage();
  };

  if (isPreview) {
    return <ChatPreview currentSuggestions={currentSuggestions} />;
  }

  // The system is always initialized since we're using Supabase Edge Functions
  return (
    <ChatContainer
      isInitialized={isInitialized}
      isLoading={isLoading}
      chatHistory={chatHistory}
      currentSuggestions={currentSuggestions}
      onChatMessage={handleChatMessage}
      onAPIKeySubmit={() => {}} // No longer needed
      onNavigate={navigate}
    />
  );
};

export default ChatInterface;
