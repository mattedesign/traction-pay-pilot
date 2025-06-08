
export interface Load {
  id: string;
  broker: string;
  status: "pending_pickup" | "in_transit" | "delivered";
  amount: string;
  origin: string;
  destination: string;
  pickupTime: string;
  distance: string;
  rateConfirmation?: {
    originalRate: string;
    commodity: string;
    weight: string;
    referenceNumber?: string;
  };
}

export interface RateConfirmationData {
  loadId: string;
  brokerName: string;
  rate: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  distance: string;
  referenceNumber: string;
  commodity?: string;
  weight?: string;
  pieces?: string;
}

export interface LoadDiscrepancy {
  type: 'rate_difference' | 'weight_change' | 'commodity_change' | 'accessorial_charge' | 'delivery_delay' | 'pickup_early';
  severity: 'low' | 'medium' | 'high';
  description: string;
  suggestedResolution: string[];
  requiredDocuments?: string[];
}

export interface DiscrepancyResolutionSuggestions {
  summary: string;
  highPriority: boolean;
  recommendedActions: string[];
  requiredDocuments: string[];
  estimatedResolutionTime: string;
}
