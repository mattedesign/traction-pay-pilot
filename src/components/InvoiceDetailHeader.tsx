
import { Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface InvoiceDetailHeaderProps {
  invoice: {
    id: string;
    loadId: string;
    status: string;
  };
  getStatusColor: (status: string) => string;
}

const InvoiceDetailHeader = ({ invoice, getStatusColor }: InvoiceDetailHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Invoice {invoice.id}</h1>
        <p className="text-slate-600">Load #{invoice.loadId}</p>
      </div>
      <div className="flex items-center space-x-3">
        <Badge className={getStatusColor(invoice.status)}>
          {invoice.status.toUpperCase()}
        </Badge>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Send Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceDetailHeader;
