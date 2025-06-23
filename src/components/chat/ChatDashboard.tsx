
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FunctionalChatInterface from "../FunctionalChatInterface";
import { CarrierProfile } from "@/pages/Index";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

interface ChatDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const ChatDashboard = ({ carrierProfile, userProfile }: ChatDashboardProps) => {
  const navigate = useNavigate();
  const chatRef = useRef<any>(null);

  const handleQuickAction = (query: string) => {
    // Fill the chat input and focus the chat interface
    if (chatRef.current) {
      chatRef.current.fillInputAndFocus(query);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="shrink-0 p-6 border-b bg-white" style={{ display: 'none' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">AI Assistant</h1>
            <p className="text-slate-600 mt-1">
              Get instant help with loads, routes, payments, and business insights
            </p>
          </div>
          <div className="text-sm text-slate-500">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              ● AI Online
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="shrink-0 p-6 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleQuickAction("What's the status of load #1234?")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Load Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-slate-600">Check status of any load</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleQu@ckAction("I need route optimization help")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Route Optimization</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-slate-600">Find best routes and save fuel</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleQuickAction("When should I expect payment for load #9012?")}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Payment Questions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-slate-600">Ask about invoices and payments</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-hidden">
          <FunctionalChatInterface 
            ref={chatRef}
            onNavigateToLoad={navigate}
            onFocusChange={() => {}}
            isFocused={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
