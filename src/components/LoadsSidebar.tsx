
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus, Building2, Truck, Package, ShoppingCart, Zap, Globe, Target, Briefcase } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [loads, setLoads] = useState<Load[]>([]);
  const [emailThreads, setEmailThreads] = useState<Map<string, EmailThread[]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  // Real broker names to use
  const brokerNames = [
    "Continental Logistics Partners",
    "Apex Freight Solutions", 
    "Crossroads Transport Brokers",
    "Summit Cargo Connect",
    "Meridian Shipping Services",
    "Gateway Freight Advisors",
    "Pinnacle Load Management",
    "Horizon Transport Group"
  ];

  useEffect(() => {
    const loadEmailData = async () => {
      setIsLoading(true);
      
      // Get loads from the service
      const allLoads = LoadService.getAllLoads();
      
      // Replace broker names with real names
      const loadsWithRealBrokers = allLoads.map((load, index) => ({
        ...load,
        broker: brokerNames[index % brokerNames.length]
      }));
      
      setLoads(loadsWithRealBrokers);

      // Get email threads for each load asynchronously
      const threadsMap = new Map<string, EmailThread[]>();
      
      for (const load of loadsWithRealBrokers) {
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

  const handleNewLoad = () => {
    navigate('/loads/new');
  };

  const getAvatarIcon = (brokerName: string) => {
    const icons = [
      { icon: Building2, color: '#8B5CF6' },
      { icon: Truck, color: '#3B82F6' },
      { icon: Package, color: '#EF4444' },
      { icon: ShoppingCart, color: '#10B981' },
      { icon: Zap, color: '#F59E0B' },
      { icon: Globe, color: '#6366F1' },
      { icon: Target, color: '#EC4899' },
      { icon: Briefcase, color: '#14B8A6' }
    ];
    
    const iconIndex = brokerName.length % icons.length;
    return icons[iconIndex];
  };

  if (isLoading) {
    return (
      <div className="w-80 bg-white text-slate-900 h-screen flex flex-col shadow-sm border-r border-slate-200">
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
    <div className="w-80 bg-white text-slate-900 h-screen flex flex-col shadow-sm border-r border-slate-200">
      {/* Fixed Header */}
      <div className="p-4 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Loads</h2>
          <Search className="w-5 h-5 text-slate-400" />
        </div>
        
        <Button 
          onClick={handleNewLoad}
          className="w-full flex items-center justify-center space-x-2 bg-slate-100 text-slate-700 hover:bg-slate-200 border-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Load</span>
        </Button>
      </div>
      
      {/* Scrollable Loads List */}
      <div className="flex-1 overflow-y-auto">
        {/* Active Loads Section */}
        <LoadGroupHeader title="Active" isActive={true} />
        <div>
          {activeLoads.map((load) => (
            <LoadItem 
              key={load.id}
              load={load}
              avatarIcon={getAvatarIcon(load.broker)}
            />
          ))}
        </div>

        {/* Completed Loads Section */}
        <LoadGroupHeader title="Completed" />
        <div>
          {completedLoads.map((load) => (
            <LoadItem 
              key={load.id}
              load={load}
              avatarIcon={getAvatarIcon(load.broker)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadsSidebar;
