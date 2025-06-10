
import { useState, useMemo } from "react";
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import BrokerLoadsInProgressHeader from "@/components/broker/BrokerLoadsInProgressHeader";
import BrokerLoadsInProgressFilters from "@/components/broker/BrokerLoadsInProgressFilters";
import BrokerLoadsInProgressList from "@/components/broker/BrokerLoadsInProgressList";

// Mock data for loads in progress
const mockLoadsInProgress = [
  {
    id: "TL-2024-001",
    origin: "Dallas, TX",
    destination: "Atlanta, GA", 
    status: "in_transit" as const,
    carrier: "Swift Transportation",
    driver: "Mike Johnson",
    driverPhone: "(555) 123-4567",
    currentLocation: { lat: 32.7767, lng: -96.7970, city: "Dallas, TX" },
    pickupDate: "June 8, 2024",
    deliveryDate: "June 10, 2024",
    rate: "$1,850",
    distance: "925 mi",
    eta: "June 10, 2:00 PM",
    lastUpdate: "2 hours ago",
    quickPayEligible: true,
    quickPayRate: "$1,813",
    commodity: "Electronics",
    weight: "45,000 lbs",
    equipment: "53' Dry Van",
    referenceNumber: "REF-001",
    specialInstructions: "Temperature sensitive - keep below 75°F"
  },
  {
    id: "TL-2024-002", 
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    status: "delivery_scheduled" as const,
    carrier: "J.B. Hunt",
    driver: "Sarah Williams",
    driverPhone: "(555) 234-5678",
    currentLocation: { lat: 34.0522, lng: -118.2437, city: "Los Angeles, CA" },
    pickupDate: "June 7, 2024",
    deliveryDate: "June 9, 2024",
    rate: "$1,200",
    distance: "370 mi", 
    eta: "June 9, 10:00 AM",
    lastUpdate: "1 hour ago",
    quickPayEligible: false,
    commodity: "Automotive Parts",
    weight: "38,500 lbs",
    equipment: "53' Dry Van",
    referenceNumber: "REF-002"
  },
  {
    id: "TL-2024-003",
    origin: "Chicago, IL", 
    destination: "Detroit, MI",
    status: "pickup_scheduled" as const,
    carrier: "Schneider National",
    driver: "Robert Chen",
    driverPhone: "(555) 345-6789",
    pickupDate: "June 9, 2024",
    deliveryDate: "June 10, 2024",
    rate: "$950",
    distance: "280 mi",
    eta: "June 10, 4:00 PM",
    lastUpdate: "30 minutes ago",
    quickPayEligible: true,
    quickPayRate: "$931",
    commodity: "Manufacturing Equipment",
    weight: "42,000 lbs",
    equipment: "48' Flatbed",
    referenceNumber: "REF-003"
  }
];

const BrokerLoadsInProgressPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter loads based on search and status
  const filteredLoads = useMemo(() => {
    let filtered = mockLoadsInProgress;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter(load => load.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(load => 
        load.id.toLowerCase().includes(term) ||
        load.carrier.toLowerCase().includes(term) ||
        load.driver.toLowerCase().includes(term) ||
        load.origin.toLowerCase().includes(term) ||
        load.destination.toLowerCase().includes(term) ||
        load.commodity.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [searchTerm, selectedStatus]);

  // Calculate header statistics
  const headerStats = useMemo(() => {
    const totalLoads = mockLoadsInProgress.length;
    const inTransitCount = mockLoadsInProgress.filter(load => load.status === "in_transit").length;
    const deliveryScheduledCount = mockLoadsInProgress.filter(load => load.status === "delivery_scheduled").length;
    const delayedCount = 0; // Would be calculated based on actual delays

    return {
      totalLoads,
      inTransitCount,
      deliveryScheduledCount,
      delayedCount
    };
  }, []);

  const handleExport = () => {
    console.log("Exporting loads data...");
    // Implementation for exporting data would go here
  };

  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-900">Loads in Progress</h1>
          <p className="text-slate-600 mt-1">Monitor and manage active loads</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          <BrokerLoadsInProgressHeader {...headerStats} />
          
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
  );
};

export default BrokerLoadsInProgressPage;
