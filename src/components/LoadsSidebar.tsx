
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadService } from "@/services/loadService";
import { EmailService, EmailThread } from "@/services/emailService";
import { Load } from "@/types/load";
import { Building2, Truck, Package, ShoppingCart, Zap, Globe, Target, Briefcase, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadsSidebarHeader from "./LoadsSidebarHeader";
import LoadsSidebarContent from "./LoadsSidebarContent";

interface LoadsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const LoadsSidebar = ({ isOpen = true, onClose }: LoadsSidebarProps) => {
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
      <div className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-80 bg-white text-slate-900 h-screen flex flex-col shadow-sm border-r border-slate-200`}>
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-center">
            <div className="text-slate-500">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose}>
          <div className="bg-white w-80 h-full shadow-lg" onClick={e => e.stopPropagation()}>
            {/* Mobile close button */}
            <div className="flex justify-end p-4 border-b border-slate-200">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <LoadsSidebarHeader onNewLoad={handleNewLoad} />
            <LoadsSidebarContent loads={loads} getAvatarIcon={getAvatarIcon} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 bg-white text-slate-900 h-screen flex-col shadow-sm border-r border-slate-200">
        <LoadsSidebarHeader onNewLoad={handleNewLoad} />
        <LoadsSidebarContent loads={loads} getAvatarIcon={getAvatarIcon} />
      </div>
    </>
  );
};

export default LoadsSidebar;
