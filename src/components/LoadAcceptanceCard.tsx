
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, Truck } from "lucide-react";
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
    <Card className="border-orange-200 bg-orange-50 mb-6">
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
      <CardContent>
        {/* Action Buttons */}
        <div className="flex space-x-3">
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
