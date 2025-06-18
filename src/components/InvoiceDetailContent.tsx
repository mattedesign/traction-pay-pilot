
import InvoiceDetailHeader from "@/components/InvoiceDetailHeader";
import InvoiceDetailCard from "@/components/InvoiceDetailCard";
import BillingInformationCard from "@/components/BillingInformationCard";
import ServicesCard from "@/components/ServicesCard";
import InvoiceDetailSidebar from "@/components/InvoiceDetailSidebar";

interface Invoice {
  id: string;
  loadId: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
  date: string;
  brokerName: string;
}

interface InvoiceDetailContentProps {
  invoice: Invoice;
}

const InvoiceDetailContent = ({ invoice }: InvoiceDetailContentProps) => {
  // Mock detailed invoice data - in a real app, this would come from an API
  const getDetailedInvoiceData = (invoice: Invoice) => {
    const mockDetailedData = {
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

    return mockDetailedData[invoice.id as keyof typeof mockDetailedData] || {
      id: invoice.id,
      loadId: invoice.loadId,
      amount: invoice.amount,
      status: invoice.status,
      date: invoice.date,
      dueDate: "2024-06-30",
      brokerName: invoice.brokerName,
      brokerEmail: "billing@example.com",
      brokerAddress: "123 Business St, City, State 12345",
      description: "Freight transportation services",
      origin: "Origin City",
      destination: "Destination City",
      distance: "500 miles",
      rate: "$2.00/mile"
    };
  };

  const detailedInvoice = getDetailedInvoiceData(invoice);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <InvoiceDetailHeader invoice={detailedInvoice} getStatusColor={getStatusColor} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Content */}
        <div className="lg:col-span-2 space-y-6">
          <InvoiceDetailCard invoice={detailedInvoice} />
          <BillingInformationCard invoice={detailedInvoice} />
          <ServicesCard invoice={detailedInvoice} />
        </div>

        {/* Sidebar */}
        <div>
          <InvoiceDetailSidebar invoice={detailedInvoice} getStatusColor={getStatusColor} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailContent;
