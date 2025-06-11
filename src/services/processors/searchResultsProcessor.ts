
import { ChatMessage } from "@/hooks/useChatMessages";

export class SearchResultsProcessor {
  static handle(routingResult: any, addAIMessage: (content: string) => ChatMessage) {
    console.log('Handling pure search results without AI...');
    
    if (routingResult.queryType === 'load_search' && routingResult.loadResults.length > 1) {
      // Multiple loads found - let the load search handler display them
      console.log('Multiple loads found, returning results for display');
      return routingResult;
    } else if (routingResult.queryType === 'specific_load' && routingResult.loadResults.length === 1) {
      // Single load found - provide basic info
      const load = routingResult.loadResults[0].load;
      const basicInfo = `**Load #${load.id} Information:**

📊 **Status:** ${load.status.replace('_', ' ').toUpperCase()}
🏢 **Broker:** ${load.broker}
💰 **Amount:** ${load.amount}
📍 **Route:** ${load.origin} → ${load.destination}
⏰ **Pickup:** ${load.pickupTime}
📏 **Distance:** ${load.distance}

Click "View Load Details" above for more information or ask me specific questions about this load.`;
      
      addAIMessage(basicInfo);
      return routingResult;
    }

    return routingResult;
  }
}
