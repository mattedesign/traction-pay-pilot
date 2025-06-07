
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface LoadData {
  loadId: string;
  invoiceAmount: string;
  standardPayDate: string;
  daysToStandardPay: number;
}

interface InvoiceStatusProps {
  loadData: LoadData;
}

const InvoiceStatus = ({ loadData }: InvoiceStatusProps) => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <CardTitle className="text-green-900">Invoice Approved!</CardTitle>
            <CardDescription className="text-green-700">
              Load #{loadData.loadId} invoice has been approved by the broker
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-green-900">Invoice Amount</p>
            <p className="text-xl font-bold text-green-600">{loadData.invoiceAmount}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-green-900">Standard Payment</p>
            <p className="text-sm text-green-700">{loadData.standardPayDate}</p>
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 mt-1">
              {loadData.daysToStandardPay} days
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceStatus;
