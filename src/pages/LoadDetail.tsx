
import { useParams } from "react-router-dom";
import LoadHeader from "@/components/LoadHeader";
import LoadInformation from "@/components/LoadInformation";
import RouteOptimization from "@/components/RouteOptimization";
import EldSharing from "@/components/EldSharing";
import DocumentUploadSection from "@/components/DocumentUploadSection";
import FinancialServices from "@/components/FinancialServices";
import LoadAssistant from "@/components/LoadAssistant";

const LoadDetail = () => {
  const { loadId } = useParams();

  // Mock load data based on loadId
  const getLoadData = (id: string) => {
    const loads: Record<string, any> = {
      "1234": {
        loadId: "1234",
        status: "pending_pickup",
        amount: "$500.00",
        origin: "3875 S Elyria Rd, Shreve, OH 44676",
        destination: "3920 Southwest Blvd, Grove City, OH 43123",
        pickupTime: "Today 1:00 PM",
        deliveryTime: "Today 4:30 PM",
        distance: "45 miles",
        mode: "TL",
        broker: "Swift Logistics",
        documents: []
      },
      "5678": {
        loadId: "5678",
        status: "in_transit",
        amount: "$750.00",
        origin: "1015 South 43rd Avenue, Phoenix, AZ 85001",
        destination: "400 East Ellis Avenue, Perris, CA 92570",
        pickupTime: "May 29, 7:00 AM",
        deliveryTime: "May 29, 6:00 PM",
        distance: "332 miles",
        mode: "truck",
        broker: "Phoenix Freight Co",
        documents: ["Rate Confirmation"]
      }
    };
    return loads[id] || loads["1234"];
  };

  const loadData = getLoadData(loadId || "1234");

  return (
    <div className="min-h-screen bg-slate-50"> {/* Light gray background */}
      <LoadHeader 
        loadId={loadData.loadId}
        broker={loadData.broker}
        status={loadData.status}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Load Information */}
          <div className="space-y-6">
            <LoadInformation loadData={loadData} />
            <RouteOptimization />
            <EldSharing />
          </div>

          {/* Documents & Actions */}
          <div className="space-y-6">
            <DocumentUploadSection />
            <FinancialServices loadAmount={loadData.amount} />
            <LoadAssistant loadId={loadData.loadId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadDetail;
