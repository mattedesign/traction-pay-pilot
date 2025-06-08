
import { toast } from "@/hooks/use-toast";

interface RateConfirmationData {
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

interface LoadDiscrepancy {
  type: 'rate_difference' | 'weight_change' | 'commodity_change' | 'accessorial_charge' | 'delivery_delay' | 'pickup_early';
  severity: 'low' | 'medium' | 'high';
  description: string;
  suggestedResolution: string[];
  requiredDocuments?: string[];
}

export class LoadService {
  static mockLoads: any[] = [
    {
      id: "1234",
      broker: "Swift Logistics",
      status: "pending_pickup",
      amount: "$500.00",
      origin: "Shreve, OH",
      destination: "Grove City, OH",
      pickupTime: "Today 1:00 PM",
      distance: "45 miles",
      rateConfirmation: {
        originalRate: "$500.00",
        commodity: "General Freight",
        weight: "26000 lbs"
      }
    },
    {
      id: "5678", 
      broker: "Phoenix Freight Co",
      status: "in_transit",
      amount: "$750.00",
      origin: "Phoenix, AZ",
      destination: "Perris, CA", 
      pickupTime: "May 29, 7:00 AM",
      distance: "332 miles",
      rateConfirmation: {
        originalRate: "$750.00",
        commodity: "Electronics",
        weight: "34000 lbs"
      }
    },
    {
      id: "9012",
      broker: "Delta Shipping", 
      status: "delivered",
      amount: "$650.00",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      pickupTime: "May 28, 9:00 AM", 
      distance: "240 miles",
      rateConfirmation: {
        originalRate: "$650.00",
        commodity: "Steel Coils",
        weight: "45000 lbs"
      }
    }
  ];

  static createLoadFromRateConfirmation(data: RateConfirmationData) {
    const newLoad = {
      id: data.loadId,
      broker: data.brokerName,
      status: "pending_pickup" as const,
      amount: data.rate,
      origin: data.origin.split(',')[0] + ', ' + data.origin.split(',')[1]?.trim().split(' ')[0],
      destination: data.destination.split(',')[0] + ', ' + data.destination.split(',')[1]?.trim().split(' ')[0],
      pickupTime: data.pickupDate,
      distance: data.distance,
      rateConfirmation: {
        originalRate: data.rate,
        commodity: data.commodity || "General Freight",
        weight: data.weight || "Unknown",
        referenceNumber: data.referenceNumber
      }
    };

    this.mockLoads.unshift(newLoad);
    
    toast({
      title: "Load Created Successfully",
      description: `Load #${data.loadId} has been added to your load list`,
    });

    return newLoad;
  }

  static detectDiscrepancies(loadId: string, documentType: string, documentData: any): LoadDiscrepancy[] {
    const load = this.mockLoads.find(l => l.id === loadId);
    if (!load || !load.rateConfirmation) return [];

    const discrepancies: LoadDiscrepancy[] = [];

    // Rate discrepancy detection
    if (documentData.totalAmount && documentData.totalAmount !== load.rateConfirmation.originalRate) {
      const originalAmount = parseFloat(load.rateConfirmation.originalRate.replace('$', '').replace(',', ''));
      const newAmount = parseFloat(documentData.totalAmount.replace('$', '').replace(',', ''));
      const difference = newAmount - originalAmount;

      discrepancies.push({
        type: 'rate_difference',
        severity: Math.abs(difference) > 100 ? 'high' : Math.abs(difference) > 50 ? 'medium' : 'low',
        description: `Rate difference detected: Original $${originalAmount.toFixed(2)} vs Document $${newAmount.toFixed(2)} (${difference > 0 ? '+' : ''}$${difference.toFixed(2)})`,
        suggestedResolution: [
          "Upload detention documentation if applicable",
          "Provide fuel surcharge documentation",
          "Submit accessorial charge breakdown",
          "Contact broker to clarify rate discrepancy"
        ],
        requiredDocuments: ["Detention Receipt", "Fuel Surcharge Invoice", "Accessorial Documentation"]
      });
    }

    // Weight discrepancy detection
    if (documentData.weight && load.rateConfirmation.weight !== "Unknown") {
      const originalWeight = parseInt(load.rateConfirmation.weight.replace(/[^\d]/g, ''));
      const documentWeight = parseInt(documentData.weight.replace(/[^\d]/g, ''));
      
      if (Math.abs(originalWeight - documentWeight) > 2000) {
        discrepancies.push({
          type: 'weight_change',
          severity: Math.abs(originalWeight - documentWeight) > 5000 ? 'high' : 'medium',
          description: `Weight discrepancy: Original ${load.rateConfirmation.weight} vs Actual ${documentData.weight}`,
          suggestedResolution: [
            "Upload certified scale ticket",
            "Provide shipper's weight certificate",
            "Contact shipper for weight verification",
            "Submit reweigh documentation if available"
          ],
          requiredDocuments: ["Certified Scale Ticket", "Shipper Weight Certificate"]
        });
      }
    }

    // Commodity class change detection
    if (documentData.commodity && documentData.commodity !== load.rateConfirmation.commodity) {
      discrepancies.push({
        type: 'commodity_change',
        severity: 'medium',
        description: `Commodity change: Original "${load.rateConfirmation.commodity}" vs Actual "${documentData.commodity}"`,
        suggestedResolution: [
          "Upload updated commodity description from shipper",
          "Provide NMFC classification documentation",
          "Contact broker about commodity classification",
          "Submit freight class verification"
        ],
        requiredDocuments: ["NMFC Documentation", "Shipper Commodity Certificate"]
      });
    }

    // Delivery time discrepancy (for POD)
    if (documentType === "Delivery Receipt" && documentData.deliveryTime) {
      const scheduledDelivery = new Date(load.pickupTime);
      const actualDelivery = new Date(documentData.deliveryTime);
      const hoursDifference = Math.abs(actualDelivery.getTime() - scheduledDelivery.getTime()) / (1000 * 60 * 60);

      if (hoursDifference > 24) {
        discrepancies.push({
          type: 'delivery_delay',
          severity: hoursDifference > 48 ? 'high' : 'medium',
          description: `Delivery delay detected: ${Math.round(hoursDifference)} hours late`,
          suggestedResolution: [
            "Document weather delays with weather reports",
            "Provide traffic delay documentation",
            "Submit mechanical breakdown reports",
            "Upload consignee appointment restrictions"
          ],
          requiredDocuments: ["Weather Report", "Traffic Documentation", "Breakdown Report"]
        });
      }
    }

    return discrepancies;
  }

  static getDiscrepancyResolutionSuggestions(discrepancies: LoadDiscrepancy[]) {
    if (discrepancies.length === 0) return null;

    const highPriorityDiscrepancies = discrepancies.filter(d => d.severity === 'high');
    const allRequiredDocs = [...new Set(discrepancies.flatMap(d => d.requiredDocuments || []))];

    return {
      summary: `${discrepancies.length} potential issue${discrepancies.length > 1 ? 's' : ''} detected`,
      highPriority: highPriorityDiscrepancies.length > 0,
      recommendedActions: [
        ...new Set(discrepancies.flatMap(d => d.suggestedResolution))
      ].slice(0, 5),
      requiredDocuments: allRequiredDocs,
      estimatedResolutionTime: highPriorityDiscrepancies.length > 0 ? "24-48 hours" : "2-4 hours"
    };
  }

  static getAllLoads() {
    return this.mockLoads;
  }
}
