
import { ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

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

  const handleClick = () => {
    navigate(`/load/${load.id}`);
  };

  return (
    <div 
      className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${
        isActive ? "bg-blue-50 border-r-2 border-blue-500" : ""
      }`}
      onClick={handleClick}
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
      <ChevronDown className="w-4 h-4 text-slate-400" />
    </div>
  );
};

export default LoadItem;
