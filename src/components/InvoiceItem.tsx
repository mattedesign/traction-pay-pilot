
import { useState } from "react";
import { ChevronDown, ChevronRight, FileText, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Invoice {
  id: string;
  loadId: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
  date: string;
  brokerName: string;
}

interface InvoiceItemProps {
  invoice: Invoice;
  isSelected?: boolean;
  onSelect: (invoice: Invoice) => void;
}

const InvoiceItem = ({ invoice, isSelected = false, onSelect }: InvoiceItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInvoiceClick = () => {
    onSelect(invoice);
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${
          isSelected ? "bg-blue-50 border-r-2 border-blue-500" : ""
        }`}
        onClick={handleInvoiceClick}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-8 h-8 border border-slate-200 flex items-center justify-center rounded-full bg-zinc-50">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-900 truncate">{invoice.id}</div>
            <div className="text-xs text-slate-500 truncate">Load #{invoice.loadId}</div>
          </div>
        </div>
        <button 
          onClick={handleChevronClick} 
          className="p-1 hover:bg-slate-200 rounded transition-colors flex-shrink-0" 
          title={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(invoice.status)}>
                {invoice.status.toUpperCase()}
              </Badge>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3 text-green-600" />
                <span className="text-sm font-medium text-green-600">{invoice.amount}</span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-slate-500">Broker:</span>
                <span className="ml-1 text-slate-900">{invoice.brokerName}</span>
              </div>
              <div>
                <span className="text-slate-500">Date:</span>
                <span className="ml-1 text-slate-900">{invoice.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceItem;
