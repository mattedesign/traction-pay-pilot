import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Clock, TrendingUp, Zap, Calculator, AlertCircle, Send, Bell } from "lucide-react";
import QuickPayNotification from "./QuickPayNotification";
import { LoadInProgress } from "@/types/brokerLoad";

interface QuickPayOptimizationProps {
  loads: LoadInProgress[];
}

const QuickPayOptimization = ({ loads }: QuickPayOptimizationProps) => {
  const quickPayEligibleLoads = loads.filter(load => load.quickPayEligible);
  const totalQuickPayValue = quickPayEligibleLoads.reduce((sum, load) => {
    return sum + parseFloat(load.quickPayRate?.replace('$', '').replace(',', '') || '0');
  }, 0);

  const totalOriginalValue = quickPayEligibleLoads.reduce((sum, load) => {
    return sum + parseFloat(load.rate.replace('$', '').replace(',', ''));
  }, 0);

  const totalDiscount = totalOriginalValue - totalQuickPayValue;
  const averageDiscount = quickPayEligibleLoads.length > 0 ? (totalDiscount / totalOriginalValue) * 100 : 0;

  // AI-powered optimization suggestions
  const optimizationSuggestions = [
    {
      title: "Immediate Cash Flow Boost",
      description: "Process QuickPay for all eligible loads to receive $" + totalQuickPayValue.toLocaleString() + " within 24 hours",
      impact: `+$${totalQuickPayValue.toLocaleString()} immediate`,
      priority: "high",
      action: "Process All QuickPay"
    },
    {
      title: "Carrier Relationship Optimization",
      description: "Offer QuickPay to ABC Trucking for their next 3 loads to strengthen partnership",
      impact: "Improved carrier retention",
      priority: "medium",
      action: "Send QuickPay Offer"
    },
    {
      title: "Seasonal Cash Flow Planning",
      description: "With Q4 approaching, consider increasing QuickPay usage by 25% to manage cash flow",
      impact: "Better seasonal planning",
      priority: "low",
      action: "Review Strategy"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertCircle className="w-4 h-4" />;
      case "medium": return <Clock className="w-4 h-4" />;
      case "low": return <TrendingUp className="w-4 h-4" />;
      default: return <Calculator className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* QuickPay Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">QuickPay Available</p>
                <p className="text-2xl font-bold text-green-600">${totalQuickPayValue.toLocaleString()}</p>
                <p className="text-sm text-slate-500 mt-1">{quickPayEligibleLoads.length} eligible loads</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Discount</p>
                <p className="text-2xl font-bold text-orange-600">${totalDiscount.toLocaleString()}</p>
                <p className="text-sm text-slate-500 mt-1">{averageDiscount.toFixed(1)}% average</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Cash Flow Impact</p>
                <p className="text-2xl font-bold text-blue-600">24hrs</p>
                <p className="text-sm text-slate-500 mt-1">vs 30-45 days</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="optimization" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="optimization" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>AI Optimization</span>
          </TabsTrigger>
          <TabsTrigger value="loads" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Eligible Loads</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Send Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="optimization">
          {/* AI Optimization Suggestions */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span>AI-Powered Optimization</span>
                <Badge className="bg-purple-100 text-purple-800">Beta</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {optimizationSuggestions.map((suggestion, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-slate-900">{suggestion.title}</h3>
                        <Badge className={getPriorityColor(suggestion.priority)}>
                          {getPriorityIcon(suggestion.priority)}
                          <span className="ml-1 capitalize">{suggestion.priority}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{suggestion.description}</p>
                      <p className="text-sm font-medium text-green-600">{suggestion.impact}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loads">
          {/* QuickPay Eligible Loads */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>QuickPay Eligible Loads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickPayEligibleLoads.map((load) => (
                <div key={load.id} className="flex justify-between items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{load.id}</h3>
                      <Badge className="bg-blue-100 text-blue-800 capitalize">
                        {load.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600">
                      <div>{load.carrier} • {load.origin} → {load.destination}</div>
                      <div className="text-xs text-slate-500 mt-1">ETA: {load.eta}</div>
                    </div>
                  </div>
                  <div className="text-right mr-4">
                    <div className="text-lg font-bold text-slate-900">{load.rate}</div>
                    <div className="text-sm text-green-600">QuickPay: {load.quickPayRate}</div>
                    <div className="text-xs text-red-600">
                      Discount: ${(parseFloat(load.rate.replace('$', '').replace(',', '')) - parseFloat(load.quickPayRate?.replace('$', '').replace(',', '') || '0')).toLocaleString()}
                    </div>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Zap className="w-4 h-4 mr-1" />
                    Process QuickPay
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <QuickPayNotification loads={loads} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuickPayOptimization;
