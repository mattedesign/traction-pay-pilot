
import { Search, Plus } from "lucide-react";

interface LoadsSidebarHeaderProps {
  onNewLoad: () => void;
}

const LoadsSidebarHeader = ({ onNewLoad }: LoadsSidebarHeaderProps) => {
  return (
    <div className="p-4 border-b border-slate-200 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Loads</h2>
        <Search className="w-5 h-5 text-slate-400" />
      </div>
      
      <button 
        onClick={onNewLoad}
        className="w-full flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg px-4 py-3 shadow-sm transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>New Load</span>
      </button>
    </div>
  );
};

export default LoadsSidebarHeader;
