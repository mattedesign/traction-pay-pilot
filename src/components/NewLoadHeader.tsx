
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface NewLoadHeaderProps {
  onClose: () => void;
}

const NewLoadHeader = ({ onClose }: NewLoadHeaderProps) => {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-4 shrink-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Create New Load</h1>
          <p className="text-slate-600">Add load details and attach supporting documents</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-slate-100"
          title="Cancel and return to loads"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default NewLoadHeader;
