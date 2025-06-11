
import { LoadSearchResult } from './loadSearchService';
import { QueryRoutingResult } from './enhancedQueryRouter';
import { LoadDataService } from './loadDataService';
import { ChatStateManager } from './chatStateManager';

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
    
    console.log('SmartContextBuilder: Building context for query type:', routingResult.queryType);
    
    switch (routingResult.queryType) {
      case 'specific_load':
        return await this.buildSpecificLoadContext(originalMessage, routingResult);
      
      case 'load_search':
        return this.buildMultipleLoadsContext(originalMessage, routingResult);
      
      case 'general_trucking':
        return this.buildGeneralTruckingContext(originalMessage);
      
      case 'button_response':
        return this.buildButtonResponseContext(originalMessage);
      
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

**RESPONSE GUIDELINES:**
- Provide specific, actionable information based on the load data
- Reference actual load details (ID #${loadId}, broker: ${loadContext.loadDetails.broker}, amount: ${loadContext.loadDetails.amount})
- If the user asks for information you have, provide it directly without asking permission
- Only ask clarifying questions if you genuinely need more information to help them`;

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
- Present the matching loads clearly and organized
- If user asks about a specific aspect, compare across all matching loads
- Help user identify which load they might be looking for
- Provide specific information without asking unnecessary questions`;

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

Draw from your knowledge of DOT regulations, HOS rules, freight operations, and industry standards.

**RESPONSE GUIDELINES:**
- Provide direct, helpful answers
- Use specific examples when possible
- Be concise but thorough
- Avoid asking unnecessary follow-up questions unless clarification is truly needed`;

    return {
      systemPromptAddition,
      enhancedUserMessage: originalMessage,
      contextType: 'general_trucking'
    };
  }

  private static buildButtonResponseContext(originalMessage: string): SmartContext {
    const questionState = ChatStateManager.getQuestionState();
    
    const systemPromptAddition = `
**BUTTON RESPONSE PROCESSING**

The user just provided a response (${originalMessage}) to a previous question.
${questionState.context ? `Previous question context: ${questionState.context}` : ''}

**RESPONSE GUIDELINES:**
- This is a direct answer to a previous question
- DO NOT ask new questions unless absolutely necessary
- Provide helpful information or take appropriate action based on their response
- If they said "yes", proceed with the suggested action
- If they said "no", offer alternative assistance
- Keep response concise and actionable`;

    return {
      systemPromptAddition,
      enhancedUserMessage: `[BUTTON RESPONSE] ${originalMessage}`,
      contextType: 'no_context'
    };
  }

  private static buildNoContext(originalMessage: string): SmartContext {
    const systemPromptAddition = `
**GENERAL ASSISTANCE MODE**

The user's query didn't match any specific loads or context. Provide helpful guidance and suggest ways they can:

- Search for specific loads using load IDs or broker names
- Ask about general trucking topics
- Get help with routing, payments, or compliance questions

**RESPONSE GUIDELINES:**
- Be helpful and guide them toward more specific questions if possible
- Provide direct assistance when you can
- Avoid asking questions unless truly necessary for clarification`;

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
