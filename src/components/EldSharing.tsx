
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EldSharing = () => {
  const [isShared, setIsShared] = useState(false);
  const { toast } = useToast();

  const handleEnableSharing = () => {
    console.log("Enabling ELD sharing for this load");
    setIsShared(true);
    toast({
      title: "ELD Sharing Enabled",
      description: "Your broker now has access to real-time location updates. Premium rates unlocked!",
    });
  };

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
        
        {isShared ? (
          <Button variant="outline" className="w-full border-green-300 bg-green-50 text-green-700" disabled>
            <CheckCircle className="w-4 h-4 mr-2" />
            ELD Sharing Active
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full border-orange-300 hover:bg-orange-100" 
            onClick={handleEnableSharing}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Enable ELD Sharing for This Load
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EldSharing;
