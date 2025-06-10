
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, CreditCard, Clock, AlertTriangle } from "lucide-react";

interface LoadInProgress {
  id: string;
  origin: string;
  destination: string;
  status: "pickup_scheduled" | "in_transit" | "delivery_scheduled" | "delivered";
  carrier: string;
  driver: string;
  currentLocation?: { lat: number; lng: number; city: string };
  pickupDate: string;
  deliveryDate: string;
  rate: string;
  distance: string;
  eta: string;
  lastUpdate: string;
  quickPayEligible?: boolean;
  quickPayRate?: string;
}

interface FinancialInsightsDashboardProps {
  loads: LoadInProgress[];
}

const FinancialInsightsDashboard = ({ loads }: FinancialInsightsDashboardProps) => {
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

  const averageLoadValue = totalRevenue / loads.length;
  const creditUtilization = 65; // Simulated value
  const availableCredit = 250000 - (totalRevenue * 0.3);

  const financialMetrics = [
    {
      title: "Total Revenue in Transit",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "QuickPay Available",
      value: `$${quickPayRevenue.toLocaleString()}`,
      change: `${quickPayEligibleLoads.length} loads`,
      trend: "up",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Avg Load Value",
      value: `$${Math.round(averageLoadValue).toLocaleString()}`,
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Credit Available",
      value: `$${Math.round(availableCredit).toLocaleString()}`,
      change: `${creditUtilization}% utilized`,
      trend: creditUtilization > 80 ? "down" : "up",
      icon: CreditCard,
      color: creditUtilization > 80 ? "text-red-600" : "text-green-600",
      bgColor: creditUtilization > 80 ? "bg-red-50" : "bg-green-50"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                  <p className={`text-sm ${metric.color} flex items-center mt-1`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 mr-1" />
                    )}
                    {metric.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Load Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-semibold text-blue-900">In Transit</div>
                <div className="text-sm text-blue-700">{inTransitLoads.length} loads</div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                ${inTransitLoads.reduce((sum, load) => sum + parseFloat(load.rate.replace('$', '').replace(',', '')), 0).toLocaleString()}
              </Badge>
            </div>

            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <div>
                <div className="font-semibold text-orange-900">Pending</div>
                <div className="text-sm text-orange-700">{pendingLoads.length} loads</div>
              </div>
              <Badge className="bg-orange-100 text-orange-800">
                ${pendingLoads.reduce((sum, load) => sum + parseFloat(load.rate.replace('$', '').replace(',', '')), 0).toLocaleString()}
              </Badge>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-semibold text-green-900">Delivered</div>
                <div className="text-sm text-green-700">{deliveredLoads.length} loads</div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                ${deliveredLoads.reduce((sum, load) => sum + parseFloat(load.rate.replace('$', '').replace(',', '')), 0).toLocaleString()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Payment Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {loads.slice(0, 4).map((load, index) => (
                <div key={load.id} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">{load.id}</div>
                    <div className="text-sm text-slate-600">{load.carrier}</div>
                    <div className="text-xs text-slate-500">
                      {load.status === 'delivered' ? 'Payment due' : `ETA: ${load.eta}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">{load.rate}</div>
                    {load.quickPayEligible && (
                      <div className="text-xs text-blue-600">QuickPay: {load.quickPayRate}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialInsightsDashboard;
