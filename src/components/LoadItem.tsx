
import { useState } from "react";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import LoadItemExpanded from "./LoadItemExpanded";

interface LoadItemProps {
  load: {
    id: string;
    broker: string;
    status: string;
  };
  avatarIcon: {
    icon: LucideIcon;
    color: string;
  };
}

const LoadItem = ({ load, avatarIcon }: LoadItemProps) => {
  const navigate = useNavigate();
  const { loadId } = useParams();
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
      <div 
        className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${
          isActive ? "bg-blue-50 border-r-2 border-blue-500" : ""
        }`}
        onClick={handleLoadClick}
      >
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: avatarIcon.color }}
          >
            <IconComponent className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900">Load #{load.id}</div>
            <div className="text-xs text-slate-500">{load.broker}</div>
          </div>
        </div>
        <button
          onClick={handleChevronClick}
          className="p-1 hover:bg-slate-200 rounded transition-colors"
          title={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <LoadItemExpanded 
          loadId={load.id} 
          onClose={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default LoadItem;
