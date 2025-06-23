
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Route, CreditCard } from "lucide-react";
import ChatDrawer from "./ChatDrawer";
import { CarrierProfile } from "@/pages/Index";
import HomeDocumentUpload from "./HomeDocumentUpload";
import ChatInput from "./ChatInput";

interface ChatOnlyDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const ChatOnlyDashboard = ({ carrierProfile, userProfile }: ChatOnlyDashboardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTopic, setDrawerTopic] = useState<string | null>(null);
  const [drawerMessage, setDrawerMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleCardClick = (topic: string) => {
    setDrawerTopic(topic);
    setDrawerMessage("");
    setIsDrawerOpen(true);
  };

  const handleInputFocus = () => {
    if (message.trim()) {
      setDrawerTopic(null);
      setDrawerMessage(message);
      setIsDrawerOpen(true);
    } else {
      setDrawerTopic(null);
      setDrawerMessage("");
      setIsDrawerOpen(true);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setDrawerTopic(null);
      setDrawerMessage(message);
      setMessage("");
      setIsDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerTopic(null);
    setDrawerMessage("");
  };

  const quickAccessCards = [
    {
      icon: Truck,
      title: "Load Status",
      description: "Check status of any load",
      topic: "load_status"
    },
    {
      icon: Route,
      title: "Route Optimization", 
      description: "Find best routes and save fuel",
      topic: "route_optimization"
    },
    {
      icon: CreditCard,
      title: "Payment Questions",
      description: "Ask about invoices and payments", 
      topic: "payment_questions"
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickAccessCards.map((card, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCardClick(card.topic)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <card.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{card.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Document Upload Section */}
          <HomeDocumentUpload />
        </div>
      </div>

      {/* Chat Input - Fixed at bottom */}
      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            message={message}
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
            isLoading={false}
            onFocus={handleInputFocus}
          />
        </div>
      </div>

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        carrierProfile={carrierProfile}
        userProfile={userProfile}
        initialTopic={drawerTopic}
        initialMessage={drawerMessage}
      />
    </div>
  );
};

export default ChatOnlyDashboard;
