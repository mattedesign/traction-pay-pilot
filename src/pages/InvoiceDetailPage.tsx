
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download, Send, Calendar, DollarSign, Building2, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const InvoiceDetailPage = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  // Mock invoice data - in a real app, this would come from an API
  const mockInvoices = {
    "INV-2024-001": {
      id: "INV-2024-001",
      loadId: "TMS-001",
      amount: "$2,450.00",
      status: "pending",
      date: "2024-06-08",
      dueDate: "2024-06-22",
      brokerName: "Continental Logistics Partners",
      brokerEmail: "payments@continentallogistics.com",
      brokerAddress: "1250 Industrial Blvd, Suite 400, Dallas, TX 75207",
      description: "Freight transportation services - Dallas to Miami",
      origin: "Dallas, TX",
      destination: "Miami, FL",
      distance: "1,285 miles",
      rate: "$1.91/mile"
    },
    "INV-2024-002": {
      id: "INV-2024-002",
      loadId: "1234",
      amount: "$1,850.00",
      status: "paid",
      date: "2024-06-05",
      dueDate: "2024-06-19",
      brokerName: "Apex Freight Solutions",
      brokerEmail: "billing@apexfreight.com",
      brokerAddress: "789 Commerce Dr, Atlanta, GA 30309",
      description: "Freight transportation services - Atlanta to Chicago",
      origin: "Atlanta, GA",
      destination: "Chicago, IL",
      distance: "717 miles",
      rate: "$2.58/mile"
    }
  };

  const invoice = mockInvoices[invoiceId as keyof typeof mockInvoices];

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F6FA' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Invoice Not Found</h1>
          <Button onClick={() => navigate('/invoices')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Invoices
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F6FA' }}>
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/invoices')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Invoice {invoice.id}</h1>
              <p className="text-slate-600">Load #{invoice.loadId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className={getStatusColor(invoice.status)}>
              {invoice.status.toUpperCase()}
            </Badge>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Send Invoice
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Invoice Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Header Card */}
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

            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-600">Bill To</span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{invoice.brokerName}</p>
                      <p className="text-sm text-slate-600">{invoice.brokerEmail}</p>
                      <p className="text-sm text-slate-600">{invoice.brokerAddress}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-600">Route Information</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-slate-500">From:</span>
                        <span className="ml-1 text-sm text-slate-900">{invoice.origin}</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-500">To:</span>
                        <span className="ml-1 text-sm text-slate-900">{invoice.destination}</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-500">Distance:</span>
                        <span className="ml-1 text-sm text-slate-900">{invoice.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-slate-900">{invoice.description}</p>
                      <p className="text-sm text-slate-600">Rate: {invoice.rate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-900">{invoice.amount}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between pt-3">
                    <p className="font-semibold text-slate-900">Total</p>
                    <p className="font-bold text-xl text-slate-900">{invoice.amount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
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
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailPage;
