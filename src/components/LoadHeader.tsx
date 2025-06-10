
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Load } from "@/types/load";
import { LoadStatusService } from "@/services/loadStatusService";

interface LoadHeaderProps {
  loadData: Load;
}

const LoadHeader = ({ loadData }: LoadHeaderProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/loads");
  };

  // Special handling for TMS-001 to show "Delivered" badge
  const getDisplayStatus = () => {
    if (loadData.id === "TMS-001") {
      return "delivered";
    }
    return loadData.status;
  };

  const getStatusBadgeText = () => {
    if (loadData.id === "TMS-001") {
      return "DELIVERED";
    }
    return LoadStatusService.getStatusLabel(loadData.status);
  };

  const displayStatus = getDisplayStatus();
  const statusText = getStatusBadgeText();
  const statusClass = LoadStatusService.getStatusBadgeClass(displayStatus as Load["status"]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Load #{loadData.id}</h1>
          <p className="text-slate-600">{loadData.broker}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={statusClass}>
            {statusText}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="w-8 h-8 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            title="Close"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-green-600" />
          <div>
            <span className="text-slate-500">From:</span>
            <span className="ml-1 font-medium text-slate-900">{loadData.origin}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-red-600" />
          <div>
            <span className="text-slate-500">To:</span>
            <span className="ml-1 font-medium text-slate-900">{loadData.destination}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4 text-blue-600" />
          <div>
            <span className="text-slate-500">Rate:</span>
            <span className="ml-1 font-medium text-green-600">{loadData.amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadHeader;
