
import { useState } from "react";
import { ChevronDown, ChevronRight, LucideIcon, Wifi } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import LoadItemExpanded from "./LoadItemExpanded";

interface LoadItemProps {
  load: {
    id: string;
    broker: string;
    status: string;
    source?: "manual" | "tms";
  };
  avatarIcon: {
    icon: LucideIcon;
    color: string;
  };
}

const LoadItem = ({
  load,
  avatarIcon
}: LoadItemProps) => {
  const navigate = useNavigate();
  const {
    loadId
  } = useParams();
  const isActive = loadId === load.id;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoadClick = () => {
    navigate(`/load/${load.id}`);
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const IconComponent = avatarIcon.icon;

  return (
    <div>
      <div className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${isActive ? "bg-blue-50 border-r-2 border-blue-500" : ""}`} onClick={handleLoadClick}>
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-8 h-8 border border-slate-200 flex items-center justify-center rounded-full bg-zinc-50 relative">
            <IconComponent className="w-4 h-4" style={{
              color: avatarIcon.color
            }} />
            {load.source === "tms" && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                <Wifi className="w-2 h-2 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900 truncate">Load #{load.id}</div>
            <div className="text-xs text-slate-500 truncate">{load.broker}</div>
          </div>
        </div>
        <button onClick={handleChevronClick} className="p-1 hover:bg-slate-200 rounded transition-colors flex-shrink-0" title={isExpanded ? "Collapse details" : "Expand details"}>
          {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
        </button>
      </div>
      
      {isExpanded && <LoadItemExpanded loadId={load.id} onClose={() => setIsExpanded(false)} />}
    </div>
  );
};

export default LoadItem;
