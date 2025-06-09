
import { Load } from "@/types/load";
import { LucideIcon } from "lucide-react";
import LoadsGroupSection from "./LoadsGroupSection";

interface LoadsSidebarContentProps {
  loads: Load[];
  getAvatarIcon: (brokerName: string) => { icon: LucideIcon; color: string };
}

const LoadsSidebarContent = ({ loads, getAvatarIcon }: LoadsSidebarContentProps) => {
  // Group loads by status
  const pendingAcceptanceLoads = loads.filter(load => load.status === "pending_acceptance");
  const activeLoads = loads.filter(load => load.status === "pending_pickup" || load.status === "in_transit" || load.status === "ready_to_invoice");
  const completedLoads = loads.filter(load => load.status === "delivered");

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Pending Acceptance Section */}
      <LoadsGroupSection
        title="Awaiting Acceptance"
        loads={pendingAcceptanceLoads}
        isActive={true}
        getAvatarIcon={getAvatarIcon}
      />

      {/* Active Loads Section */}
      <LoadsGroupSection
        title="Active"
        loads={activeLoads}
        isActive={true}
        getAvatarIcon={getAvatarIcon}
      />

      {/* Completed Loads Section */}
      <LoadsGroupSection
        title="Completed"
        loads={completedLoads}
        getAvatarIcon={getAvatarIcon}
      />
    </div>
  );
};

export default LoadsSidebarContent;
