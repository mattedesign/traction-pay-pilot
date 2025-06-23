
import { useState } from "react";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";
import BrokerLoadsInProgressHeader from "@/components/broker/BrokerLoadsInProgressHeader";
import BrokerLoadsInProgressFilters from "@/components/broker/BrokerLoadsInProgressFilters";
import BrokerLoadsInProgressList from "@/components/broker/BrokerLoadsInProgressList";
import { LoadInProgress } from "@/types/brokerLoad";

// Mock data for demonstration
const mockLoadsInProgress: LoadInProgress[] = [
  {
    id: "LOAD-2024-001",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    status: "in_transit",
    carrier: "ABC Trucking",
    driver: "John Smith",
    driverPhone: "(555) 123-4567",
    currentLocation: { lat: 34.0522, lng: -118.2437, city: "Barstow, CA" },
    pickupDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    rate: "$2,450",
    distance: "390 miles",
    eta: "Tomorrow 2:00 PM",
    lastUpdate: "2 hours ago",
    quickPayEligible: true,
    quickPayRate: "$2,400",
    commodity: "Electronics",
    weight: "34,000 lbs",
    equipment: "Dry Van",
    referenceNumber: "REF-001",
    specialInstructions: "Call before delivery"
  },
  {
    id: "LOAD-2024-002",
    origin: "Dallas, TX",
    destination: "Atlanta, GA",
    status: "delivery_scheduled",
    carrier: "XYZ Transport",
    driver: "Maria Garcia",
    driverPhone: "(555) 987-6543",
    currentLocation: { lat: 32.7767, lng: -96.7970, city: "Birmingham, AL" },
    pickupDate: "2024-01-14",
    deliveryDate: "2024-01-17",
    rate: "$3,200",
    distance: "925 miles",
    eta: "Wed 10:00 AM",
    lastUpdate: "4 hours ago",
    quickPayEligible: false,
    commodity: "Auto Parts",
    weight: "42,000 lbs",
    equipment: "Flatbed",
    referenceNumber: "REF-002"
  }
];

const BrokerLoadsInProgressPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loads] = useState<LoadInProgress[]>(mockLoadsInProgress);

  const filteredLoads = loads.filter(load => {
    const matchesSearch = load.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || load.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const inTransitCount = loads.filter(load => load.status === "in_transit").length;
  const deliveryScheduledCount = loads.filter(load => load.status === "delivery_scheduled").length;
  const delayedCount = 0; // Mock count

  const handleExport = () => {
    console.log("Exporting loads data...");
    // Implementation for export functionality
  };

  return (
    <div className="h-screen bg-slate-50 flex w-full">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col min-h-0">
        <DashboardHeader />
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Loads in Progress</h1>
              <p className="text-slate-600">Monitor and manage active shipments</p>
            </div>

            <BrokerLoadsInProgressHeader
              totalLoads={loads.length}
              inTransitCount={inTransitCount}
              deliveryScheduledCount={deliveryScheduledCount}
              delayedCount={delayedCount}
            />

            <BrokerLoadsInProgressFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onExport={handleExport}
            />

            <BrokerLoadsInProgressList loads={filteredLoads} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerLoadsInProgressPage;
