
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, ExternalLink, Mail } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadService } from "@/services/loadService";
import { EmailService, EmailThread } from "@/services/emailService";
import EmailThreadDisplay from "./EmailThreadDisplay";

interface Load {
  id: string;
  broker: string;
  status: "pending_pickup" | "in_transit" | "delivered";
  amount: string;
  origin: string;
  destination: string;
  pickupTime: string;
  distance: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending_pickup":
      return "bg-yellow-100 text-yellow-800";
    case "in_transit":
      return "bg-blue-100 text-blue-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending_pickup":
      return "Pending Pickup";
    case "in_transit":
      return "In Transit";
    case "delivered":
      return "Delivered";
    default:
      return status;
  }
};

const LoadsSidebar = () => {
  const { loadId } = useParams();
  const navigate = useNavigate();
  const [loads, setLoads] = useState<Load[]>([]);
  const [emailThreads, setEmailThreads] = useState<Map<string, EmailThread[]>>(new Map());
  const [expandedEmailSections, setExpandedEmailSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Get loads from the service
    const allLoads = LoadService.getAllLoads();
    setLoads(allLoads);

    // Get email threads for each load
    const threadsMap = new Map<string, EmailThread[]>();
    allLoads.forEach(load => {
      const threads = EmailService.getEmailThreadsForLoad(load.id);
      if (threads.length > 0) {
        threadsMap.set(load.id, threads);
      }
    });
    setEmailThreads(threadsMap);
  }, []);

  const handleViewDashboard = () => {
    console.log("Navigating to loads dashboard");
    navigate("/loads");
  };

  const toggleEmailSection = (loadId: string) => {
    const newExpanded = new Set(expandedEmailSections);
    if (newExpanded.has(loadId)) {
      newExpanded.delete(loadId);
    } else {
      newExpanded.add(loadId);
    }
    setExpandedEmailSections(newExpanded);
  };

  const getUnreadEmailCount = (loadId: string) => {
    const threads = emailThreads.get(loadId) || [];
    return threads.reduce((total, thread) => total + thread.unreadCount, 0);
  };

  return (
    <div className="w-80 bg-white text-slate-900 min-h-screen overflow-y-auto flex flex-col shadow-sm" style={{ borderRight: 'rgba(0, 0, 0, 0.06) 1px solid' }}>
      {/* Loads Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <Truck className="w-6 h-6 mr-2" />
            Loads
          </h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleViewDashboard}
            className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            <span className="text-sm">Dashboard</span>
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      {/* Loads List */}
      <div className="flex-1 p-4 space-y-3">
        {loads.map((load) => {
          const loadThreads = emailThreads.get(load.id) || [];
          const unreadCount = getUnreadEmailCount(load.id);
          const isEmailExpanded = expandedEmailSections.has(load.id);

          return (
            <div key={load.id} className="space-y-2">
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  loadId === load.id 
                    ? "bg-slate-100 border-slate-300" 
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                }`}
                onClick={() => navigate(`/load/${load.id}`)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium text-slate-900">
                      Load #{load.id}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      <Badge className={getStatusColor(load.status)}>
                        {getStatusLabel(load.status)}
                      </Badge>
                      {loadThreads.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Mail 
                            className="w-3 h-3 text-blue-500 cursor-pointer" 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleEmailSection(load.id);
                            }}
                          />
                          {unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs px-1 py-0">
                              {unreadCount}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">{load.broker}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Rate</span>
                      <span className="text-sm font-semibold text-green-600">{load.amount}</span>
                    </div>
                    
                    <div className="flex items-center text-xs text-slate-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="truncate">{load.origin} → {load.destination}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{load.pickupTime}</span>
                      <span>{load.distance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Threads Section */}
              {loadThreads.length > 0 && isEmailExpanded && (
                <div className="ml-2">
                  <EmailThreadDisplay threads={loadThreads} compact={true} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadsSidebar;
