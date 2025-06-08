import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, MessageSquare } from "lucide-react";
interface ModeSelectorProps {
  mode: "search" | "chat";
  onModeChange: (mode: "search" | "chat") => void;
  isPreview?: boolean;
}
const ModeSelector = ({
  mode,
  onModeChange,
  isPreview = false
}: ModeSelectorProps) => {
  return <div className="flex flex-col space-y-2 mb-4">
      
      <ToggleGroup type="single" value={mode} onValueChange={value => {
      if (value && !isPreview) {
        onModeChange(value as "search" | "chat");
      }
    }} className="justify-start">
        <ToggleGroupItem value="search" aria-label="Search Loads mode" className="flex items-center space-x-2 px-4 py-2">
          <Search className="w-4 h-4" />
          <span>Search Loads</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="chat" aria-label="AI Chat mode" className="flex items-center space-x-2 px-4 py-2">
          <MessageSquare className="w-4 h-4" />
          <span>AI Chat</span>
        </ToggleGroupItem>
      </ToggleGroup>
      
    </div>;
};
export default ModeSelector;