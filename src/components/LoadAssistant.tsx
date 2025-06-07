
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, User, Bot, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoadAssistantProps {
  loadId: string;
}

const LoadAssistant = ({ loadId }: LoadAssistantProps) => {
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'assistant'}>>([
    { id: 1, text: `Hi! I'm your AI assistant for Load #${loadId}. I can help with routing, payments, requirements, and any questions you have. 🚛`, sender: 'assistant' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const quickQuestions = [
    "What documents do I need?",
    "When is delivery due?",
    "Best fuel stops on route?",
    "Payment terms?"
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    console.log("Sending message to AI assistant:", message);
    
    // Add user message
    const userMessage = { id: Date.now(), text: message, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      let response = "";
      if (message.toLowerCase().includes("documents")) {
        response = "For this load, you'll need: Bill of Lading, Delivery Receipt, Weight Ticket, and Photos. I can help you upload them in the Documents section above. 📄";
      } else if (message.toLowerCase().includes("delivery")) {
        response = "This load is due for delivery today at 4:30 PM at 3920 Southwest Blvd, Grove City, OH 43123. You have plenty of time! ⏰";
      } else if (message.toLowerCase().includes("fuel")) {
        response = "I've identified 3 optimal fuel stops on your route with the best prices. The recommended route will save you $12.50 in fuel costs. ⛽";
      } else if (message.toLowerCase().includes("payment")) {
        response = "This load pays $500.00. With Swift Logistics, payment is typically processed within 7 days. You can apply for a fuel advance to improve cash flow. 💰";
      } else {
        response = "I understand your question about this load. Let me help you with that. Is there anything specific about routing, payments, or requirements you'd like to know? 🤔";
      }

      const assistantMessage = { id: Date.now() + 1, text: response, sender: 'assistant' as const };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <Card className="bg-white border-slate-200 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* AI Brain Network Visualization */}
      <div className="absolute top-2 right-2 w-20 h-16 opacity-6">
        <svg viewBox="0 0 80 64" className="w-full h-full">
          {/* Neural network nodes */}
          <circle cx="20" cy="16" r="3" className="fill-slate-300">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="40" cy="32" r="4" className="fill-slate-400">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="60" cy="16" r="3" className="fill-slate-300">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="60" cy="48" r="3" className="fill-slate-300">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" begin="0.3s" />
          </circle>
          {/* Connections */}
          <line x1="20" y1="16" x2="40" y2="32" stroke="currentColor" strokeWidth="1" className="text-slate-200" opacity="0.6" />
          <line x1="40" y1="32" x2="60" y2="16" stroke="currentColor" strokeWidth="1" className="text-slate-200" opacity="0.6" />
          <line x1="40" y1="32" x2="60" y2="48" stroke="currentColor" strokeWidth="1" className="text-slate-200" opacity="0.6" />
        </svg>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-slate-800">Load Assistant</span>
              <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
                <Sparkles className="w-3 h-3 text-slate-500" />
                <span className="text-xs font-medium text-slate-600">AI Powered</span>
              </div>
            </CardTitle>
            <CardDescription className="text-slate-500">
              Ask questions about this load, routing, payments, or requirements
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        {/* Messages */}
        <div className="h-40 overflow-y-auto space-y-3 p-3 border border-slate-200 rounded-lg bg-slate-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start space-x-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'assistant' && (
                <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <Bot className="w-3 h-3 text-slate-500" />
                </div>
              )}
              <div 
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  message.sender === 'user' 
                    ? 'bg-slate-700 text-white ml-2' 
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {message.text}
              </div>
              {message.sender === 'user' && (
                <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                <Bot className="w-3 h-3 text-slate-500" />
              </div>
              <div className="bg-white border border-slate-200 rounded-lg px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600 flex items-center">
            <Sparkles className="w-3 h-3 mr-1 text-slate-500" />
            Quick questions:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question) => (
              <Button 
                key={question}
                variant="outline" 
                size="sm" 
                className="text-xs p-2 h-auto text-left justify-start bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Ask me anything about this load..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white transition-all duration-200"
          />
          <Button 
            size="sm" 
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="bg-slate-700 hover:bg-slate-800 transition-colors duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadAssistant;
