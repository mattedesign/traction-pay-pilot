
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, User } from "lucide-react";
import { InteractiveButton } from "../hooks/useChatMessages";

interface ChatMessageProps {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
  interactiveButtons?: InteractiveButton[];
  onButtonClick?: (button: InteractiveButton) => void;
}

const ChatMessage = ({ type, content, timestamp, interactiveButtons, onButtonClick }: ChatMessageProps) => {
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
        <div className="space-y-2">
          <Card className={`${type === "user" ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-200"}`}>
            <CardContent className="p-3">
              <p className="text-sm whitespace-pre-wrap">{content}</p>
              <p className="text-xs text-slate-500 mt-1">
                {timestamp.toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>
          
          {/* Interactive Buttons - only for AI messages */}
          {type === "ai" && interactiveButtons && interactiveButtons.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {interactiveButtons.map((button) => (
                <Button
                  key={button.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onButtonClick?.(button)}
                  className="text-xs bg-white hover:bg-slate-50 border-slate-300"
                >
                  {button.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
