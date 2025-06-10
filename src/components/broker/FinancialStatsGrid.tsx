
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, TrendingUp, CreditCard, Truck } from "lucide-react";

interface FinancialStat {
  label: string;
  value: string;
  icon: any;
  color: string;
  description: string;
}

const FinancialStatsGrid = () => {
  const financialStats: FinancialStat[] = [
    { label: "Amount Due", value: "$89,450", icon: AlertCircle, color: "text-red-600", description: "Outstanding payments" },
    { label: "Amount Incoming", value: "$156,780", icon: TrendingUp, color: "text-green-600", description: "Expected payments" },
    { label: "Credit Line Available", value: "$250,000", icon: CreditCard, color: "text-blue-600", description: "Available credit" },
    { label: "Loads in Progress", value: "18", icon: Truck, color: "text-orange-600", description: "Active loads" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {financialStats.map((stat, index) => (
        <Card key={index} className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FinancialStatsGrid;
