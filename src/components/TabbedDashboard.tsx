
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, MessageCircle } from "lucide-react";
import InsightsDashboard from "./insights/InsightsDashboard";
import MoneyDashboard from "./money/MoneyDashboard";
import ChatDashboard from "./chat/ChatDashboard";
import { CarrierProfile } from "@/pages/Index";

interface TabbedDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const TabbedDashboard = ({ carrierProfile, userProfile }: TabbedDashboardProps) => {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="shrink-0 border-b bg-white px-6 py-4">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="money" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Your Money
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="insights" className="h-full m-0">
            <InsightsDashboard carrierProfile={carrierProfile} userProfile={userProfile} />
          </TabsContent>
          
          <TabsContent value="money" className="h-full m-0">
            <MoneyDashboard carrierProfile={carrierProfile} userProfile={userProfile} />
          </TabsContent>
          
          <TabsContent value="chat" className="h-full m-0">
            <ChatDashboard carrierProfile={carrierProfile} userProfile={userProfile} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TabbedDashboard;
