
import { FileText } from "lucide-react";

interface InvoiceGroupHeaderProps {
  title: string;
  count: number;
  colorClasses: string;
}

const InvoiceGroupHeader = ({ title, count, colorClasses }: InvoiceGroupHeaderProps) => {
  return (
    <div className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b ${colorClasses}`}>
      <FileText className="w-4 h-4" />
      <span>{title} ({count})</span>
    </div>
  );
};

export default InvoiceGroupHeader;
