
import LoadGroupHeader from "./LoadGroupHeader";
import LoadItem from "./LoadItem";
import { Load } from "@/types/load";

interface LoadsGroupSectionProps {
  title: string;
  loads: Load[];
  isActive?: boolean;
  getAvatarIcon: (brokerName: string) => { icon: React.ComponentType<{ className?: string }>; color: string };
  onLoadSelect?: (load: Load) => void;
  selectedLoadId?: string;
  colorClasses?: string;
}

const LoadsGroupSection = ({ title, loads, isActive = false, getAvatarIcon, onLoadSelect, selectedLoadId }: LoadsGroupSectionProps) => {
  if (loads.length === 0) {
    return null;
  }

  return (
    <>
      <LoadGroupHeader title={title} isActive={isActive} />
      <div>
        {loads.map((load) => (
          <LoadItem 
            key={load.id}
            load={load}
            avatarIcon={getAvatarIcon(load.broker)}
            onLoadSelect={onLoadSelect}
            selectedLoadId={selectedLoadId}
          />
        ))}
      </div>
    </>
  );
};

export default LoadsGroupSection;
