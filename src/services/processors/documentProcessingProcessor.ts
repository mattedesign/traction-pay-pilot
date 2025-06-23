
import { InteractiveButton } from "@/hooks/useChatMessages";
import { MockDocumentProcessingService } from "../mockDocumentProcessingService";

interface DocumentProcessingHandlerParams {
  userMessage: string;
  addAIMessage: (content: string, interactiveButtons?: InteractiveButton[]) => void;
  onNavigate?: (path: string) => void;
}

export class DocumentProcessingProcessor {
  static handle({ userMessage, addAIMessage, onNavigate }: DocumentProcessingHandlerParams): boolean {
    const message = userMessage.toLowerCase();
    
    // Check for document processing related keywords
    const documentKeywords = [
      'upload document', 'document upload', 'upload file', 'file upload',
      'rate confirmation', 'bill of lading', 'bol', 'pod', 'proof of delivery',
      'upload paperwork', 'paperwork upload', 'process document', 'document processing',
      'upload rate', 'upload invoice', 'scan document', 'ocr'
    ];
    
    const isDocumentRequest = documentKeywords.some(keyword => 
      message.includes(keyword)
    );
    
    if (isDocumentRequest) {
      console.log('DocumentProcessingProcessor: Handling document processing request');
      
      // Get a random scenario for demonstration
      const scenario = MockDocumentProcessingService.getRandomScenario();
      const processingMessage = MockDocumentProcessingService.generateProcessingMessage(scenario);
      
      const response = `I'll help you process your documents! 📄\n\n${processingMessage}\n\nI'll walk you through a realistic document processing workflow that shows how our system handles different types of uploads.`;
      
      const interactiveButtons: InteractiveButton[] = [
        {
          id: 'start_demo_processing',
          text: 'Start Demo Processing',
          action: 'continue_chat',
          actionData: {
            message: `Start mock document processing demo for ${scenario.name}`
          }
        },
        {
          id: 'try_different_scenario',
          text: 'Try Different Scenario',
          action: 'continue_chat',
          actionData: {
            message: 'Show me different document processing scenarios'
          }
        }
      ];
      
      addAIMessage(response, interactiveButtons);
      return true;
    }
    
    // Handle demo processing start
    if (message.includes('start mock document processing demo') || 
        message.includes('demo processing')) {
      console.log('DocumentProcessingProcessor: Starting demo processing');
      
      const response = `🚀 Starting Mock Document Processing Demo\n\nI'm simulating a realistic document processing workflow. This demonstrates how our system would handle real document uploads, OCR processing, and integration with your load management.\n\n⚡ This is a demonstration using mock data to show the complete workflow.`;
      
      const interactiveButtons: InteractiveButton[] = [
        {
          id: 'view_document_upload',
          text: 'View Upload Interface',
          action: 'navigate',
          actionData: {
            path: '/document-upload',
            closeDrawer: true
          }
        },
        {
          id: 'explain_scenarios',
          text: 'Explain Scenarios',
          action: 'continue_chat',
          actionData: {
            message: 'Explain the different document processing scenarios available'
          }
        }
      ];
      
      addAIMessage(response, interactiveButtons);
      return true;
    }
    
    // Handle scenario explanations
    if (message.includes('different document processing scenarios') || 
        message.includes('explain scenarios')) {
      console.log('DocumentProcessingProcessor: Explaining scenarios');
      
      const response = `📋 Document Processing Scenarios\n\nOur system handles three main document workflows:\n\n**1. Rate Confirmation Upload**\n• Single PDF upload\n• Creates new load automatically\n• Extracts pickup/delivery details\n• Sets up load tracking\n\n**2. BOL + POD Upload**\n• Multiple file upload\n• Associates with existing load\n• Validates delivery completion\n• Updates load status\n\n**3. Invoice Ready Processing**\n• Final document upload\n• Completes documentation\n• Triggers invoice readiness\n• Enables payment processing\n\nEach scenario demonstrates different OCR capabilities and workflow automation.`;
      
      const interactiveButtons: InteractiveButton[] = [
        {
          id: 'try_scenario_1',
          text: 'Try Rate Confirmation',
          action: 'continue_chat',
          actionData: {
            message: 'Demo rate confirmation upload scenario'
          }
        },
        {
          id: 'try_scenario_2',
          text: 'Try BOL + POD',
          action: 'continue_chat',
          actionData: {
            message: 'Demo BOL and POD upload scenario'
          }
        },
        {
          id: 'try_scenario_3',
          text: 'Try Invoice Ready',
          action: 'continue_chat',
          actionData: {
            message: 'Demo invoice ready scenario'
          }
        }
      ];
      
      addAIMessage(response, interactiveButtons);
      return true;
    }
    
    return false;
  }
}
