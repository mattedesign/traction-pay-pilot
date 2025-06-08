
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateFile, ALLOWED_FILE_TYPES } from "@/utils/security";

interface UploadedDocument {
  type: string;
  fileName: string;
  uploadTime: Date;
  validated: boolean;
}

const DocumentUploadSection = () => {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const { toast } = useToast();

  const documentTypes = [
    { name: "Bill of Lading", required: true },
    { name: "Delivery Receipt", required: true },
    { name: "Weight Ticket", required: false },
    { name: "Photos", required: false }
  ];

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

        // Simulate secure upload process
        toast({
          title: "Uploading Document",
          description: `Securely processing ${docType}...`,
        });

        setTimeout(() => {
          const newDoc: UploadedDocument = {
            type: docType,
            fileName: file.name,
            uploadTime: new Date(),
            validated: true
          };
          
          setUploadedDocs(prev => [
            ...prev.filter(doc => doc.type !== docType),
            newDoc
          ]);
          
          toast({
            title: "Document Uploaded Securely",
            description: `${docType} has been validated and processed successfully.`,
          });
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-600" />
          <span>Secure Document Upload</span>
        </CardTitle>
        <CardDescription>
          Upload required documents to complete this load. All files are validated for security.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {documentTypes.map((docType) => {
            const isUploaded = isDocumentUploaded(docType.name);
            const uploadedDoc = getUploadedDoc(docType.name);
            
            return (
              <div 
                key={docType.name} 
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  isUploaded 
                    ? 'border-green-300 bg-green-50' 
                    : docType.required 
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {isUploaded ? (
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
                
                {isUploaded ? (
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

        <div className="bg-blue-50 border border-blue-200 rounded p-3">
          <div className="flex items-center space-x-2 mb-1">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Smart Document Processing</span>
          </div>
          <p className="text-xs text-blue-700 mb-2">
            Upload any document - our AI will automatically categorize and extract information
          </p>
          <div className="flex items-center space-x-1 text-xs text-green-600">
            <Shield className="w-3 h-3" />
            <span>All uploads are validated for file type, size, and security</span>
          </div>
        </div>

        {uploadedDocs.length > 0 && (
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded">
            <h4 className="text-sm font-medium text-slate-900 mb-2">Upload History</h4>
            <div className="space-y-1">
              {uploadedDocs.map((doc, index) => (
                <div key={index} className="flex items-center justify-between text-xs text-slate-600">
                  <span>{doc.type}: {doc.fileName}</span>
                  <span>{doc.uploadTime.toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploadSection;
