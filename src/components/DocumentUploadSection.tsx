
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";

const DocumentUploadSection = () => {
  const documentTypes = ["Bill of Lading", "Delivery Receipt", "Weight Ticket", "Photos"];

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
          {documentTypes.map((docType) => (
            <div key={docType} className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">{docType}</p>
              <Button size="sm" variant="outline" className="mt-2">
                Upload
              </Button>
            </div>
          ))}
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
