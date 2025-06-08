
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, AlertTriangle, Shield } from "lucide-react";

interface DocumentTypeCardProps {
  docType: {
    name: string;
    required: boolean;
  };
  isUploaded: boolean;
  uploadedDoc?: {
    fileName: string;
  };
  hasIssues: boolean;
  onUpload: (docType: string) => void;
}

const DocumentTypeCard = ({ 
  docType, 
  isUploaded, 
  uploadedDoc, 
  hasIssues, 
  onUpload 
}: DocumentTypeCardProps) => {
  return (
    <div 
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
          <AlertTriangle className="w-6 h-6 text-red-600" />
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
          <AlertTriangle className="w-3 h-3 mr-1" />
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
          onClick={() => onUpload(docType.name)}
        >
          <Upload className="w-3 h-3 mr-1" />
          Upload
        </Button>
      )}
    </div>
  );
};

export default DocumentTypeCard;
