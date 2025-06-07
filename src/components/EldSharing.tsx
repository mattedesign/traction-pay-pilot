
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, CheckCircle, Truck, MapPin, Zap } from "lucide-react";
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
    <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
      {/* Background Illustration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="relative w-full h-full">
          <Truck className="w-16 h-16 absolute top-4 right-4 text-orange-600 transform rotate-12" />
          <div className="absolute top-8 right-12 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute top-12 right-8 w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-300"></div>
          <MapPin className="w-8 h-8 absolute bottom-6 right-10 text-orange-500" />
        </div>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-orange-700" />
          </div>
          <div>
            <CardTitle className="text-orange-900">Increase Trust with ELD Sharing</CardTitle>
            <CardDescription className="text-orange-700">
              Share real-time location to unlock better rates and faster payments
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-orange-900 mb-3 flex items-center">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2">
              <CheckCircle className="w-3 h-3 text-orange-600" />
            </div>
            Benefits of ELD Sharing:
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { icon: "💰", text: "Access to premium loads (+15% average rate)" },
              { icon: "⚡", text: "Faster invoice approval (2 days vs 7 days)" },
              { icon: "🤝", text: "Better relationship with brokers" },
              { icon: "🛡️", text: "Reduced detention claims" }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center text-sm text-orange-700 bg-orange-50 rounded p-2">
                <span className="mr-3 text-base">{benefit.icon}</span>
                {benefit.text}
              </div>
            ))}
          </div>
        </div>
        
        {isShared ? (
          <Button variant="outline" className="w-full border-green-300 bg-green-50 text-green-700 shadow-sm" disabled>
            <CheckCircle className="w-4 h-4 mr-2" />
            ELD Sharing Active
            <div className="ml-auto flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
            </div>
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full border-orange-300 hover:bg-orange-100 shadow-sm font-medium" 
            onClick={handleEnableSharing}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Enable ELD Sharing for This Load
            <Zap className="w-4 h-4 ml-auto text-orange-600" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EldSharing;
