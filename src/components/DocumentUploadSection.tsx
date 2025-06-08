
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText } from "lucide-react";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import DocumentTypeCard from "./DocumentTypeCard";
import DiscrepancyAlert from "./DiscrepancyAlert";
import UploadHistory from "./UploadHistory";

const DocumentUploadSection = () => {
  const {
    uploadedDocs,
    discrepancyAlerts,
    handleUpload,
    isDocumentUploaded,
    getUploadedDoc,
    hasDiscrepancies
  } = useDocumentUpload();

  // Mock check if load has been picked up (you can replace this with actual load status)
  const loadStatus = "in_transit"; // This would come from load data
  const isPickedUp = loadStatus !== "pending_pickup" && loadStatus !== "pending_acceptance";

  const documentTypes = [
    { name: "Rate Confirmation", required: true, mockUploaded: isPickedUp },
    { name: "Bill of Lading", required: true },
    { name: "Delivery Receipt", required: true },
    { name: "Other Documents", required: false }
  ];

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
            {documentTypes.map((docType) => (
              <DocumentTypeCard
                key={docType.name}
                docType={docType}
                isUploaded={docType.mockUploaded || isDocumentUploaded(docType.name)}
                uploadedDoc={docType.mockUploaded ? { fileName: `${docType.name.toLowerCase().replace(' ', '_')}_confirmation.pdf` } : getUploadedDoc(docType.name)}
                hasIssues={hasDiscrepancies(docType.name)}
                onUpload={handleUpload}
              />
            ))}
          </div>

          {/* Discrepancy Alerts */}
          {discrepancyAlerts.map((alert, index) => (
            <DiscrepancyAlert key={index} alert={alert} />
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

          <UploadHistory uploadedDocs={uploadedDocs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUploadSection;
