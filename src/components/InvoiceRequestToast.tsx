
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, FileText } from "lucide-react";

interface InvoiceRequestToastProps {
  brokerName: string;
}

const InvoiceRequestToast = ({ brokerName }: InvoiceRequestToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleCreateInvoice = () => {
    console.log(`Creating invoice for ${brokerName}`);
    // TODO: Implement invoice creation functionality
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <Card className="mt-4 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Would you like to invoice this load to {brokerName}?
              </p>
              <p className="text-xs text-blue-700">
                Load has been delivered and all documents are ready
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              onClick={handleCreateInvoice}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Invoice
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDismiss}
              className="h-8 w-8 hover:bg-blue-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceRequestToast;
