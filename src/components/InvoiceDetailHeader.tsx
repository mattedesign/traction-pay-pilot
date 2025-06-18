
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Send } from "lucide-react";
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
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/invoices')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Invoice {invoice.id}</h1>
          <p className="text-slate-600">Load #{invoice.loadId}</p>
        </div>
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
