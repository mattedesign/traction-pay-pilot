
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
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
      default:
        return status.replace("_", " ").toUpperCase();
    }
  };

  const handleBackClick = () => {
    console.log("Navigating back to dashboard");
    navigate("/");
  };

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="ghost" 
        onClick={handleBackClick}
        className="flex items-center space-x-2 hover:bg-slate-100"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Button>
      <div>
        <h1 className="text-xl font-bold text-slate-900">Load #{loadData.id}</h1>
        <p className="text-sm text-slate-500">{loadData.broker}</p>
      </div>
      <div className="ml-auto">
        <Badge 
          variant="outline" 
          className={getStatusBadgeClass(loadData.status)}
        >
          {getStatusLabel(loadData.status)}
        </Badge>
      </div>
    </div>
  );
};

export default LoadHeader;
