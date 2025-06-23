
import { Card, CardContent } from "@/components/ui/card";
import CollapsibleSection from "@/components/ui/collapsible-section";
import { LoadProfitabilityData } from "@/hooks/useLoadProfitability";

interface RecommendationsSectionProps {
  highMarginLoads: LoadProfitabilityData[];
}

const RecommendationsSection = ({ highMarginLoads }: RecommendationsSectionProps) => {
  return (
    <CollapsibleSection title="Factoring Profitability Recommendations">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Focus on customers like {highMarginLoads[0]?.customer} - your highest margin factored performer</li>
            <li>• Negotiate better factoring rates for high-volume customers</li>
            <li>• Consider volume discounts when factoring rates exceed 3%</li>
            <li>• Fuel optimization could improve factored load margins by 2-3%</li>
            <li>• Premium factoring customers typically offer better net margins despite fees</li>
          </ul>
        </CardContent>
      </Card>
    </CollapsibleSection>
  );
};

export default RecommendationsSection;
