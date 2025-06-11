
import { LoadSearchService } from './loadSearchService';
import { QueryRoutingResult, QueryAnalysisContext } from './queryRouter/types';
import { QueryPatternMatcher } from './queryRouter/queryPatternMatcher';
import { QueryTypeAnalyzers } from './queryRouter/queryTypeAnalyzers';
import { ButtonResponseHandler } from './queryRouter/buttonResponseHandler';

export { QueryRoutingResult } from './queryRouter/types';

export class EnhancedQueryRouter {
  static analyzeQuery(query: string, currentLoadId?: string): QueryRoutingResult {
    const queryLower = query.toLowerCase().trim();

    console.log('EnhancedQueryRouter: Analyzing query:', { 
      query: query.substring(0, 50) + '...',
      currentLoadId
    });

    // Check if this is a button response (yes/no answers)
    if (QueryPatternMatcher.isButtonResponse(query)) {
      return ButtonResponseHandler.handle(query);
    }

    // Extract potential load IDs and search for relevant loads
    const loadIdMatches = QueryPatternMatcher.extractLoadIds(query);
    const loadResults = LoadSearchService.searchLoads(query);
    const highRelevanceLoads = loadResults.filter(result => result.relevanceScore >= 50);

    // Create analysis context
    const context: QueryAnalysisContext = {
      queryLower,
      loadIdMatches,
      loadResults,
      highRelevanceLoads,
      currentLoadId
    };

    // Try different analysis strategies in order of specificity
    let result = QueryTypeAnalyzers.analyzeSpecificLoad(context);
    if (result) return result;

    result = QueryTypeAnalyzers.analyzeCurrentLoad(context);
    if (result) return result;

    result = QueryTypeAnalyzers.analyzeLoadSearch(context);
    if (result) return result;

    result = QueryTypeAnalyzers.analyzeGeneralTrucking(context);
    if (result) return result;

    // No specific context found
    return QueryTypeAnalyzers.createNoContextResult();
  }
}
