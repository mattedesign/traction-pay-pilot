
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, Paperclip } from "lucide-react";

interface Message {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

interface MockChatInterfaceProps {
  loadContext?: string;
}

const MockChatInterface = ({ loadContext }: MockChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const mockResponses = [
    "Based on your load details, I recommend taking I-71 South for optimal fuel efficiency and minimal traffic delays.",
    "For this route, you'll need to comply with Ohio DOT weight restrictions. Make sure your gross weight doesn't exceed 80,000 lbs.",
    "Payment for this load typically processes within 30 days. You can apply for quick pay to get funds within 24 hours for a small fee.",
    "I found 3 truck stops with overnight parking along your route. The closest one is TA Travel Center, 15 miles ahead.",
    "Your ELD hours show you have 8 hours of driving time remaining today. Plan your next break accordingly.",
    "Weather conditions look clear for your route today. No delays expected due to weather.",
    "For fuel optimization, I suggest stopping at the Pilot station in 45 miles - diesel is $0.12 cheaper per gallon there."
  ];

  const getRandomResponse = () => {
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = {
      type: "user",
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        type: "ai",
        content: getRandomResponse(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleAttachment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('File selected:', file.name);
        // Here you would handle the file upload
      }
    };
    input.click();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, index) => (
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
        
        {isTyping && (
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

      {/* Input area - centered horizontally */}
      <div className="flex justify-center">
        <div className="flex space-x-3 w-full max-w-2xl">
          <Input 
            placeholder="Ask about loads, routes, payments, compliance..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-14 text-lg"
            disabled={isTyping}
            style={{ borderRadius: '24px' }}
          />
          <Button 
            onClick={handleAttachment} 
            disabled={isTyping}
            className="h-14 w-14 rounded-full"
            size="icon"
            variant="outline"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button 
            onClick={handleSendMessage} 
            disabled={isTyping || !message.trim()}
            className="h-14 w-14 rounded-full"
            size="icon"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MockChatInterface;
