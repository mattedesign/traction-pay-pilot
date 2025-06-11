
export class QueryPatternMatcher {
  static isButtonResponse(query: string): boolean {
    const queryLower = query.toLowerCase().trim();
    const buttonResponses = [
      'yes', 'no', 'yeah', 'nah', 'sure', 'ok', 'okay',
      'yes please', 'no thanks', 'sounds good', 'not now',
      'that works', 'not interested', 'go ahead', 'skip it'
    ];
    
    // Check if the query is a simple button-like response
    return buttonResponses.includes(queryLower) || 
           (queryLower.length <= 10 && buttonResponses.some(resp => queryLower.includes(resp)));
  }

  static isPureSearchQuery(query: string): boolean {
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

  static isCurrentLoadQuery(query: string): boolean {
    const currentLoadKeywords = [
      'this load', 'current load', 'my load', 'the load',
      'this shipment', 'current shipment', 'my shipment',
      'it', 'this one', 'here'
    ];

    return currentLoadKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );
  }

  static isGeneralTruckingQuery(query: string): boolean {
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

  static extractLoadIds(query: string): string[] {
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

  static shouldUseAI(query: string): boolean {
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
}
