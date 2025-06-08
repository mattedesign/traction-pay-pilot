
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { LoadService } from "@/services/loadService";
import { EmailService, EmailThread } from "@/services/emailService";
import LoadGroupHeader from "./LoadGroupHeader";
import LoadItem from "./LoadItem";

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

const LoadsSidebar = () => {
  const { loadId } = useParams();
  const [loads, setLoads] = useState<Load[]>([]);
  const [emailThreads, setEmailThreads] = useState<Map<string, EmailThread[]>>(new Map());
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

  const getAvatarColor = (loadId: string) => {
    const colors = [
      "#8B5CF6", // purple
      "#3B82F6", // blue  
      "#EF4444", // red
      "#10B981", // green
      "#F59E0B", // amber
      "#6366F1", // indigo
      "#EC4899", // pink
      "#14B8A6"  // teal
    ];
    
    const index = parseInt(loadId.charAt(0), 10) || 0;
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className="w-80 bg-white text-slate-900 min-h-screen overflow-y-auto flex flex-col shadow-sm border-r border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-center">
            <div className="text-slate-500">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  // Group loads by status
  const activeLoads = loads.filter(load => load.status === "pending_pickup" || load.status === "in_transit");
  const completedLoads = loads.filter(load => load.status === "delivered");

  return (
    <div className="w-80 bg-white text-slate-900 min-h-screen overflow-y-auto flex flex-col shadow-sm border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Loads</h2>
          <Search className="w-5 h-5 text-slate-400" />
        </div>
        
        <Button className="w-full flex items-center justify-center space-x-2 bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">
          <Plus className="w-4 h-4" />
          <span>New Load</span>
        </Button>
      </div>
      
      {/* Loads List */}
      <div className="flex-1">
        {/* Active Loads Section */}
        <LoadGroupHeader title="Active" isActive={true} />
        <div className="space-y-0">
          {activeLoads.map((load) => (
            <LoadItem 
              key={load.id}
              load={load}
              avatarColor={getAvatarColor(load.id)}
            />
          ))}
        </div>

        {/* Completed Loads Section */}
        <LoadGroupHeader title="Completed" />
        <div className="space-y-0">
          {completedLoads.map((load) => (
            <LoadItem 
              key={load.id}
              load={load}
              avatarColor={getAvatarColor(load.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadsSidebar;
