
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Wifi, Clock, Phone, FileText, ExternalLink } from "lucide-react";
import { useState } from "react";
import LocationDetailsModal from "./LocationDetailsModal";
import { Load } from "@/types/load";

interface LoadInformationProps {
  loadData: Load;
}

const LoadInformation = ({ loadData }: LoadInformationProps) => {
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Ensure deliveryTime is always defined for the modal
  const loadDataWithDeliveryTime = {
    ...loadData,
    deliveryTime: loadData.deliveryTime || loadData.tmsData?.deliveryTime || "Delivery time TBD"
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Load Information</span>
            </CardTitle>
            {loadData.source === "tms" && (
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                <Wifi className="w-3 h-3 mr-1" />
                TMS Integration
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-sm font-medium text-slate-700 mb-1 block">Freight Broker</span>
              <div>
                <p className="text-sm text-slate-700">{loadData.broker}</p>
                {loadData.tmsData?.brokerLoadNumber && (
                  <p className="text-xs text-slate-500">Ref: {loadData.tmsData.brokerLoadNumber}</p>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-slate-700 mb-1 block">Delivery Location</span>
              <div className="flex items-center space-x-2">
                <p 
                  className="text-sm text-slate-700 cursor-pointer hover:text-blue-600 hover:underline"
                  onClick={() => setShowLocationModal(true)}
                >
                  {loadData.destination}
                </p>
                <ExternalLink className="w-3 h-3 text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => setShowLocationModal(true)} />
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-slate-700 mb-1 block">Expected Delivery</span>
              <p className="text-xs text-slate-500">
                {loadDataWithDeliveryTime.deliveryTime}
              </p>
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
        loadData={loadDataWithDeliveryTime}
      />
    </>
  );
};

export default LoadInformation;
