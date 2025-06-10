
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, FileText, MapPin, DollarSign, Route, CreditCard, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useCallback } from "react";
import NavigationSidebar from "@/components/NavigationSidebar";
import FunctionalChatInterface from "@/components/FunctionalChatInterface";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const [isChatFocused, setIsChatFocused] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | undefined>(undefined);
  const { profile, signOut } = useAuth();

  const handleChatFocus = useCallback((focused: boolean) => {
    console.log('Chat focus changed:', focused);
    setIsChatFocused(focused);
    if (!focused) {
      setCurrentAction(undefined);
    }
  }, []);

  const handleActionClick = useCallback((actionTitle: string) => {
    console.log('Action clicked:', actionTitle);
    setCurrentAction(actionTitle);
    setIsChatFocused(true);
  }, []);

  const suggestedActions = [{
    icon: Truck,
    title: "Track a load",
    description: "Monitor load status and location",
    onClick: () => handleActionClick("Track a Load")
  }, {
    icon: FileText,
    title: "Check payment status", 
    description: "View invoice and payment details",
    onClick: () => handleActionClick("Check Payment Status")
  }, {
    icon: Route,
    title: "Plan optimal route",
    description: "Get best routes for fuel efficiency", 
    onClick: () => handleActionClick("Plan Optimal Route")
  }, {
    icon: CreditCard,
    title: "QuickPay Available",
    description: "You have $1,250 available for QuickPay",
    onClick: () => handleActionClick("QuickPay Available")
  }];

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      
      {/* Main content area with stable layout */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header - conditionally rendered but doesn't affect layout */}
        {!isChatFocused && (
          <div className="bg-white border-b border-slate-200 px-8 py-4 shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-semibold text-slate-800">Carrier Dashboard</h1>
                <p className="text-slate-600">Welcome back, {profile?.first_name}!</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-sm">
                  <Truck className="w-3 h-3 mr-1" />
                  {profile?.company_name || 'Carrier Account'}
                </Badge>
                <Button variant="outline" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stable main content area - always takes remaining space */}
        <div className="flex-1 flex flex-col min-h-0 relative">
          {/* Welcome content - positioned absolutely to not affect layout */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${
            isChatFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <div className="h-full flex items-center justify-center px-8">
              <div className="flex flex-col items-center w-full">
                {/* Welcome Header */}
                <div className="text-center mb-8">
                  {/* Logo only - 30% smaller (from h-16 to h-11) */}
                  <div className="flex items-center justify-center mb-6 mx-0">
                    <div className="flex items-center justify-center">
                      <img alt="Traction Logo" className="h-11 object-contain" src="/lovable-uploads/2fa0b3cc-e679-429c-be88-4fd0f236e713.png" />
                    </div>
                  </div>
                  <p className="text-xl text-slate-600 max-w-lg mx-auto">
                    Less Friction, More Traction For Carriers
                  </p>
                </div>

                {/* Suggested Actions styled like the screenshot - simplified white cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-2xl">
                  {suggestedActions.map((action, index) => (
                    <Card 
                      key={index} 
                      className="bg-white border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-slate-300" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Card clicked - calling action for:', action.title);
                        // Use setTimeout to ensure the click is processed after any other handlers
                        setTimeout(() => {
                          action.onClick();
                        }, 0);
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                            <action.icon className="w-5 h-5 text-slate-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-slate-900 mb-1">{action.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{action.description}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat interface - always present but with stable positioning */}
          <div className="absolute inset-0 flex flex-col">
            <FunctionalChatInterface 
              onNavigateToLoad={navigate} 
              onFocusChange={handleChatFocus} 
              isFocused={isChatFocused}
              currentAction={currentAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
