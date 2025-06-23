
import { mockLoadsData } from '@/data/mockLoads';

export interface LoadSearchResult {
  load: any;
  relevanceScore: number;
  matchedFields: string[];
  matchReason: string;
}

export class LoadSearchService {
  static searchLoads(query: string): LoadSearchResult[] {
    const queryLower = query.toLowerCase().trim();
    
    if (!queryLower) return [];

    const results = mockLoadsData
      .filter(load => this.matchesQuery(load, queryLower))
      .map(load => ({
        load,
        relevanceScore: this.calculateRelevance(load, queryLower),
        matchedFields: this.getMatchedFields(load, queryLower),
        matchReason: this.getMatchReason(load, queryLower)
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    console.log('LoadSearchService: Found results for query:', queryLower, results);
    return results;
  }

  static findLoadById(loadId: string): any | null {
    const load = mockLoadsData.find(load => load.id === loadId);
    console.log('LoadSearchService: Finding load by ID:', loadId, load ? 'found' : 'not found');
    return load || null;
  }

  private static matchesQuery(load: any, query: string): boolean {
    const searchableFields = [
      load.id,
      load.broker,
      load.status,
      load.origin,
      load.destination,
      load.amount
    ];

    return searchableFields.some(field => 
      field && field.toString().toLowerCase().includes(query)
    );
  }

  private static calculateRelevance(load: any, query: string): number {
    let score = 0;
    
    // Exact ID match gets highest score
    if (load.id.toLowerCase() === query || load.id.toLowerCase().includes(query)) {
      score += 100;
    }
    
    // Broker name match
    if (load.broker.toLowerCase().includes(query)) {
      score += 80;
    }
    
    // Status match
    if (load.status.toLowerCase().includes(query)) {
      score += 70;
    }
    
    // Origin/destination match
    if (load.origin.toLowerCase().includes(query) || 
        load.destination.toLowerCase().includes(query)) {
      score += 60;
    }
    
    // Amount match
    if (load.amount.toLowerCase().includes(query)) {
      score += 50;
    }

    return Math.min(score, 100);
  }

  private static getMatchedFields(load: any, query: string): string[] {
    const fields: string[] = [];
    
    if (load.id.toLowerCase().includes(query)) fields.push('loadId');
    if (load.broker.toLowerCase().includes(query)) fields.push('broker');
    if (load.status.toLowerCase().includes(query)) fields.push('status');
    if (load.origin.toLowerCase().includes(query)) fields.push('origin');
    if (load.destination.toLowerCase().includes(query)) fields.push('destination');
    if (load.amount.toLowerCase().includes(query)) fields.push('amount');
    
    return fields;
  }

  private static getMatchReason(load: any, query: string): string {
    if (load.id.toLowerCase().includes(query)) return "Load ID match";
    if (load.broker.toLowerCase().includes(query)) return "Broker name match";
    if (load.status.toLowerCase().includes(query)) return "Status match";
    if (load.origin.toLowerCase().includes(query)) return "Origin match";
    if (load.destination.toLowerCase().includes(query)) return "Destination match";
    if (load.amount.toLowerCase().includes(query)) return "Amount match";
    return "General match";
  }
}
