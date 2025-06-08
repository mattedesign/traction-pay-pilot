
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, MapPin, DollarSign, Truck, Package, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoadRepository } from "@/services/loadRepository";
import { NotificationService } from "@/services/notificationService";
import { useToast } from "@/hooks/use-toast";
import { Load } from "@/types/load";

interface LoadAcceptanceCardProps {
  load: Load;
}

const LoadAcceptanceCard = ({ load }: LoadAcceptanceCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleAcceptLoad = async () => {
    setIsAccepting(true);
    try {
      const updatedLoad = LoadRepository.acceptLoad(load.id);
      if (updatedLoad) {
        NotificationService.addNotification({
          loadId: load.id,
          type: "load_update",
          title: "Load Accepted",
          message: `Load #${load.id} has been accepted and is ready for pickup`,
          read: false,
          actionUrl: `/load/${load.id}`
        });
        
        toast({
          title: "Load Accepted",
          description: `Load #${load.id} has been accepted successfully`,
        });
        
        navigate(`/load/${load.id}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept load. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAccepting(false);
    }
  };

  const handleRejectLoad = async () => {
    setIsRejecting(true);
    try {
      // In a real app, this would update the load status to rejected
      toast({
        title: "Load Rejected",
        description: `Load #${load.id} has been rejected`,
      });
      navigate("/loads");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject load. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRejecting(false);
    }
  };

  if (load.status !== "pending_acceptance") {
    return null;
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
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
      <CardContent className="space-y-6">
        {/* Load Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Route</span>
              </div>
              <p className="text-sm text-slate-900">{load.origin} → {load.destination}</p>
              <p className="text-xs text-slate-500">{load.distance}</p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Pickup</span>
              </div>
              <p className="text-sm text-slate-900">{load.pickupTime}</p>
              {load.tmsData?.deliveryTime && (
                <p className="text-xs text-slate-500">Deliver by: {load.tmsData.deliveryTime}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-slate-700">Rate</span>
              </div>
              <p className="text-lg font-bold text-green-600">{load.amount}</p>
            </div>

            {load.tmsData && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Cargo Details</span>
                </div>
                <p className="text-sm text-slate-900">{load.tmsData.commodity}</p>
                <p className="text-xs text-slate-500">
                  {load.tmsData.weight} • {load.tmsData.equipment}
                  {load.tmsData.pieces && ` • ${load.tmsData.pieces}`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Special Instructions */}
        {load.tmsData?.specialInstructions && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-1">Special Instructions</h4>
            <p className="text-sm text-blue-800">{load.tmsData.specialInstructions}</p>
          </div>
        )}

        {/* Contact Information */}
        {load.tmsData?.contactInfo && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="text-sm font-medium text-slate-900 mb-2">Broker Contact</h4>
            <div className="space-y-1">
              <p className="text-sm text-slate-700">{load.tmsData.contactInfo.name}</p>
              <div className="flex items-center space-x-4 text-xs text-slate-600">
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>{load.tmsData.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-3 h-3" />
                  <span>{load.tmsData.contactInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            onClick={handleAcceptLoad}
            disabled={isAccepting || isRejecting}
            className="flex-1"
          >
            <Check className="w-4 h-4 mr-2" />
            {isAccepting ? "Accepting..." : "Accept Load"}
          </Button>
          <Button
            variant="outline"
            onClick={handleRejectLoad}
            disabled={isAccepting || isRejecting}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            {isRejecting ? "Rejecting..." : "Reject Load"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadAcceptanceCard;
