
import { toast } from "@/hooks/use-toast";
import { LoadRepository } from "./loadRepository";
import { Load } from "@/types/load";

export interface MockDocumentScenario {
  id: string;
  name: string;
  description: string;
  fileCount: number;
  expectedFiles: string[];
  outcome: 'new_load' | 'associate_documents' | 'invoice_ready';
  loadId?: string;
}

export interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  duration?: number;
}

export interface DocumentProcessingResult {
  scenario: MockDocumentScenario;
  steps: ProcessingStep[];
  finalMessage: string;
  actionButtons?: Array<{
    id: string;
    text: string;
    action: 'navigate' | 'continue_chat';
    actionData?: {
      path?: string;
      message?: string;
      closeDrawer?: boolean;
    };
  }>;
}

export class MockDocumentProcessingService {
  private static scenarios: MockDocumentScenario[] = [
    {
      id: 'rate_confirmation',
      name: 'Rate Confirmation Upload',
      description: 'Single rate confirmation PDF creates new load',
      fileCount: 1,
      expectedFiles: ['rate_confirmation.pdf'],
      outcome: 'new_load'
    },
    {
      id: 'bol_pod_upload',
      name: 'BOL + POD Upload',
      description: 'Bill of Lading and Proof of Delivery for existing load',
      fileCount: 2,
      expectedFiles: ['bill_of_lading.pdf', 'proof_of_delivery.pdf'],
      outcome: 'associate_documents',
      loadId: '5678'
    },
    {
      id: 'invoice_ready',
      name: 'Invoice Ready Scenario',
      description: 'Load becomes ready for invoicing after document upload',
      fileCount: 1,
      expectedFiles: ['signed_delivery_receipt.pdf'],
      outcome: 'invoice_ready',
      loadId: '1234'
    }
  ];

  static getRandomScenario(): MockDocumentScenario {
    const randomIndex = Math.floor(Math.random() * this.scenarios.length);
    return this.scenarios[randomIndex];
  }

  static getScenarioById(id: string): MockDocumentScenario | undefined {
    return this.scenarios.find(scenario => scenario.id === id);
  }

  static async processDocuments(scenario: MockDocumentScenario): Promise<DocumentProcessingResult> {
    const steps: ProcessingStep[] = [
      {
        id: 'upload',
        title: 'Document Upload',
        description: `Uploading ${scenario.fileCount} file(s)`,
        status: 'processing',
        duration: 1000
      },
      {
        id: 'ocr',
        title: 'OCR Processing',
        description: 'Extracting text and data from documents',
        status: 'pending',
        duration: 2000
      },
      {
        id: 'validation',
        title: 'Data Validation',
        description: 'Validating extracted information',
        status: 'pending',
        duration: 1500
      }
    ];

    // Add scenario-specific steps
    if (scenario.outcome === 'new_load') {
      steps.push({
        id: 'load_creation',
        title: 'Load Creation',
        description: 'Creating new load from rate confirmation',
        status: 'pending',
        duration: 1000
      });
    } else if (scenario.outcome === 'associate_documents') {
      steps.push({
        id: 'document_association',
        title: 'Document Association',
        description: `Associating documents with Load #${scenario.loadId}`,
        status: 'pending',
        duration: 1000
      });
    } else if (scenario.outcome === 'invoice_ready') {
      steps.push({
        id: 'status_update',
        title: 'Status Update',
        description: 'Updating load status to ready for invoicing',
        status: 'pending',
        duration: 1000
      });
    }

    // Simulate processing each step
    for (let i = 0; i < steps.length; i++) {
      steps[i].status = 'processing';
      await new Promise(resolve => setTimeout(resolve, steps[i].duration || 1000));
      steps[i].status = 'completed';
    }

    // Generate result based on scenario
    return this.generateResult(scenario, steps);
  }

  private static generateResult(scenario: MockDocumentScenario, steps: ProcessingStep[]): DocumentProcessingResult {
    let finalMessage = '';
    let actionButtons: DocumentProcessingResult['actionButtons'] = [];

    switch (scenario.outcome) {
      case 'new_load':
        const newLoadId = `RC${Math.floor(Math.random() * 9000) + 1000}`;
        finalMessage = `✅ Successfully created Load #${newLoadId} from rate confirmation!\n\nLoad Details:\n• Origin: Atlanta, GA\n• Destination: Memphis, TN\n• Rate: $1,250.00\n• Pickup: Tomorrow 8:00 AM\n\nThe load has been added to your active loads and is ready for pickup.`;
        
        // Create the actual load in the repository
        const newLoad: Load = {
          id: newLoadId,
          broker: "Global Freight Solutions",
          status: "pending_pickup",
          amount: "$1,250.00",
          origin: "Atlanta, GA",
          destination: "Memphis, TN",
          pickupTime: "Tomorrow 8:00 AM",
          distance: "385 miles",
          rateConfirmation: {
            originalRate: "$1,250.00",
            commodity: "General Freight",
            weight: "42,000 lbs",
            referenceNumber: `GFS-${Math.floor(Math.random() * 900000) + 100000}`
          }
        };
        LoadRepository.addLoad(newLoad);

        actionButtons = [
          {
            id: 'view_load',
            text: 'View Load Details',
            action: 'navigate',
            actionData: {
              path: `/load/${newLoadId}`,
              closeDrawer: true
            }
          },
          {
            id: 'upload_more',
            text: 'Upload More Documents',
            action: 'continue_chat',
            actionData: {
              message: 'I want to upload more documents'
            }
          }
        ];
        break;

      case 'associate_documents':
        finalMessage = `✅ Successfully associated documents with Load #${scenario.loadId}!\n\nUploaded Documents:\n• Bill of Lading (BOL)\n• Proof of Delivery (POD)\n\nThe load documentation is now complete and ready for invoicing. All required paperwork has been verified and stored.`;
        
        // Update the load status
        LoadRepository.updateLoad(scenario.loadId!, { status: "ready_to_invoice" });

        actionButtons = [
          {
            id: 'view_load',
            text: 'View Load Details',
            action: 'navigate',
            actionData: {
              path: `/load/${scenario.loadId}`,
              closeDrawer: true
            }
          },
          {
            id: 'create_invoice',
            text: 'Create Invoice',
            action: 'continue_chat',
            actionData: {
              message: `Create an invoice for Load #${scenario.loadId}`
            }
          }
        ];
        break;

      case 'invoice_ready':
        finalMessage = `✅ Load #${scenario.loadId} is now ready for invoicing!\n\nFinal Document Status:\n• Rate Confirmation ✓\n• Bill of Lading ✓\n• Signed Delivery Receipt ✓\n\nAll required documentation is complete. You can now generate and submit your invoice for payment.`;
        
        // Update the load status
        LoadRepository.updateLoad(scenario.loadId!, { status: "ready_to_invoice" });

        actionButtons = [
          {
            id: 'create_invoice',
            text: 'Create Invoice Now',
            action: 'navigate',
            actionData: {
              path: '/invoices/create',
              closeDrawer: true
            }
          },
          {
            id: 'view_load',
            text: 'View Load Details',
            action: 'navigate',
            actionData: {
              path: `/load/${scenario.loadId}`,
              closeDrawer: true
            }
          }
        ];
        break;
    }

    return {
      scenario,
      steps,
      finalMessage,
      actionButtons
    };
  }

  static generateProcessingMessage(scenario: MockDocumentScenario): string {
    return `🔄 Processing ${scenario.name}...\n\n${scenario.description}\n\nExpected files: ${scenario.expectedFiles.join(', ')}\n\nThis will take a few moments to complete.`;
  }

  static generateCompletionToast(result: DocumentProcessingResult) {
    const { scenario } = result;
    
    let title = '';
    let description = '';

    switch (scenario.outcome) {
      case 'new_load':
        title = 'Load Created Successfully';
        description = 'New load has been added to your dashboard';
        break;
      case 'associate_documents':
        title = 'Documents Associated';
        description = `Documents linked to Load #${scenario.loadId}`;
        break;
      case 'invoice_ready':
        title = 'Invoice Ready';
        description = `Load #${scenario.loadId} is ready for invoicing`;
        break;
    }

    toast({
      title,
      description
    });
  }
}
