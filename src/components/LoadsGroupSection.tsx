
import LoadGroupHeader from "./LoadGroupHeader";
import LoadItem from "./LoadItem";
import { Load } from "@/types/load";
import { LucideIcon } from "lucide-react";

interface LoadsGroupSectionProps {
  title: string;
  loads: Load[];
  isActive?: boolean;
  getAvatarIcon: (brokerName: string) => { icon: LucideIcon; color: string };
}

const LoadsGroupSection = ({ title, loads, isActive = false, getAvatarIcon }: LoadsGroupSectionProps) => {
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
          />
        ))}
      </div>
    </>
  );
};

export default LoadsGroupSection;
