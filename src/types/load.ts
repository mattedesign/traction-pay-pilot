
export interface Load {
  id: string;
  broker: string;
  status: "pending_pickup" | "in_transit" | "delivered" | "pending_acceptance" | "ready_to_invoice";
  amount: string;
  origin: string;
  destination: string;
  pickupTime: string;
  deliveryTime?: string; // Add optional deliveryTime property
  distance: string;
  factoring?: {
    isFactored: boolean;
    rate?: number;
    company?: string;
  };
  rateConfirmation?: {
    originalRate: string;
    commodity: string;
    weight: string;
    referenceNumber?: string;
  };
  source?: "manual" | "tms";
  tmsData?: {
    loadNumber: string;
    brokerLoadNumber?: string;
    equipment: string;
    commodity: string;
    weight: string;
    pieces?: string;
    deliveryTime?: string;
    specialInstructions?: string;
    contactInfo?: {
      name: string;
      phone: string;
      email: string;
    };
  };
  notificationSent?: boolean;
  acceptedAt?: string;
  deliveredAt?: string;
  fuelCost?: string;
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

export interface LoadNotification {
  id: string;
  loadId: string;
  type: "new_load" | "load_update" | "payment_ready" | "carrier_assigned" | "paperwork_submitted" | "quickpay_request";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  userType: "carrier" | "broker" | "both";
}
