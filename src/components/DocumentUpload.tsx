
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, Camera, Mic, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatInterface from "./ChatInterface";
import { LoadService } from "@/services/loadService";

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
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Upload Rate Confirmation</h3>
              <p className="text-slate-600 mb-4">Drag and drop your document or click to browse</p>
              <div className="flex justify-center space-x-3">
                <Button onClick={handleFileUpload}>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline">
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Input
                </Button>
              </div>
            </div>
          )}

          {uploadStatus === "processing" && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Processing Document...</h3>
              <p className="text-slate-600">Using OCR to extract load information and setting up proactive monitoring</p>
            </div>
          )}

          {uploadStatus === "completed" && extractedData && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Document processed and load created successfully!</span>
              </div>

              {/* Extracted Data Preview */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center justify-between">
                    <span>Load #{extractedData.loadId} Created</span>
                    <Badge className="bg-green-100 text-green-800">
                      <Plus className="w-3 h-3 mr-1" />
                      New Load
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Automatically extracted from rate confirmation - {extractedData.brokerName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-green-900">Rate</p>
                      <p className="text-lg font-bold text-green-600">{extractedData.rate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-900">Distance</p>
                      <p className="text-sm text-green-700">{extractedData.distance}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-green-900 mb-1">Route</p>
                    <p className="text-sm text-green-700">{extractedData.origin} → {extractedData.destination}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-green-900">Pickup</p>
                      <p className="text-sm text-green-700">{extractedData.pickupDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-900">Delivery</p>
                      <p className="text-sm text-green-700">{extractedData.deliveryDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-900">Weight</p>
                      <p className="text-sm text-green-700">{extractedData.weight}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-sm font-medium text-blue-900 mb-1">Proactive Monitoring Enabled</p>
                    <p className="text-xs text-blue-700">
                      When you upload BOL, POD, or other documents, our AI will automatically detect discrepancies and suggest resolutions to prevent payment delays.
                    </p>
                  </div>

                  <Button onClick={handleViewLoad} className="w-full">
                    View Load Details & Upload Documents
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Smart Features */}
      {uploadStatus === "completed" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <h3 className="font-medium text-blue-900 mb-2">Route Optimization</h3>
              <p className="text-sm text-blue-700 mb-3">AI found a route saving $35 in fuel costs</p>
              <Button size="sm" variant="outline" className="border-blue-300">
                View Optimized Route
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h3 className="font-medium text-green-900 mb-2">Fuel Advance</h3>
              <p className="text-sm text-green-700 mb-3">Get up to ${Math.round(parseFloat(extractedData.rate.slice(1).replace(',', '')) * 0.4)} advance</p>
              <Button size="sm" variant="outline" className="border-green-300">
                Apply Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <h3 className="font-medium text-purple-900 mb-2">Discrepancy Prevention</h3>
              <p className="text-sm text-purple-700 mb-3">AI monitoring for payment delays</p>
              <Button size="sm" variant="outline" className="border-purple-300">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Chat */}
      {uploadStatus === "completed" && (
        <Card>
          <CardHeader>
            <CardTitle>Ask About Load #{extractedData.loadId}</CardTitle>
            <CardDescription>
              Get help with route planning, document requirements, or discrepancy resolution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChatInterface loadContext={`Load #${extractedData.loadId}`} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload;
