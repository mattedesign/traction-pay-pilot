
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, Target, Fuel, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const KeyMetricsSection = () => {
  const metrics = [
    {
      title: "Total Revenue",
      subtitle: "Monthly earnings",
      value: "$85.2K",
      change: "-23%",
      changeLabel: "due to payment issues",
      icon: BarChart3,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trendIcon: TrendingDown,
      trendColor: "text-red-600",
      path: "/revenue-analytics"
    },
    {
      title: "On-Time Payment Rate",
      subtitle: "Payment performance",
      value: "72%",
      change: "Below average",
      changeLabel: "Industry: 85%",
      icon: Target,
      iconBgColor: "bg-red-50",
      iconColor: "text-red-600",
      trendIcon: TrendingDown,
      trendColor: "text-red-600",
      path: "/payment-performance"
    },
    {
      title: "Available Loads",
      subtitle: "Restricted access",
      value: "18",
      change: "-23%",
      changeLabel: "vs potential",
      icon: () => (
        <div className="w-5 h-5 bg-amber-600 rounded flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded"></div>
        </div>
      ),
      iconBgColor: "bg-amber-50",
      iconColor: "",
      trendIcon: TrendingDown,
      trendColor: "text-red-600",
      path: "/available-loads"
    },
    {
      title: "Factoring Rate",
      subtitle: "Current rate",
      value: "3.2%",
      change: "+0.4%",
      changeLabel: "vs industry avg",
      icon: Fuel,
      iconBgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      trendIcon: TrendingUp,
      trendColor: "text-red-600",
      path: "/factoring-details"
    },
    {
      title: "Avg Payment Time",
      subtitle: "Days to payment",
      value: "8.4",
      change: "5 days late",
      changeLabel: "vs industry",
      icon: Clock,
      iconBgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      trendIcon: TrendingUp,
      trendColor: "text-red-600",
      path: "/payment-timeline"
    },
    {
      title: "Overdue Amount",
      subtitle: "Requiring immediate attention",
      value: "$4,567",
      change: "3 invoices",
      changeLabel: "overdue",
      icon: () => (
        <div className="w-4 h-4 border-2 border-red-600 rounded-full"></div>
      ),
      iconBgColor: "bg-red-50",
      iconColor: "",
      trendIcon: null,
      trendColor: "text-red-600",
      path: "/overdue-invoices"
    }
  ];

  const handleCardClick = (path: string) => {
    console.log("Card clicked, navigating to:", path);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Key Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="relative">
            <Link 
              to={metric.path} 
              className="block w-full h-full"
              onClick={() => handleCardClick(metric.path)}
            >
              <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:border-blue-300 cursor-pointer transform hover:-translate-y-1 hover:bg-slate-50 h-full">
                <CardContent className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-slate-600 text-sm font-medium mb-1 hover:text-blue-600 transition-colors">{metric.title}</div>
                      <div className="text-slate-400 text-xs">{metric.subtitle}</div>
                    </div>
                    <div className={`w-8 h-8 ${metric.iconBgColor} rounded-lg flex items-center justify-center hover:scale-110 transition-transform`}>
                      <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-slate-900 hover:text-blue-600 transition-colors">{metric.value}</div>
                    <div className="flex items-center text-xs">
                      {metric.trendIcon && (
                        <metric.trendIcon className={`w-3 h-3 ${metric.trendColor} mr-1`} />
                      )}
                      <span className={`${metric.trendColor} font-medium`}>{metric.change}</span>
                      <span className="text-slate-500 ml-1">{metric.changeLabel}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetricsSection;
