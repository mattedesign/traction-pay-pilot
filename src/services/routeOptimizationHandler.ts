
import { Load } from "@/types/load";
import { LoadService } from "./loadService";

export interface RouteOptimizationOption {
  id: string;
  name: string;
  description: string;
  estimatedSavings: string;
  timeImpact: string;
  icon: string;
}

export interface RouteOptimizationStep {
  step: 'load_selection' | 'optimization_options' | 'results';
  data?: any;
}

export class RouteOptimizationHandler {
  static getOptimizableLoads(): Load[] {
    const allLoads = LoadService.getAllLoads();
    // Return loads that are pending pickup or in transit (can be optimized)
    return allLoads.filter(load => 
      load.status === 'pending_pickup' || load.status === 'in_transit'
    ).slice(0, 5); // Limit to 5 loads for better UX
  }

  static getOptimizationOptions(): RouteOptimizationOption[] {
    return [
      {
        id: 'fuel_efficient',
        name: 'Fuel-Efficient Route',
        description: 'Minimize fuel costs with optimized routing',
        estimatedSavings: '$50-150',
        timeImpact: '+15-30 min',
        icon: '⛽'
      },
      {
        id: 'fastest',
        name: 'Fastest Route',
        description: 'Minimize travel time avoiding traffic',
        estimatedSavings: '1-3 hours',
        timeImpact: 'Baseline',
        icon: '🚀'
      },
      {
        id: 'multi_stop',
        name: 'Multi-Stop Optimization',
        description: 'Optimize route with fuel and rest stops',
        estimatedSavings: '$75-200',
        timeImpact: '+30-45 min',
        icon: '🗺️'
      },
      {
        id: 'weather_aware',
        name: 'Weather-Aware Route',
        description: 'Avoid weather delays and hazards',
        estimatedSavings: 'Risk reduction',
        timeImpact: '+20-60 min',
        icon: '🌤️'
      }
    ];
  }

  static generateRouteOptimizationResponse(step: string, data?: any): string {
    switch (step) {
      case 'initial':
        const loads = this.getOptimizableLoads();
        if (loads.length === 0) {
          return "I don't see any active loads that can be optimized right now. Route optimization is available for loads that are pending pickup or in transit.";
        }
        
        const loadsList = loads.map(load => 
          `• **Load #${load.id}** - ${load.origin} → ${load.destination} (${load.status.replace('_', ' ').toUpperCase()})`
        ).join('\n');
        
        return `I'll help you optimize routes for your active loads! Here are the loads available for optimization:\n\n${loadsList}\n\n**Select a load** to see optimization options:`;

      case 'show_options':
        const selectedLoad = data.load;
        const options = this.getOptimizationOptions();
        const optionsList = options.map(opt => 
          `**${opt.icon} ${opt.name}**\n${opt.description}\n*Potential savings: ${opt.estimatedSavings} | Time impact: ${opt.timeImpact}*`
        ).join('\n\n');

        return `Perfect! I'll optimize the route for **Load #${selectedLoad.id}** from **${selectedLoad.origin}** to **${selectedLoad.destination}**.\n\n**Available Optimization Options:**\n\n${optionsList}\n\n**Choose your preferred optimization approach** to see detailed route analysis with fuel stops, weather alerts, and traffic updates:`;

      default:
        return "I can help you optimize routes for your active loads. Would you like to see your available loads for optimization?";
    }
  }
}
