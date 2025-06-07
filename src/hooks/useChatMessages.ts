
import { useState } from "react";

export interface ChatMessage {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

export const useChatMessages = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      type: "ai",
      content: "Hi there! I'm your AI assistant powered by Claude Sonnet. I'm here to help with your trucking operations, including load details, payment questions, route planning, and regulatory compliance. What can I help you with today?",
      timestamp: new Date()
    }
  ]);

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
