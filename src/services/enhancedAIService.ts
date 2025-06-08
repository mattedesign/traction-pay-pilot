
import { AIService } from './aiService';

interface EmailAnalysisResult {
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

interface LoadDiscrepancyAnalysis {
  discrepancies: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    confidence: number;
  }>;
  suggestedResolutions: string[];
  requiresAction: boolean;
}

export class EnhancedAIService extends AIService {
  constructor(apiKey: string) {
    super(apiKey);
  }

  // Analyze email content using Claude Sonnet 4
  async analyzeEmail(emailContent: {
    subject: string;
    body: string;
    from: string;
    to: string;
    loadId?: string;
  }): Promise<EmailAnalysisResult> {
    const systemPrompt = `You are an expert AI assistant specialized in analyzing trucking and logistics email communications. 

Analyze the provided email and return a JSON response with the following structure:
{
  "priority": "high|medium|low",
  "category": "payment|delivery|pickup|documentation|general",
  "sentiment": "positive|neutral|negative|urgent",
  "suggestedActions": ["action1", "action2"],
  "keyEntities": {
    "dates": ["2024-01-15"],
    "amounts": ["$500.00"],
    "locations": ["Dallas, TX"],
    "contacts": ["john@company.com"]
  },
  "urgencyScore": 7
}

Focus on:
- Identifying urgent issues (payment delays, delivery problems, documentation requests)
- Extracting key dates, amounts, and locations
- Determining if immediate action is required
- Categorizing the email type for proper routing`;

    try {
      const messages = [
        {
          role: 'user' as const,
          content: `Please analyze this email:

Subject: ${emailContent.subject}
From: ${emailContent.from}
To: ${emailContent.to}
${emailContent.loadId ? `Load ID: ${emailContent.loadId}` : ''}

Body:
${emailContent.body}`
        }
      ];

      const response = await this.sendMessage(messages, systemPrompt);
      
      // Parse JSON response
      try {
        const analysis = JSON.parse(response);
        return analysis as EmailAnalysisResult;
      } catch (parseError) {
        console.error('Failed to parse AI analysis response:', parseError);
        // Return default analysis if parsing fails
        return {
          priority: 'medium',
          category: 'general',
          sentiment: 'neutral',
          suggestedActions: ['Review email manually'],
          keyEntities: {},
          urgencyScore: 5
        };
      }
    } catch (error) {
      console.error('Error analyzing email with AI:', error);
      throw error;
    }
  }

  // Analyze load discrepancies using Claude Sonnet 4
  async analyzeLoadDiscrepancies(
    originalLoad: any,
    documentData: any,
    documentType: string
  ): Promise<LoadDiscrepancyAnalysis> {
    const systemPrompt = `You are an expert AI assistant specialized in trucking operations and load discrepancy analysis.

Analyze the provided load data and document to identify discrepancies and return a JSON response with:
{
  "discrepancies": [
    {
      "type": "rate_difference|weight_change|commodity_change|delivery_delay|pickup_early",
      "severity": "low|medium|high",
      "description": "Clear description of the discrepancy",
      "confidence": 0.95
    }
  ],
  "suggestedResolutions": ["action1", "action2"],
  "requiresAction": true
}

Focus on:
- Rate/payment discrepancies
- Weight or commodity changes
- Delivery time variations
- Documentation requirements
- Detention or accessorial charges`;

    try {
      const messages = [
        {
          role: 'user' as const,
          content: `Please analyze this load for discrepancies:

Original Load Data:
${JSON.stringify(originalLoad, null, 2)}

Document Type: ${documentType}
Document Data:
${JSON.stringify(documentData, null, 2)}

Identify any discrepancies between the original load and the document data.`
        }
      ];

      const response = await this.sendMessage(messages, systemPrompt);
      
      try {
        const analysis = JSON.parse(response);
        return analysis as LoadDiscrepancyAnalysis;
      } catch (parseError) {
        console.error('Failed to parse discrepancy analysis:', parseError);
        return {
          discrepancies: [],
          suggestedResolutions: ['Manual review required'],
          requiresAction: false
        };
      }
    } catch (error) {
      console.error('Error analyzing load discrepancies:', error);
      throw error;
    }
  }

  // Generate smart email responses
  async generateEmailResponse(
    originalEmail: {
      subject: string;
      body: string;
      from: string;
    },
    context: {
      loadId?: string;
      customerHistory?: any[];
      urgentIssues?: string[];
    }
  ): Promise<{
    subject: string;
    body: string;
    tone: 'professional' | 'urgent' | 'friendly';
    confidence: number;
  }> {
    const systemPrompt = `You are an expert assistant helping trucking companies craft professional email responses.

Generate appropriate email responses that are:
- Professional and industry-appropriate
- Address the sender's concerns directly
- Include relevant load or context information
- Maintain a tone appropriate to the situation

Return a JSON response with:
{
  "subject": "RE: Original Subject",
  "body": "Professional email body",
  "tone": "professional|urgent|friendly",
  "confidence": 0.95
}`;

    try {
      const messages = [
        {
          role: 'user' as const,
          content: `Generate a response to this email:

Original Email:
Subject: ${originalEmail.subject}
From: ${originalEmail.from}
Body: ${originalEmail.body}

Context:
${context.loadId ? `Load ID: ${context.loadId}` : ''}
${context.urgentIssues?.length ? `Urgent Issues: ${context.urgentIssues.join(', ')}` : ''}

Please generate an appropriate professional response.`
        }
      ];

      const response = await this.sendMessage(messages, systemPrompt);
      
      try {
        return JSON.parse(response);
      } catch (parseError) {
        console.error('Failed to parse email response:', parseError);
        return {
          subject: `RE: ${originalEmail.subject}`,
          body: 'Thank you for your email. We will review your message and respond promptly.',
          tone: 'professional' as const,
          confidence: 0.5
        };
      }
    } catch (error) {
      console.error('Error generating email response:', error);
      throw error;
    }
  }
}
