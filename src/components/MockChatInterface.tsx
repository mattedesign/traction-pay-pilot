import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, Paperclip } from "lucide-react";

interface Message {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
  showPrompt?: boolean;
  promptActions?: {
    yes: () => void;
    no: () => void;
  };
}

interface MockChatInterfaceProps {
  loadContext?: string;
  onNavigateToLoad?: (path: string) => void;
}

interface MockChatInterfaceRef {
  simulateTrackLoad: () => void;
  simulatePlanRoute: () => void;
}

const MockChatInterface = forwardRef<MockChatInterfaceRef, MockChatInterfaceProps>(
  ({ loadContext, onNavigateToLoad }, ref) => {
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const simulateTyping = (text: string, callback?: () => void) => {
      setMessage("");
      inputRef.current?.focus();
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setMessage(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          if (callback) {
            setTimeout(callback, 500); // Wait a bit before executing callback
          }
        }
      }, 50); // Typing speed
    };

    const handlePromptResponse = (response: 'yes' | 'no', messageIndex: number, navigationType: 'load' | 'route') => {
      // Add user response message
      const userResponse: Message = {
        type: "user",
        content: response === 'yes' ? "Yes" : "No",
        timestamp: new Date()
      };
      
      // Remove prompt from the original message
      setMessages(prev => {
        const updated = [...prev];
        updated[messageIndex] = { ...updated[messageIndex], showPrompt: false };
        return [...updated, userResponse];
      });

      if (response === 'yes' && onNavigateToLoad) {
        // Add AI response and navigate
        setTimeout(() => {
          const aiResponse: Message = {
            type: "ai",
            content: navigationType === 'load' 
              ? "Taking you to the detailed load view now..." 
              : "Taking you to the route optimization page now...",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiResponse]);
          
          setTimeout(() => {
            if (navigationType === 'load') {
              onNavigateToLoad("/load/1234");
            } else {
              onNavigateToLoad("/route-options");
            }
          }, 1000);
        }, 500);
      } else if (response === 'no') {
        // Add AI response for no
        setTimeout(() => {
          const aiResponse: Message = {
            type: "ai",
            content: "No problem! Let me know if you need anything else.",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiResponse]);
        }, 500);
      }
    };

    const simulateTrackLoad = () => {
      // Focus the input and simulate typing
      simulateTyping("Load Status for 1234", () => {
        // Add the user message
        const userMessage: Message = {
          type: "user",
          content: "Load Status for 1234",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setMessage("");
        setIsTyping(true);

        // Show loading for 2 seconds, then show response with prompt
        setTimeout(() => {
          const aiResponse: Message = {
            type: "ai",
            content: "Load #1234 is currently pending pickup at 3875 S Elyria Rd, Shreve, OH 44676. Delivery scheduled for today at 4:30 PM to Grove City, OH. Would you like to view the detailed load information?",
            timestamp: new Date(),
            showPrompt: true,
            promptActions: {
              yes: () => handlePromptResponse('yes', messages.length + 1, 'load'),
              no: () => handlePromptResponse('no', messages.length + 1, 'load')
            }
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsTyping(false);
        }, 2000);
      });
    };

    const simulatePlanRoute = () => {
      // Focus the input and simulate typing
      simulateTyping("Plan Optimal Route for Load #0000", () => {
        // Add the user message
        const userMessage: Message = {
          type: "user",
          content: "Plan Optimal Route for Load #0000",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setMessage("");
        setIsTyping(true);

        // Show loading for 2 seconds, then show response with prompt
        setTimeout(() => {
          const aiResponse: Message = {
            type: "ai",
            content: "I've analyzed Load #0000 route from Chicago, IL to Dallas, TX. I found 3 optimized route options that can save you up to $45 in fuel costs and 2 hours of drive time. Would you like to see the detailed route suggestions?",
            timestamp: new Date(),
            showPrompt: true,
            promptActions: {
              yes: () => handlePromptResponse('yes', messages.length + 1, 'route'),
              no: () => handlePromptResponse('no', messages.length + 1, 'route')
            }
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsTyping(false);
        }, 2000);
      });
    };

    useImperativeHandle(ref, () => ({
      simulateTrackLoad,
      simulatePlanRoute
    }));

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
                <div className="flex flex-col space-y-2">
                  <Card className={`${msg.type === "user" ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-200"}`}>
                    <CardContent className="p-3">
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </CardContent>
                  </Card>
                  
                  {msg.showPrompt && msg.promptActions && (
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={msg.promptActions.yes}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Yes
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={msg.promptActions.no}
                      >
                        No
                      </Button>
                    </div>
                  )}
                </div>
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
              ref={inputRef}
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
  }
);

MockChatInterface.displayName = "MockChatInterface";

export default MockChatInterface;
