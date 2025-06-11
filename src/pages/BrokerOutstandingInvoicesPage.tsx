
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Send, AlertCircle, Calendar, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";

const BrokerOutstandingInvoicesPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const outstandingInvoices = [
    {
      id: "INV-2024-001",
      carrier: "ABC Trucking",
      loadId: "BL-2024-001",
      amount: "$2,450",
      dueDate: "2024-06-15",
      daysOverdue: 3,
      status: "Overdue"
    },
    {
      id: "INV-2024-005",
      carrier: "XYZ Logistics", 
      loadId: "BL-2024-005",
      amount: "$1,850",
      dueDate: "2024-06-20",
      daysOverdue: 0,
      status: "Due Soon"
    },
    {
      id: "INV-2024-008",
      carrier: "Fast Transport",
      loadId: "BL-2024-008", 
      amount: "$1,675",
      dueDate: "2024-06-18",
      daysOverdue: 1,
      status: "Overdue"
    },
    {
      id: "INV-2024-012",
      carrier: "Quick Haul",
      loadId: "BL-2024-012",
      amount: "$3,200",
      dueDate: "2024-06-25",
      daysOverdue: 0,
      status: "Pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Overdue": return "bg-red-100 text-red-800";
      case "Due Soon": return "bg-yellow-100 text-yellow-800"; 
      case "Pending": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalOutstanding = outstandingInvoices.reduce((sum, invoice) => 
    sum + parseFloat(invoice.amount.replace('$', '').replace(',', '')), 0
  );

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
                <h1 className="text-2xl font-bold text-slate-800">Outstanding Invoices</h1>
                <p className="text-slate-600">Manage unpaid invoices and overdue payments</p>
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
                    <p className="text-sm font-medium text-slate-600">Total Outstanding</p>
                    <p className="text-2xl font-bold text-red-600">${totalOutstanding.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Overdue Invoices</p>
                    <p className="text-2xl font-bold text-red-600">
                      {outstandingInvoices.filter(inv => inv.status === "Overdue").length}
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Due This Week</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {outstandingInvoices.filter(inv => inv.status === "Due Soon").length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Outstanding Invoices</CardTitle>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Send Reminders
                  </Button>
                </div>
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
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outstandingInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.carrier}</TableCell>
                      <TableCell>{invoice.loadId}</TableCell>
                      <TableCell className="font-semibold text-red-600">{invoice.amount}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Remind
                          </Button>
                        </div>
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

export default BrokerOutstandingInvoicesPage;
