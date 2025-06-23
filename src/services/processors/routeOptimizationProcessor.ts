
import { ChatMessage, InteractiveButton } from "@/hooks/useChatMessages";
import { RouteOptimizationHandler } from "../routeOptimizationHandler";
import { LoadService } from "../loadService";

interface RouteOptimizationProcessorParams {
  userMessage: string;
  addAIMessage: (content: string, interactiveButtons?: InteractiveButton[]) => ChatMessage;
  onNavigate?: (path: string) => void;
}

export class RouteOptimizationProcessor {
  static handle({
    userMessage,
    addAIMessage,
    onNavigate
  }: RouteOptimizationProcessorParams) {
    console.log('Processing route optimization request:', userMessage);
    
    const messageLower = userMessage.toLowerCase();
    
    // Check if user is asking for initial route optimization
    if (messageLower.includes('route') && messageLower.includes('optimization')) {
      const response = RouteOptimizationHandler.generateRouteOptimizationResponse('initial');
      const loads = RouteOptimizationHandler.getOptimizableLoads();
      
      const buttons: InteractiveButton[] = loads.map(load => ({
        id: `route_load_${load.id}`,
        text: `Load #${load.id}`,
        action: 'continue_chat',
        actionData: {
          message: `Optimize route for Load #${load.id}`
        }
      }));
      
      addAIMessage(response, buttons);
      return true;
    }
    
    // Check if user selected a specific load for optimization
    const loadMatch = messageLower.match(/optimize route for load #?(\d+)/);
    if (loadMatch) {
      const loadId = loadMatch[1];
      const load = LoadService.getLoadById(loadId);
      
      if (load) {
        const response = RouteOptimizationHandler.generateRouteOptimizationResponse('show_options', { load });
        const options = RouteOptimizationHandler.getOptimizationOptions();
        
        const buttons: InteractiveButton[] = options.map(option => ({
          id: `route_option_${option.id}`,
          text: `${option.icon} ${option.name}`,
          action: 'navigate',
          actionData: {
            path: `/route-optimization/${option.id}`,
            message: `Show ${option.name.toLowerCase()} for Load #${loadId}`
          }
        }));
        
        addAIMessage(response, buttons);
        return true;
      }
    }
    
    // Check if user is asking about specific optimization types
    const optimizationTypes = ['fuel efficient', 'fastest', 'multi stop', 'weather aware'];
    const matchedType = optimizationTypes.find(type => messageLower.includes(type.replace(' ', '')));
    
    if (matchedType && onNavigate) {
      const typeId = matchedType.replace(' ', '_').replace(' ', '_');
      addAIMessage(`Opening ${matchedType} route optimization details...`);
      onNavigate(`/route-optimization/${typeId}`);
      return true;
    }
    
    return false;
  }
}
