
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoadAssistantProps {
  loadId: string;
}

const LoadAssistant = ({ loadId }: LoadAssistantProps) => {
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'assistant'}>>([
    { id: 1, text: `Hi! I'm your AI assistant for Load #${loadId}. I can help with routing, payments, requirements, and any questions you have.`, sender: 'assistant' }
  ]);
  const [inputValue, setInputValue] = useState("");
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

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      if (message.toLowerCase().includes("documents")) {
        response = "For this load, you'll need: Bill of Lading, Delivery Receipt, Weight Ticket, and Photos. I can help you upload them in the Documents section above.";
      } else if (message.toLowerCase().includes("delivery")) {
        response = "This load is due for delivery today at 4:30 PM at 3920 Southwest Blvd, Grove City, OH 43123. You have plenty of time!";
      } else if (message.toLowerCase().includes("fuel")) {
        response = "I've identified 3 optimal fuel stops on your route with the best prices. The recommended route will save you $12.50 in fuel costs.";
      } else if (message.toLowerCase().includes("payment")) {
        response = "This load pays $500.00. With Swift Logistics, payment is typically processed within 7 days. You can apply for a fuel advance to improve cash flow.";
      } else {
        response = "I understand your question about this load. Let me help you with that. Is there anything specific about routing, payments, or requirements you'd like to know?";
      }

      const assistantMessage = { id: Date.now() + 1, text: response, sender: 'assistant' as const };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>Load Assistant</span>
        </CardTitle>
        <CardDescription>
          Ask questions about this load, routing, payments, or requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages */}
        <div className="h-40 overflow-y-auto space-y-2 p-2 border rounded bg-slate-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border text-slate-700'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">Quick questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question) => (
              <Button 
                key={question}
                variant="outline" 
                size="sm" 
                className="text-xs p-2 h-auto text-left justify-start"
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
            className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button 
            size="sm" 
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadAssistant;
