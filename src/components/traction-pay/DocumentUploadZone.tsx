
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadZoneProps {
  expanded?: boolean;
}

interface UploadedDocument {
  id: string;
  name: string;
  type: 'rate_confirmation' | 'pod' | 'bol' | 'accessorial' | 'other';
  status: 'processing' | 'classified' | 'approved' | 'error';
  confidence?: number;
  extractedData?: any;
  timestamp: Date;
}

const DocumentUploadZone = ({ expanded = false }: DocumentUploadZoneProps) => {
  const { toast } = useToast();
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    for (const file of Array.from(files)) {
      const docId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      // Add document with processing status
      const newDoc: UploadedDocument = {
        id: docId,
        name: file.name,
        type: 'other',
        status: 'processing',
        timestamp: new Date()
      };
      
      setUploadedDocs(prev => [newDoc, ...prev]);

      // Simulate AI processing
      setTimeout(() => {
        const documentTypes = ['rate_confirmation', 'pod', 'bol', 'accessorial', 'other'] as const;
        const randomType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
        const confidence = 0.85 + Math.random() * 0.14; // 85-99%
        
        const extractedData = {
          amount: randomType === 'rate_confirmation' ? `$${(Math.random() * 2000 + 500).toFixed(2)}` : undefined,
          customer: randomType === 'rate_confirmation' ? 'ABC Logistics' : undefined,
          loadNumber: `L${Math.floor(Math.random() * 9000) + 1000}`,
          date: new Date().toISOString().split('T')[0]
        };

        setUploadedDocs(prev => 
          prev.map(doc => 
            doc.id === docId 
              ? { 
                  ...doc, 
                  type: randomType, 
                  status: 'classified', 
                  confidence: Math.round(confidence * 100),
                  extractedData 
                }
              : doc
          )
        );

        toast({
          title: "Document Processed",
          description: `${file.name} classified as ${randomType.replace('_', ' ')} with ${Math.round(confidence * 100)}% confidence`,
        });
      }, 2000 + Math.random() * 2000);
    }
    
    setIsUploading(false);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const triggerFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files);
    input.click();
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="w-4 h-4" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'classified':
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'rate_confirmation':
        return 'bg-blue-100 text-blue-800';
      case 'pod':
        return 'bg-green-100 text-green-800';
      case 'bol':
        return 'bg-yellow-100 text-yellow-800';
      case 'accessorial':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={expanded ? "h-full" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5 text-blue-600" />
          <span>Document Processing</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
          onClick={triggerFileInput}
        >
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Upload className="w-8 h-8 text-slate-400" />
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-600">
                Drop documents here or click to upload
              </p>
              <p className="text-sm text-slate-500">
                Supports PDF, JPG, PNG • AI-powered classification
              </p>
            </div>
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm">
                Choose Files
              </Button>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        </div>

        {/* Uploaded Documents */}
        {uploadedDocs.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800">Recent Documents</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {uploadedDocs.slice(0, expanded ? uploadedDocs.length : 5).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(doc.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {doc.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getTypeBadgeColor(doc.type)}>
                          {doc.type.replace('_', ' ')}
                        </Badge>
                        {doc.confidence && (
                          <span className="text-xs text-slate-500">
                            {doc.confidence}% confidence
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(doc.status)}
                    <span className="text-xs text-slate-500 capitalize">
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Processing Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{uploadedDocs.length}</p>
            <p className="text-xs text-slate-500">Documents Processed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {uploadedDocs.filter(d => d.status === 'classified' || d.status === 'approved').length}
            </p>
            <p className="text-xs text-slate-500">Successfully Classified</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {uploadedDocs.filter(d => d.status === 'processing').length}
            </p>
            <p className="text-xs text-slate-500">Processing</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadZone;
