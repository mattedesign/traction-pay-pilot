
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { LoadProfitabilityData } from "@/hooks/useLoadProfitability";

interface RecommendationsSectionProps {
  highMarginLoads: LoadProfitabilityData[];
}

const RecommendationsSection = ({ highMarginLoads }: RecommendationsSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-blue-900">Factoring Profitability Recommendations</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                <span className="sr-only">Toggle recommendations</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2">
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Focus on customers like {highMarginLoads[0]?.customer} - your highest margin factored performer</li>
              <li>• Negotiate better factoring rates for high-volume customers</li>
              <li>• Consider volume discounts when factoring rates exceed 3%</li>
              <li>• Fuel optimization could improve factored load margins by 2-3%</li>
              <li>• Premium factoring customers typically offer better net margins despite fees</li>
            </ul>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
};

export default RecommendationsSection;
