
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, MapPin, AlertCircle } from "lucide-react";

interface BrokerLoadsInProgressHeaderProps {
  totalLoads: number;
  inTransitCount: number;
  deliveryScheduledCount: number;
  delayedCount: number;
}

const BrokerLoadsInProgressHeader = ({
  totalLoads,
  inTransitCount,
  deliveryScheduledCount,
  delayedCount
}: BrokerLoadsInProgressHeaderProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Total Active</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold">{totalLoads}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">In Transit</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold">{inTransitCount}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Delivery Scheduled</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-orange-600" />
            <span className="text-2xl font-bold">{deliveryScheduledCount}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Delayed/Issues</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-2xl font-bold">{delayedCount}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrokerLoadsInProgressHeader;
