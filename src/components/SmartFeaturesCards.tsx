
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SmartFeaturesCardsProps {
  extractedData: any;
}

const SmartFeaturesCards = ({ extractedData }: SmartFeaturesCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-medium text-blue-900 mb-2">Route Optimization</h3>
          <p className="text-sm text-blue-700 mb-3">AI found a route saving $35 in fuel costs</p>
          <Button size="sm" variant="outline" className="border-blue-300">
            View Optimized Route
          </Button>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <h3 className="font-medium text-green-900 mb-2">Fuel Advance</h3>
          <p className="text-sm text-green-700 mb-3">Get up to ${Math.round(parseFloat(extractedData.rate.slice(1).replace(',', '')) * 0.4)} advance</p>
          <Button size="sm" variant="outline" className="border-green-300">
            Apply Now
          </Button>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="p-4">
          <h3 className="font-medium text-purple-900 mb-2">Discrepancy Prevention</h3>
          <p className="text-sm text-purple-700 mb-3">AI monitoring for payment delays</p>
          <Button size="sm" variant="outline" className="border-purple-300">
            Learn More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartFeaturesCards;
