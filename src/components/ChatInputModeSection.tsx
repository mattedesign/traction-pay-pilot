
import ModeDropdown from "./ModeDropdown";

interface ChatInputModeSectionProps {
  mode: "search" | "chat";
  onModeChange?: (mode: "search" | "chat") => void;
  isPreview: boolean;
}

const ChatInputModeSection = ({
  mode,
  onModeChange,
  isPreview
}: ChatInputModeSectionProps) => {
  return (
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
      {onModeChange ? (
        <div className="pointer-events-auto">
          <ModeDropdown 
            mode={mode} 
            onModeChange={onModeChange}
            isPreview={isPreview}
          />
        </div>
      ) : (
        <div className="h-8 w-16 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">
            {mode === "search" ? "Search" : "Chat"}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatInputModeSection;
