
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentUploadSection = () => {
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const { toast } = useToast();

  const documentTypes = ["Bill of Lading", "Delivery Receipt", "Weight Ticket", "Photos"];

  const handleUpload = (docType: string) => {
    console.log(`Uploading ${docType}`);
    
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Simulate upload process
        toast({
          title: "Uploading Document",
          description: `Processing ${docType}...`,
        });

        setTimeout(() => {
          setUploadedDocs(prev => [...prev, docType]);
          toast({
            title: "Document Uploaded",
            description: `${docType} has been successfully processed and verified.`,
          });
        }, 2000);
      }
    };
    input.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Load Documents</CardTitle>
        <CardDescription>
          Upload required documents to complete this load
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {documentTypes.map((docType) => {
            const isUploaded = uploadedDocs.includes(docType);
            return (
              <div 
                key={docType} 
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  isUploaded 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              >
                {isUploaded ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                ) : (
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                )}
                <p className="text-sm font-medium text-slate-700">{docType}</p>
                {isUploaded ? (
                  <Button size="sm" variant="outline" className="mt-2 border-green-300 text-green-700" disabled>
                    Uploaded
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 hover:bg-slate-50" 
                    onClick={() => handleUpload(docType)}
                  >
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
          <p className="text-xs text-blue-700">
            Just upload any document - our AI will automatically categorize and extract information
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadSection;
