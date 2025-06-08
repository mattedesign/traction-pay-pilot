
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, MessageSquare, FileText, Calendar, CreditCard, Upload, Truck, PhoneCall, Clock3 } from "lucide-react";
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

      // Get email threads for this load only for in-progress loads
      if (load && (load.status === "pending_pickup" || load.status === "in_transit")) {
        try {
          const threads = await EmailService.getEmailThreadsForLoad(loadId);
          setEmailThreads(threads);
        } catch (error) {
          console.error(`Error loading threads for load ${loadId}:`, error);
        }
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

  const getNextSteps = (status: string, fundingMethod?: string) => {
    if (status === "delivered") {
      return [];
    }

    const steps = [];
    
    if (status === "in_transit") {
      steps.push({
        icon: Upload,
        text: "Upload Proof of Delivery (POD)",
        action: "Upload POD"
      });
    }
    
    if (fundingMethod === "Standard Pay ACH" || fundingMethod === "Standard Pay Check") {
      steps.push({
        icon: CreditCard,
        text: "Change to QuickPay for faster payment",
        action: "Switch to QuickPay"
      });
    }
    
    steps.push(
      {
        icon: MessageSquare,
        text: "Send message to broker",
        action: "Send Message"
      },
      {
        icon: Truck,
        text: "Coordinate pickup time",
        action: "Coordinate Pickup"
      },
      {
        icon: PhoneCall,
        text: "Ask for special instructions",
        action: "Get Instructions"
      }
    );

    return steps;
  };

  const isCompleted = loadData.status === "delivered";
  const nextSteps = getNextSteps(loadData.status, loadData.fundingMethod);

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

        {/* Conditional Content Based on Status */}
        {isCompleted ? (
          /* Completed Load Content */
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <h4 className="font-medium text-slate-900">Payment Information</h4>
            </div>
            <div className="space-y-2 pl-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-3 h-3 text-blue-600" />
                <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                  View Invoice #INV-{loadData.id}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span className="text-xs text-slate-600">
                  Paid on May 30, 2024
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-3 h-3 text-slate-500" />
                <span className="text-xs text-slate-600">
                  {loadData.fundingMethod || "ACH Transfer"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* In Progress Load Content */
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock3 className="w-4 h-4 text-slate-600" />
              <h4 className="font-medium text-slate-900">Next Steps</h4>
            </div>
            <div className="space-y-2 pl-6">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <step.icon className="w-3 h-3 text-slate-500" />
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-xs text-slate-700 hover:text-blue-600"
                  >
                    {step.text}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadItemExpanded;
