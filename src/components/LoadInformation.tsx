
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, MapPin, CreditCard, Edit, ExternalLink, Building2, Truck, Package, ShoppingCart, Zap, Globe, Target, Briefcase } from "lucide-react";
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
    const logos = [
      { icon: Building2, color: 'bg-blue-600' },
      { icon: Truck, color: 'bg-green-600' },
      { icon: Package, color: 'bg-purple-600' },
      { icon: ShoppingCart, color: 'bg-orange-600' },
      { icon: Zap, color: 'bg-red-600' },
      { icon: Globe, color: 'bg-indigo-600' },
      { icon: Target, color: 'bg-teal-600' },
      { icon: Briefcase, color: 'bg-pink-600' }
    ];
    
    const logoIndex = brokerName.length % logos.length;
    const { icon: IconComponent, color } = logos[logoIndex];
    
    return (
      <div className={`w-8 h-8 ${color} rounded flex items-center justify-center`}>
        <IconComponent className="w-4 h-4 text-white" />
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
