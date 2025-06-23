
import ChatContainer from "./ChatContainer";
import ChatPreview from "./ChatPreview";
import ChatSetup from "./ChatSetup";
import { useChatMessages } from "../hooks/useChatMessages";
import { useUnifiedChatHandler } from "../hooks/useUnifiedChatHandler";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";
import { useNavigate } from "react-router-dom";
import { InteractiveResponseService } from "../services/interactiveResponseService";

interface ChatInterfaceProps {
  isPreview?: boolean;
  loadContext?: string;
}

const ChatInterface = ({ isPreview = false, loadContext }: ChatInterfaceProps) => {
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const { currentSuggestions } = useSuggestedQuestions();
  const navigate = useNavigate();
  
  // Enhanced system prompt that supports both search and chat modes
  const systemPrompt = `You are an AI assistant specialized in trucking operations and load management. You can operate in two modes:

**SEARCH MODE**: Help users find and analyze specific loads by ID, broker, route, or status. Provide detailed load information, status updates, and actionable insights.

**CHAT MODE**: Provide general trucking advice, compliance guidance, route optimization, and industry knowledge including:
- DOT regulations and compliance (HOS, ELD, safety requirements)
- Route optimization and fuel efficiency
- Equipment maintenance and safety
- Freight operations and logistics
- Payment processing and factoring
- Professional communication

When asking questions that could lead to specific actions, phrase them as yes/no questions when appropriate. For example:
- "Would you like to see the details for Load #1234?"
- "Should I show you the optimal route options?"
- "Would you like to check your payment status?"

Always provide practical, actionable advice in a clear, professional tone. Focus on safety, compliance, and profitability.`;

  // Custom addAIMessage that processes responses for interactive buttons
  const addAIMessageWithButtons = (content: string) => {
    const processed = InteractiveResponseService.processResponse(content);
    
    // Add the main content first
    const mainMessage = addAIMessage(processed.mainContent);
    
    // If there's an interactive question, add it as a separate message with buttons
    if (processed.questionContent && processed.interactiveButtons) {
      setTimeout(() => {
        addAIMessage(processed.questionContent!, processed.interactiveButtons);
      }, 500); // Small delay to show it's a separate message
    }
    
    return mainMessage;
  };

  const {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage,
    handleAPIKeySubmit,
    loadResults,
    showingResults,
    handleLoadSelect
  } = useUnifiedChatHandler({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage: addAIMessageWithButtons,
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

  if (!isInitialized) {
    return <ChatSetup onAPIKeySubmit={handleAPIKeySubmit} isLoading={isLoading} />;
  }

  return (
    <ChatContainer
      isInitialized={isInitialized}
      isLoading={isLoading}
      chatHistory={chatHistory}
      currentSuggestions={currentSuggestions}
      onChatMessage={handleChatMessage}
      onAPIKeySubmit={handleAPIKeySubmit}
      onLoadSelect={handleLoadSelect}
      onNavigate={navigate}
    />
  );
};

export default ChatInterface;
