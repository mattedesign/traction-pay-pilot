
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LoadRepository } from "@/services/loadRepository";
import { NotificationService } from "@/services/notificationService";
import { useToast } from "@/hooks/use-toast";
import { Load } from "@/types/load";
import LoadAcceptanceHeader from "./LoadAcceptanceHeader";
import LoadAcceptanceActions from "./LoadAcceptanceActions";

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
      <LoadAcceptanceHeader />
      <CardContent>
        <LoadAcceptanceActions
          onAccept={handleAcceptLoad}
          onReject={handleRejectLoad}
          isAccepting={isAccepting}
          isRejecting={isRejecting}
        />
      </CardContent>
    </Card>
  );
};

export default LoadAcceptanceCard;
