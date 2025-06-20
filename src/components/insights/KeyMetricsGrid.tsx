import { TrendingUp, TrendingDown, BarChart3, Target, Fuel, Clock } from "lucide-react";
import MetricCard from "./MetricCard";

const KeyMetricsGrid = () => {
  const metrics = [
    {
      title: "Total Revenue",
      subtitle: "Monthly earnings",
      value: "$127.5K",
      trendIcon: TrendingUp,
      trendValue: "+12.5%",
      trendLabel: "vs last period",
      icon: BarChart3,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trendColor: "text-green-600"
    },
    {
      title: "On-Time Rate",
      subtitle: "Delivery performance",
      value: "96.8%",
      trendIcon: TrendingUp,
      trendValue: "+2.1%",
      trendLabel: "vs last period",
      icon: Target,
      iconBgColor: "bg-green-50",
      iconColor: "text-green-600",
      trendColor: "text-green-600"
    },
    {
      title: "Active Loads",
      subtitle: "Currently in progress",
      value: "24",
      trendIcon: TrendingUp,
      trendValue: "+8.1%",
      trendLabel: "vs last period",
      icon: () => (
        <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded"></div>
        </div>
      ),
      iconBgColor: "bg-purple-50",
      iconColor: "",
      trendColor: "text-green-600"
    },
    {
      title: "Fuel Efficiency",
      subtitle: "Miles per gallon",
      value: "7.2",
      trendIcon: TrendingUp,
      trendValue: "+5.8%",
      trendLabel: "vs last period",
      icon: Fuel,
      iconBgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      trendColor: "text-green-600"
    },
    {
      title: "Avg Processing",
      subtitle: "Document processing speed",
      value: "2.4s",
      trendIcon: TrendingDown,
      trendValue: "-12%",
      trendLabel: "vs last period",
      icon: Clock,
      iconBgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      trendColor: "text-green-600"
    },
    {
      title: "Needs Attention",
      subtitle: "Requiring attention",
      value: "5",
      trendIcon: TrendingDown,
      trendValue: "-1",
      trendLabel: "vs last period",
      icon: () => (
        <div className="w-4 h-4 border-2 border-emerald-600 rounded-full"></div>
      ),
      iconBgColor: "bg-emerald-50",
      iconColor: "",
      trendColor: "text-green-600"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Key Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default KeyMetricsGrid;
