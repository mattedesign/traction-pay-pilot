
import { useState } from "react";

export interface ChatMessage {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

export const useChatMessages = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const addMessage = (message: ChatMessage) => {
    setChatHistory(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const userMessage: ChatMessage = {
      type: "user",
      content,
      timestamp: new Date()
    };
    addMessage(userMessage);
    return userMessage;
  };

  const addAIMessage = (content: string) => {
    const aiMessage: ChatMessage = {
      type: "ai",
      content,
      timestamp: new Date()
    };
    addMessage(aiMessage);
    return aiMessage;
  };

  return {
    chatHistory,
    addMessage,
    addUserMessage,
    addAIMessage
  };
};
