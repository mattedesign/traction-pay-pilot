
import { useState } from "react";
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

export const useDocumentUpload = () => {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const [discrepancyAlerts, setDiscrepancyAlerts] = useState<any[]>([]);
  const { toast } = useToast();

  const simulateDocumentExtraction = (docType: string, fileName: string) => {
    const mockExtractions: Record<string, any> = {
      "Rate Confirmation": {
        broker: "Global Freight Solutions",
        totalAmount: "$775.00",
        origin: "Atlanta, GA",
        destination: "Memphis, TN",
        commodity: "Electronics Components"
      },
      "Bill of Lading": {
        commodity: "Electronics Components",
        weight: "35500 lbs",
        pieces: "24 pallets",
        totalAmount: "$775.00",
        shipper: "Tech Manufacturing Inc"
      },
      "Delivery Receipt": {
        deliveryTime: "2025-05-30T18:30:00Z",
        consignee: "Electronics Retail Chain",
        totalAmount: "$750.00",
        receivedBy: "John Smith"
      },
      "Other Documents": {
        weight: "36200 lbs",
        scaleLocation: "Certified Truck Scale #456",
        totalAmount: "$750.00",
        documentType: fileName.toLowerCase().includes('weight') ? 'Weight Ticket' : 'Supporting Documentation'
      }
    };

    return mockExtractions[docType] || {};
  };

  const handleUpload = (docType: string) => {
    console.log(`Initiating secure upload for ${docType}`);
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ALLOWED_FILE_TYPES.all.join(',');
    input.multiple = docType === "Other Documents"; // Allow multiple files for other documents
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        Array.from(files).forEach((file) => {
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
            const extractedData = simulateDocumentExtraction(docType, file.name);
            const currentLoadId = window.location.pathname.split('/').pop() || "1234";
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
              ...prev.filter(doc => !(doc.type === docType && doc.fileName === file.name)),
              newDoc
            ]);

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
        });
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

  return {
    uploadedDocs,
    discrepancyAlerts,
    handleUpload,
    isDocumentUploaded,
    getUploadedDoc,
    hasDiscrepancies
  };
};
