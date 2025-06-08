
import { useState, useEffect } from "react";
import { Search, Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InvoiceItem from "./InvoiceItem";
import LoadGroupHeader from "./LoadGroupHeader";

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
    return (
      <div className="w-80 bg-white text-slate-900 h-screen flex flex-col shadow-sm border-r border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-center">
            <div className="text-slate-500">Loading invoices...</div>
          </div>
        </div>
      </div>
    );
  }

  // Group invoices by status
  const pendingInvoices = invoices.filter(invoice => invoice.status === "pending");
  const overdueInvoices = invoices.filter(invoice => invoice.status === "overdue");
  const paidInvoices = invoices.filter(invoice => invoice.status === "paid");

  return (
    <div className="w-80 bg-white text-slate-900 h-screen flex flex-col shadow-sm border-r border-slate-200">
      {/* Fixed Header */}
      <div className="p-4 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Invoices</h2>
          <Search className="w-5 h-5 text-slate-400" />
        </div>
        
        <button 
          onClick={handleNewInvoice}
          className="w-full flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg px-4 py-3 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Invoice</span>
        </button>
      </div>
      
      {/* Scrollable Invoices List */}
      <div className="flex-1 overflow-y-auto">
        {/* Overdue Invoices Section */}
        {overdueInvoices.length > 0 && (
          <>
            <div className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-red-600 bg-red-50 border-b border-red-100">
              <FileText className="w-4 h-4" />
              <span>Overdue ({overdueInvoices.length})</span>
            </div>
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
            <div className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-yellow-600 bg-yellow-50 border-b border-yellow-100">
              <FileText className="w-4 h-4" />
              <span>Pending ({pendingInvoices.length})</span>
            </div>
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
            <div className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-green-600 bg-green-50 border-b border-green-100">
              <FileText className="w-4 h-4" />
              <span>Paid ({paidInvoices.length})</span>
            </div>
            <div>
              {paidInvoices.map((invoice) => (
                <InvoiceItem key={invoice.id} invoice={invoice} />
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {invoices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-slate-300 mb-3" />
            <p className="text-slate-500 text-sm">No invoices found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicesSidebar;
