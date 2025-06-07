
import { useState } from "react";
import InvoiceStatus from "./InvoiceStatus";
import QuickPayApplication from "./QuickPayApplication";
import FactoringOffer from "./FactoringOffer";
import PaymentChatSection from "./PaymentChatSection";

const QuickPayOffer = () => {
  const [applicationStatus, setApplicationStatus] = useState<"offer" | "applying" | "approved">("offer");

  const loadData = {
    loadId: "0000",
    invoiceAmount: "$1,200.00",
    standardPayDate: "June 3, 2025",
    daysToStandardPay: 27,
    quickPayFee: "$24.00",
    quickPayAmount: "$1,176.00",
    quickPayDate: "Tomorrow",
    cashFlowImprovement: "$1,176.00",
    annualizedRate: "3.6%"
  };

  const factorData = {
    available: true,
    rate: "2.5%",
    advance: "85%",
    monthlyVolume: "$12,500"
  };

  const handleQuickPayApplication = () => {
    setApplicationStatus("applying");
    setTimeout(() => setApplicationStatus("approved"), 2000);
  };

  return (
    <div className="space-y-6">
      <InvoiceStatus loadData={loadData} />
      
      <QuickPayApplication 
        loadData={loadData}
        applicationStatus={applicationStatus}
        onQuickPayApplication={handleQuickPayApplication}
      />

      <FactoringOffer factorData={factorData} />

      <PaymentChatSection loadId={loadData.loadId} />
    </div>
  );
};

export default QuickPayOffer;
