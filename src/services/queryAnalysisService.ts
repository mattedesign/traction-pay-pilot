
export interface QueryAnalysis {
  isLoadSpecific: boolean;
  extractedLoadId: string | null;
  queryType: 'load_status' | 'load_details' | 'payment' | 'route' | 'general' | 'document' | 'compliance';
  confidence: number;
  keywords: string[];
  requiresContext: boolean;
}

export class QueryAnalysisService {
  private static loadSpecificKeywords = [
    'load', 'shipment', 'delivery', 'pickup', 'broker', 'rate', 'invoice',
    'pod', 'detention', 'status', 'tracking', 'document', 'payment',
    'factoring', 'advance', 'route', 'miles', 'fuel', 'surcharge'
  ];

  private static generalKeywords = [
    'regulation', 'compliance', 'dot', 'hos', 'eld', 'maintenance',
    'inspection', 'cdl', 'ifta', 'permits', 'weather', 'traffic',
    'truck stop', 'parking', 'fuel station', 'weigh station'
  ];

  static analyzeQuery(message: string): QueryAnalysis {
    const lowerMessage = message.toLowerCase();
    const words = lowerMessage.split(/\s+/);
    
    // Extract load ID using multiple patterns
    const loadId = this.extractLoadId(message);
    
    // Check for load-specific keywords
    const loadSpecificMatches = this.loadSpecificKeywords.filter(keyword => 
      lowerMessage.includes(keyword)
    );
    
    // Check for general trucking keywords
    const generalMatches = this.generalKeywords.filter(keyword => 
      lowerMessage.includes(keyword)
    );
    
    // Determine query type based on content
    const queryType = this.determineQueryType(lowerMessage, loadId !== null);
    
    // Calculate confidence based on keyword matches and patterns
    const confidence = this.calculateConfidence(
      loadSpecificMatches.length,
      generalMatches.length,
      loadId !== null,
      words.length
    );
    
    // Determine if load is specifically mentioned or context is needed
    const isLoadSpecific = loadId !== null || 
      loadSpecificMatches.length > 0 || 
      this.hasLoadContextIndicators(lowerMessage);
    
    return {
      isLoadSpecific,
      extractedLoadId: loadId,
      queryType,
      confidence,
      keywords: [...loadSpecificMatches, ...generalMatches],
      requiresContext: isLoadSpecific || queryType !== 'general'
    };
  }

  private static extractLoadId(message: string): string | null {
    // Enhanced load ID extraction patterns
    const patterns = [
      /load\s*#?(\d{4,6})/i,
      /shipment\s*#?(\d{4,6})/i,
      /order\s*#?(\d{4,6})/i,
      /#(\d{4,6})/,
      /(\d{4,6})\s*load/i,
      /load\s*id\s*:?\s*(\d{4,6})/i,
      /ref\s*#?:?\s*(\d{4,6})/i
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  }

  private static determineQueryType(message: string, hasLoadId: boolean): QueryAnalysis['queryType'] {
    if (hasLoadId || message.includes('load') || message.includes('shipment')) {
      if (message.includes('status') || message.includes('where') || message.includes('tracking')) {
        return 'load_status';
      }
      if (message.includes('payment') || message.includes('factoring') || message.includes('advance')) {
        return 'payment';
      }
      if (message.includes('route') || message.includes('miles') || message.includes('fuel')) {
        return 'route';
      }
      if (message.includes('document') || message.includes('pod') || message.includes('invoice')) {
        return 'document';
      }
      return 'load_details';
    }
    
    if (message.includes('regulation') || message.includes('compliance') || message.includes('dot')) {
      return 'compliance';
    }
    
    return 'general';
  }

  private static calculateConfidence(
    loadMatches: number,
    generalMatches: number,
    hasLoadId: boolean,
    wordCount: number
  ): number {
    let confidence = 0.5; // Base confidence
    
    if (hasLoadId) confidence += 0.3;
    if (loadMatches > 0) confidence += Math.min(loadMatches * 0.1, 0.3);
    if (generalMatches > 0) confidence += Math.min(generalMatches * 0.05, 0.15);
    if (wordCount < 5) confidence -= 0.1; // Short queries are less reliable
    
    return Math.min(Math.max(confidence, 0), 1);
  }

  private static hasLoadContextIndicators(message: string): boolean {
    const contextIndicators = [
      'this load', 'my load', 'current load', 'the shipment',
      'delivery status', 'pickup time', 'broker contact',
      'rate confirmation', 'detention time'
    ];
    
    return contextIndicators.some(indicator => message.includes(indicator));
  }
}
