
export class QueryPatternMatcher {
  static extractLoadIds(query: string): string[] {
    const loadIdPatterns = [
      /load\s*#?\s*(\w+)/gi,
      /\b(\d{3,})\b/g, // 3 or more digits
      /\b(TMS-\d+)\b/gi,
      /\b(INV-\d+)\b/gi,
      /\b([A-Z]+\d+)\b/g
    ];

    const matches = new Set<string>();
    
    for (const pattern of loadIdPatterns) {
      const results = [...query.matchAll(pattern)];
      results.forEach(match => {
        if (match[1]) {
          matches.add(match[1]);
        }
      });
    }

    console.log('QueryPatternMatcher: Extracted load IDs from query:', query, Array.from(matches));
    return Array.from(matches);
  }

  static isButtonResponse(query: string): boolean {
    const trimmed = query.toLowerCase().trim();
    return ['yes', 'no', 'y', 'n'].includes(trimmed);
  }

  static isCurrentLoadQuery(query: string): boolean {
    const patterns = [
      /\b(this|current|my)\s+(load|shipment)\b/i,
      /\bwhat\s+(is|about)\s+(this|current|my)/i,
      /\bstatus\s+(of\s+)?(this|current|my)/i
    ];

    return patterns.some(pattern => pattern.test(query));
  }

  static isPureSearchQuery(query: string): boolean {
    const searchPatterns = [
      /\bfind\s+(load|loads)\b/i,
      /\bsearch\s+(for\s+)?(load|loads)\b/i,
      /\bshow\s+(me\s+)?(load|loads)\b/i,
      /\blist\s+(load|loads)\b/i
    ];

    return searchPatterns.some(pattern => pattern.test(query));
  }

  static isGeneralTruckingQuery(query: string): boolean {
    const truckingKeywords = [
      'fuel', 'route', 'delivery', 'pickup', 'driving', 'truck', 'trucking',
      'logistics', 'freight', 'cargo', 'shipping', 'transport', 'miles',
      'dispatch', 'broker', 'payment', 'invoice', 'factoring'
    ];

    const queryLower = query.toLowerCase();
    return truckingKeywords.some(keyword => queryLower.includes(keyword));
  }

  static shouldUseAI(query: string): boolean {
    const aiRequiredPatterns = [
      /\bwhy\b/i,
      /\bhow\b/i,
      /\bwhat\s+should\b/i,
      /\bcan\s+you\b/i,
      /\bhelp\s+(me|with)\b/i,
      /\badvice\b/i,
      /\brecommend\b/i,
      /\bexplain\b/i,
      /\btell\s+me\s+about\b/i
    ];

    return aiRequiredPatterns.some(pattern => pattern.test(query));
  }
}
