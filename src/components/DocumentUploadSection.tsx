
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, Shield, AlertTriangle, ExclamationTriangle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateFile, ALLOWED_FILE_TYPES } from "@/utils/security";
import { LoadService } from "@/services/loadService";

interface UploadedDocument {
  type: string;
  fileName: string;
  uploadTime: Date;
  validated: boolean;
  extractedData?: any;
  discrepancies?: any[];
}

const DocumentUploadSection = () => {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const [discrepancyAlerts, setDiscrepancyAlerts] = useState<any[]>([]);
  const { toast } = useToast();

  const documentTypes = [
    { name: "Bill of Lading", required: true },
    { name: "Delivery Receipt", required: true },
    { name: "Weight Ticket", required: false },
    { name: "Photos", required: false }
  ];

  const simulateDocumentExtraction = (docType: string, fileName: string) => {
    // Simulate extracting data from different document types
    const mockExtractions: Record<string, any> = {
      "Bill of Lading": {
        commodity: "Electronics Components",
        weight: "35500 lbs",
        pieces: "24 pallets",
        totalAmount: "$775.00", // Different from original rate
        shipper: "Tech Manufacturing Inc"
      },
      "Delivery Receipt": {
        deliveryTime: "2025-05-30T18:30:00Z", // Late delivery
        consignee: "Electronics Retail Chain",
        totalAmount: "$750.00",
        receivedBy: "John Smith"
      },
      "Weight Ticket": {
        weight: "36200 lbs", // Different weight
        scaleLocation: "Certified Truck Scale #456",
        totalAmount: "$750.00"
      }
    };

    return mockExtractions[docType] || {};
  };

  const handleUpload = (docType: string) => {
    console.log(`Initiating secure upload for ${docType}`);
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ALLOWED_FILE_TYPES.all.join(',');
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const validation = validateFile(file);
        
        if (!validation.isValid) {
          toast({
            title: "File Validation Failed",
            description: validation.error,
            variant: "destructive"
          });
          return;
        }

        toast({
          title: "Processing Document",
          description: `Analyzing ${docType} for discrepancies...`,
        });

        setTimeout(() => {
          // Simulate document processing and extraction
          const extractedData = simulateDocumentExtraction(docType, file.name);
          
          // Get current load data (assuming we're on a load detail page)
          const currentLoadId = window.location.pathname.split('/').pop() || "1234";
          
          // Detect discrepancies
          const discrepancies = LoadService.detectDiscrepancies(currentLoadId, docType, extractedData);
          
          const newDoc: UploadedDocument = {
            type: docType,
            fileName: file.name,
            uploadTime: new Date(),
            validated: true,
            extractedData,
            discrepancies
          };
          
          setUploadedDocs(prev => [
            ...prev.filter(doc => doc.type !== docType),
            newDoc
          ]);

          // Show discrepancy alerts if any
          if (discrepancies.length > 0) {
            const resolutionSuggestions = LoadService.getDiscrepancyResolutionSuggestions(discrepancies);
            setDiscrepancyAlerts(prev => [...prev, { docType, discrepancies, resolutionSuggestions }]);
            
            toast({
              title: "Potential Issues Detected",
              description: `${discrepancies.length} discrepancy(ies) found in ${docType}. Review suggestions below.`,
              variant: "destructive"
            });
          } else {
            toast({
              title: "Document Processed Successfully",
              description: `${docType} validated with no discrepancies found.`,
            });
          }
        }, 2000);
      }
    };
    input.click();
  };

  const isDocumentUploaded = (docType: string) => {
    return uploadedDocs.some(doc => doc.type === docType);
  };

  const getUploadedDoc = (docType: string) => {
    return uploadedDocs.find(doc => doc.type === docType);
  };

  const hasDiscrepancies = (docType: string) => {
    const doc = getUploadedDoc(docType);
    return doc && doc.discrepancies && doc.discrepancies.length > 0;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Secure Document Upload</span>
          </CardTitle>
          <CardDescription>
            Upload required documents to complete this load. Our AI will automatically detect discrepancies and suggest resolutions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {documentTypes.map((docType) => {
              const isUploaded = isDocumentUploaded(docType.name);
              const uploadedDoc = getUploadedDoc(docType.name);
              const hasIssues = hasDiscrepancies(docType.name);
              
              return (
                <div 
                  key={docType.name} 
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                    hasIssues
                      ? 'border-red-300 bg-red-50'
                      : isUploaded 
                      ? 'border-green-300 bg-green-50' 
                      : docType.required 
                      ? 'border-orange-300 bg-orange-50'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {hasIssues ? (
                      <ExclamationTriangle className="w-6 h-6 text-red-600" />
                    ) : isUploaded ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : docType.required ? (
                      <AlertTriangle className="w-6 h-6 text-orange-500" />
                    ) : (
                      <Upload className="w-6 h-6 text-slate-400" />
                    )}
                    {docType.required && (
                      <span className="text-xs text-orange-600 font-medium">Required</span>
                    )}
                  </div>
                  
                  <p className="text-sm font-medium text-slate-700 mb-1">{docType.name}</p>
                  
                  {uploadedDoc && (
                    <p className="text-xs text-slate-500 mb-2">
                      {uploadedDoc.fileName}
                    </p>
                  )}
                  
                  {hasIssues ? (
                    <Button size="sm" variant="outline" className="border-red-300 text-red-700" disabled>
                      <ExclamationTriangle className="w-3 h-3 mr-1" />
                      Issues Found
                    </Button>
                  ) : isUploaded ? (
                    <Button size="sm" variant="outline" className="border-green-300 text-green-700" disabled>
                      <Shield className="w-3 h-3 mr-1" />
                      Secured
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={`mt-2 ${docType.required ? 'border-orange-300 hover:bg-orange-50' : 'hover:bg-slate-50'}`}
                      onClick={() => handleUpload(docType.name)}
                    >
                      <Upload className="w-3 h-3 mr-1" />
                      Upload
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Discrepancy Alerts */}
          {discrepancyAlerts.map((alert, index) => (
            <Card key={index} className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-900 text-base flex items-center">
                  <ExclamationTriangle className="w-5 h-5 mr-2" />
                  Discrepancies Detected in {alert.docType}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alert.discrepancies.map((discrepancy: any, discIndex: number) => (
                  <div key={discIndex} className="bg-white p-3 rounded border border-red-200">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-red-900">{discrepancy.description}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        discrepancy.severity === 'high' ? 'bg-red-100 text-red-800' :
                        discrepancy.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {discrepancy.severity.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">Suggested Resolutions:</p>
                        <ul className="text-xs text-slate-600 space-y-1">
                          {discrepancy.suggestedResolution.map((resolution: string, resIndex: number) => (
                            <li key={resIndex} className="flex items-start">
                              <span className="mr-2">•</span>
                              {resolution}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {discrepancy.requiredDocuments && discrepancy.requiredDocuments.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-slate-700 mb-1">Supporting Documents Needed:</p>
                          <div className="flex flex-wrap gap-1">
                            {discrepancy.requiredDocuments.map((doc: string, docIndex: number) => (
                              <span key={docIndex} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {alert.resolutionSuggestions && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Resolution Timeline</span>
                    </div>
                    <p className="text-xs text-blue-700 mb-2">
                      Estimated resolution time: {alert.resolutionSuggestions.estimatedResolutionTime}
                    </p>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Start Resolution Process
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <div className="flex items-center space-x-2 mb-1">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Smart Document Processing</span>
            </div>
            <p className="text-xs text-blue-700 mb-2">
              Upload any document - our AI will automatically categorize, extract information, and detect discrepancies
            </p>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <Shield className="w-3 h-3" />
              <span>All uploads are validated for security and automatically checked against your rate confirmation</span>
            </div>
          </div>

          {uploadedDocs.length > 0 && (
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded">
              <h4 className="text-sm font-medium text-slate-900 mb-2">Upload History</h4>
              <div className="space-y-1">
                {uploadedDocs.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center">
                      {doc.discrepancies && doc.discrepancies.length > 0 && (
                        <ExclamationTriangle className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      {doc.type}: {doc.fileName}
                    </span>
                    <span>{doc.uploadTime.toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUploadSection;
