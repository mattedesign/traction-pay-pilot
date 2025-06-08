
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Minimize2, Maximize2 } from "lucide-react";
import ChatInterface from "./ChatInterface";
import { LoadContextProvider } from "./LoadContextProvider";

interface FloatingChatWidgetProps {
  loadId?: string;
}

const FloatingChatWidget = ({ loadId }: FloatingChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggle = () => {
    if (isOpen && !isMinimized) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={handleToggle}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50"
          size="icon"
          title="Open AI Assistant"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card 
          className={`fixed right-6 bottom-6 shadow-2xl border-2 z-50 transition-all duration-200 ${
            isMinimized 
              ? 'w-80 h-16' 
              : 'w-96 h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-slate-50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-slate-900">
                AI Assistant
                {loadId && (
                  <span className="text-sm text-slate-500 ml-2">• Load #{loadId}</span>
                )}
              </h3>
            </div>
            <div className="flex items-center space-x-1">
              {!isMinimized && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMinimize}
                  className="h-8 w-8"
                  title="Minimize"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              )}
              {isMinimized && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMaximize}
                  className="h-8 w-8"
                  title="Maximize"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8"
                title="Close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="flex-1 h-full overflow-hidden">
              <LoadContextProvider loadId={loadId}>
                <div className="p-4 h-full">
                  <ChatInterface loadContext={loadId} />
                </div>
              </LoadContextProvider>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default FloatingChatWidget;
