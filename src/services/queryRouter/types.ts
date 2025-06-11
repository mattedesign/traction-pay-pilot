
export interface QueryRoutingResult {
  queryType: 'specific_load' | 'load_search' | 'general_trucking' | 'no_context' | 'button_response';
  confidence: number;
  loadResults?: any[];
  specificLoadId?: string;
  suggestedActions: string[];
  contextData?: any;
  requiresAI: boolean;
}

export interface QueryAnalysisContext {
  queryLower: string;
  loadIdMatches: string[];
  loadResults: any[];
  highRelevanceLoads: any[];
  currentLoadId?: string;
}
