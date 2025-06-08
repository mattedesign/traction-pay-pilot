
import { LoadDataService, LoadDataContext } from './loadDataService';
import { QueryAnalysis } from './queryAnalysisService';

export interface EnhancedLoadContext extends LoadDataContext {
  contextSummary: string;
  relevantDetails: string[];
  suggestedActions: string[];
  relatedLoads: any[];
  urgentItems: string[];
}

export class EnhancedContextService {
  static async getEnhancedContext(
    loadId: string, 
    queryAnalysis: QueryAnalysis
  ): Promise<EnhancedLoadContext | null> {
    const baseContext = await LoadDataService.getLoadContext(loadId);
    if (!baseContext) return null;

    const enhanced = await this.enhanceContext(baseContext, queryAnalysis);
    return enhanced;
  }

  private static async enhanceContext(
    baseContext: LoadDataContext,
    queryAnalysis: QueryAnalysis
  ): Promise<EnhancedLoadContext> {
    const { loadDetails, relatedData } = baseContext;
    
    // Generate contextual summary based on query type
    const contextSummary = this.generateContextSummary(loadDetails, queryAnalysis.queryType);
    
    // Extract relevant details based on query
    const relevantDetails = this.extractRelevantDetails(loadDetails, relatedData, queryAnalysis);
    
    // Generate suggested actions
    const suggestedActions = this.generateSuggestedActions(loadDetails, queryAnalysis.queryType);
    
    // Find related loads
    const relatedLoads = this.findRelatedLoads(loadDetails);
    
    // Identify urgent items
    const urgentItems = this.identifyUrgentItems(loadDetails, relatedData);

    return {
      ...baseContext,
      contextSummary,
      relevantDetails,
      suggestedActions,
      relatedLoads,
      urgentItems
    };
  }

  private static generateContextSummary(loadDetails: any, queryType: string): string {
    const status = loadDetails.status;
    const broker = loadDetails.broker;
    const amount = loadDetails.amount;

    switch (queryType) {
      case 'load_status':
        return `Load #${loadDetails.id} is currently ${status.replace('_', ' ')} with ${broker}. ${this.getStatusDescription(status)}`;
      
      case 'payment':
        return `Load #${loadDetails.id} worth ${amount} with ${broker}. Payment status: ${this.getPaymentStatus(status)}`;
      
      case 'route':
        return `Load #${loadDetails.id} route: ${loadDetails.origin} to ${loadDetails.destination} (${loadDetails.distance})`;
      
      case 'document':
        return `Load #${loadDetails.id} document status and requirements for ${broker}`;
      
      default:
        return `Load #${loadDetails.id} overview: ${status.replace('_', ' ')} load with ${broker}`;
    }
  }

  private static extractRelevantDetails(
    loadDetails: any, 
    relatedData: any, 
    queryAnalysis: QueryAnalysis
  ): string[] {
    const details: string[] = [];
    
    switch (queryAnalysis.queryType) {
      case 'load_status':
        details.push(`Current status: ${loadDetails.status.replace('_', ' ')}`);
        details.push(`Pickup: ${loadDetails.pickupTime}`);
        if (loadDetails.status === 'in_transit') {
          details.push(`Expected delivery: Check with driver`);
        }
        break;
        
      case 'payment':
        details.push(`Rate: ${loadDetails.amount}`);
        details.push(`Advance available: $${relatedData.financials.advanceAvailable}`);
        details.push(`Payment terms: Standard 30 days`);
        break;
        
      case 'route':
        details.push(`Distance: ${loadDetails.distance}`);
        details.push(`Origin: ${loadDetails.origin}`);
        details.push(`Destination: ${loadDetails.destination}`);
        break;
        
      case 'document':
        details.push(`Documents: ${relatedData.documents.join(', ') || 'None uploaded'}`);
        details.push(`Required: Rate confirmation, POD`);
        break;
    }
    
    return details;
  }

  private static generateSuggestedActions(loadDetails: any, queryType: string): string[] {
    const actions: string[] = [];
    const status = loadDetails.status;
    
    switch (queryType) {
      case 'load_status':
        if (status === 'pending_pickup') {
          actions.push('Contact driver for pickup confirmation');
          actions.push('Verify pickup location and time');
        } else if (status === 'in_transit') {
          actions.push('Request ETA update from driver');
          actions.push('Monitor route progress');
        }
        break;
        
      case 'payment':
        if (status === 'delivered') {
          actions.push('Submit invoice to broker');
          actions.push('Consider factoring for quick payment');
        } else {
          actions.push('Apply for load advance');
          actions.push('Review payment terms');
        }
        break;
        
      case 'document':
        actions.push('Upload missing documents');
        actions.push('Verify document requirements with broker');
        break;
    }
    
    return actions;
  }

  private static findRelatedLoads(loadDetails: any): any[] {
    // Find loads with same broker or similar route
    const allLoads = LoadDataService.getAllLoads ? LoadDataService.getAllLoads() : [];
    return allLoads
      .filter(load => 
        load.id !== loadDetails.id && 
        (load.broker === loadDetails.broker || 
         load.destination.includes(loadDetails.destination.split(',')[1]?.trim() || ''))
      )
      .slice(0, 3);
  }

  private static identifyUrgentItems(loadDetails: any, relatedData: any): string[] {
    const urgent: string[] = [];
    
    if (loadDetails.status === 'pending_pickup' && loadDetails.pickupTime.includes('Today')) {
      urgent.push('Pickup scheduled today - confirm driver assignment');
    }
    
    if (loadDetails.status === 'delivered' && relatedData.documents.length < 2) {
      urgent.push('Missing delivery documents - upload POD');
    }
    
    if (relatedData.communications.length === 0) {
      urgent.push('No recent communication with broker');
    }
    
    return urgent;
  }

  private static getStatusDescription(status: string): string {
    const descriptions: Record<string, string> = {
      "pending_pickup": "Waiting for driver to arrive at pickup location",
      "in_transit": "Load is being transported to destination",
      "delivered": "Load has been successfully delivered",
      "delayed": "Load is experiencing delays",
      "cancelled": "Load has been cancelled"
    };
    return descriptions[status] || "Status unknown";
  }

  private static getPaymentStatus(status: string): string {
    if (status === 'delivered') return 'Ready for invoicing';
    if (status === 'in_transit') return 'Advance available';
    return 'Pending completion';
  }

  static formatEnhancedContextForAI(context: EnhancedLoadContext): string {
    return `
**ENHANCED LOAD CONTEXT - Load #${context.loadId}**

**Summary:** ${context.contextSummary}

**Key Details:**
${context.relevantDetails.map(detail => `• ${detail}`).join('\n')}

**Suggested Actions:**
${context.suggestedActions.map(action => `• ${action}`).join('\n')}

${context.urgentItems.length > 0 ? `
**URGENT ITEMS:**
${context.urgentItems.map(item => `🔴 ${item}`).join('\n')}
` : ''}

**Load Information:**
- Status: ${context.loadDetails.status}
- Broker: ${context.loadDetails.broker}
- Amount: ${context.loadDetails.amount}
- Route: ${context.loadDetails.origin} → ${context.loadDetails.destination}
- Distance: ${context.loadDetails.distance}
- Pickup: ${context.loadDetails.pickupTime}

**Financial Details:**
- Rate: ${context.relatedData.financials.originalRate}
- Advance Available: $${context.relatedData.financials.advanceAvailable}

**Documents:** ${context.relatedData.documents.join(', ') || 'None uploaded'}

${context.relatedLoads.length > 0 ? `
**Related Loads:**
${context.relatedLoads.map(load => `• Load #${load.id} (${load.broker})`).join('\n')}
` : ''}
`;
  }
}
