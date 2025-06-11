
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, CheckCircle, Calendar, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";

const BrokerPaidInvoicesPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const paidInvoices = [
    {
      id: "INV-2024-003",
      carrier: "ABC Trucking",
      loadId: "BL-2024-003",
      amount: "$2,450",
      paidDate: "2024-06-05",
      paymentMethod: "ACH Transfer",
      status: "Paid"
    },
    {
      id: "INV-2024-004",
      carrier: "XYZ Logistics",
      loadId: "BL-2024-004", 
      amount: "$1,850",
      paidDate: "2024-06-04",
      paymentMethod: "Wire Transfer",
      status: "Paid"
    },
    {
      id: "INV-2024-006",
      carrier: "Fast Transport",
      loadId: "BL-2024-006",
      amount: "$1,675", 
      paidDate: "2024-06-03",
      paymentMethod: "ACH Transfer",
      status: "Paid"
    },
    {
      id: "INV-2024-007",
      carrier: "Quick Haul",
      loadId: "BL-2024-007",
      amount: "$3,200",
      paidDate: "2024-06-02",
      paymentMethod: "Check",
      status: "Paid"
    }
  ];

  const totalPaidThisMonth = paidInvoices.reduce((sum, invoice) => 
    sum + parseFloat(invoice.amount.replace('$', '').replace(',', '')), 0
  );

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case "ACH Transfer": return "bg-green-100 text-green-800";
      case "Wire Transfer": return "bg-blue-100 text-blue-800";
      case "Check": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/broker/payments')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Payments
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Paid Invoices</h1>
                <p className="text-slate-600">View payment history and completed transactions</p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Paid This Month</p>
                    <p className="text-2xl font-bold text-green-600">${totalPaidThisMonth.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Invoices Paid</p>
                    <p className="text-2xl font-bold text-green-600">{paidInvoices.length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Average Payment Time</p>
                    <p className="text-2xl font-bold text-slate-900">2.5 days</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Payment History</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Carrier</TableHead>
                    <TableHead>Load ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.carrier}</TableCell>
                      <TableCell>{invoice.loadId}</TableCell>
                      <TableCell className="font-semibold text-green-600">{invoice.amount}</TableCell>
                      <TableCell>{invoice.paidDate}</TableCell>
                      <TableCell>
                        <Badge className={getPaymentMethodColor(invoice.paymentMethod)}>
                          {invoice.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {invoice.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrokerPaidInvoicesPage;
