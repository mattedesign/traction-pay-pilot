
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
    console.log('RouteOptimizationProcessor: Processing message:', userMessage);
    
    const messageLower = userMessage.toLowerCase().trim();
    console.log('RouteOptimizationProcessor: Normalized message:', messageLower);
    
    // Check if user is asking for initial route optimization
    if (messageLower.includes('optimize') && (messageLower.includes('route') || messageLower.includes('routing'))) {
      console.log('RouteOptimizationProcessor: Initial route optimization request detected');
      
      const response = RouteOptimizationHandler.generateRouteOptimizationResponse('initial');
      const loads = RouteOptimizationHandler.getOptimizableLoads();
      
      if (loads.length === 0) {
        addAIMessage("I don't see any active loads that can be optimized right now. Route optimization is available for loads that are pending pickup or in transit.");
        return true;
      }
      
      const buttons: InteractiveButton[] = loads.map(load => ({
        id: `route_load_${load.id}`,
        text: `Load #${load.id} - ${load.origin} → ${load.destination}`,
        action: 'continue_chat',
        actionData: {
          message: `Optimize route for Load #${load.id}`
        }
      }));
      
      addAIMessage(response, buttons);
      return true;
    }
    
    // Enhanced regex patterns for load selection
    const loadPatterns = [
      /optimize\s+route\s+for\s+load\s*#?(\w+)/i,
      /route\s+optimization\s+for\s+load\s*#?(\w+)/i,
      /load\s*#?(\w+)\s+route\s+optimization/i,
      /load\s*#?(\w+)\s+optimize/i
    ];
    
    let loadId = null;
    for (const pattern of loadPatterns) {
      const match = messageLower.match(pattern);
      if (match) {
        loadId = match[1];
        console.log('RouteOptimizationProcessor: Load ID extracted:', loadId);
        break;
      }
    }
    
    if (loadId) {
      console.log('RouteOptimizationProcessor: Looking up load:', loadId);
      const load = LoadService.getLoadById(loadId);
      
      if (load) {
        console.log('RouteOptimizationProcessor: Load found, showing options for:', load.id);
        const response = RouteOptimizationHandler.generateRouteOptimizationResponse('show_options', { load });
        const options = RouteOptimizationHandler.getOptimizationOptions();
        
        const buttons: InteractiveButton[] = options.map(option => ({
          id: `route_option_${option.id}_${loadId}`,
          text: `${option.icon} ${option.name}`,
          action: 'navigate',
          actionData: {
            path: `/route-optimization/${option.id}`,
            loadId: loadId,
            message: `Opening ${option.name.toLowerCase()} for Load #${loadId}`
          }
        }));
        
        addAIMessage(response, buttons);
        return true;
      } else {
        console.log('RouteOptimizationProcessor: Load not found:', loadId);
        addAIMessage(`I couldn't find Load #${loadId}. Please check the load ID and try again.`);
        return true;
      }
    }
    
    // Check if user is asking about specific optimization types with navigation
    const optimizationTypes = [
      { keywords: ['fuel efficient', 'fuel optimization'], id: 'fuel_efficient' },
      { keywords: ['fastest', 'quickest', 'time'], id: 'fastest' },
      { keywords: ['multi stop', 'multiple stops'], id: 'multi_stop' },
      { keywords: ['weather aware', 'weather routing'], id: 'weather_aware' }
    ];
    
    for (const type of optimizationTypes) {
      if (type.keywords.some(keyword => messageLower.includes(keyword))) {
        if (onNavigate) {
          const optionName = RouteOptimizationHandler.getOptimizationOptions()
            .find(opt => opt.id === type.id)?.name || 'Route optimization';
          
          console.log('RouteOptimizationProcessor: Navigating to optimization type:', type.id);
          addAIMessage(`Opening ${optionName} details...`);
          onNavigate(`/route-optimization/${type.id}`);
          return true;
        }
      }
    }
    
    console.log('RouteOptimizationProcessor: No route optimization patterns matched');
    return false;
  }
}
