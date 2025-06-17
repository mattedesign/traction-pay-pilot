
import { Load } from "@/types/load";
import LoadItem from "./LoadItem";

interface LoadsSidebarContentProps {
  loads: Load[];
  getAvatarIcon: (brokerName: string) => { icon: any; color: string };
  onLoadSelect?: (load: Load) => void;
  selectedLoadId?: string;
}

const LoadsSidebarContent = ({ loads, getAvatarIcon, onLoadSelect, selectedLoadId }: LoadsSidebarContentProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        {loads.map((load) => (
          <div key={load.id} className="mb-3">
            <LoadItem 
              load={load} 
              avatarIcon={getAvatarIcon(load.broker)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadsSidebarContent;
