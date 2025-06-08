
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import DocumentTypeCard from "./DocumentTypeCard";
import DiscrepancyAlert from "./DiscrepancyAlert";
import UploadHistory from "./UploadHistory";
import { Load } from "@/types/load";

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
  const loadStatus: Load["status"] = "in_transit"; // This would come from load data
  const isPickedUp = loadStatus === "in_transit" || loadStatus === "delivered";

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

          <UploadHistory uploadedDocs={uploadedDocs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUploadSection;
