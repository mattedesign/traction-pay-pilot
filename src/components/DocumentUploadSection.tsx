
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

  // Mock check if load has been picked up or delivered
  const currentLoadId = window.location.pathname.split('/').pop();
  const loadStatus: Load["status"] = currentLoadId === "INV-2024" ? "ready_to_invoice" : 
                                     currentLoadId === "DEL-2024" ? "delivered" : "in_transit";
  const isPickedUp = loadStatus === "in_transit" || loadStatus === "delivered" || loadStatus === "ready_to_invoice";
  const allDocsUploaded = loadStatus === "ready_to_invoice" || loadStatus === "delivered";

  const documentTypes = [
    { name: "Rate Confirmation", required: true, mockUploaded: isPickedUp || allDocsUploaded },
    { name: "Bill of Lading", required: true, mockUploaded: allDocsUploaded },
    { name: "Delivery Receipt", required: true, mockUploaded: allDocsUploaded },
    { name: "Other Documents", required: false, mockUploaded: allDocsUploaded }
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
