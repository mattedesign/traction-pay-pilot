
import { LoadSearchResult } from "./loadSearchService";

export interface InteractiveResponse {
  message: string;
  buttons?: Array<{
    text: string;
    action: string;
    loadId?: string;
  }>;
}

export class InteractiveResponseService {
  static generateLoadStatusResponse(results: LoadSearchResult[]): InteractiveResponse {
    if (results.length === 0) {
      return {
        message: "No loads found matching your search criteria."
      };
    }

    if (results.length === 1) {
      const result = results[0];
      const load = result.load;
      
      const statusMessage = this.getStatusMessage(load.status);
      
      return {
        message: `**Load #${load.id}** - ${load.broker}\n\n` +
                `📍 **Route:** ${load.origin} → ${load.destination}\n` +
                `💰 **Amount:** ${load.amount}\n` +
                `📅 **Pickup:** ${load.pickupTime}\n` +
                `🚛 **Distance:** ${load.distance}\n\n` +
                `**Status:** ${statusMessage}`,
        buttons: [
          {
            text: "📋 View Load Details",
            action: "navigate",
            loadId: load.id
          },
          {
            text: "📞 Contact Broker",
            action: "contact_broker",
            loadId: load.id
          }
        ]
      };
    }

    // Multiple loads found
    let message = `Found ${results.length} loads:\n\n`;
    
    results.slice(0, 3).forEach((result, index) => {
      const load = result.load;
      message += `**${index + 1}. Load #${load.id}** - ${load.broker}\n`;
      message += `   ${load.origin} → ${load.destination} | ${load.amount}\n`;
      message += `   Status: ${this.getStatusMessage(load.status)}\n\n`;
    });

    if (results.length > 3) {
      message += `... and ${results.length - 3} more loads\n\n`;
    }

    return {
      message,
      buttons: [
        {
          text: "🔍 View All Loads",
          action: "navigate_loads"
        }
      ]
    };
  }

  private static getStatusMessage(status: string): string {
    switch (status) {
      case "pending_acceptance":
        return "⏳ Pending Acceptance - Awaiting your response";
      case "pending_pickup":
        return "📦 Ready for Pickup - Confirmed and ready";
      case "in_transit":
        return "🚛 In Transit - Currently en route";
      case "delivered":
        return "✅ Delivered - Successfully completed";
      case "ready_to_invoice":
        return "📄 Ready to Invoice - Awaiting payment processing";
      default:
        return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  }

  static handleButtonAction(action: string, loadId?: string): string {
    switch (action) {
      case "navigate":
        if (loadId) {
          // Ensure we're using the correct path with 's' - /loads/:id
          window.location.href = `/loads/${loadId}`;
          return "Navigating to load details...";
        }
        return "Load ID not found";
      
      case "navigate_loads":
        window.location.href = "/loads";
        return "Navigating to loads page...";
      
      case "contact_broker":
        return "Opening broker contact options...";
      
      default:
        return "Unknown action";
    }
  }
}
