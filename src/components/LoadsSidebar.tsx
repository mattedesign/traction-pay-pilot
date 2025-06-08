
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, ExternalLink, Mail, ChevronDown, ChevronRight, MessageCircle, User, Clock } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadService } from "@/services/loadService";
import { EmailService, EmailThread } from "@/services/emailService";

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
  const [expandedLoads, setExpandedLoads] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEmailData = async () => {
      setIsLoading(true);
      
      // Get loads from the service
      const allLoads = LoadService.getAllLoads();
      setLoads(allLoads);

      // Get email threads for each load asynchronously
      const threadsMap = new Map<string, EmailThread[]>();
      
      for (const load of allLoads) {
        try {
          const threads = await EmailService.getEmailThreadsForLoad(load.id);
          if (threads.length > 0) {
            threadsMap.set(load.id, threads);
          }
        } catch (error) {
          console.error(`Error loading threads for load ${load.id}:`, error);
        }
      }
      
      setEmailThreads(threadsMap);
      setIsLoading(false);
    };

    loadEmailData();
  }, []);

  const handleViewDashboard = () => {
    console.log("Navigating to loads dashboard");
    navigate("/loads");
  };

  const toggleLoadExpansion = (loadId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newExpanded = new Set(expandedLoads);
    if (newExpanded.has(loadId)) {
      newExpanded.delete(loadId);
    } else {
      newExpanded.add(loadId);
    }
    setExpandedLoads(newExpanded);
  };

  const handleEmailThreadClick = async (threadId: string, loadId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Opening email thread ${threadId} for load ${loadId}`);
    
    // Mark thread as read when clicked
    await EmailService.markThreadAsRead(threadId);
    
    // Navigate to the load detail page and scroll to communications section
    navigate(`/load/${loadId}`, { 
      state: { 
        scrollTo: 'communications',
        selectedThread: threadId 
      } 
    });
    
    // Refresh email threads to update unread counts
    const threadsMap = new Map<string, EmailThread[]>();
    for (const load of loads) {
      try {
        const threads = await EmailService.getEmailThreadsForLoad(load.id);
        if (threads.length > 0) {
          threadsMap.set(load.id, threads);
        }
      } catch (error) {
        console.error(`Error refreshing threads for load ${load.id}:`, error);
      }
    }
    setEmailThreads(threadsMap);
  };

  const getUnreadEmailCount = (loadId: string) => {
    const threads = emailThreads.get(loadId) || [];
    return threads.reduce((total, thread) => total + thread.unreadCount, 0);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return 'Just now';
    }
  };

  const getSenderName = (email: string) => {
    return email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className="w-80 bg-white text-slate-900 min-h-screen overflow-y-auto flex flex-col shadow-sm" style={{ borderRight: 'rgba(0, 0, 0, 0.06) 1px solid' }}>
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <Truck className="w-6 h-6 mr-2" />
              Loads
            </h2>
          </div>
        </div>
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="text-slate-500">Loading...</div>
        </div>
      </div>
    );
  }

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
          const isExpanded = expandedLoads.has(load.id);
          const hasThreads = loadThreads.length > 0;

          return (
            <Card 
              key={load.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                loadId === load.id 
                  ? "bg-slate-100 border-slate-300" 
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100"
              }`}
              onClick={() => navigate(`/load/${load.id}`)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm font-medium text-slate-900 flex items-center space-x-2">
                    <span>Load #{load.id}</span>
                    {hasThreads && (
                      <button
                        onClick={(e) => toggleLoadExpansion(load.id, e)}
                        className="hover:bg-slate-200 rounded p-1 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-slate-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        )}
                      </button>
                    )}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <Badge className={getStatusColor(load.status)}>
                      {getStatusLabel(load.status)}
                    </Badge>
                    {hasThreads && (
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-blue-500" />
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

                {/* Embedded Email Threads */}
                {hasThreads && isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="mb-3 flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-slate-700">Messages</span>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {loadThreads.map((thread) => {
                        const latestEmail = thread.emails.sort((a, b) => 
                          b.timestamp.getTime() - a.timestamp.getTime()
                        )[0];
                        
                        return (
                          <div
                            key={thread.threadId}
                            className="cursor-pointer group bg-white hover:bg-blue-50 border border-blue-200 rounded-md p-2.5 transition-all duration-200 shadow-sm hover:shadow-md"
                            onClick={(e) => handleEmailThreadClick(thread.threadId, load.id, e)}
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-900 truncate pr-2">
                                  {thread.subject}
                                </span>
                                <div className="flex items-center space-x-1 flex-shrink-0">
                                  {thread.unreadCount > 0 && (
                                    <Badge variant="destructive" className="text-xs px-1 py-0">
                                      {thread.unreadCount}
                                    </Badge>
                                  )}
                                  <Clock className="w-3 h-3 text-slate-400" />
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-slate-600">
                                <div className="flex items-center space-x-1">
                                  <User className="w-3 h-3" />
                                  <span className="truncate">
                                    {getSenderName(latestEmail?.from || '')}
                                  </span>
                                </div>
                                <span className="text-slate-500 flex-shrink-0">
                                  {formatTimeAgo(thread.lastActivity)}
                                </span>
                              </div>
                              
                              <p className="text-xs text-slate-600 line-clamp-1">
                                {latestEmail?.body.substring(0, 60)}...
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LoadsSidebar;
