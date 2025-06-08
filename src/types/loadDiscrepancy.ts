
export interface LoadDiscrepancyAnalysis {
  discrepancies: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    confidence: number;
  }>;
  suggestedResolutions: string[];
  requiresAction: boolean;
}
