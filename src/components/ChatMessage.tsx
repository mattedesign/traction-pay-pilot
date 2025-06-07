
import { Card, CardContent } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

const ChatMessage = ({ type, content, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex ${type === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          type === "user" ? "bg-blue-600" : "bg-slate-600"
        }`}>
          {type === "user" ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
        <Card className={`${type === "user" ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-200"}`}>
          <CardContent className="p-3">
            <p className="text-sm whitespace-pre-wrap">{content}</p>
            <p className="text-xs text-slate-500 mt-1">
              {timestamp.toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
