
import ChatContainer from "./ChatContainer";
import ChatPreview from "./ChatPreview";
import ChatSetup from "./ChatSetup";
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
    useSupabase,
    apiKey,
    handleSendMessage,
    handleAPIKeySubmit,
    toggleService
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

  // Only show setup if not initialized AND not using Supabase
  if (!isInitialized) {
    return (
      <ChatSetup 
        onAPIKeySubmit={handleAPIKeySubmit} 
        isLoading={isLoading}
        useSupabase={useSupabase}
        onToggleService={toggleService}
      />
    );
  }

  return (
    <ChatContainer
      isInitialized={isInitialized}
      isLoading={isLoading}
      chatHistory={chatHistory}
      currentSuggestions={currentSuggestions}
      onChatMessage={handleChatMessage}
      onAPIKeySubmit={handleAPIKeySubmit}
      onNavigate={navigate}
    />
  );
};

export default ChatInterface;
