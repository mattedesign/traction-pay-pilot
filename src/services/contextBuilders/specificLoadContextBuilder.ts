
import { LoadDataService } from '../loadDataService';
import { SmartContext } from '../smartContextBuilder';
import { QueryRoutingResult } from '../enhancedQueryRouter';
import { ContextUtils } from './contextUtils';

export class SpecificLoadContextBuilder {
  static async build(
    originalMessage: string,
    routingResult: QueryRoutingResult
  ): Promise<SmartContext> {
    const loadId = routingResult.specificLoadId!;
    const loadContext = await LoadDataService.getLoadContext(loadId);
    
    if (!loadContext) {
      return this.buildNoContextFallback(originalMessage);
    }

    const systemPromptAddition = this.buildSystemPromptAddition(loadContext);
    const enhancedUserMessage = `[LOAD #${loadId} QUERY] ${originalMessage}`;

    return {
      systemPromptAddition,
      enhancedUserMessage,
      contextType: 'specific_load',
      loadData: loadContext
    };
  }

  private static buildSystemPromptAddition(loadContext: any): string {
    const { loadDetails, relatedData } = loadContext;
    
    return `
${ContextUtils.generateSystemPromptIntro('specific_load')}

You are responding about LOAD #${loadDetails.id} specifically. Here is the complete load information:

**Load Details:**
- ID: ${loadDetails.id}
- Status: ${loadDetails.status}
- Broker: ${loadDetails.broker}
- Amount: ${loadDetails.amount}
- Route: ${loadDetails.origin} → ${loadDetails.destination}
- Distance: ${loadDetails.distance}
- Pickup Time: ${loadDetails.pickupTime}

**Financial Information:**
- Original Rate: ${relatedData.financials.originalRate}
- Advance Available: $${relatedData.financials.advanceAvailable}
- Total Expected: ${relatedData.financials.totalExpected}

**Documents on File:**
${relatedData.documents.length > 0 ? 
  relatedData.documents.join(', ') : 
  'No documents uploaded yet'}

**Recent Communications:**
${relatedData.communications.length > 0 ? 
  relatedData.communications.map((comm: any) => `- ${comm.subject} (${comm.type})`).join('\n') : 
  'No recent communications'}

**Status Description:**
${ContextUtils.getStatusDescription(loadDetails.status)}

${ContextUtils.generateResponseGuidelines('specific_load')}`;
  }

  private static buildNoContextFallback(originalMessage: string): SmartContext {
    return {
      systemPromptAddition: `
${ContextUtils.generateSystemPromptIntro('no_context')}

The user's query didn't match any specific loads or context. Provide helpful guidance and suggest ways they can:

- Search for specific loads using load IDs or broker names
- Ask about general trucking topics
- Get help with routing, payments, or compliance questions

${ContextUtils.generateResponseGuidelines('no_context')}`,
      enhancedUserMessage: originalMessage,
      contextType: 'no_context'
    };
  }
}
