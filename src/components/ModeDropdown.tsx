
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, MessageSquare, ChevronDown } from "lucide-react";

interface ModeDropdownProps {
  mode: "search" | "chat";
  onModeChange: (mode: "search" | "chat") => void;
  isPreview?: boolean;
}

const ModeDropdown = ({ mode, onModeChange, isPreview = false }: ModeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleModeSelect = (newMode: "search" | "chat") => {
    if (!isPreview) {
      onModeChange(newMode);
      setIsOpen(false);
    }
  };

  const getCurrentIcon = () => {
    return mode === "search" ? <Search className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />;
  };

  const getCurrentLabel = () => {
    return mode === "search" ? "Search" : "Chat";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 flex items-center space-x-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        onClick={() => !isPreview && setIsOpen(!isOpen)}
        disabled={isPreview}
      >
        {getCurrentIcon()}
        <span className="hidden sm:inline">{getCurrentLabel()}</span>
        <ChevronDown className="w-3 h-3" />
      </Button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-background border border-border rounded-md shadow-lg z-50 min-w-[160px] backdrop-blur-sm">
          <div className="py-1">
            <button
              className={`w-full px-3 py-2 text-left text-sm flex items-center space-x-2 hover:bg-accent ${
                mode === "search" ? "bg-accent text-accent-foreground" : "text-foreground"
              }`}
              onClick={() => handleModeSelect("search")}
            >
              <Search className="w-4 h-4" />
              <span>Search Loads</span>
            </button>
            <button
              className={`w-full px-3 py-2 text-left text-sm flex items-center space-x-2 hover:bg-accent ${
                mode === "chat" ? "bg-accent text-accent-foreground" : "text-foreground"
              }`}
              onClick={() => handleModeSelect("chat")}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Chat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeDropdown;
