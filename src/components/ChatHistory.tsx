
import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { InteractiveButton } from "../hooks/useChatMessages";

interface ChatMessage {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
  interactiveButtons?: InteractiveButton[];
}

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onButtonClick?: (button: InteractiveButton) => void;
}

const ChatHistory = ({ messages, isLoading, onButtonClick }: ChatHistoryProps) => {
  return (
    <div className="space-y-3">
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          type={msg.type}
          content={msg.content}
          timestamp={msg.timestamp}
          interactiveButtons={msg.interactiveButtons}
          onButtonClick={onButtonClick}
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
