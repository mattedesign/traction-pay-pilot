
import { AIService } from './aiService';
import { LoadDiscrepancyAnalysis } from '../types/loadDiscrepancy';

export class LoadDiscrepancyService {
  private aiService: AIService;

  constructor(aiService: AIService) {
    this.aiService = aiService;
  }

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

      const response = await this.aiService.sendMessage(messages, systemPrompt);
      
      try {
        const responseContent = typeof response === 'string' ? response : response.content;
        const analysis = JSON.parse(responseContent);
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
}
