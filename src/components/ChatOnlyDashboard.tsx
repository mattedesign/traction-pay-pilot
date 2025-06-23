
import ChatDashboard from "./chat/ChatDashboard";
import { CarrierProfile } from "@/pages/Index";

interface ChatOnlyDashboardProps {
  carrierProfile: CarrierProfile;
  userProfile: any;
}

const ChatOnlyDashboard = ({ carrierProfile, userProfile }: ChatOnlyDashboardProps) => {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="flex-1 overflow-auto">
        <ChatDashboard carrierProfile={carrierProfile} userProfile={userProfile} />
      </div>
    </div>
  );
};

export default ChatOnlyDashboard;
