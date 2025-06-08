import { LoadSearchService, LoadSearchResult } from './loadSearchService';

export interface QueryRoutingResult {
  queryType: 'specific_load' | 'load_search' | 'general_trucking' | 'no_context';
  confidence: number;
  loadResults?: LoadSearchResult[];
  specificLoadId?: string;
  suggestedActions: string[];
  contextData?: any;
  requiresAI: boolean;
}

export class EnhancedQueryRouter {
  static analyzeQuery(query: string, currentLoadId?: string): QueryRoutingResult {
    const queryLower = query.toLowerCase().trim();

    // Extract potential load IDs from query
    const loadIdMatches = this.extractLoadIds(query);
    
    // Search for relevant loads
    const loadResults = LoadSearchService.searchLoads(query);
    const highRelevanceLoads = loadResults.filter(result => result.relevanceScore >= 50);

    // Determine query type and confidence
    if (loadIdMatches.length > 0) {
      // Direct load ID mentioned
      const specificLoad = LoadSearchService.findLoadById(loadIdMatches[0]);
      if (specificLoad) {
        return {
          queryType: 'specific_load',
          confidence: 95,
          specificLoadId: loadIdMatches[0],
          loadResults: [{ load: specificLoad, relevanceScore: 100, matchedFields: ['loadId'], matchReason: 'Direct ID match' }],
          suggestedActions: this.getLoadSpecificActions(specificLoad, query),
          requiresAI: this.shouldUseAI(query) // Only use AI if the query needs analysis
        };
      }
    }

    if (currentLoadId && (this.isCurrentLoadQuery(query) || highRelevanceLoads.some(r => r.load.id === currentLoadId))) {
      // Query about current load
      const currentLoad = LoadSearchService.findLoadById(currentLoadId);
      if (currentLoad) {
        return {
          queryType: 'specific_load',
          confidence: 85,
          specificLoadId: currentLoadId,
          loadResults: [{ load: currentLoad, relevanceScore: 90, matchedFields: ['context'], matchReason: 'Current load context' }],
          suggestedActions: this.getLoadSpecificActions(currentLoad, query),
          requiresAI: this.shouldUseAI(query)
        };
      }
    }

    if (highRelevanceLoads.length > 0) {
      // Multiple relevant loads found - check if it's a pure search or needs AI analysis
      const isPureSearch = this.isPureSearchQuery(query);
      
      return {
        queryType: 'load_search',
        confidence: Math.min(85, highRelevanceLoads[0].relevanceScore),
        loadResults: highRelevanceLoads.slice(0, 5), // Limit to top 5 results
        suggestedActions: this.getSearchActions(highRelevanceLoads, query),
        requiresAI: !isPureSearch && highRelevanceLoads.length === 1 // Only use AI for complex analysis, not pure search
      };
    }

    if (this.isGeneralTruckingQuery(query)) {
      // General trucking/logistics question
      return {
        queryType: 'general_trucking',
        confidence: 70,
        suggestedActions: ['Provide general trucking advice', 'Use AI knowledge base'],
        requiresAI: true
      };
    }

    // No specific context found
    return {
      queryType: 'no_context',
      confidence: 30,
      suggestedActions: ['Provide general help', 'Suggest load search'],
      requiresAI: true
    };
  }

  private static isPureSearchQuery(query: string): boolean {
    const pureSearchKeywords = [
      'search', 'find', 'show', 'list', 'loads', 'by', 'from', 'to',
      'broker', 'status', 'id', 'number', '#'
    ];
    
    const complexAnalysisKeywords = [
      'analyze', 'compare', 'recommend', 'suggest', 'best', 'worst',
      'why', 'how', 'explain', 'what should', 'advice', 'help'
    ];
    
    const queryLower = query.toLowerCase();
    const hasSearchKeywords = pureSearchKeywords.some(keyword => queryLower.includes(keyword));
    const hasComplexKeywords = complexAnalysisKeywords.some(keyword => queryLower.includes(keyword));
    
    // If it has search keywords but no complex analysis keywords, it's a pure search
    return hasSearchKeywords && !hasComplexKeywords;
  }

  private static shouldUseAI(query: string): boolean {
    const queryLower = query.toLowerCase();
    
    // Don't use AI for simple status/info requests
    const simpleInfoKeywords = ['status', 'where', 'when', 'info', 'information', 'details', 'show me'];
    if (simpleInfoKeywords.some(keyword => queryLower.includes(keyword)) && queryLower.split(' ').length <= 4) {
      return false;
    }
    
    // Use AI for complex queries
    const complexKeywords = [
      'analyze', 'compare', 'recommend', 'suggest', 'best', 'worst',
      'why', 'how', 'explain', 'what should', 'advice', 'help',
      'problem', 'issue', 'delay', 'optimize'
    ];
    
    return complexKeywords.some(keyword => queryLower.includes(keyword));
  }

  private static extractLoadIds(query: string): string[] {
    const patterns = [
      /load\s*#?(\d{4})/gi,
      /shipment\s*#?(\d{4})/gi,
      /order\s*#?(\d{4})/gi,
      /#(\d{4})/g,
      /(\d{4})\s*load/gi
    ];

    const loadIds: string[] = [];
    for (const pattern of patterns) {
      const matches = query.matchAll(pattern);
      for (const match of matches) {
        if (match[1] && !loadIds.includes(match[1])) {
          loadIds.push(match[1]);
        }
      }
    }

    return loadIds;
  }

  private static isCurrentLoadQuery(query: string): boolean {
    const currentLoadKeywords = [
      'this load', 'current load', 'my load', 'the load',
      'this shipment', 'current shipment', 'my shipment',
      'it', 'this one', 'here'
    ];

    return currentLoadKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );
  }

  private static isGeneralTruckingQuery(query: string): boolean {
    const truckingKeywords = [
      'trucking', 'logistics', 'freight', 'transportation',
      'dot', 'compliance', 'regulations', 'hours of service',
      'fuel', 'maintenance', 'safety', 'inspection',
      'cdl', 'license', 'permit', 'weight station',
      'broker', 'carrier', 'dispatcher', 'shipper'
    ];

    return truckingKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );
  }

  private static getLoadSpecificActions(load: any, query: string): string[] {
    const actions: string[] = [];
    const queryLower = query.toLowerCase();

    if (queryLower.includes('status') || queryLower.includes('where')) {
      actions.push('Provide current load status and location');
    }

    if (queryLower.includes('payment') || queryLower.includes('money') || queryLower.includes('invoice')) {
      actions.push('Show payment information and options');
    }

    if (queryLower.includes('document') || queryLower.includes('paperwork')) {
      actions.push('List required documents and upload status');
    }

    if (queryLower.includes('route') || queryLower.includes('directions') || queryLower.includes('fuel')) {
      actions.push('Provide route optimization and fuel stops');
    }

    if (actions.length === 0) {
      actions.push('Provide comprehensive load information');
    }

    return actions;
  }

  private static getSearchActions(results: LoadSearchResult[], query: string): string[] {
    const actions: string[] = [];

    if (results.length === 1) {
      actions.push('Show detailed information for matched load');
    } else {
      actions.push(`Show ${results.length} matching loads`);
      actions.push('Allow user to select specific load for details');
    }

    const brokers = [...new Set(results.map(r => r.load.broker))];
    if (brokers.length > 1) {
      actions.push(`Compare loads across ${brokers.length} brokers`);
    }

    return actions;
  }
}
