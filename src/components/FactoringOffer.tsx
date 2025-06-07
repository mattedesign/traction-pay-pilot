
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Clock, TrendingUp } from "lucide-react";

interface FactorData {
  available: boolean;
  rate: string;
  advance: string;
  monthlyVolume: string;
}

interface FactoringOfferProps {
  factorData: FactorData;
}

const FactoringOffer = ({ factorData }: FactoringOfferProps) => {
  return (
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="text-purple-900">Consider Factoring for Regular Cash Flow</CardTitle>
        <CardDescription className="text-purple-700">
          Get consistent advance payments on all your loads
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-purple-900">{factorData.rate} Rate</p>
            <p className="text-xs text-purple-700">Competitive</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-purple-900">{factorData.advance} Advance</p>
            <p className="text-xs text-purple-700">On approval</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-purple-900">24 Hours</p>
            <p className="text-xs text-purple-700">Funding time</p>
          </div>
        </div>

        <div className="bg-white border border-purple-200 rounded p-3">
          <p className="text-sm text-purple-800 mb-2">
            <strong>Monthly Estimate:</strong> Based on your {factorData.monthlyVolume} volume
          </p>
          <p className="text-sm text-purple-700">
            You could receive ~${Math.round(parseFloat(factorData.monthlyVolume.slice(1).replace(',', '')) * 0.85).toLocaleString()} 
            advance each month
          </p>
        </div>

        <Button variant="outline" className="w-full border-purple-300">
          Learn More About Factoring
        </Button>
      </CardContent>
    </Card>
  );
};

export default FactoringOffer;
