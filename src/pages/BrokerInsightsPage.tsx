
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Truck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";

const BrokerInsightsPage = () => {
  const { profile, signOut } = useAuth();

  const insights = [
    { label: "Monthly Revenue", value: "$245,680", change: "+12%", icon: TrendingUp },
    { label: "Active Carriers", value: "156", change: "+8%", icon: Users },
    { label: "Loads Completed", value: "1,248", change: "+15%", icon: Truck },
    { label: "Avg Load Rate", value: "$1,967", change: "+5%", icon: BarChart3 },
  ];

  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Insights</h1>
              <p className="text-slate-600">Analytics and performance metrics</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {insights.map((insight, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{insight.label}</p>
                      <p className="text-2xl font-bold text-slate-900">{insight.value}</p>
                      <p className="text-sm text-green-600">{insight.change} from last month</p>
                    </div>
                    <insight.icon className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-slate-500">
                Charts and detailed analytics will be displayed here
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrokerInsightsPage;
