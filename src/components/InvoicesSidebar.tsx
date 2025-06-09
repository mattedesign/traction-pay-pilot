
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InvoicesHeader from "./InvoicesHeader";
import InvoiceGroupHeader from "./InvoiceGroupHeader";
import InvoicesEmptyState from "./InvoicesEmptyState";
import InvoicesLoadingState from "./InvoicesLoadingState";
import InvoiceItem from "./InvoiceItem";

interface Invoice {
  id: string;
  loadId: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
  date: string;
  brokerName: string;
}

const InvoicesSidebar = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced mock invoice data with load associations
  const mockInvoices: Invoice[] = [
    { 
      id: "INV-2024-001", 
      loadId: "TMS-001", 
      amount: "$2,450.00", 
      status: "pending", 
      date: "2024-06-08",
      brokerName: "Continental Logistics Partners"
    },
    { 
      id: "INV-2024-002", 
      loadId: "1234", 
      amount: "$1,850.00", 
      status: "paid", 
      date: "2024-06-05",
      brokerName: "Apex Freight Solutions"
    },
    { 
      id: "INV-2024-003", 
      loadId: "5678", 
      amount: "$2,200.00", 
      status: "overdue", 
      date: "2024-05-28",
      brokerName: "Crossroads Transport Brokers"
    },
    { 
      id: "INV-2024-004", 
      loadId: "9012", 
      amount: "$1,750.00", 
      status: "pending", 
      date: "2024-06-06",
      brokerName: "Summit Cargo Connect"
    },
    { 
      id: "INV-2024-005", 
      loadId: "3456", 
      amount: "$2,100.00", 
      status: "paid", 
      date: "2024-06-03",
      brokerName: "Meridian Shipping Services"
    }
  ];

  useEffect(() => {
    // Simulate loading invoices
    setIsLoading(true);
    setTimeout(() => {
      setInvoices(mockInvoices);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleNewInvoice = () => {
    navigate('/invoices/new');
  };

  if (isLoading) {
    return <InvoicesLoadingState />;
  }

  // Group invoices by status
  const pendingInvoices = invoices.filter(invoice => invoice.status === "pending");
  const overdueInvoices = invoices.filter(invoice => invoice.status === "overdue");
  const paidInvoices = invoices.filter(invoice => invoice.status === "paid");

  return (
    <div className="w-80 bg-white text-slate-900 h-screen flex flex-col shadow-sm border-r border-slate-200">
      <InvoicesHeader onNewInvoice={handleNewInvoice} />
      
      {/* Scrollable Invoices List */}
      <div className="flex-1 overflow-y-auto">
        {/* Overdue Invoices Section */}
        {overdueInvoices.length > 0 && (
          <>
            <InvoiceGroupHeader 
              title="Overdue" 
              count={overdueInvoices.length} 
              colorClasses="text-red-600 bg-red-50 border-red-100" 
            />
            <div>
              {overdueInvoices.map((invoice) => (
                <InvoiceItem key={invoice.id} invoice={invoice} />
              ))}
            </div>
          </>
        )}

        {/* Pending Invoices Section */}
        {pendingInvoices.length > 0 && (
          <>
            <InvoiceGroupHeader 
              title="Pending" 
              count={pendingInvoices.length} 
              colorClasses="text-yellow-600 bg-yellow-50 border-yellow-100" 
            />
            <div>
              {pendingInvoices.map((invoice) => (
                <InvoiceItem key={invoice.id} invoice={invoice} />
              ))}
            </div>
          </>
        )}

        {/* Paid Invoices Section */}
        {paidInvoices.length > 0 && (
          <>
            <InvoiceGroupHeader 
              title="Paid" 
              count={paidInvoices.length} 
              colorClasses="text-green-600 bg-green-50 border-green-100" 
            />
            <div>
              {paidInvoices.map((invoice) => (
                <InvoiceItem key={invoice.id} invoice={invoice} />
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {invoices.length === 0 && <InvoicesEmptyState />}
      </div>
    </div>
  );
};

export default InvoicesSidebar;
