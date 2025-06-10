
import SmartFeaturesCards from "./SmartFeaturesCards";
import RouteOptimization from "./RouteOptimization";
import FinancialServices from "./FinancialServices";
import LoadChatSection from "./LoadChatSection";
import PaymentChatSection from "./PaymentChatSection";
import DeliveredLoadIntelligence from "./DeliveredLoadIntelligence";
import EldTrackingCard from "./EldTrackingCard";
import EldSharing from "./EldSharing";
import { Load } from "@/types/load";
import { EldDataService } from "@/services/eldDataService";

interface LoadIntelligenceContentProps {
  load: Load;
}

const LoadIntelligenceContent = ({ load }: LoadIntelligenceContentProps) => {
  // Check if this is a delivered load that should show fuel analysis
  const isDeliveredLoad = load.status === "delivered" || load.status === "ready_to_invoice";
  const isEldEnabled = EldDataService.isEldEnabled(load.id);

  if (isDeliveredLoad) {
    return <DeliveredLoadIntelligence load={load} />;
  }

  // Create extracted data for SmartFeaturesCards
  const extractedData = {
    rate: load.amount,
    origin: load.origin,
    destination: load.destination,
    distance: load.distance
  };

  return (
    <div className="space-y-6">
      {/* ELD Tracking Card - Shows live tracking if enabled */}
      {isEldEnabled && <EldTrackingCard loadId={load.id} />}
      
      {/* ELD Sharing Card - Shows for non-ELD enabled loads */}
      {!isEldEnabled && <EldSharing />}
      
      {/* Smart Features Overview */}
      <SmartFeaturesCards extractedData={extractedData} />
      
      {/* Route Optimization */}
      <RouteOptimization />
      
      {/* Financial Services */}
      <FinancialServices loadAmount={load.amount} />
      
      {/* Load-specific Chat */}
      <LoadChatSection loadId={load.id} />
      
      {/* Payment Chat */}
      <PaymentChatSection loadId={load.id} />
    </div>
  );
};

export default LoadIntelligenceContent;
