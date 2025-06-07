
import { useParams } from "react-router-dom";
import LoadsSidebar from "@/components/LoadsSidebar";
import LoadMainContent from "@/components/LoadMainContent";

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
      },
      "9012": {
        loadId: "9012",
        status: "delivered",
        amount: "$650.00",
        origin: "Houston, TX",
        destination: "Dallas, TX",
        pickupTime: "May 28, 9:00 AM",
        deliveryTime: "May 28, 2:00 PM",
        distance: "240 miles",
        mode: "truck",
        broker: "Delta Shipping",
        documents: ["POD", "Invoice"]
      }
    };
    return loads[id] || loads["1234"];
  };

  const loadData = getLoadData(loadId || "1234");

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      <LoadsSidebar />
      <LoadMainContent loadData={loadData} />
    </div>
  );
};

export default LoadDetail;
