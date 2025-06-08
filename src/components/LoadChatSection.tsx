
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from "./ChatInterface";
import { LoadContextProvider } from "./LoadContextProvider";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Brain } from "lucide-react";

interface LoadChatSectionProps {
  loadId: string;
}

const LoadChatSection = ({ loadId }: LoadChatSectionProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isVisible]);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-10">
        <Button
          onClick={() => setIsVisible(true)}
          className="rounded-full shadow-lg"
          title="Open AI assistant"
        >
          <Brain className="w-4 h-4 mr-2" />
          Ask AI
        </Button>
      </div>
    );
  }

  return (
    <LoadContextProvider loadId={loadId}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ask About Load #{loadId}</CardTitle>
              <CardDescription>
                AI assistant with complete access to load details, documents, and communications
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="h-8 w-8"
              title="Close chat (Esc)"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ChatInterface loadContext={`Load #${loadId}`} />
        </CardContent>
      </Card>
    </LoadContextProvider>
  );
};

export default LoadChatSection;
