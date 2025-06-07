
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, CheckCircle, Signal } from "lucide-react";
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
    <Card className="bg-white border-slate-200 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* GPS Signal Illustration */}
      <div className="absolute top-4 right-4 w-24 h-16 opacity-10">
        <div className="relative w-full h-full">
          {/* GPS Signal waves */}
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
            <div className="absolute -top-1 -left-1 w-4 h-4 border-2 border-slate-300 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -left-2 w-6 h-6 border border-slate-200 rounded-full animate-pulse delay-500"></div>
          </div>
          {/* Route line */}
          <svg className="absolute bottom-0 left-0 w-full h-8" viewBox="0 0 96 32">
            <path d="M8,16 Q24,8 48,16 T88,16" stroke="currentColor" strokeWidth="2" fill="none" className="text-slate-200" strokeDasharray="4,4">
              <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
            <Signal className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <CardTitle className="text-slate-800">ELD Location Sharing</CardTitle>
            <CardDescription className="text-slate-500">
              Share real-time location to unlock premium opportunities
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
          <h3 className="font-medium text-slate-700 mb-3 flex items-center">
            <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mr-2">
              <CheckCircle className="w-3 h-3 text-slate-500" />
            </div>
            Benefits of sharing:
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { icon: "💰", text: "Access to premium loads", highlight: "+15% average rate", isPaymentCritical: true },
              { icon: "⚡", text: "Faster invoice approval", highlight: "2 days vs 7 days", isPaymentCritical: true },
              { icon: "🤝", text: "Better broker relationships", highlight: "", isPaymentCritical: false },
              { icon: "🛡️", text: "Reduced detention claims", highlight: "", isPaymentCritical: false }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center text-sm text-slate-600 bg-white rounded-lg p-3 border border-slate-100">
                <span className="mr-3 text-base opacity-70">{benefit.icon}</span>
                <span className="flex-1">{benefit.text}</span>
                {benefit.highlight && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    benefit.isPaymentCritical 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-slate-50 text-slate-600'
                  }`}>
                    {benefit.highlight}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {isShared ? (
          <Button variant="outline" className="w-full border-green-200 bg-green-50 text-green-700 hover:bg-green-100" disabled>
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
            className="w-full border-slate-300 hover:border-slate-400 hover:bg-slate-50 font-medium transition-all duration-200 bg-white" 
            onClick={handleEnableSharing}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Enable ELD Sharing for This Load
            <Signal className="w-4 h-4 ml-auto text-slate-400" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EldSharing;
