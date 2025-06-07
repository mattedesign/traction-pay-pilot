
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MapPin } from "lucide-react";

interface LoadData {
  amount: string;
  distance: string;
  origin: string;
  destination: string;
  pickupTime: string;
  deliveryTime: string;
}

interface LoadInformationProps {
  loadData: LoadData;
}

const LoadInformation = ({ loadData }: LoadInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Load Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Rate</span>
            </div>
            <p className="text-xl font-bold text-green-600">{loadData.amount}</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <MapPin className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium">Distance</span>
            </div>
            <p className="text-sm text-slate-700">{loadData.distance}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Pickup Location</span>
            </div>
            <p className="text-sm text-slate-700">{loadData.origin}</p>
            <p className="text-xs text-slate-500">{loadData.pickupTime}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Delivery Location</span>
            </div>
            <p className="text-sm text-slate-700">{loadData.destination}</p>
            <p className="text-xs text-slate-500">{loadData.deliveryTime}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadInformation;
