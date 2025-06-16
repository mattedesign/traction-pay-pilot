
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sun, 
  TrendingUp, 
  AlertCircle, 
  DollarSign, 
  CheckCircle,
  Clock,
  Target
} from "lucide-react";

interface MorningRoutineWidgetProps {
  metrics: {
    totalRevenue: number;
    profitMargin: number;
    fuelEfficiency: number;
    onTimePerformance: number;
  };
  activeLoads: number;
  coachingAlerts: number;
}

const MorningRoutineWidget = ({ metrics, activeLoads, coachingAlerts }: MorningRoutineWidgetProps) => {
  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const todaysPriorities = [
    { task: "Review load #BL-2024-001 route", priority: "high", estimatedTime: "5 min" },
    { task: "Upload delivery documents", priority: "medium", estimatedTime: "10 min" },
    { task: "Check fuel prices on route", priority: "low", estimatedTime: "3 min" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sun className="w-6 h-6 text-orange-500" />
          <span>{getTimeOfDayGreeting()}! Here's your business snapshot</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Quick Metrics */}
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">
              ${metrics.totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-slate-600">Expected Today</p>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">
              {(metrics.profitMargin * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-slate-600">Profit Margin</p>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{activeLoads}</p>
            <p className="text-sm text-slate-600">Active Loads</p>
          </div>

          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{coachingAlerts}</p>
            <p className="text-sm text-slate-600">Coach Insights</p>
          </div>
        </div>

        {/* Today's Priorities */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Today's Priorities
          </h3>
          
          <div className="space-y-3">
            {todaysPriorities.map((priority, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-900">{priority.task}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(priority.priority)}>
                    {priority.priority}
                  </Badge>
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {priority.estimatedTime}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full mt-4" variant="outline">
            View Full Daily Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MorningRoutineWidget;
