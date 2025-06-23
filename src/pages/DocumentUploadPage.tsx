
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import MockDocumentProcessor from "@/components/MockDocumentProcessor";
import { DocumentProcessingResult } from "@/services/mockDocumentProcessingService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";

const DocumentUploadPage = () => {
  const navigate = useNavigate();
  const [showProcessor, setShowProcessor] = useState(false);
  const [processingResult, setProcessingResult] = useState<DocumentProcessingResult | null>(null);

  const handleProcessingComplete = (result: DocumentProcessingResult) => {
    setProcessingResult(result);
    setShowProcessor(false);
  };

  const handleStartDemo = () => {
    setShowProcessor(true);
    setProcessingResult(null);
  };

  const handleBackToLoads = () => {
    navigate('/loads');
  };

  const handleActionButton = (button: any) => {
    if (button.action === 'navigate' && button.actionData?.path) {
      navigate(button.actionData.path);
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex w-full">
      <NavigationSidebar />
      
      <div className="flex-1 flex flex-col min-h-0 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToLoads}
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Loads
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Document Processing Demo</h1>
                <p className="text-slate-600">Experience intelligent document processing workflows</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {!showProcessor && !processingResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Mock Document Processing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    This demo simulates the complete document processing workflow including OCR, 
                    data extraction, and integration with your load management system.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Demo Features:</h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Simulated OCR text extraction</li>
                      <li>• Automatic load creation from rate confirmations</li>
                      <li>• Document association with existing loads</li>
                      <li>• Real-time processing status updates</li>
                      <li>• Integration with load management</li>
                    </ul>
                  </div>
                  
                  <Button onClick={handleStartDemo} className="w-full">
                    Start Document Processing Demo
                  </Button>
                </CardContent>
              </Card>
            )}

            {showProcessor && (
              <MockDocumentProcessor
                onComplete={handleProcessingComplete}
                onCancel={() => setShowProcessor(false)}
              />
            )}

            {processingResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Processing Complete!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-green-800 text-sm">
                      {processingResult.finalMessage}
                    </pre>
                  </div>
                  
                  {processingResult.actionButtons && processingResult.actionButtons.length > 0 && (
                    <div className="flex gap-3">
                      {processingResult.actionButtons.map((button) => (
                        <Button
                          key={button.id}
                          onClick={() => handleActionButton(button)}
                          variant={button.id === 'view_load' ? 'default' : 'outline'}
                        >
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    onClick={handleStartDemo}
                    className="w-full mt-4"
                  >
                    Try Another Scenario
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadPage;
