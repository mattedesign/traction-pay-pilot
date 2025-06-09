
import { Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InvoiceDetailCardProps {
  invoice: {
    id: string;
    amount: string;
    date: string;
    dueDate: string;
  };
}

const InvoiceDetailCard = ({ invoice }: InvoiceDetailCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Invoice Details</CardTitle>
              <p className="text-slate-600">Transportation Services</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">{invoice.amount}</div>
            <p className="text-sm text-slate-500">Total Amount</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">Invoice Date</span>
            </div>
            <p className="text-slate-900">{invoice.date}</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">Due Date</span>
            </div>
            <p className="text-slate-900">{invoice.dueDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetailCard;
