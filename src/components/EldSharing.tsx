
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const EldSharing = () => {
  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-orange-900">Increase Trust with ELD Sharing</CardTitle>
        <CardDescription className="text-orange-700">
          Share real-time location to unlock better rates and faster payments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-white border border-orange-200 rounded p-3">
          <h3 className="font-medium text-orange-900 mb-2">Benefits of ELD Sharing:</h3>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Access to premium loads (+15% average rate)</li>
            <li>• Faster invoice approval (2 days vs 7 days)</li>
            <li>• Better relationship with brokers</li>
            <li>• Reduced detention claims</li>
          </ul>
        </div>
        
        <Button variant="outline" className="w-full border-orange-300">
          <Share2 className="w-4 h-4 mr-2" />
          Enable ELD Sharing for This Load
        </Button>
      </CardContent>
    </Card>
  );
};

export default EldSharing;
