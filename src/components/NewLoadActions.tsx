
import { Button } from "@/components/ui/button";

interface NewLoadActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const NewLoadActions = ({ onCancel, onSubmit }: NewLoadActionsProps) => {
  return (
    <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700">
        Create Load
      </Button>
    </div>
  );
};

export default NewLoadActions;
