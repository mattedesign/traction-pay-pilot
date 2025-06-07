import { useState } from "react";
import { useAI } from "../hooks/useAI";
import APIKeyInput from "./APIKeyInput";
import ChatHistory from "./ChatHistory";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  isPreview?: boolean;
  loadContext?: string;
}

const ChatInterface = ({ isPreview = false, loadContext }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      type: "ai",
      content: "Hi there! I'm your AI assistant powered by Claude Sonnet. I'm here to help with your trucking operations, including load details, payment questions, route planning, and regulatory compliance. What can I help you with today?",
      timestamp: new Date()
    }
  ]);

  const { toast } = useToast();
  
  const systemPrompt = `You are an expert AI assistant specialized in trucking operations, logistics, and transportation industry. You have deep knowledge of:
- DOT regulations and compliance (HOS, ELD, safety requirements)
- Load management and freight operations
- Route optimization and fuel efficiency
- Payment terms, factoring, and cash flow management
- Equipment maintenance and inspections
- Border crossings and international freight
- Detention time and accessorial charges
- Truck stops, parking, and driver amenities

Provide practical, accurate, and industry-specific advice. Be conversational but professional. Always prioritize safety and legal compliance in your recommendations.

${loadContext ? `Context: Currently discussing ${loadContext}` : ''}`;

  const { isLoading, isInitialized, initializeService, sendMessage } = useAI({ 
    systemPrompt 
  });

  const suggestedQuestions = [
    "How do I handle a weight discrepancy on my BOL?",
    "What's the best fuel route from Chicago to Denver?", 
    "When should I expect payment on this load?",
    "Help me find cheapest fuel stops on I-80",
    "How do I submit my ELD logs for this trip?",
    "What documents do I need for Canada runs?",
    "Can I get a fuel advance on approved loads?",
    "How to dispute detention charges?",
    "Best truck stops with overnight parking near me",
    "Help me calculate my cost per mile"
  ];

  const getRandomSuggestions = () => {
    const shuffled = [...suggestedQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const [currentSuggestions] = useState(getRandomSuggestions());

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    if (!isInitialized) {
      toast({
        title: "API Key Required",
        description: "Please enter your Anthropic API key to use the AI assistant.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: ChatMessage = {
      type: "user",
      content: message,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage("");

    try {
      console.log('Preparing to send message to AI...');
      
      // Convert chat history to AI service format
      const messages = [...chatHistory, userMessage].map(msg => ({
        role: msg.type === "user" ? "user" as const : "assistant" as const,
        content: msg.content
      }));

      const response = await sendMessage(messages);
      
      if (response.error) {
        console.error('AI Service returned error:', response.error);
        
        // Add error message to chat
        const errorMessage: ChatMessage = {
          type: "ai",
          content: response.content,
          timestamp: new Date()
        };
        setChatHistory(prev => [...prev, errorMessage]);
        
        // Show different toast messages based on error type
        if (response.error.includes('CORS') || response.error.includes('Network')) {
          toast({
            title: "Browser Security Limitation",
            description: "Direct API calls are blocked. Consider using Supabase integration for secure AI functionality.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "AI Service Error",
            description: response.error,
            variant: "destructive"
          });
        }
        return;
      }

      const aiMessage: ChatMessage = {
        type: "ai",
        content: response.content,
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message to chat
      const errorMessage: ChatMessage = {
        type: "ai",
        content: "❌ Connection failed. This browser-based implementation has limitations due to CORS policies. For production use, consider setting up a backend service or using Lovable's Supabase integration.",
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Browser security limitations prevent direct API calls. Consider using a backend service.",
        variant: "destructive"
      });
    }
  };

  const handleAPIKeySubmit = async (key: string) => {
    console.log('Setting up AI service with provided key...');
    
    try {
      initializeService(key);
      
      toast({
        title: "AI Assistant Ready",
        description: "Your API key has been configured. You can now start chatting with the AI assistant.",
      });
      
    } catch (error) {
      console.error('API key setup error:', error);
      toast({
        title: "Setup Error",
        description: "There was an issue setting up the AI service. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isPreview) {
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
  }

  if (!isInitialized) {
    return (
      <div className="space-y-4">
        <APIKeyInput onKeySubmit={handleAPIKeySubmit} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ChatHistory messages={chatHistory} isLoading={isLoading} />
      <SuggestedQuestions 
        questions={currentSuggestions} 
        onQuestionClick={setMessage}
      />
      <ChatInput
        message={message}
        onMessageChange={setMessage}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatInterface;
