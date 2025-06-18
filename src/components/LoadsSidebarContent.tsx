
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadsGroupSection from "./LoadsGroupSection";
import { Load } from "@/types/load";

interface LoadsSidebarContentProps {
  loads: Load[];
  getAvatarIcon: (brokerName: string) => { icon: React.ComponentType<{ className?: string }>; color: string };
  onLoadSelect?: (load: Load) => void;
  selectedLoadId?: string;
}

const LoadsSidebarContent = ({ loads, getAvatarIcon, onLoadSelect, selectedLoadId }: LoadsSidebarContentProps) => {
  // Filter loads by status
  const pendingLoads = loads.filter(load => load.status === "Pending");
  const inProgressLoads = loads.filter(load => load.status === "In Progress");
  const deliveredLoads = loads.filter(load => load.status === "Delivered");

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="space-y-1">
        {/* Pending Loads */}
        {pendingLoads.length > 0 && (
          <LoadsGroupSection
            title="Pending"
            loads={pendingLoads}
            getAvatarIcon={getAvatarIcon}
            onLoadSelect={onLoadSelect}
            selectedLoadId={selectedLoadId}
            colorClasses="text-yellow-600 bg-yellow-50 border-yellow-100"
          />
        )}

        {/* In Progress Loads */}
        {inProgressLoads.length > 0 && (
          <LoadsGroupSection
            title="In Progress"
            loads={inProgressLoads}
            getAvatarIcon={getAvatarIcon}
            onLoadSelect={onLoadSelect}
            selectedLoadId={selectedLoadId}
            colorClasses="text-blue-600 bg-blue-50 border-blue-100"
          />
        )}

        {/* Delivered Loads */}
        {deliveredLoads.length > 0 && (
          <LoadsGroupSection
            title="Delivered"
            loads={deliveredLoads}
            getAvatarIcon={getAvatarIcon}
            onLoadSelect={onLoadSelect}
            selectedLoadId={selectedLoadId}
            colorClasses="text-green-600 bg-green-50 border-green-100"
          />
        )}

        {/* Empty state */}
        {loads.length === 0 && (
          <div className="p-4 text-center text-slate-500">
            <p className="text-sm">No loads found</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default LoadsSidebarContent;
