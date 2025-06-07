
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface LoadHeaderProps {
  loadId: string;
  broker: string;
  status: string;
}

const LoadHeader = ({ loadId, broker, status }: LoadHeaderProps) => {
  const navigate = useNavigate();

  const getStatusBadgeClass = (status: string) => {
    if (status === "pending_pickup") return "border-orange-200 bg-orange-50 text-orange-700";
    if (status === "in_transit") return "border-blue-200 bg-blue-50 text-blue-700";
    return "border-green-200 bg-green-50 text-green-700";
  };

  const handleBackClick = () => {
    console.log("Navigating back to dashboard");
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 space-x-4">
          <Button 
            variant="ghost" 
            onClick={handleBackClick}
            className="flex items-center space-x-2 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Load #{loadId}</h1>
            <p className="text-sm text-slate-500">{broker}</p>
          </div>
          <div className="ml-auto">
            <Badge 
              variant="outline" 
              className={getStatusBadgeClass(status)}
            >
              {status.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoadHeader;
