
import ChatContainer from "./ChatContainer";
import ChatPreview from "./ChatPreview";
import ChatSetup from "./ChatSetup";
import { useChatMessages } from "../hooks/useChatMessages";
import { useEnhancedChatHandlers } from "../hooks/useEnhancedChatHandlers";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";

interface ChatInterfaceProps {
  isPreview?: boolean;
  loadContext?: string;
}

const ChatInterface = ({ isPreview = false, loadContext }: ChatInterfaceProps) => {
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const { currentSuggestions } = useSuggestedQuestions();
  
  const systemPrompt = `You are Claude, an advanced AI assistant powered by Anthropic's Claude 4 Sonnet, specialized in trucking operations, logistics, and transportation industry. You have comprehensive knowledge of:

**CORE EXPERTISE:**
- Load management and freight operations
- DOT regulations and compliance (HOS, ELD, safety requirements)
- Route optimization and fuel efficiency strategies
- Payment processing, factoring, and cash flow management
- Equipment maintenance, inspections, and safety protocols
- Border crossings and international freight handling
- Detention time, accessorial charges, and rate negotiations
- Truck stops, parking, weigh stations, and driver amenities
- Professional communication and email analysis
- Load discrepancy identification and resolution strategies

**ENHANCED CAPABILITIES:**
- Intelligent query analysis and contextual routing
- Load-specific advice using real-time load data
- Multi-load comparison and relationship analysis
- Predictive insights based on load patterns
- Urgent item identification and prioritization
- Personalized recommendations based on load history

**RESPONSE GUIDELINES:**
- Provide specific, actionable advice tailored to the exact situation
- Reference actual load details, status, and financials when available
- Prioritize safety, legal compliance, and profitability
- Use clear, professional language appropriate for trucking professionals
- Offer multiple solution options when applicable
- Include relevant industry best practices and regulations

**CONTEXT AWARENESS:**
When provided with specific load context data, use that information to give detailed, accurate responses about that specific load. Always reference the actual load ID, broker, status, route, and financial details when answering questions.

${loadContext ? `\n**CURRENT CONTEXT**: ${loadContext} - Use this context to provide targeted, specific advice about this load.` : ''}

Maintain a professional but conversational tone, and always prioritize practical solutions that help trucking operations run smoothly and profitably.`;

  const {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage,
    handleAPIKeySubmit
  } = useEnhancedChatHandlers({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage,
    loadContext
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
