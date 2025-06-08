
import { AlertTriangle } from "lucide-react";

interface UploadedDocument {
  type: string;
  fileName: string;
  uploadTime: Date;
  discrepancies?: any[];
}

interface UploadHistoryProps {
  uploadedDocs: UploadedDocument[];
}

const UploadHistory = ({ uploadedDocs }: UploadHistoryProps) => {
  if (uploadedDocs.length === 0) return null;

  return (
    <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded">
      <h4 className="text-sm font-medium text-slate-900 mb-2">Upload History</h4>
      <div className="space-y-1">
        {uploadedDocs.map((doc, index) => (
          <div key={index} className="flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center">
              {doc.discrepancies && doc.discrepancies.length > 0 && (
                <AlertTriangle className="w-3 h-3 text-red-500 mr-1" />
              )}
              {doc.type}: {doc.fileName}
            </span>
            <span>{doc.uploadTime.toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadHistory;
