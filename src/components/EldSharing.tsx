
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, CheckCircle, Truck, MapPin, Signal } from "lucide-react";
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
    <Card className="bg-slate-50 border-slate-200 relative overflow-hidden">
      {/* Integrated GPS Signal Visualization */}
      <div className="absolute top-4 right-4 w-24 h-16 opacity-20">
        <div className="relative w-full h-full">
          {/* GPS Signal waves */}
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="absolute -top-1 -left-1 w-4 h-4 border-2 border-emerald-400 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -left-2 w-6 h-6 border border-emerald-300 rounded-full animate-pulse delay-500"></div>
          </div>
          {/* Route line */}
          <svg className="absolute bottom-0 left-0 w-full h-8" viewBox="0 0 96 32">
            <path d="M8,16 Q24,8 48,16 T88,16" stroke="currentColor" strokeWidth="2" fill="none" className="text-slate-300" strokeDasharray="4,4">
              <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <Signal className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <CardTitle className="text-slate-900">ELD Location Sharing</CardTitle>
            <CardDescription className="text-slate-600">
              Share real-time location to unlock premium opportunities
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-medium text-slate-900 mb-3 flex items-center">
            <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mr-2">
              <CheckCircle className="w-3 h-3 text-slate-600" />
            </div>
            Benefits of sharing:
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              { icon: "💰", text: "Access to premium loads", highlight: "+15% average rate", isHighlight: true },
              { icon: "⚡", text: "Faster invoice approval", highlight: "2 days vs 7 days", isHighlight: true },
              { icon: "🤝", text: "Better broker relationships", highlight: "", isHighlight: false },
              { icon: "🛡️", text: "Reduced detention claims", highlight: "", isHighlight: false }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center text-sm text-slate-700 bg-slate-50 rounded-lg p-3">
                <span className="mr-3 text-base">{benefit.icon}</span>
                <span className="flex-1">{benefit.text}</span>
                {benefit.highlight && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    benefit.isHighlight ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {benefit.highlight}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {isShared ? (
          <Button variant="outline" className="w-full border-emerald-200 bg-emerald-50 text-emerald-700" disabled>
            <CheckCircle className="w-4 h-4 mr-2" />
            ELD Sharing Active
            <div className="ml-auto flex space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-300"></div>
            </div>
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full border-slate-300 hover:border-emerald-300 hover:bg-emerald-50 font-medium" 
            onClick={handleEnableSharing}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Enable ELD Sharing for This Load
            <Signal className="w-4 h-4 ml-auto text-emerald-600" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EldSharing;
