
import { LoadService } from './loadService';

export interface LoadSearchResult {
  load: any;
  relevanceScore: number;
  matchedFields: string[];
  matchReason: string;
}

export interface SearchCriteria {
  loadId?: string;
  broker?: string;
  status?: string;
  origin?: string;
  destination?: string;
  route?: string;
  dateRange?: { start: Date; end: Date };
  amountRange?: { min: number; max: number };
}

export class LoadSearchService {
  static searchLoads(query: string, criteria?: SearchCriteria): LoadSearchResult[] {
    const allLoads = LoadService.getAllLoads();
    const results: LoadSearchResult[] = [];

    for (const load of allLoads) {
      const searchResult = this.evaluateLoadMatch(load, query, criteria);
      if (searchResult.relevanceScore > 0) {
        results.push(searchResult);
      }
    }

    // Sort by relevance score (highest first)
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  static findLoadById(loadId: string): any | null {
    const allLoads = LoadService.getAllLoads();
    return allLoads.find(load => load.id === loadId) || null;
  }

  static findLoadsByBroker(brokerName: string): any[] {
    const allLoads = LoadService.getAllLoads();
    return allLoads.filter(load => 
      load.broker.toLowerCase().includes(brokerName.toLowerCase())
    );
  }

  static findLoadsByRoute(origin?: string, destination?: string): any[] {
    const allLoads = LoadService.getAllLoads();
    return allLoads.filter(load => {
      const originMatch = !origin || load.origin.toLowerCase().includes(origin.toLowerCase());
      const destMatch = !destination || load.destination.toLowerCase().includes(destination.toLowerCase());
      return originMatch && destMatch;
    });
  }

  static findLoadsByStatus(status: string): any[] {
    const allLoads = LoadService.getAllLoads();
    return allLoads.filter(load => load.status === status);
  }

  private static evaluateLoadMatch(load: any, query: string, criteria?: SearchCriteria): LoadSearchResult {
    let relevanceScore = 0;
    const matchedFields: string[] = [];
    const matchReasons: string[] = [];

    const queryLower = query.toLowerCase();

    // Direct load ID match (highest priority)
    if (queryLower.includes(load.id)) {
      relevanceScore += 100;
      matchedFields.push('loadId');
      matchReasons.push(`Load ID #${load.id} mentioned`);
    }

    // Broker name match
    if (load.broker.toLowerCase().includes(queryLower) || queryLower.includes(load.broker.toLowerCase())) {
      relevanceScore += 80;
      matchedFields.push('broker');
      matchReasons.push(`Broker ${load.broker} match`);
    }

    // Status match
    const statusKeywords = ['pending', 'pickup', 'transit', 'delivered', 'delayed', 'cancelled'];
    for (const keyword of statusKeywords) {
      if (queryLower.includes(keyword) && load.status.includes(keyword)) {
        relevanceScore += 60;
        matchedFields.push('status');
        matchReasons.push(`Status ${load.status} match`);
        break;
      }
    }

    // Location match (origin/destination)
    const locations = [load.origin, load.destination];
    for (const location of locations) {
      const locationParts = location.toLowerCase().split(',');
      for (const part of locationParts) {
        if (part.trim() && queryLower.includes(part.trim())) {
          relevanceScore += 40;
          matchedFields.push('location');
          matchReasons.push(`Location ${location} match`);
          break;
        }
      }
    }

    // Amount/payment keywords
    const paymentKeywords = ['payment', 'money', 'invoice', 'advance', 'factoring'];
    if (paymentKeywords.some(keyword => queryLower.includes(keyword))) {
      relevanceScore += 30;
      matchedFields.push('payment');
      matchReasons.push('Payment-related query');
    }

    // Route/delivery keywords
    const routeKeywords = ['route', 'delivery', 'pickup', 'destination', 'fuel', 'stops'];
    if (routeKeywords.some(keyword => queryLower.includes(keyword))) {
      relevanceScore += 25;
      matchedFields.push('route');
      matchReasons.push('Route-related query');
    }

    // Document keywords
    const documentKeywords = ['document', 'paperwork', 'pod', 'bol', 'receipt'];
    if (documentKeywords.some(keyword => queryLower.includes(keyword))) {
      relevanceScore += 20;
      matchedFields.push('documents');
      matchReasons.push('Document-related query');
    }

    // Apply criteria filters
    if (criteria) {
      if (criteria.loadId && load.id !== criteria.loadId) {
        relevanceScore = 0;
      }
      if (criteria.broker && !load.broker.toLowerCase().includes(criteria.broker.toLowerCase())) {
        relevanceScore *= 0.5;
      }
      if (criteria.status && load.status !== criteria.status) {
        relevanceScore *= 0.5;
      }
    }

    return {
      load,
      relevanceScore,
      matchedFields,
      matchReason: matchReasons.join(', ') || 'General relevance'
    };
  }

  static getLoadSummary(load: any): string {
    return `Load #${load.id}: ${load.status} - ${load.broker} - ${load.origin} → ${load.destination} (${load.amount})`;
  }

  static getAllLoadsSummary(): string {
    const allLoads = LoadService.getAllLoads();
    return allLoads.map(load => this.getLoadSummary(load)).join('\n');
  }
}
