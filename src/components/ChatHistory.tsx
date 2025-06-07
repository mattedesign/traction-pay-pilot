
import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";
import ChatMessage from "./ChatMessage";

interface ChatMessage {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatHistory = ({ messages, isLoading }: ChatHistoryProps) => {
  return (
    <div className="max-h-96 overflow-y-auto space-y-3">
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          type={msg.type}
          content={msg.content}
          timestamp={msg.timestamp}
        />
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
  );
};

export default ChatHistory;
