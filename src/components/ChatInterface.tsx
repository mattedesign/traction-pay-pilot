
import ChatContainer from "./ChatContainer";
import ChatPreview from "./ChatPreview";
import ChatSetup from "./ChatSetup";
import { useChatMessages } from "../hooks/useChatMessages";
import { useClaude } from "../hooks/useClaude";
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
  
  // Simple Claude system prompt for general trucking knowledge
  const systemPrompt = `You are Claude, an AI assistant specialized in trucking operations, logistics, and transportation industry. You have comprehensive knowledge of:

- DOT regulations and compliance (HOS, ELD, safety requirements)
- Route optimization and fuel efficiency
- Equipment maintenance and safety
- Freight operations and logistics
- Payment processing and factoring
- Professional communication

Provide practical, actionable advice in a clear, professional tone. Focus on safety, compliance, and profitability.`;

  const { isLoading, isInitialized, initializeService, sendMessage } = useClaude({
    systemPrompt
  });

  const handleAPIKeySubmit = (apiKey: string) => {
    initializeService(apiKey);
  };

  const handleChatMessage = async (message: string) => {
    if (!message.trim()) return;

    addUserMessage(message);

    try {
      const messages = [
        ...chatHistory.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        { role: 'user' as const, content: message }
      ];

      const response = await sendMessage(messages);
      addAIMessage(response);
    } catch (error) {
      console.error('Error sending message to Claude:', error);
      addAIMessage('Sorry, I encountered an error. Please try again.');
    }
  };

  const handleLoadSelect = (loadId: string) => {
    navigate(`/load/${loadId}`);
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
    />
  );
};

export default ChatInterface;
