
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter, Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";

interface BrokerInvoice {
  id: string;
  invoiceNumber: string;
  carrier: string;
  amount: string;
  status: "pending" | "paid" | "overdue" | "processing";
  dueDate: string;
  issueDate: string;
  loadId: string;
}

const mockInvoices: BrokerInvoice[] = [
  {
    id: "INV-001",
    invoiceNumber: "INV-2024-001",
    carrier: "ABC Trucking",
    amount: "$2,450.00",
    status: "pending",
    dueDate: "2024-01-20",
    issueDate: "2024-01-15",
    loadId: "LOAD-2024-001"
  },
  {
    id: "INV-002",
    invoiceNumber: "INV-2024-002",
    carrier: "XYZ Transport",
    amount: "$3,200.00",
    status: "paid",
    dueDate: "2024-01-18",
    issueDate: "2024-01-14",
    loadId: "LOAD-2024-002"
  },
  {
    id: "INV-003",
    invoiceNumber: "INV-2024-003",
    carrier: "Fast Freight",
    amount: "$1,850.00",
    status: "overdue",
    dueDate: "2024-01-12",
    issueDate: "2024-01-10",
    loadId: "LOAD-2024-003"
  }
];

const BrokerInvoicesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [invoices] = useState<BrokerInvoice[]>(mockInvoices);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.carrier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "processing": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleInvoiceClick = (invoiceId: string) => {
    navigate(`/broker/invoices/${invoiceId}`);
  };

  return (
    <div className="h-screen bg-slate-50 flex w-full">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col min-h-0">
        <DashboardHeader />
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Invoices</h1>
                <p className="text-slate-600">Manage carrier invoices and payments</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <Input
                        placeholder="Search invoices..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoices List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Invoices ({filteredInvoices.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => handleInvoiceClick(invoice.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{invoice.invoiceNumber}</h3>
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-600">
                            <div>
                              <p className="font-medium">Carrier</p>
                              <p>{invoice.carrier}</p>
                            </div>
                            <div>
                              <p className="font-medium">Amount</p>
                              <p className="text-slate-900 font-semibold">{invoice.amount}</p>
                            </div>
                            <div>
                              <p className="font-medium">Issue Date</p>
                              <p>{invoice.issueDate}</p>
                            </div>
                            <div>
                              <p className="font-medium">Due Date</p>
                              <p>{invoice.dueDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredInvoices.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No invoices found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerInvoicesPage;
