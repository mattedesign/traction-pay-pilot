
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, MessageSquare } from "lucide-react";

interface MockModeSelectorProps {
  mode: "search" | "chat";
}

const MockModeSelector = ({ mode }: MockModeSelectorProps) => {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <div className="text-sm font-medium text-slate-700">Choose your tool:</div>
      <ToggleGroup 
        type="single" 
        value={mode} 
        className="justify-start"
      >
        <ToggleGroupItem 
          value="search" 
          aria-label="Search Loads mode"
          className="flex items-center space-x-2 px-4 py-2"
        >
          <Search className="w-4 h-4" />
          <span>Search Loads</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="chat" 
          aria-label="AI Chat mode"
          className="flex items-center space-x-2 px-4 py-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>AI Chat</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="text-xs text-slate-500">
        {mode === "search" 
          ? "Find specific loads and get detailed information" 
          : "Get general trucking advice and answers"
        }
      </div>
    </div>
  );
};

export default MockModeSelector;
