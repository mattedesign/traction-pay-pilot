
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, MapPin, Building2, CreditCard, Edit, ExternalLink } from "lucide-react";
import { useState } from "react";
import LocationDetailsModal from "./LocationDetailsModal";

interface LoadData {
  amount: string;
  distance: string;
  origin: string;
  destination: string;
  pickupTime: string;
  deliveryTime: string;
  broker: string;
  fundingMethod?: string;
  status?: string;
}

interface LoadInformationProps {
  loadData: LoadData;
}

const LoadInformation = ({ loadData }: LoadInformationProps) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  
  const getFundingMethodColor = (method?: string) => {
    switch (method) {
      case "QuickPay":
        return "bg-green-50 text-green-700 border-green-200";
      case "Factored":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Standard Pay ACH":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Standard Pay Check":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const canEditFundingMethod = loadData.status !== "delivered";

  const handleFundingMethodEdit = () => {
    // TODO: Implement funding method edit functionality
    console.log("Edit funding method clicked");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Load Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-slate-700">Rate</span>
              </div>
              <p className="text-xl font-bold text-green-600">{loadData.amount}</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">Freight Broker</span>
              </div>
              <p className="text-sm text-slate-700">{loadData.broker}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-slate-700">Funding Method</span>
              </div>
              <div className="flex items-center space-x-2">
                {loadData.fundingMethod ? (
                  <Badge variant="outline" className={`text-xs ${getFundingMethodColor(loadData.fundingMethod)}`}>
                    {loadData.fundingMethod}
                  </Badge>
                ) : (
                  <p className="text-sm text-slate-500">Not specified</p>
                )}
                {canEditFundingMethod && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleFundingMethodEdit}
                    title="Edit funding method"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-slate-700">Delivery Location</span>
              </div>
              <p className="text-sm text-slate-700">{loadData.destination}</p>
              <p className="text-xs text-slate-500 mb-2">{loadData.deliveryTime}</p>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setShowLocationModal(true)}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View route details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <LocationDetailsModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        loadData={loadData}
      />
    </>
  );
};

export default LoadInformation;
