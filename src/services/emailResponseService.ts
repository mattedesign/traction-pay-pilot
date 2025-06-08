
import { AIService } from './aiService';
import { EmailResponseResult, OriginalEmail, EmailContext } from '../types/emailAnalysis';

export class EmailResponseService {
  private aiService: AIService;

  constructor(aiService: AIService) {
    this.aiService = aiService;
  }

  async generateEmailResponse(
    originalEmail: OriginalEmail,
    context: EmailContext
  ): Promise<EmailResponseResult> {
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

      const response = await this.aiService.sendMessage(messages, systemPrompt);
      
      try {
        const responseContent = typeof response === 'string' ? response : response.content;
        return JSON.parse(responseContent);
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
