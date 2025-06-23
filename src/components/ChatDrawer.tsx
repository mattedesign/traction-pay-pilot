
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ChatInterfaceWrapper from "./ChatInterfaceWrapper";
import { CarrierProfile } from "@/pages/Index";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  carrierProfile: CarrierProfile;
  userProfile: any;
  initialTopic?: string | null;
  initialMessage?: string;
}

const ChatDrawer = ({
  isOpen,
  onClose,
  carrierProfile,
  userProfile,
  initialTopic = null,
  initialMessage = ""
}: ChatDrawerProps) => {
  const [currentTopic, setCurrentTopic] = useState<string | null>(initialTopic);

  // Update topic when initialTopic changes
  useEffect(() => {
    setCurrentTopic(initialTopic);
  }, [initialTopic]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    setCurrentTopic(null);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DrawerContent className="h-[95vh] max-h-[95vh]">
        <DrawerHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div>
            <DrawerTitle>AI Assistant</DrawerTitle>
            <DrawerDescription>
              Ask questions about loads, routes, payments, and more
            </DrawerDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
            title="Close chat (Esc)"
          >
            <X className="w-4 h-4" />
          </Button>
        </DrawerHeader>
        
        <div className="flex-1 overflow-hidden">
          <ChatInterfaceWrapper
            carrierProfile={carrierProfile}
            userProfile={userProfile}
            initialTopic={currentTopic}
            initialMessage={initialMessage}
            onTopicChange={setCurrentTopic}
            onNavigate={(path: string) => {
              // Close the drawer and navigate
              handleClose();
              window.location.href = path;
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;
