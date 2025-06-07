
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, Camera, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatInterface from "./ChatInterface";

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState<"idle" | "processing" | "completed">("idle");
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleFileUpload = () => {
    setUploadStatus("processing");
    
    // Simulate OCR processing
    setTimeout(() => {
      setExtractedData({
        loadId: "5678",
        brokerName: "Swift Logistics",
        rate: "$750.00",
        origin: "Phoenix, AZ - 1015 South 43rd Avenue",
        destination: "Perris, CA - 400 East Ellis Avenue",
        pickupDate: "2025-05-29",
        deliveryDate: "2025-05-29",
        distance: "332 miles",
        referenceNumber: "SL-789456"
      });
      setUploadStatus("completed");
    }, 3000);
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
            Upload your rate confirmation and I'll automatically create a load with OCR technology
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
              <p className="text-slate-600">Using OCR to extract load information</p>
            </div>
          )}

          {uploadStatus === "completed" && extractedData && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Document processed successfully!</span>
              </div>

              {/* Extracted Data Preview */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">Load #{extractedData.loadId} Created</CardTitle>
                  <CardDescription className="text-green-700">
                    Extracted from rate confirmation - {extractedData.brokerName}
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-green-900">Pickup</p>
                      <p className="text-sm text-green-700">{extractedData.pickupDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-900">Delivery</p>
                      <p className="text-sm text-green-700">{extractedData.deliveryDate}</p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => navigate(`/load/${extractedData.loadId}`)}
                    className="w-full"
                  >
                    View Load Details & Continue Setup
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
              <p className="text-sm text-blue-700 mb-3">AI found a route saving $23 in fuel costs</p>
              <Button size="sm" variant="outline" className="border-blue-300">
                View Optimized Route
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h3 className="font-medium text-green-900 mb-2">Fuel Advance</h3>
              <p className="text-sm text-green-700 mb-3">Get up to ${Math.round(parseFloat(extractedData.rate.slice(1)) * 0.4)} advance</p>
              <Button size="sm" variant="outline" className="border-green-300">
                Apply Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <h3 className="font-medium text-purple-900 mb-2">Fuel Cards</h3>
              <p className="text-sm text-purple-700 mb-3">Save 15¢/gallon on this route</p>
              <Button size="sm" variant="outline" className="border-purple-300">
                Compare Options
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
              Get help with route planning, fuel optimization, or document requirements
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
