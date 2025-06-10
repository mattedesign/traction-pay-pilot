
import BrokerLoadCard from "./BrokerLoadCard";

interface LoadInProgress {
  id: string;
  origin: string;
  destination: string;
  status: "pickup_scheduled" | "in_transit" | "delivery_scheduled" | "delivered";
  carrier: string;
  driver: string;
  driverPhone: string;
  currentLocation?: { lat: number; lng: number; city: string };
  pickupDate: string;
  deliveryDate: string;
  rate: string;
  distance: string;
  eta: string;
  lastUpdate: string;
  quickPayEligible?: boolean;
  quickPayRate?: string;
  commodity: string;
  weight: string;
  equipment: string;
  referenceNumber: string;
  specialInstructions?: string;
}

interface BrokerLoadsInProgressListProps {
  loads: LoadInProgress[];
  isLoading?: boolean;
}

const BrokerLoadsInProgressList = ({ loads, isLoading = false }: BrokerLoadsInProgressListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg border p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-32"></div>
                <div className="h-3 bg-slate-200 rounded w-24"></div>
              </div>
              <div className="h-6 bg-slate-200 rounded w-20"></div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-3 bg-slate-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (loads.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6a2 2 0 00-2 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1a2 2 0 00-2-2H2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-600 mb-2">No loads found</h3>
        <p className="text-slate-500">No loads match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loads.map((load) => (
        <BrokerLoadCard key={load.id} load={load} />
      ))}
    </div>
  );
};

export default BrokerLoadsInProgressList;
