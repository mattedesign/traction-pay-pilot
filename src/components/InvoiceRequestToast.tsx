
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface InvoiceRequestToastProps {
  brokerName: string;
}

const InvoiceRequestToast = ({ brokerName }: InvoiceRequestToastProps) => {
  const navigate = useNavigate();

  const handleCreateInvoice = () => {
    navigate('/invoices/new');
  };

  return (
    <Card className="mx-6 mb-4 border-l-4 border-l-blue-500 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-blue-900 font-medium mb-1">
              Ready to Invoice
            </p>
            <p className="text-sm text-blue-800 mb-3">
              This load is ready to be invoiced to {brokerName}. Create an invoice to get paid faster.
            </p>
            <Button 
              onClick={handleCreateInvoice}
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Invoice
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceRequestToast;
