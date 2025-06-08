
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
      content: "Hi there! I'm Claude, your AI assistant specialized in trucking operations and logistics. I'm powered by Anthropic's advanced AI and can help you with load management, payment questions, route planning, regulatory compliance, email analysis, and much more. What can I help you with today?",
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
