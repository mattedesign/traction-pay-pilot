
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard, 
  Clock, 
  AlertTriangle,
  BarChart3,
  PieChart,
  Calendar,
  Target
} from "lucide-react";
import { LoadInProgress } from "@/types/brokerLoad";

interface ComprehensiveFinancialDashboardProps {
  loads: LoadInProgress[];
}

const ComprehensiveFinancialDashboard = ({ loads }: ComprehensiveFinancialDashboardProps) => {
  // Calculate financial metrics
  const totalRevenue = loads.reduce((sum, load) => {
    return sum + parseFloat(load.rate.replace('$', '').replace(',', ''));
  }, 0);

  const quickPayEligibleLoads = loads.filter(load => load.quickPayEligible);
  const quickPayRevenue = quickPayEligibleLoads.reduce((sum, load) => {
    return sum + parseFloat(load.quickPayRate?.replace('$', '').replace(',', '') || '0');
  }, 0);

  const deliveredLoads = loads.filter(load => load.status === 'delivered');
  const inTransitLoads = loads.filter(load => load.status === 'in_transit');
  const pendingLoads = loads.filter(load => load.status === 'pickup_scheduled' || load.status === 'delivery_scheduled');

  const averageLoadValue = totalRevenue / loads.length || 0;
  const quickPayAdoptionRate = (quickPayEligibleLoads.length / loads.length) * 100 || 0;
  const profitMargin = 18.5; // Simulated profit margin
  const monthlyGrowth = 12.3; // Simulated monthly growth

  // Revenue metrics
  const revenueMetrics = [
    {
      title: "Total Revenue Pipeline",
      value: `$${totalRevenue.toLocaleString()}`,
      change: `+${monthlyGrowth}%`,
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Total value of all active loads"
    },
    {
      title: "Avg Profit Margin",
      value: `${profitMargin}%`,
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Average profit margin across loads"
    },
    {
      title: "QuickPay Adoption",
      value: `${Math.round(quickPayAdoptionRate)}%`,
      change: `${quickPayEligibleLoads.length} loads`,
      trend: "up",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Percentage of loads using QuickPay"
    },
    {
      title: "Avg Load Value",
      value: `$${Math.round(averageLoadValue).toLocaleString()}`,
      change: "+8.2%",
      trend: "up",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Average revenue per load"
    }
  ];

  // Cash flow timeline data
  const cashFlowItems = [
    {
      type: "incoming",
      amount: "$45,680",
      description: "3 loads delivering today",
      time: "Today",
      status: "confirmed"
    },
    {
      type: "incoming",
      amount: "$38,920",
      description: "2 loads delivering tomorrow",
      time: "Tomorrow",
      status: "scheduled"
    },
    {
      type: "quickpay",
      amount: "$28,150",
      description: "QuickPay available now",
      time: "Available",
      status: "available"
    },
    {
      type: "incoming",
      amount: "$67,400",
      description: "4 loads completing this week",
      time: "This Week",
      status: "scheduled"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueMetrics.map((metric, index) => (
          <Card key={index} className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
                  <p className={`text-sm ${metric.color} flex items-center mt-2`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {metric.change}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{metric.description}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Optimization & Cash Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Load Revenue Breakdown */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Load Revenue Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold text-blue-900">In Transit</div>
                  <div className="text-sm text-blue-700">{inTransitLoads.length} loads</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-900">
                    ${inTransitLoads.reduce((sum, load) => sum + parseFloat(load.rate.replace('$', '').replace(',', '')), 0).toLocaleString()}
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    {Math.round((inTransitLoads.length / loads.length) * 100)}%
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <div className="font-semibold text-orange-900">Pending Delivery</div>
                  <div className="text-sm text-orange-700">{pendingLoads.length} loads</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-orange-900">
                    ${pendingLoads.reduce((sum, load) => sum + parseFloat(load.rate.replace('$', '').replace(',', '')), 0).toLocaleString()}
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    {Math.round((pendingLoads.length / loads.length) * 100)}%
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold text-green-900">Delivered</div>
                  <div className="text-sm text-green-700">{deliveredLoads.length} loads</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-900">
                    ${deliveredLoads.reduce((sum, load) => sum + parseFloat(load.rate.replace('$', '').replace(',', '')), 0).toLocaleString()}
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {Math.round((deliveredLoads.length / loads.length) * 100)}%
                  </Badge>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Cash Flow Timeline */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Cash Flow Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {cashFlowItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="font-medium text-slate-900">{item.amount}</div>
                      {item.type === 'quickpay' && (
                        <Badge className="bg-purple-100 text-purple-800 text-xs">QuickPay</Badge>
                      )}
                      {item.status === 'available' && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Available Now</Badge>
                      )}
                    </div>
                    <div className="text-sm text-slate-600">{item.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-700">{item.time}</div>
                    <div className={`text-xs ${
                      item.status === 'confirmed' ? 'text-green-600' :
                      item.status === 'available' ? 'text-purple-600' : 'text-orange-600'
                    }`}>
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">Total Available:</span>
                <span className="font-bold text-green-600">
                  ${(45680 + 28150).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QuickPay Optimization */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>QuickPay Revenue Optimization</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-900">${quickPayRevenue.toLocaleString()}</div>
              <div className="text-sm text-purple-700">Available for QuickPay</div>
              <div className="text-xs text-purple-600 mt-1">{quickPayEligibleLoads.length} eligible loads</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">{Math.round(quickPayAdoptionRate)}%</div>
              <div className="text-sm text-blue-700">Adoption Rate</div>
              <div className="text-xs text-blue-600 mt-1">vs 65% industry avg</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-900">$2,847</div>
              <div className="text-sm text-green-700">Potential Monthly Savings</div>
              <div className="text-xs text-green-600 mt-1">from improved cash flow</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <div className="font-medium text-amber-900">Revenue Optimization Tip</div>
                <div className="text-sm text-amber-800 mt-1">
                  Increasing QuickPay adoption to 80% could improve cash flow by $4,200/month and reduce collection time by 15 days.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveFinancialDashboard;
