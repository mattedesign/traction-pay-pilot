
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, MapPin, CreditCard, Edit, ExternalLink } from "lucide-react";
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
  
  const canEditFundingMethod = loadData.status !== "delivered";

  const handleFundingMethodEdit = () => {
    // TODO: Implement funding method edit functionality
    console.log("Edit funding method clicked");
  };

  const getBrokerLogo = (brokerName: string) => {
    // Create a simple, clean logo based on broker name
    const initials = brokerName.split(' ').map(word => word[0]).join('').slice(0, 2);
    const colors = [
      'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600', 
      'bg-red-600', 'bg-indigo-600', 'bg-teal-600', 'bg-pink-600'
    ];
    const colorIndex = brokerName.length % colors.length;
    
    return (
      <div className={`w-8 h-8 ${colors[colorIndex]} rounded flex items-center justify-center text-white text-sm font-semibold`}>
        {initials}
      </div>
    );
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
                {getBrokerLogo(loadData.broker)}
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
                <p className="text-sm text-slate-700">
                  {loadData.fundingMethod || "Not specified"}
                </p>
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
