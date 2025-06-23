
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Route, CreditCard } from "lucide-react";
import ChatInterfaceMain from "./ChatInterfaceMain";
import { CarrierProfile } from "@/pages/Index";
import HomeDocumentUpload from "./HomeDocumentUpload";

interface ChatOnlyDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const ChatOnlyDashboard = ({ carrierProfile, userProfile }: ChatOnlyDashboardProps) => {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  const handleCardClick = (topic: string) => {
    setActiveConversation(topic);
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

      {/* Chat Interface */}
      <div className="border-t bg-white">
        <ChatInterfaceMain 
          carrierProfile={carrierProfile}
          userProfile={userProfile}
          initialTopic={activeConversation}
          onTopicChange={setActiveConversation}
        />
      </div>
    </div>
  );
};

export default ChatOnlyDashboard;
