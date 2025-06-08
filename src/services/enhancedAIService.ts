
import { AIService } from './aiService';
import { EmailAnalysisService } from './emailAnalysisService';
import { LoadDiscrepancyService } from './loadDiscrepancyService';
import { EmailResponseService } from './emailResponseService';
import { EmailAnalysisResult, EmailContent, EmailResponseResult, OriginalEmail, EmailContext } from '../types/emailAnalysis';
import { LoadDiscrepancyAnalysis } from '../types/loadDiscrepancy';

export class EnhancedAIService extends AIService {
  private emailAnalysisService: EmailAnalysisService;
  private loadDiscrepancyService: LoadDiscrepancyService;
  private emailResponseService: EmailResponseService;

  constructor(apiKey: string) {
    super(apiKey);
    this.emailAnalysisService = new EmailAnalysisService(this);
    this.loadDiscrepancyService = new LoadDiscrepancyService(this);
    this.emailResponseService = new EmailResponseService(this);
  }

  async analyzeEmail(emailContent: EmailContent): Promise<EmailAnalysisResult> {
    return this.emailAnalysisService.analyzeEmail(emailContent);
  }

  async analyzeLoadDiscrepancies(
    originalLoad: any,
    documentData: any,
    documentType: string
  ): Promise<LoadDiscrepancyAnalysis> {
    return this.loadDiscrepancyService.analyzeLoadDiscrepancies(originalLoad, documentData, documentType);
  }

  async generateEmailResponse(
    originalEmail: OriginalEmail,
    context: EmailContext
  ): Promise<EmailResponseResult> {
    return this.emailResponseService.generateEmailResponse(originalEmail, context);
  }
}
