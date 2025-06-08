
import { AIService } from './aiService';
import { EmailAnalysisResult, EmailContent } from '../types/emailAnalysis';

export class EmailAnalysisService {
  private aiService: AIService;

  constructor(aiService: AIService) {
    this.aiService = aiService;
  }

  async analyzeEmail(emailContent: EmailContent): Promise<EmailAnalysisResult> {
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

      const response = await this.aiService.sendMessage(messages, systemPrompt);
      
      try {
        const responseContent = typeof response === 'string' ? response : response.content;
        const analysis = JSON.parse(responseContent);
        return analysis as EmailAnalysisResult;
      } catch (parseError) {
        console.error('Failed to parse AI analysis response:', parseError);
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
}
