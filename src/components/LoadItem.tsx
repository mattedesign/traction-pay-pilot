
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
      className={`p-4 m-3 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 hover:shadow-sm cursor-pointer transition-all duration-200 ${
        isSelected ? 'bg-blue-50 border-blue-300 shadow-sm' : ''
      }`}
      onClick={() => onLoadSelect?.(load)}
    >
      <div className="flex items-start space-x-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
          style={{ backgroundColor: avatarIcon.color }}
        >
          <IconComponent className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {load.broker}
            </p>
            <Badge className={`text-xs ml-2 ${getStatusColor(load.status)}`}>
              {formatStatus(load.status)}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-slate-600">
              <div className="font-medium">{load.origin}</div>
              <div className="text-xs text-slate-500 flex items-center mt-1">
                <span className="mr-2">→</span>
                <span>{load.destination}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">{load.distance}</span>
              <span className="font-semibold text-green-600">{load.amount}</span>
            </div>
            
            <div className="text-xs text-slate-400">
              {load.pickupTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadItem;
