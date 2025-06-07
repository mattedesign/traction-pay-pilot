
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, Bot, User, DollarSign, MapPin, Fuel, Clock } from "lucide-react";

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
      content: "Hi there! I'm here to help with your trucking operations. Whether you need help with load details, payment questions, route planning, or regulatory compliance, I'm ready to assist. What's on your mind?",
      timestamp: new Date()
    }
  ]);

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

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      type: "user",
      content: message,
      timestamp: new Date()
    };

    // More realistic AI responses based on message content
    let aiResponse = "";
    const msgLower = message.toLowerCase();
    
    if (msgLower.includes("weight") && (msgLower.includes("discrepancy") || msgLower.includes("difference"))) {
      aiResponse = "Weight discrepancies are common but manageable. First, check if you have a weight ticket from the shipper. If not, you'll want to get one at the nearest certified scale. Most brokers understand that BOL weights aren't always accurate - drivers often estimate. Document everything with photos and keep your scale ticket. Would you like me to help you draft an email to the broker explaining the situation?";
    } else if (msgLower.includes("fuel") && (msgLower.includes("route") || msgLower.includes("cheap") || msgLower.includes("stop"))) {
      aiResponse = "I can help you find the most cost-effective fuel route. Based on current diesel prices and your fuel card discounts, I'd recommend planning stops every 300-400 miles. Pilot Flying J and TA/Petro typically offer the best rewards programs. Want me to map out specific stops for your route? Also, don't forget to factor in whether you need overnight parking - sometimes it's worth paying a few cents more per gallon for a safe parking spot.";
    } else if (msgLower.includes("payment") || msgLower.includes("paid") || msgLower.includes("invoice")) {
      aiResponse = "Payment timing depends on your broker's terms and whether all paperwork is complete. Most brokers pay within 15-30 days of delivery, but some offer QuickPay for a small fee (usually 1-3%). Make sure you've submitted your signed BOL, delivery receipt, and any required photos. If it's been over 30 days, you have every right to follow up. Need help checking the status or drafting a professional follow-up message?";
    } else if (msgLower.includes("eld") || msgLower.includes("log") || msgLower.includes("hours")) {
      aiResponse = "ELD compliance is crucial for avoiding violations. Make sure your device is properly recording drive time, on-duty time, and sleeper berth periods. If you're having technical issues, document them with screenshots - the FMCSA understands that technology isn't perfect. For this trip, ensure you're logging pre-trip and post-trip inspections correctly. Need help understanding the 14-hour rule or planning your next rest break?";
    } else if (msgLower.includes("canada") || msgLower.includes("border") || msgLower.includes("cross")) {
      aiResponse = "Canadian runs require additional documentation. You'll need your passport or FAST card, commercial invoice, packing list, and sometimes a PARS sticker. Make sure your carrier has Canadian authority and proper insurance coverage. Border wait times can be unpredictable, so plan extra time. The ArriveCAN app is also required for entry. Have you crossed into Canada before, or is this your first international load?";
    } else if (msgLower.includes("detention") || msgLower.includes("wait") || msgLower.includes("delay")) {
      aiResponse = "Detention time is billable after the free time expires (usually 2 hours for loading/unloading). Document everything: arrival time, when you checked in, when loading/unloading started and finished. Take photos of your arrival and any delays. Most detention pays $25-50 per hour. If the shipper or receiver won't sign your detention form, note the refusal and report it to your broker. Every minute over free time is money you've earned.";
    } else if (msgLower.includes("truck stop") || msgLower.includes("parking")) {
      aiResponse = "Finding safe overnight parking is always a priority. Truck stops usually charge $10-15 for reserved parking, but it's worth it for security and amenities. Free parking can be found at some Walmarts, rest areas (where legal), and industrial areas, but always check local ordinances. Apps like Trucker Path and ParkMyTruck can help you find available spots. For your route, I'd recommend booking ahead if you're running tight on hours.";
    } else if (msgLower.includes("cost per mile") || msgLower.includes("profit") || msgLower.includes("expense")) {
      aiResponse = "Calculating cost per mile helps you determine profitable loads. Include fuel, maintenance, insurance, permits, depreciation, and your time. Most owner-operators need at least $1.50-2.00 per mile to break even, depending on their operation. Factor in deadhead miles too - that empty return trip costs money. Track everything: fuel receipts, maintenance costs, tolls. The more accurate your data, the better decisions you can make about which loads to accept.";
    } else {
      aiResponse = "I understand your question. Let me help you with that. As an AI assistant focused on trucking operations, I have access to current industry information, regulations, and best practices. Feel free to ask about anything related to your loads, compliance, route planning, or business operations. What specific aspect would you like me to dive deeper into?";
    }

    const aiMessage: ChatMessage = {
      type: "ai",
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
