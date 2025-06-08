
import { Badge } from "@/components/ui/badge";
import { Clock, Truck } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const LoadAcceptanceHeader = () => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Truck className="w-6 h-6 text-orange-600" />
          <div>
            <CardTitle className="text-orange-900">Load Awaiting Acceptance</CardTitle>
            <CardDescription className="text-orange-700">
              Review and accept this TMS load assignment
            </CardDescription>
          </div>
        </div>
        <Badge variant="outline" className="border-orange-300 text-orange-700">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      </div>
    </CardHeader>
  );
};

export default LoadAcceptanceHeader;
