
import { Badge } from "@/components/ui/badge";
import { Load } from "@/types/load";

interface LoadItemProps {
  load: Load;
  avatarIcon: { icon: React.ComponentType<{ className?: string }>; color: string };
  onLoadSelect?: (load: Load) => void;
  selectedLoadId?: string;
}

const LoadItem = ({ load, avatarIcon, onLoadSelect, selectedLoadId }: LoadItemProps) => {
  const IconComponent = avatarIcon.icon;
  const isSelected = selectedLoadId === load.id;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_acceptance":
      case "pending_pickup":
        return "bg-yellow-100 text-yellow-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "delivered":
      case "ready_to_invoice":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div 
      className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
      }`}
      onClick={() => onLoadSelect?.(load)}
    >
      <div className="flex items-center space-x-3">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
          style={{ backgroundColor: avatarIcon.color }}
        >
          <IconComponent className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-slate-900 truncate">
              {load.broker}
            </p>
            <Badge className={`text-xs ${getStatusColor(load.status)}`}>
              {formatStatus(load.status)}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>{load.origin} → {load.destination}</span>
            <span className="font-medium text-slate-900">{load.amount}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
            <span>{load.distance}</span>
            <span>{load.pickupTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadItem;
