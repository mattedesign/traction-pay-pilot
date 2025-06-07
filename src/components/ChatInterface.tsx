
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, Bot, User, DollarSign, MapPin, Fuel, Clock } from "lucide-react";

interface ChatInterfaceProps {
  isPreview?: boolean;
  loadContext?: string;
}

const ChatInterface = ({ isPreview = false, loadContext }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai" as const,
      content: "Hi! I'm your Traction AI assistant. I can help you with load information, payment status, route optimization, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);

  const suggestedQuestions = [
    "When will I get paid for Load #1234?",
    "Show me my pending invoices",
    "What's the cheapest fuel route to Phoenix?",
    "Any exceptions I need to resolve?",
    "Apply for QuickPay on my approved loads"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      type: "user" as const,
      content: message,
      timestamp: new Date()
    };

    // Simulate AI response based on message content
    let aiResponse = "";
    if (message.toLowerCase().includes("paid") || message.toLowerCase().includes("payment")) {
      aiResponse = "You have $2,350 in pending payments. Load #1234 will be paid in 6 days (standard terms). I can offer QuickPay for $15 to get you paid in 24 hours instead. Would you like me to set that up?";
    } else if (message.toLowerCase().includes("fuel") || message.toLowerCase().includes("route")) {
      aiResponse = "Based on current fuel prices, I found a route that saves you $47 on fuel costs. The optimal route uses truck stops with your preferred fuel card. I can also arrange a fuel advance if needed.";
    } else if (message.toLowerCase().includes("exception")) {
      aiResponse = "You have 1 exception on Load #ABCD. The delivery weight differs from the bill of lading. I can help you contact the broker or submit corrected documentation.";
    } else {
      aiResponse = "I understand you're asking about " + message + ". Let me pull up your relevant load information and payment details to help you with this.";
    }

    const aiMessage = {
      type: "ai" as const,
      content: aiResponse,
      timestamp: new Date()
    };

    setChatHistory([...chatHistory, userMessage, aiMessage]);
    setMessage("");
  };

  if (isPreview) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.slice(0, 3).map((question, index) => (
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
            placeholder="Ask me anything about your loads, payments, routes..."
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
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question, index) => (
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
          placeholder="Ask me anything about your loads, payments, routes..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1"
        />
        <Button variant="outline" size="icon">
          <Mic className="w-4 h-4" />
        </Button>
        <Button onClick={handleSendMessage}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
