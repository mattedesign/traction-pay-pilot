
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import InvoicesSidebar from "@/components/InvoicesSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Plus, TrendingUp, Clock, AlertCircle, Truck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const InvoicesPage = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const recentInvoices = [
    { id: "INV-2024-001", load: "TMS-001", amount: "$2,450.00", status: "pending", date: "2024-06-08" },
    { id: "INV-2024-002", load: "1234", amount: "$1,850.00", status: "paid", date: "2024-06-05" },
    { id: "INV-2024-003", load: "5678", amount: "$2,200.00", status: "overdue", date: "2024-05-28" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateInvoice = () => {
    navigate('/invoices/new');
  };

  return (
    <div className="min-h-screen flex w-full" style={{ backgroundColor: '#F5F6FA' }}>
      <NavigationSidebar />
      <InvoicesSidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Invoice Overview</h1>
              <p className="text-slate-600">Track and manage your invoice payments</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                <Truck className="w-3 h-3 mr-1" />
                {profile?.company_name || 'Carrier Account'}
              </Badge>
              <Button className="flex items-center space-x-2" onClick={handleCreateInvoice}>
                <Plus className="w-4 h-4" />
                <span>Create Invoice</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                  Overdue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">$2,200</div>
                <p className="text-xs text-red-600">1 invoice overdue</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">$4,200</div>
                <p className="text-xs text-yellow-600">2 invoices pending</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$8,450</div>
                <p className="text-xs text-green-600">$3,950 collected</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Avg Payment Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">12 days</div>
                <p className="text-xs text-slate-600">Industry average</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Recent Invoice Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium text-slate-900">{invoice.id}</p>
                        <p className="text-sm text-slate-600">Load #{invoice.load}</p>
                      </div>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{invoice.amount}</p>
                        <p className="text-sm text-slate-500">{invoice.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
