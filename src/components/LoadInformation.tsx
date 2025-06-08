
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, MapPin, CreditCard, Edit, ExternalLink, Building2, Truck, Package, ShoppingCart, Zap, Globe, Target, Briefcase, Wifi, Clock, Phone, Mail } from "lucide-react";
import { useState } from "react";
import LocationDetailsModal from "./LocationDetailsModal";

interface LoadData {
  amount: string;
  distance: string;
  origin: string;
  destination: string;
  pickupTime: string;
  deliveryTime?: string;
  broker: string;
  fundingMethod?: string;
  status?: string;
  source?: "manual" | "tms";
  tmsData?: {
    loadNumber: string;
    brokerLoadNumber?: string;
    equipment: string;
    commodity: string;
    weight: string;
    pieces?: string;
    deliveryTime?: string;
    specialInstructions?: string;
    contactInfo?: {
      name: string;
      phone: string;
      email: string;
    };
  };
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
      { icon: Building2, color: '#8B5CF6' },
      { icon: Truck, color: '#3B82F6' },
      { icon: Package, color: '#EF4444' },
      { icon: ShoppingCart, color: '#10B981' },
      { icon: Zap, color: '#F59E0B' },
      { icon: Globe, color: '#6366F1' },
      { icon: Target, color: '#EC4899' },
      { icon: Briefcase, color: '#14B8A6' }
    ];
    
    const logoIndex = brokerName.length % logos.length;
    const { icon: IconComponent, color } = logos[logoIndex];
    
    return (
      <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center relative">
        <IconComponent className="w-4 h-4" style={{ color }} />
        {loadData.source === "tms" && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
            <Wifi className="w-2 h-2 text-white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Load Information</CardTitle>
            {loadData.source === "tms" && (
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                <Wifi className="w-3 h-3 mr-1" />
                TMS Integration
              </Badge>
            )}
          </div>
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
              {loadData.tmsData?.brokerLoadNumber && (
                <p className="text-xs text-slate-500">Ref: {loadData.tmsData.brokerLoadNumber}</p>
              )}
            </div>
          </div>

          {/* TMS-specific information */}
          {loadData.tmsData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Package className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-slate-700">Equipment & Cargo</span>
                </div>
                <p className="text-sm text-slate-700">{loadData.tmsData.equipment}</p>
                <p className="text-xs text-slate-500">
                  {loadData.tmsData.commodity} • {loadData.tmsData.weight}
                  {loadData.tmsData.pieces && ` • ${loadData.tmsData.pieces}`}
                </p>
              </div>
              
              {loadData.tmsData.contactInfo && (
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">Broker Contact</span>
                  </div>
                  <p className="text-sm text-slate-700">{loadData.tmsData.contactInfo.name}</p>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                    <span>{loadData.tmsData.contactInfo.phone}</span>
                    <span>{loadData.tmsData.contactInfo.email}</span>
                  </div>
                </div>
              )}
            </div>
          )}

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
              <p className="text-xs text-slate-500 mb-2">
                {loadData.tmsData?.deliveryTime || loadData.deliveryTime || "Delivery time TBD"}
              </p>
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

          {/* Special Instructions for TMS loads */}
          {loadData.tmsData?.specialInstructions && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-900">Special Instructions</span>
              </div>
              <p className="text-sm text-amber-800">{loadData.tmsData.specialInstructions}</p>
            </div>
          )}
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
