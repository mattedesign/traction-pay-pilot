
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

  const handleEmailThreadClick = (threadId: string, loadId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Opening email thread ${threadId} for load ${loadId}`);
    // Mark thread as read when clicked
    EmailService.markThreadAsRead(threadId);
    
    // Navigate to the load detail page and scroll to communications section
    navigate(`/load/${loadId}`, { 
      state: { 
        scrollTo: 'communications',
        selectedThread: threadId 
      } 
    });
    
    // Refresh email threads to update unread counts
    const threadsMap = new Map<string, EmailThread[]>();
    loads.forEach(load => {
      const threads = EmailService.getEmailThreadsForLoad(load.id);
      if (threads.length > 0) {
        threadsMap.set(load.id, threads);
      }
    });
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
      <div className="flex-1 p-4 space-y-1">
        {loads.map((load) => {
          const loadThreads = emailThreads.get(load.id) || [];
          const unreadCount = getUnreadEmailCount(load.id);
          const isExpanded = expandedLoads.has(load.id);
          const hasThreads = loadThreads.length > 0;

          return (
            <div key={load.id} className="space-y-0">
              {/* Load Card with Chevron */}
              <div className="flex items-stretch">
                {/* Chevron Column */}
                {hasThreads && (
                  <div className="flex items-center justify-center w-8 pt-3">
                    <button
                      onClick={(e) => toggleLoadExpansion(load.id, e)}
                      className="hover:bg-slate-100 rounded p-1 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                  </div>
                )}
                
                {/* Load Card */}
                <div className="flex-1">
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      loadId === load.id 
                        ? "bg-slate-100 border-slate-300" 
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    } ${hasThreads ? 'ml-0' : 'ml-8'}`}
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
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Email Thread Children */}
              {hasThreads && isExpanded && (
                <div className="ml-8 space-y-1">
                  {loadThreads.map((thread) => {
                    const latestEmail = thread.emails.sort((a, b) => 
                      b.timestamp.getTime() - a.timestamp.getTime()
                    )[0];
                    
                    return (
                      <div
                        key={thread.threadId}
                        className="cursor-pointer group"
                        onClick={(e) => handleEmailThreadClick(thread.threadId, load.id, e)}
                      >
                        <div className="flex items-center p-3 bg-slate-25 hover:bg-slate-100 border border-slate-150 rounded-lg transition-colors">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <MessageCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium text-slate-900 truncate">
                                  {thread.subject}
                                </span>
                                {thread.unreadCount > 0 && (
                                  <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                                    {thread.unreadCount}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-slate-600">
                                <User className="w-3 h-3" />
                                <span className="truncate">
                                  {getSenderName(latestEmail?.from || '')}
                                </span>
                                <span>•</span>
                                <Clock className="w-3 h-3" />
                                <span>{formatTimeAgo(thread.lastActivity)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
