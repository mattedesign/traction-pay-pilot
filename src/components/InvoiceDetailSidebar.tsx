
import { useNavigate } from "react-router-dom";
import { Send, Download, FileText, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface InvoiceDetailSidebarProps {
  invoice: {
    loadId: string;
    status: string;
    amount: string;
    dueDate: string;
  };
  getStatusColor: (status: string) => string;
}

const InvoiceDetailSidebar = ({ invoice, getStatusColor }: InvoiceDetailSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" variant="outline">
            <Send className="w-4 h-4 mr-2" />
            Send Reminder
          </Button>
          <Button className="w-full" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => navigate(`/load/${invoice.loadId}`)}
          >
            <FileText className="w-4 h-4 mr-2" />
            View Load Details
          </Button>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Status</span>
              <Badge className={getStatusColor(invoice.status)}>
                {invoice.status.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Amount</span>
              <span className="font-medium text-slate-900">{invoice.amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Due Date</span>
              <span className="text-sm text-slate-900">{invoice.dueDate}</span>
            </div>
            {invoice.status === "pending" && (
              <div className="pt-3">
                <Button className="w-full">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Mark as Paid
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceDetailSidebar;
