
import { FileText } from "lucide-react";

const InvoicesEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <FileText className="w-12 h-12 text-slate-300 mb-3" />
      <p className="text-slate-500 text-sm">No invoices found</p>
    </div>
  );
};

export default InvoicesEmptyState;
