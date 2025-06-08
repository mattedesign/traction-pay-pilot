
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus } from "lucide-react";

interface LoadCreatedCardProps {
  extractedData: any;
  onViewLoad: () => void;
}

const LoadCreatedCard = ({ extractedData, onViewLoad }: LoadCreatedCardProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-green-600">
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">Document processed and load created successfully!</span>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center justify-between">
            <span>Load #{extractedData.loadId} Created</span>
            <Badge className="bg-green-100 text-green-800">
              <Plus className="w-3 h-3 mr-1" />
              New Load
            </Badge>
          </CardTitle>
          <CardDescription className="text-green-700">
            Automatically extracted from rate confirmation - {extractedData.brokerName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-green-900">Rate</p>
              <p className="text-lg font-bold text-green-600">{extractedData.rate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Distance</p>
              <p className="text-sm text-green-700">{extractedData.distance}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-green-900 mb-1">Route</p>
            <p className="text-sm text-green-700">{extractedData.origin} → {extractedData.destination}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-green-900">Pickup</p>
              <p className="text-sm text-green-700">{extractedData.pickupDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Delivery</p>
              <p className="text-sm text-green-700">{extractedData.deliveryDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Weight</p>
              <p className="text-sm text-green-700">{extractedData.weight}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm font-medium text-blue-900 mb-1">Proactive Monitoring Enabled</p>
            <p className="text-xs text-blue-700">
              When you upload BOL, POD, or other documents, our AI will automatically detect discrepancies and suggest resolutions to prevent payment delays.
            </p>
          </div>

          <Button onClick={onViewLoad} className="w-full">
            View Load Details & Upload Documents
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadCreatedCard;
