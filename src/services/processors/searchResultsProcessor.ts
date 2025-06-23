
import { ChatMessage, InteractiveButton } from "@/hooks/useChatMessages";

export class SearchResultsProcessor {
  static handle(routingResult: any, addAIMessage: (content: string, interactiveButtons?: InteractiveButton[]) => ChatMessage) {
    console.log('Handling pure search results without AI...', routingResult);
    
    if (routingResult.queryType === 'load_search' && routingResult.loadResults.length > 1) {
      // Multiple loads found - let the load search handler display them
      console.log('Multiple loads found, returning results for display');
      return routingResult;
    } else if (routingResult.queryType === 'specific_load' && routingResult.loadResults.length === 1) {
      // Single load found - provide detailed info with interactive buttons
      const load = routingResult.loadResults[0].load;
      const basicInfo = `**Load #${load.id} Information:**

📊 **Status:** ${load.status.replace('_', ' ').toUpperCase()}
🏢 **Broker:** ${load.broker}
💰 **Amount:** ${load.amount}
📍 **Route:** ${load.origin} → ${load.destination}
⏰ **Pickup:** ${load.pickupTime}
📏 **Distance:** ${load.distance}

Would you like to view the full load details or ask me specific questions about this load?`;

      // Create interactive buttons for the user
      const interactiveButtons: InteractiveButton[] = [
        {
          id: `view_load_${load.id}`,
          text: "View Load Details",
          action: 'navigate',
          actionData: {
            path: `/load/${load.id}`,
            message: `Navigating to Load #${load.id} details page`,
            closeDrawer: true // Add flag to close drawer on navigation
          }
        },
        {
          id: `ask_about_load_${load.id}`,
          text: "Ask Questions",
          action: 'continue_chat',
          actionData: {
            message: `I want to know more about load #${load.id}`
          }
        }
      ];
      
      addAIMessage(basicInfo, interactiveButtons);
      return routingResult;
    }

    return routingResult;
  }
}
