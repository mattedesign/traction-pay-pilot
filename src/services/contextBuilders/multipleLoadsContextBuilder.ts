
import { SmartContext } from '../smartContextBuilder';
import { QueryRoutingResult } from '../enhancedQueryRouter';
import { ContextUtils } from './contextUtils';

export class MultipleLoadsContextBuilder {
  static build(
    originalMessage: string,
    routingResult: QueryRoutingResult
  ): SmartContext {
    const results = routingResult.loadResults!;
    
    const systemPromptAddition = this.buildSystemPromptAddition(results);
    const enhancedUserMessage = `[SEARCH RESULTS: ${results.length} loads] ${originalMessage}`;

    return {
      systemPromptAddition,
      enhancedUserMessage,
      contextType: 'multiple_loads',
      searchResults: results
    };
  }

  private static buildSystemPromptAddition(results: any[]): string {
    return `
${ContextUtils.generateSystemPromptIntro('multiple_loads')}

The user's query matched ${results.length} loads. Here are the search results:

${results.map((result, index) => `
**Load #${result.load.id}** (${result.relevanceScore}% match)
- Status: ${result.load.status}
- Broker: ${result.load.broker}
- Amount: ${result.load.amount}
- Route: ${result.load.origin} → ${result.load.destination}
- Match Reason: ${result.matchReason}
`).join('\n')}

${ContextUtils.generateResponseGuidelines('multiple_loads')}`;
  }
}
