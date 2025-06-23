
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Mail, Phone, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";

interface InvoiceDetail {
  id: string;
  invoiceNumber: string;
  carrier: string;
  carrierContact: string;
  carrierPhone: string;
  carrierEmail: string;
  amount: string;
  status: "pending" | "paid" | "overdue" | "processing";
  dueDate: string;
  issueDate: string;
  loadId: string;
  loadDetails: {
    origin: string;
    destination: string;
    pickupDate: string;
    deliveryDate: string;
    commodity: string;
    weight: string;
  };
  lineItems: Array<{
    description: string;
    quantity: number;
    rate: string;
    amount: string;
  }>;
  subtotal: string;
  tax: string;
  total: string;
}

// Mock data - in a real app, this would come from an API
const mockInvoice: InvoiceDetail = {
  id: "INV-001",
  invoiceNumber: "INV-2024-001",
  carrier: "ABC Trucking",
  carrierContact: "John Smith",
  carrierPhone: "(555) 123-4567",
  carrierEmail: "john@abctrucking.com",
  amount: "$2,450.00",
  status: "pending",
  dueDate: "2024-01-20",
  issueDate: "2024-01-15",
  loadId: "LOAD-2024-001",
  loadDetails: {
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    pickupDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    commodity: "Electronics",
    weight: "34,000 lbs"
  },
  lineItems: [
    {
      description: "Transportation Services - LOAD-2024-001",
      quantity: 1,
      rate: "$2,450.00",
      amount: "$2,450.00"
    }
  ],
  subtotal: "$2,450.00",
  tax: "$0.00",
  total: "$2,450.00"
};

const BrokerInvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/broker/invoices");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "processing": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex w-full">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col min-h-0">
        <DashboardHeader />
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBack}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Invoices
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{mockInvoice.invoiceNumber}</h1>
                  <p className="text-slate-600">{mockInvoice.carrier}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(mockInvoice.status)}>
                  {mockInvoice.status.charAt(0).toUpperCase() + mockInvoice.status.slice(1)}
                </Badge>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Process Payment
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Invoice Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Invoice Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-slate-700">Invoice Number</div>
                        <div className="text-slate-900">{mockInvoice.invoiceNumber}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Load ID</div>
                        <div className="text-slate-900">{mockInvoice.loadId}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Issue Date</div>
                        <div className="text-slate-900">{mockInvoice.issueDate}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Due Date</div>
                        <div className="text-slate-900">{mockInvoice.dueDate}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Load Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Load Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-slate-700">Origin</div>
                        <div className="text-slate-900">{mockInvoice.loadDetails.origin}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Destination</div>
                        <div className="text-slate-900">{mockInvoice.loadDetails.destination}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Pickup Date</div>
                        <div className="text-slate-900">{mockInvoice.loadDetails.pickupDate}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Delivery Date</div>
                        <div className="text-slate-900">{mockInvoice.loadDetails.deliveryDate}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Commodity</div>
                        <div className="text-slate-900">{mockInvoice.loadDetails.commodity}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-700">Weight</div>
                        <div className="text-slate-900">{mockInvoice.loadDetails.weight}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Line Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Line Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockInvoice.lineItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">{item.description}</div>
                            <div className="text-sm text-slate-600">Qty: {item.quantity} × {item.rate}</div>
                          </div>
                          <div className="font-medium text-slate-900">{item.amount}</div>
                        </div>
                      ))}
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Subtotal</span>
                          <span className="text-slate-900">{mockInvoice.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Tax</span>
                          <span className="text-slate-900">{mockInvoice.tax}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-slate-900">Total</span>
                          <span className="text-slate-900">{mockInvoice.total}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Carrier Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Carrier Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-700">Company</div>
                      <div className="text-slate-900">{mockInvoice.carrier}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700">Contact Person</div>
                      <div className="text-slate-900">{mockInvoice.carrierContact}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full">
                      Mark as Paid
                    </Button>
                    <Button variant="outline" className="w-full">
                      Request Documents
                    </Button>
                    <Button variant="outline" className="w-full">
                      Send Reminder
                    </Button>
                    <Button variant="outline" className="w-full">
                      Dispute Invoice
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerInvoiceDetail;
