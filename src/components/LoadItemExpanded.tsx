
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, MessageSquare } from "lucide-react";
import { EmailService, EmailThread } from "@/services/emailService";
import EmailThreadDisplay from "./EmailThreadDisplay";
import { LoadService } from "@/services/loadService";

interface LoadItemExpandedProps {
  loadId: string;
  onClose: () => void;
}

const LoadItemExpanded = ({ loadId, onClose }: LoadItemExpandedProps) => {
  const [loadData, setLoadData] = useState<any>(null);
  const [emailThreads, setEmailThreads] = useState<EmailThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Get load details
      const load = LoadService.getLoadById(loadId);
      setLoadData(load);

      // Get email threads for this load
      try {
        const threads = await EmailService.getEmailThreadsForLoad(loadId);
        setEmailThreads(threads);
      } catch (error) {
        console.error(`Error loading threads for load ${loadId}:`, error);
      }
      
      setIsLoading(false);
    };

    loadData();
  }, [loadId]);

  if (isLoading) {
    return (
      <div className="p-4 border-b border-slate-200">
        <div className="text-slate-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (!loadData) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_pickup": return "bg-yellow-100 text-yellow-800";
      case "in_transit": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending_pickup": return "Pending Pickup";
      case "in_transit": return "In Transit";
      case "delivered": return "Delivered";
      default: return status;
    }
  };

  return (
    <div className="border-b border-slate-200 bg-slate-50">
      <div className="p-4 space-y-4">
        {/* Load Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Load #{loadData.id}</h3>
            <Badge className={getStatusColor(loadData.status)}>
              {getStatusText(loadData.status)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-600">{loadData.amount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600">{loadData.distance}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Pickup</div>
                <div className="text-xs text-slate-600">{loadData.origin}</div>
                <div className="text-xs text-slate-500">{loadData.pickupTime}</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-purple-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Delivery</div>
                <div className="text-xs text-slate-600">{loadData.destination}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Threads */}
        {emailThreads.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-slate-600" />
              <h4 className="font-medium text-slate-900">Communications</h4>
            </div>
            <div className="max-h-48 overflow-y-auto">
              <EmailThreadDisplay threads={emailThreads} compact={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadItemExpanded;
