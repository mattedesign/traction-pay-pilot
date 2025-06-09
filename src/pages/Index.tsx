
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, FileText, MapPin, DollarSign, Route, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import NavigationSidebar from "@/components/NavigationSidebar";
import FunctionalChatInterface from "@/components/FunctionalChatInterface";

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
      backgroundColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-700",
      textColor: "text-yellow-900",
      onClick: () => {
        setIsChatFocused(true);
      }
    },
    {
      icon: FileText,
      title: "Check payment status", 
      description: "View invoice and payment details",
      backgroundColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-700",
      textColor: "text-purple-900",
      onClick: () => {
        setIsChatFocused(true);
      }
    },
    {
      icon: Route,
      title: "Plan optimal route",
      description: "Get best routes for fuel efficiency", 
      backgroundColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-700",
      textColor: "text-blue-900",
      onClick: () => {
        setIsChatFocused(true);
      }
    },
    {
      icon: CreditCard,
      title: "QuickPay Available",
      description: "You have $1,250 available for QuickPay",
      backgroundColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-700",
      textColor: "text-green-900",
      onClick: () => {
        setIsChatFocused(true);
      }
    }
  ];

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      
      {/* Main content area with full viewport height and flex column */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Content area that fills remaining space when chat not focused */}
        <div className="flex-1 flex flex-col min-h-0">
          {!isChatFocused && (
            <div className="flex-1 flex items-center justify-center px-8">
              <div className="flex flex-col items-center w-full">
                {/* Welcome Header */}
                <div className="text-center mb-8">
                  {/* Logo and Title in horizontal layout with reduced gap */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/dfd9fdbf-b823-4362-8ae5-78923d41e1ba.png" 
                        alt="Traction Logo" 
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900">
                      Traction
                    </h1>
                  </div>
                  <p className="text-xl text-slate-600 max-w-lg mx-auto">
                    Less Friction, More Traction For Carriers
                  </p>
                </div>

                {/* Suggested Actions with colored backgrounds - Full width with padding */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
                  {suggestedActions.map((action, index) => (
                    <Card 
                      key={index} 
                      className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${action.backgroundColor} ${action.borderColor} border-2 hover:scale-105`}
                      onClick={action.onClick}
                    >
                      <CardContent className="p-8">
                        <div className="flex flex-col items-start space-y-4">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                            <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                          </div>
                          <div>
                            <h3 className={`font-semibold text-lg ${action.textColor} mb-2`}>{action.title}</h3>
                            <p className={`text-sm ${action.textColor} opacity-80`}>{action.description}</p>
                          </div>
                          <div className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                            <span>Read more</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
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

          {/* Chat content area that expands when focused */}
          {isChatFocused && (
            <div className="flex-1 flex flex-col min-h-0">
              <FunctionalChatInterface 
                onNavigateToLoad={navigate} 
                onFocusChange={handleChatFocus} 
                isFocused={isChatFocused} 
              />
            </div>
          )}
        </div>

        {/* Chat input always at bottom when not focused */}
        {!isChatFocused && (
          <div className="shrink-0 px-8 pb-4">
            <div className="w-full">
              <FunctionalChatInterface 
                onNavigateToLoad={navigate} 
                onFocusChange={handleChatFocus} 
                isFocused={isChatFocused} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
