
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertCircle, Star, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { LoadProfitabilityData } from "@/hooks/useLoadProfitability";

interface LoadAnalysisSectionProps {
  loads: LoadProfitabilityData[];
}

const LoadAnalysisSection = ({ loads }: LoadAnalysisSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'excellent': return <Star className="w-4 h-4" />;
      case 'good': return <TrendingUp className="w-4 h-4" />;
      case 'fair': return <TrendingDown className="w-4 h-4" />;
      case 'poor': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-slate-900">Recent Factored Load Profitability</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="space-y-4 mt-4">
        {loads.map((load) => (
          <Card key={load.id} className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-slate-900">Load #{load.id} - {load.customer}</div>
                  <div className="text-sm text-slate-600">{load.route}</div>
                  <div className="text-xs text-blue-600">Factoring Rate: {load.factoringRate}%</div>
                </div>
                <Badge className={getRatingColor(load.rating)}>
                  {getRatingIcon(load.rating)}
                  <span className="ml-1 capitalize">{load.rating}</span>
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                <div>
                  <div className="text-slate-600">Gross Revenue</div>
                  <div className="font-medium">${load.grossRevenue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-slate-600">Factoring Fee</div>
                  <div className="font-medium text-red-600">-${load.factoringFee.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-slate-600">Fuel Cost</div>
                  <div className="font-medium text-red-600">-${load.fuelCost.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-slate-600">Net Profit</div>
                  <div className="font-medium text-green-600">${load.netProfit.toFixed(0)}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Profit Margin</span>
                  <span className="font-medium">{load.profitMargin.toFixed(1)}%</span>
                </div>
                <Progress value={load.profitMargin} className="h-2" />
              </div>
              
              {load.profitMargin < 60 && (
                <div className="mt-3 p-2 bg-orange-50 rounded text-sm text-orange-800">
                  ⚠️ Consider renegotiating factoring rates or optimizing route efficiency for this customer
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default LoadAnalysisSection;
