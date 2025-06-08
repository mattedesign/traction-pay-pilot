
import { LoadSearchResult } from './loadSearchService';
import { QueryRoutingResult } from './enhancedQueryRouter';
import { LoadDataService } from './loadDataService';

export interface SmartContext {
  systemPromptAddition: string;
  enhancedUserMessage: string;
  contextType: 'specific_load' | 'multiple_loads' | 'general_trucking' | 'no_context';
  loadData?: any;
  searchResults?: LoadSearchResult[];
}

export class SmartContextBuilder {
  static async buildContext(
    originalMessage: string,
    routingResult: QueryRoutingResult,
    currentLoadId?: string
  ): Promise<SmartContext> {
    
    switch (routingResult.queryType) {
      case 'specific_load':
        return await this.buildSpecificLoadContext(originalMessage, routingResult);
      
      case 'load_search':
        return this.buildMultipleLoadsContext(originalMessage, routingResult);
      
      case 'general_trucking':
        return this.buildGeneralTruckingContext(originalMessage);
      
      default:
        return this.buildNoContext(originalMessage);
    }
  }

  private static async buildSpecificLoadContext(
    originalMessage: string,
    routingResult: QueryRoutingResult
  ): Promise<SmartContext> {
    const loadId = routingResult.specificLoadId!;
    const loadContext = await LoadDataService.getLoadContext(loadId);
    
    if (!loadContext) {
      return this.buildNoContext(originalMessage);
    }

    const systemPromptAddition = `
**LOAD-SPECIFIC CONTEXT ACTIVE**

You are responding about LOAD #${loadId} specifically. Here is the complete load information:

**Load Details:**
- ID: ${loadContext.loadDetails.id}
- Status: ${loadContext.loadDetails.status}
- Broker: ${loadContext.loadDetails.broker}
- Amount: ${loadContext.loadDetails.amount}
- Route: ${loadContext.loadDetails.origin} → ${loadContext.loadDetails.destination}
- Distance: ${loadContext.loadDetails.distance}
- Pickup Time: ${loadContext.loadDetails.pickupTime}

**Financial Information:**
- Original Rate: ${loadContext.relatedData.financials.originalRate}
- Advance Available: $${loadContext.relatedData.financials.advanceAvailable}
- Total Expected: ${loadContext.relatedData.financials.totalExpected}

**Documents on File:**
${loadContext.relatedData.documents.length > 0 ? 
  loadContext.relatedData.documents.join(', ') : 
  'No documents uploaded yet'}

**Recent Communications:**
${loadContext.relatedData.communications.length > 0 ? 
  loadContext.relatedData.communications.map(comm => `- ${comm.subject} (${comm.type})`).join('\n') : 
  'No recent communications'}

**Status Description:**
${this.getStatusDescription(loadContext.loadDetails.status)}

**IMPORTANT:** Always reference this specific load data when answering. Use the actual load ID (#${loadId}), broker name, amounts, and status in your response.`;

    const enhancedUserMessage = `[LOAD #${loadId} QUERY] ${originalMessage}`;

    return {
      systemPromptAddition,
      enhancedUserMessage,
      contextType: 'specific_load',
      loadData: loadContext
    };
  }

  private static buildMultipleLoadsContext(
    originalMessage: string,
    routingResult: QueryRoutingResult
  ): SmartContext {
    const results = routingResult.loadResults!;
    
    const systemPromptAddition = `
**LOAD SEARCH RESULTS CONTEXT**

The user's query matched ${results.length} loads. Here are the search results:

${results.map((result, index) => `
**Load #${result.load.id}** (${result.relevanceScore}% match)
- Status: ${result.load.status}
- Broker: ${result.load.broker}
- Amount: ${result.load.amount}
- Route: ${result.load.origin} → ${result.load.destination}
- Match Reason: ${result.matchReason}
`).join('\n')}

**RESPONSE GUIDELINES:**
- If user asks about a specific aspect, compare across all matching loads
- If multiple loads are relevant, present them in a organized way
- Help user identify which load they might be looking for
- Suggest specific actions based on the query type`;

    const enhancedUserMessage = `[SEARCH RESULTS: ${results.length} loads] ${originalMessage}`;

    return {
      systemPromptAddition,
      enhancedUserMessage,
      contextType: 'multiple_loads',
      searchResults: results
    };
  }

  private static buildGeneralTruckingContext(originalMessage: string): SmartContext {
    const systemPromptAddition = `
**GENERAL TRUCKING CONSULTATION MODE**

The user has a general trucking/logistics question. Provide expert advice using your comprehensive trucking industry knowledge. Focus on:

- Practical, actionable advice
- Current industry best practices
- Compliance and regulatory guidance
- Cost-saving strategies
- Safety recommendations
- Professional communication

Draw from your knowledge of DOT regulations, HOS rules, freight operations, and industry standards.`;

    return {
      systemPromptAddition,
      enhancedUserMessage: originalMessage,
      contextType: 'general_trucking'
    };
  }

  private static buildNoContext(originalMessage: string): SmartContext {
    const systemPromptAddition = `
**GENERAL ASSISTANCE MODE**

The user's query didn't match any specific loads. Provide helpful guidance and suggest ways they can:

- Search for specific loads using load IDs or broker names
- Ask about general trucking topics
- Get help with routing, payments, or compliance questions

Be helpful and guide them toward more specific questions if possible.`;

    return {
      systemPromptAddition,
      enhancedUserMessage: originalMessage,
      contextType: 'no_context'
    };
  }

  private static getStatusDescription(status: string): string {
    const descriptions: Record<string, string> = {
      "pending_pickup": "Load is scheduled for pickup and waiting for driver arrival",
      "in_transit": "Load is currently being transported to destination",
      "delivered": "Load has been successfully delivered",
      "delayed": "Load is experiencing delays in transit",
      "cancelled": "Load has been cancelled"
    };
    return descriptions[status] || "Status information not available";
  }
}
