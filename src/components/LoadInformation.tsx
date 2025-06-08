
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Package, Clock, Truck, User, Phone, Mail } from "lucide-react";
import { Load } from "@/types/load";

interface LoadInformationProps {
  loadData: Load;
}

const LoadInformation = ({ loadData }: LoadInformationProps) => {
  const isDelivered = loadData.status === "delivered" || loadData.status === "ready_to_invoice";
  const deliveryLabel = isDelivered ? "Delivered On" : "Expected Delivery";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-blue-600" />
          <span>Load Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Route Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">Pickup Location</p>
                <p className="text-sm text-slate-900">{loadData.origin}</p>
                <p className="text-xs text-slate-500">{loadData.pickupTime}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">Delivery Location</p>
                <p className="text-sm text-slate-900 cursor-pointer hover:text-blue-600 hover:underline">
                  {loadData.destination}
                </p>
                <p className="text-xs text-slate-500">
                  {isDelivered && loadData.deliveredAt ? loadData.deliveredAt : loadData.deliveryTime}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">Pickup Time</p>
                <p className="text-sm text-slate-900">{loadData.pickupTime}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">{deliveryLabel}</p>
                <p className="text-sm text-slate-900">
                  {isDelivered && loadData.deliveredAt ? loadData.deliveredAt : loadData.deliveryTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Load Details */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Load Details</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-xs text-slate-500">Distance</span>
              <p className="text-sm font-medium text-slate-900">{loadData.distance}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Equipment</span>
              <p className="text-sm font-medium text-slate-900">
                {loadData.tmsData?.equipment || "53' Dry Van"}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Commodity</span>
              <p className="text-sm font-medium text-slate-900">
                {loadData.tmsData?.commodity || loadData.rateConfirmation?.commodity || "General Freight"}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Weight</span>
              <p className="text-sm font-medium text-slate-900">
                {loadData.tmsData?.weight || loadData.rateConfirmation?.weight || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information - Only show if TMS data is available */}
        {loadData.tmsData?.contactInfo && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-slate-700 mb-3">Broker Contact</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-900">{loadData.tmsData.contactInfo.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-900">{loadData.tmsData.contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-900">{loadData.tmsData.contactInfo.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Special Instructions */}
        {loadData.tmsData?.specialInstructions && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Special Instructions</h4>
            <p className="text-sm text-slate-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              {loadData.tmsData.specialInstructions}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoadInformation;
