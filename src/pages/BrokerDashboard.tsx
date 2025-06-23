
import BrokerNavigationSidebar from "@/components/BrokerNavigationSidebar";
import DashboardHeader from "@/components/broker/DashboardHeader";
import ComprehensiveFinancialDashboard from "@/components/broker/ComprehensiveFinancialDashboard";
import LoadsInProgressCard from "@/components/broker/LoadsInProgressCard";
import PaperworkReviewCard from "@/components/broker/PaperworkReviewCard";
import { LoadInProgress } from "@/types/brokerLoad";

// Mock data for the financial dashboard
const mockLoadsData: LoadInProgress[] = [
  {
    id: "TL-2024-001",
    origin: "Dallas, TX",
    destination: "Atlanta, GA", 
    status: "in_transit",
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
    status: "delivery_scheduled",
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
    status: "pickup_scheduled",
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
  },
  {
    id: "TL-2024-004",
    origin: "Miami, FL", 
    destination: "Orlando, FL",
    status: "delivered",
    carrier: "Regional Express",
    driver: "Maria Rodriguez",
    driverPhone: "(555) 456-7890",
    pickupDate: "June 6, 2024",
    deliveryDate: "June 7, 2024",
    rate: "$680",
    distance: "235 mi",
    eta: "June 7, 3:00 PM",
    lastUpdate: "1 day ago",
    quickPayEligible: true,
    quickPayRate: "$667",
    commodity: "Food Products",
    weight: "28,000 lbs",
    equipment: "26' Box Truck",
    referenceNumber: "REF-004"
  }
];

const BrokerDashboard = () => {
  return (
    <div className="h-screen overflow-hidden flex w-full bg-slate-50">
      <BrokerNavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <div className="flex-1 overflow-auto px-8 py-6 space-y-6">
          <ComprehensiveFinancialDashboard loads={mockLoadsData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LoadsInProgressCard />
            <PaperworkReviewCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;
