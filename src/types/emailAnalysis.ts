
export interface EmailAnalysisResult {
  priority: 'high' | 'medium' | 'low';
  category: 'payment' | 'delivery' | 'pickup' | 'documentation' | 'general';
  sentiment: 'positive' | 'neutral' | 'negative' | 'urgent';
  suggestedActions: string[];
  keyEntities: {
    dates?: string[];
    amounts?: string[];
    locations?: string[];
    contacts?: string[];
  };
  urgencyScore: number; // 0-10
}

export interface EmailContent {
  subject: string;
  body: string;
  from: string;
  to: string;
  loadId?: string;
}

export interface EmailResponseResult {
  subject: string;
  body: string;
  tone: 'professional' | 'urgent' | 'friendly';
  confidence: number;
}

export interface OriginalEmail {
  subject: string;
  body: string;
  from: string;
}

export interface EmailContext {
  loadId?: string;
  customerHistory?: any[];
  urgentIssues?: string[];
}
