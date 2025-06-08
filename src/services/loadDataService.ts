
import { LoadService } from './loadService';

export interface LoadDataContext {
  loadId: string;
  loadDetails: any;
  relatedData: {
    documents: string[];
    communications: any[];
    financials: any;
  };
}

export class LoadDataService {
  static async getLoadContext(loadId: string): Promise<LoadDataContext | null> {
    try {
      const loads = LoadService.getAllLoads();
      const loadDetails = loads.find(load => load.id === loadId);
      
      if (!loadDetails) {
        return null;
      }

      // Get related data for comprehensive context
      const relatedData = {
        documents: this.getLoadDocuments(loadId),
        communications: this.getLoadCommunications(loadId),
        financials: this.getLoadFinancials(loadDetails)
      };

      return {
        loadId,
        loadDetails,
        relatedData
      };
    } catch (error) {
      console.error('Error fetching load context:', error);
      return null;
    }
  }

  static getLoadDocuments(loadId: string): string[] {
    // Mock document retrieval - in real app would fetch from database
    const documentMap: Record<string, string[]> = {
      "1234": ["Rate Confirmation", "BOL"],
      "5678": ["Rate Confirmation", "POD", "Invoice"],
      "9012": ["Rate Confirmation", "POD", "Invoice", "Payment Receipt"]
    };
    return documentMap[loadId] || [];
  }

  static getLoadCommunications(loadId: string): any[] {
    // Mock communication retrieval
    const commMap: Record<string, any[]> = {
      "1234": [
        { type: "email", subject: "Pickup confirmation", timestamp: new Date() },
        { type: "call", subject: "Delivery window update", timestamp: new Date() }
      ],
      "5678": [
        { type: "email", subject: "Route update", timestamp: new Date() }
      ],
      "9012": [
        { type: "email", subject: "Payment processed", timestamp: new Date() }
      ]
    };
    return commMap[loadId] || [];
  }

  static getLoadFinancials(loadDetails: any): any {
    return {
      originalRate: loadDetails.amount,
      advanceAvailable: Math.round(parseFloat(loadDetails.amount.replace('$', '').replace(',', '')) * 0.4),
      fuelSurcharge: 0,
      detention: 0,
      totalExpected: loadDetails.amount
    };
  }

  static extractLoadIdFromMessage(message: string): string | null {
    // Enhanced pattern matching for load IDs
    const patterns = [
      /load\s*#?(\d{4})/i,
      /shipment\s*#?(\d{4})/i,
      /order\s*#?(\d{4})/i,
      /#(\d{4})/,
      /(\d{4})\s*load/i
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  }

  static formatLoadContextForAI(context: LoadDataContext): string {
    const { loadDetails, relatedData } = context;
    
    return `
**LOAD CONTEXT - Load #${context.loadId}**

**Load Details:**
- Status: ${loadDetails.status}
- Broker: ${loadDetails.broker}
- Amount: ${loadDetails.amount}
- Origin: ${loadDetails.origin}
- Destination: ${loadDetails.destination}
- Pickup: ${loadDetails.pickupTime}
- Distance: ${loadDetails.distance}

**Financial Information:**
- Original Rate: ${relatedData.financials.originalRate}
- Advance Available: $${relatedData.financials.advanceAvailable}
- Total Expected: ${relatedData.financials.totalExpected}

**Documents on File:**
${relatedData.documents.length > 0 ? relatedData.documents.join(', ') : 'No documents uploaded yet'}

**Recent Communications:**
${relatedData.communications.length > 0 ? 
  relatedData.communications.map(comm => `- ${comm.subject} (${comm.type})`).join('\n') : 
  'No recent communications'}

**Current Situation:**
${this.getLoadStatusDescription(loadDetails.status)}
`;
  }

  static getLoadStatusDescription(status: string): string {
    const statusDescriptions: Record<string, string> = {
      "pending_pickup": "Load is scheduled for pickup and waiting for driver arrival",
      "in_transit": "Load is currently being transported to destination",
      "delivered": "Load has been successfully delivered",
      "delayed": "Load is experiencing delays in transit",
      "cancelled": "Load has been cancelled"
    };
    return statusDescriptions[status] || "Status information not available";
  }
}
