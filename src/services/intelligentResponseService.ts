
import { QueryAnalysis, QueryAnalysisService } from './queryAnalysisService';
import { EnhancedContextService, EnhancedLoadContext } from './enhancedContextService';

export interface ResponseContext {
  hasLoadContext: boolean;
  loadContext?: EnhancedLoadContext;
  systemPromptAddition: string;
  messageEnhancement: string;
}

export class IntelligentResponseService {
  static async analyzeAndPrepareResponse(
    userMessage: string,
    currentLoadContext?: string
  ): Promise<ResponseContext> {
    console.log('Analyzing query for intelligent routing...');
    
    // Analyze the user's query
    const queryAnalysis = QueryAnalysisService.analyzeQuery(userMessage);
    console.log('Query analysis:', queryAnalysis);
    
    // Determine load ID to use
    const loadId = queryAnalysis.extractedLoadId || 
      (currentLoadContext ? currentLoadContext.match(/Load #(\d+)/)?.[1] : null);
    
    let loadContext: EnhancedLoadContext | null = null;
    let systemPromptAddition = '';
    let messageEnhancement = '';
    
    if (loadId && queryAnalysis.requiresContext) {
      console.log(`Fetching enhanced context for Load #${loadId}`);
      loadContext = await EnhancedContextService.getEnhancedContext(loadId, queryAnalysis);
      
      if (loadContext) {
        systemPromptAddition = this.generateSystemPromptAddition(queryAnalysis, loadContext);
        messageEnhancement = this.generateMessageEnhancement(userMessage, queryAnalysis, loadContext);
      }
    } else if (queryAnalysis.isLoadSpecific && !loadId) {
      // User is asking about loads in general or mentioned load context without specific ID
      systemPromptAddition = `
**LOAD CONTEXT MODE**: User is asking about load-related topics. Use your knowledge of trucking operations, load management, and the available mock loads in the system (Load #1234, #5678, #9012). Provide specific, actionable advice about load operations.
      `.trim();
      
      messageEnhancement = `**LOAD-RELATED QUERY**: ${userMessage}

Please provide specific advice about load operations, referencing the available loads in the system when relevant.`;
    }
    
    return {
      hasLoadContext: !!loadContext,
      loadContext: loadContext || undefined,
      systemPromptAddition,
      messageEnhancement: messageEnhancement || userMessage
    };
  }

  private static generateSystemPromptAddition(
    queryAnalysis: QueryAnalysis,
    loadContext: EnhancedLoadContext
  ): string {
    const contextType = queryAnalysis.queryType;
    const urgentNote = loadContext.urgentItems.length > 0 
      ? `\n\n**URGENT ATTENTION REQUIRED**: ${loadContext.urgentItems.join(', ')}`
      : '';
    
    return `
**SPECIFIC LOAD CONTEXT - Load #${loadContext.loadId}**
Query Type: ${contextType.toUpperCase()}
Confidence: ${Math.round(queryAnalysis.confidence * 100)}%

${loadContext.contextSummary}

**Key Information:**
${loadContext.relevantDetails.map(detail => `• ${detail}`).join('\n')}

**Recommended Actions:**
${loadContext.suggestedActions.map(action => `• ${action}`).join('\n')}${urgentNote}

**Instructions**: Use this specific load context to provide detailed, accurate responses. Reference the actual load details, status, and recommendations. Be specific about Load #${loadContext.loadId} when answering.
    `.trim();
  }

  private static generateMessageEnhancement(
    userMessage: string,
    queryAnalysis: QueryAnalysis,
    loadContext: EnhancedLoadContext
  ): string {
    const fullContext = EnhancedContextService.formatEnhancedContextForAI(loadContext);
    
    return `${fullContext}

**USER QUESTION** (${queryAnalysis.queryType}): ${userMessage}

**Query Analysis:**
- Type: ${queryAnalysis.queryType}
- Keywords: ${queryAnalysis.keywords.join(', ')}
- Confidence: ${Math.round(queryAnalysis.confidence * 100)}%

Please provide a specific, actionable response about Load #${loadContext.loadId} based on the context above.`;
  }

  static generateFallbackSystemPrompt(queryAnalysis: QueryAnalysis): string {
    if (queryAnalysis.isLoadSpecific) {
      return `
**LOAD OPERATIONS SPECIALIST MODE**

The user is asking about load-specific topics but no specific load context was found. Provide expert guidance on:
- Load management best practices
- Trucking operations and logistics
- Payment and factoring options
- Route optimization
- Document requirements
- Broker relationships
- Compliance and regulations

Use your expertise to give practical, actionable advice for trucking operations.
      `.trim();
    }
    
    return `
**TRUCKING INDUSTRY EXPERT MODE**

Provide comprehensive guidance on trucking operations, logistics, and transportation industry topics including:
- DOT regulations and compliance
- Route planning and fuel efficiency
- Equipment maintenance and safety
- Industry best practices
- General trucking knowledge

Be professional, accurate, and focus on practical solutions.
    `.trim();
  }
}
