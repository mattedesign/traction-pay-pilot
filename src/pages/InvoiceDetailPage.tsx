
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoiceDetailHeader from "@/components/InvoiceDetailHeader";
import InvoiceDetailCard from "@/components/InvoiceDetailCard";
import BillingInformationCard from "@/components/BillingInformationCard";
import ServicesCard from "@/components/ServicesCard";
import InvoiceDetailSidebar from "@/components/InvoiceDetailSidebar";

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
        <InvoiceDetailHeader invoice={invoice} getStatusColor={getStatusColor} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Invoice Content */}
          <div className="lg:col-span-2 space-y-6">
            <InvoiceDetailCard invoice={invoice} />
            <BillingInformationCard invoice={invoice} />
            <ServicesCard invoice={invoice} />
          </div>

          {/* Sidebar */}
          <div>
            <InvoiceDetailSidebar invoice={invoice} getStatusColor={getStatusColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailPage;
