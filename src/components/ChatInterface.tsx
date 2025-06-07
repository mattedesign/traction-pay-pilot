import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, Bot, User, AlertCircle } from "lucide-react";
import { useAI } from "../hooks/useAI";
import APIKeyInput from "./APIKeyInput";
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
          content: `⚠️ ${response.content}`,
          timestamp: new Date()
        };
        setChatHistory(prev => [...prev, errorMessage]);
        
        toast({
          title: "AI Service Error",
          description: response.error,
          variant: "destructive"
        });
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
        content: "❌ I'm having trouble connecting right now. Please check your API key and try again.",
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to get AI response. Please check your API key and internet connection.",
        variant: "destructive"
      });
    }
  };

  const handleAPIKeySubmit = async (key: string) => {
    console.log('Testing API key...');
    
    try {
      initializeService(key);
      
      // Test the API key with a simple request
      const testResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 10,
          system: "You are a helpful assistant.",
          messages: [{ role: 'user', content: 'Hi' }]
        })
      });

      if (!testResponse.ok) {
        const errorText = await testResponse.text();
        console.error('API key test failed:', errorText);
        
        if (testResponse.status === 401) {
          throw new Error('Invalid API key. Please check your Anthropic API key.');
        } else {
          throw new Error(`API test failed: ${testResponse.status}`);
        }
      }
      
      toast({
        title: "AI Assistant Connected",
        description: "Claude Sonnet is now ready to help with your trucking operations.",
      });
      
    } catch (error) {
      console.error('API key test error:', error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect to AI service.",
        variant: "destructive"
      });
    }
  };

  if (isPreview) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {currentSuggestions.slice(0, 3).map((question, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="cursor-pointer hover:bg-blue-50 text-xs"
            >
              {question}
            </Badge>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input 
            placeholder="Ask about loads, routes, payments, compliance..."
            className="flex-1"
            disabled
          />
          <Button disabled>
            <Send className="w-4 h-4" />
          </Button>
        </div>
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
      {/* Chat History */}
      <div className="max-h-96 overflow-y-auto space-y-3">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-start space-x-2 max-w-[80%] ${msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                msg.type === "user" ? "bg-blue-600" : "bg-slate-600"
              }`}>
                {msg.type === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <Card className={`${msg.type === "user" ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-200"}`}>
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-600">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {currentSuggestions.map((question, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="cursor-pointer hover:bg-blue-50 text-xs"
            onClick={() => setMessage(question)}
          >
            {question}
          </Badge>
        ))}
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <Input 
          placeholder="Ask about loads, routes, payments, compliance..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1"
          disabled={isLoading}
        />
        <Button variant="outline" size="icon" disabled={isLoading}>
          <Mic className="w-4 h-4" />
        </Button>
        <Button onClick={handleSendMessage} disabled={isLoading || !message.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
