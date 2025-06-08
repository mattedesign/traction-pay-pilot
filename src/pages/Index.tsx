
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, FileText, MapPin, DollarSign, Route, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import NavigationSidebar from "@/components/NavigationSidebar";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const navigate = useNavigate();
  const [isChatFocused, setIsChatFocused] = useState(false);

  const handleChatFocus = (focused: boolean) => {
    setIsChatFocused(focused);
  };

  const suggestedActions = [
    {
      icon: Truck,
      title: "Track a load",
      description: "Monitor load status and location",
      color: "text-blue-600",
      onClick: () => {
        setIsChatFocused(true);
        // The ChatInterface will handle this through suggested questions
      }
    },
    {
      icon: FileText,
      title: "Check payment status",
      description: "View invoice and payment details",
      color: "text-green-600",
      onClick: () => {
        setIsChatFocused(true);
      }
    },
    {
      icon: Route,
      title: "Plan optimal route",
      description: "Get best routes for fuel efficiency",
      color: "text-purple-600",
      onClick: () => {
        setIsChatFocused(true);
      }
    },
    {
      icon: CreditCard,
      title: "QuickPay Available",
      description: "You have $1,250 available for QuickPay",
      color: "text-orange-600",
      onClick: () => {
        setIsChatFocused(true);
      }
    }
  ];

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      
      <div className="flex-1 flex flex-col relative">
        {/* Main Content Area - Hide when chat is focused */}
        {!isChatFocused && (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center">
              {/* Welcome Header */}
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                  Traction
                </h1>
                <p className="text-xl text-slate-600 max-w-lg mx-auto">
                  Less Friction, More Traction For Carriers
                </p>
              </div>

              {/* Suggested Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {suggestedActions.map((action, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-md transition-shadow cursor-pointer border border-slate-200 bg-white"
                    onClick={action.onClick}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center`}>
                          <action.icon className={`w-5 h-5 ${action.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900 mb-1">{action.title}</h3>
                          <p className="text-sm text-slate-600">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional Help */}
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-4">
                  Traction might provide inaccurate information. Always verify critical details.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chat Interface - Expand when focused */}
        <div className={`${isChatFocused ? 'flex-1' : 'absolute bottom-0 left-0 right-0'} p-4`}>
          <div className={`w-full max-w-4xl mx-auto ${isChatFocused ? 'h-full' : 'h-16'}`}>
            <FunctionalChatInterface 
              onNavigateToLoad={navigate} 
              onFocusChange={handleChatFocus}
              isFocused={isChatFocused}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
