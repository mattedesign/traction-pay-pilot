
import { Button } from "@/components/ui/button";

interface NewLoadActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const NewLoadActions = ({ onCancel, onSubmit }: NewLoadActionsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 z-10">
      <div className="w-full flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700">
          Create Load
        </Button>
      </div>
    </div>
  );
};

export default NewLoadActions;
