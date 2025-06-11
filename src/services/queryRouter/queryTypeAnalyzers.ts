
import { LoadSearchService } from '../loadSearchService';
import { QueryRoutingResult, QueryAnalysisContext } from './types';
import { QueryPatternMatcher } from './queryPatternMatcher';
import { ActionGenerator } from './actionGenerator';

export class QueryTypeAnalyzers {
  static analyzeSpecificLoad(context: QueryAnalysisContext): QueryRoutingResult | null {
    const { loadIdMatches } = context;
    
    if (loadIdMatches.length > 0) {
      // Direct load ID mentioned
      const specificLoad = LoadSearchService.findLoadById(loadIdMatches[0]);
      if (specificLoad) {
        return {
          queryType: 'specific_load',
          confidence: 95,
          specificLoadId: loadIdMatches[0],
          loadResults: [{ 
            load: specificLoad, 
            relevanceScore: 100, 
            matchedFields: ['loadId'], 
            matchReason: 'Direct ID match' 
          }],
          suggestedActions: ActionGenerator.getLoadSpecificActions(specificLoad, context.queryLower),
          requiresAI: QueryPatternMatcher.shouldUseAI(context.queryLower)
        };
      }
    }
    
    return null;
  }

  static analyzeCurrentLoad(context: QueryAnalysisContext): QueryRoutingResult | null {
    const { currentLoadId, queryLower, highRelevanceLoads } = context;
    
    if (currentLoadId && (QueryPatternMatcher.isCurrentLoadQuery(queryLower) || 
        highRelevanceLoads.some(r => r.load.id === currentLoadId))) {
      // Query about current load
      const currentLoad = LoadSearchService.findLoadById(currentLoadId);
      if (currentLoad) {
        return {
          queryType: 'specific_load',
          confidence: 85,
          specificLoadId: currentLoadId,
          loadResults: [{ 
            load: currentLoad, 
            relevanceScore: 90, 
            matchedFields: ['context'], 
            matchReason: 'Current load context' 
          }],
          suggestedActions: ActionGenerator.getLoadSpecificActions(currentLoad, queryLower),
          requiresAI: QueryPatternMatcher.shouldUseAI(queryLower)
        };
      }
    }
    
    return null;
  }

  static analyzeLoadSearch(context: QueryAnalysisContext): QueryRoutingResult | null {
    const { highRelevanceLoads, queryLower } = context;
    
    if (highRelevanceLoads.length > 0) {
      // Multiple relevant loads found - check if it's a pure search or needs AI analysis
      const isPureSearch = QueryPatternMatcher.isPureSearchQuery(queryLower);
      
      return {
        queryType: 'load_search',
        confidence: Math.min(85, highRelevanceLoads[0].relevanceScore),
        loadResults: highRelevanceLoads.slice(0, 5), // Limit to top 5 results
        suggestedActions: ActionGenerator.getSearchActions(highRelevanceLoads, queryLower),
        requiresAI: !isPureSearch && highRelevanceLoads.length === 1
      };
    }
    
    return null;
  }

  static analyzeGeneralTrucking(context: QueryAnalysisContext): QueryRoutingResult | null {
    const { queryLower } = context;
    
    if (QueryPatternMatcher.isGeneralTruckingQuery(queryLower)) {
      // General trucking/logistics question
      return {
        queryType: 'general_trucking',
        confidence: 70,
        suggestedActions: ['Provide general trucking advice', 'Use AI knowledge base'],
        requiresAI: true
      };
    }
    
    return null;
  }

  static createNoContextResult(): QueryRoutingResult {
    return {
      queryType: 'no_context',
      confidence: 30,
      suggestedActions: ['Provide general help', 'Suggest load search'],
      requiresAI: true
    };
  }
}
