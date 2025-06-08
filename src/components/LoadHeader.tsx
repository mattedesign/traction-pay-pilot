
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { XCircle } from "lucide-react";
import { Load } from "@/types/load";

interface LoadHeaderProps {
  loadData: Load;
}

const LoadHeader = ({ loadData }: LoadHeaderProps) => {
  const navigate = useNavigate();

  const getStatusBadgeClass = (status: string) => {
    if (status === "pending_acceptance") return "border-orange-200 bg-orange-50 text-orange-700";
    if (status === "pending_pickup") return "border-blue-200 bg-blue-50 text-blue-700";
    if (status === "in_transit") return "border-green-200 bg-green-50 text-green-700";
    if (status === "ready_to_invoice") return "border-purple-200 bg-purple-50 text-purple-700";
    return "border-slate-200 bg-slate-50 text-slate-700";
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending_acceptance":
        return "PENDING ACCEPTANCE";
      case "pending_pickup":
        return "PENDING PICKUP";
      case "in_transit":
        return "IN TRANSIT";
      case "delivered":
        return "DELIVERED";
      case "ready_to_invoice":
        return "READY TO INVOICE";
      default:
        return status.replace("_", " ").toUpperCase();
    }
  };

  const handleCloseClick = () => {
    console.log("Navigating to Load Summary page");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold text-slate-900">Load #{loadData.id}</h1>
        <Badge 
          variant="outline" 
          className={getStatusBadgeClass(loadData.status)}
        >
          {getStatusLabel(loadData.status)}
        </Badge>
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleCloseClick}
        className="hover:bg-slate-100 w-8 h-8"
        title="Close and return to Load Summary"
      >
        <XCircle className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default LoadHeader;
