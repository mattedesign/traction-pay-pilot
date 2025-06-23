
import { Card, CardContent } from "@/components/ui/card";

interface LoadProfitabilityStatsProps {
  avgProfitMargin: number;
  highMarginCount: number;
  lowMarginCount: number;
}

const LoadProfitabilityStats = ({ 
  avgProfitMargin, 
  highMarginCount, 
  lowMarginCount 
}: LoadProfitabilityStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-900">{avgProfitMargin.toFixed(1)}%</div>
          <div className="text-sm text-green-700">Average Profit Margin</div>
          <div className="text-xs text-green-600">Factored Loads Only</div>
        </CardContent>
      </Card>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">{highMarginCount}</div>
          <div className="text-sm text-blue-700">High-Margin Customers</div>
          <div className="text-xs text-blue-600">Above Average</div>
        </CardContent>
      </Card>
      
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-red-900">{lowMarginCount}</div>
          <div className="text-sm text-red-700">Low-Margin Routes</div>
          <div className="text-xs text-red-600">Needs Attention</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadProfitabilityStats;
