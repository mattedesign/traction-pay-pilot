
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Upload } from "lucide-react";
import { MockDocumentProcessingService, DocumentProcessingResult, ProcessingStep } from "@/services/mockDocumentProcessingService";

interface MockDocumentProcessorProps {
  onComplete: (result: DocumentProcessingResult) => void;
  onCancel?: () => void;
}

const MockDocumentProcessor = ({ onComplete, onCancel }: MockDocumentProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProcessingStep[]>([]);
  const [scenario, setScenario] = useState(() => MockDocumentProcessingService.getRandomScenario());

  const startProcessing = async () => {
    setIsProcessing(true);
    
    try {
      const result = await MockDocumentProcessingService.processDocuments(scenario);
      
      // Simulate step-by-step processing for UI
      for (let i = 0; i < result.steps.length; i++) {
        setCurrentStep(i);
        setSteps(prev => {
          const newSteps = [...prev];
          newSteps[i] = { ...result.steps[i], status: 'processing' };
          return newSteps;
        });
        
        await new Promise(resolve => setTimeout(resolve, result.steps[i].duration || 1000));
        
        setSteps(prev => {
          const newSteps = [...prev];
          newSteps[i] = { ...result.steps[i], status: 'completed' };
          return newSteps;
        });
      }
      
      // Complete processing
      setTimeout(() => {
        onComplete(result);
        MockDocumentProcessingService.generateCompletionToast(result);
      }, 500);
      
    } catch (error) {
      console.error('Mock processing error:', error);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (scenario) {
      // Initialize steps
      const initialSteps: ProcessingStep[] = [
        {
          id: 'upload',
          title: 'Document Upload',
          description: `Uploading ${scenario.fileCount} file(s)`,
          status: 'pending'
        },
        {
          id: 'ocr',
          title: 'OCR Processing',
          description: 'Extracting text and data from documents',
          status: 'pending'
        },
        {
          id: 'validation',
          title: 'Data Validation',
          description: 'Validating extracted information',
          status: 'pending'
        }
      ];

      // Add scenario-specific steps
      if (scenario.outcome === 'new_load') {
        initialSteps.push({
          id: 'load_creation',
          title: 'Load Creation',
          description: 'Creating new load from rate confirmation',
          status: 'pending'
        });
      } else if (scenario.outcome === 'associate_documents') {
        initialSteps.push({
          id: 'document_association',
          title: 'Document Association',
          description: `Associating documents with Load #${scenario.loadId}`,
          status: 'pending'
        });
      } else if (scenario.outcome === 'invoice_ready') {
        initialSteps.push({
          id: 'status_update',
          title: 'Status Update',
          description: 'Updating load status to ready for invoicing',
          status: 'pending'
        });
      }

      setSteps(initialSteps);
    }
  }, [scenario]);

  const getStepIcon = (step: ProcessingStep, index: number) => {
    if (step.status === 'completed') {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (step.status === 'processing') {
      return <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
    } else {
      return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const calculateProgress = () => {
    const completedSteps = steps.filter(step => step.status === 'completed').length;
    return (completedSteps / steps.length) * 100;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Document Processing</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scenario Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900">{scenario.name}</h3>
          <p className="text-blue-700 text-sm mt-1">{scenario.description}</p>
          <div className="mt-2">
            <p className="text-xs text-blue-600">
              Expected files: {scenario.expectedFiles.join(', ')}
            </p>
          </div>
        </div>

        {!isProcessing ? (
          /* Start Processing Button */
          <div className="text-center space-y-4">
            <p className="text-slate-600">
              Click below to simulate uploading and processing the documents for this scenario.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={startProcessing} className="px-6">
                Start Processing
              </Button>
              {onCancel && (
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* Processing Steps */
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Processing Progress</span>
                <span>{Math.round(calculateProgress())}%</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  {getStepIcon(step, index)}
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{step.title}</p>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                  {step.status === 'processing' && (
                    <div className="text-xs text-blue-600 font-medium">Processing...</div>
                  )}
                  {step.status === 'completed' && (
                    <div className="text-xs text-green-600 font-medium">Completed</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MockDocumentProcessor;
