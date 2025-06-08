
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoadService } from "@/services/loadService";
import RateConfirmationUpload from "./RateConfirmationUpload";
import DocumentProcessing from "./DocumentProcessing";
import LoadCreatedCard from "./LoadCreatedCard";
import SmartFeaturesCards from "./SmartFeaturesCards";
import LoadChatSection from "./LoadChatSection";

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState<"idle" | "processing" | "completed">("idle");
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleFileUpload = () => {
    setUploadStatus("processing");
    
    // Simulate OCR processing with random load data
    setTimeout(() => {
      const mockLoadData = {
        loadId: `RC${Math.floor(Math.random() * 9000) + 1000}`,
        brokerName: "Global Freight Solutions",
        rate: "$1,250.00",
        origin: "2450 Industrial Blvd, Atlanta, GA 30318",
        destination: "875 Logistics Way, Memphis, TN 38118",
        pickupDate: "2025-06-10",
        deliveryDate: "2025-06-11", 
        distance: "385 miles",
        referenceNumber: `GFS-${Math.floor(Math.random() * 900000) + 100000}`,
        commodity: "Automotive Parts",
        weight: "42000 lbs",
        pieces: "18 pallets"
      };

      setExtractedData(mockLoadData);
      
      // Automatically create the load
      const newLoad = LoadService.createLoadFromRateConfirmation(mockLoadData);
      
      setUploadStatus("completed");
    }, 3000);
  };

  const handleViewLoad = () => {
    if (extractedData) {
      navigate(`/load/${extractedData.loadId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Rate Confirmation</span>
          </CardTitle>
          <CardDescription>
            Upload your rate confirmation and I'll automatically create a load with OCR technology and proactive discrepancy detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {uploadStatus === "idle" && (
            <RateConfirmationUpload onUpload={handleFileUpload} />
          )}

          {uploadStatus === "processing" && (
            <DocumentProcessing />
          )}

          {uploadStatus === "completed" && extractedData && (
            <LoadCreatedCard 
              extractedData={extractedData} 
              onViewLoad={handleViewLoad} 
            />
          )}
        </CardContent>
      </Card>

      {/* Smart Features */}
      {uploadStatus === "completed" && extractedData && (
        <SmartFeaturesCards extractedData={extractedData} />
      )}

      {/* AI Chat */}
      {uploadStatus === "completed" && extractedData && (
        <LoadChatSection loadId={extractedData.loadId} />
      )}
    </div>
  );
};

export default DocumentUpload;
