
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import LoadItemExpanded from "./LoadItemExpanded";

interface LoadItemProps {
  load: {
    id: string;
    broker: string;
    status: string;
  };
  avatarColor: string;
}

const LoadItem = ({ load, avatarColor }: LoadItemProps) => {
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
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold`}
            style={{ backgroundColor: avatarColor }}
          >
            {load.broker.charAt(0)}
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
