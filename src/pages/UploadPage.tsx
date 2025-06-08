
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, AlertTriangle, Camera, Mic, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import { useToast } from "@/hooks/use-toast";

interface ExtractedLoadData {
  loadId: string;
  brokerName: string;
  rate: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  distance: string;
  referenceNumber: string;
  commodity: string;
  weight: string;
}

const UploadPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadStatus, setUploadStatus] = useState<"idle" | "processing" | "completed">("idle");
  const [extractedData, setExtractedData] = useState<ExtractedLoadData | null>(null);

  const handleFileUpload = () => {
    setUploadStatus("processing");
    
    toast({
      title: "Processing Document",
      description: "Extracting load information using OCR technology...",
    });

    // Simulate OCR processing with realistic delay
    setTimeout(() => {
      const newLoadData: ExtractedLoadData = {
        loadId: `${Math.floor(Math.random() * 9000) + 1000}`,
        brokerName: "Nationwide Freight Solutions",
        rate: "$1,850.00",
        origin: "Chicago, IL - 2450 W Fulton St",
        destination: "Miami, FL - 7800 NW 25th St",
        pickupDate: "2025-06-12",
        deliveryDate: "2025-06-14",
        distance: "1,285 miles",
        referenceNumber: "NFS-445789",
        commodity: "Electronics",
        weight: "42,500 lbs"
      };
      
      setExtractedData(newLoadData);
      setUploadStatus("completed");
      
      toast({
        title: "Load Created Successfully",
        description: `Load #${newLoadData.loadId} has been automatically created from your rate confirmation.`,
      });
    }, 3500);
  };

  const handleConfirmLoad = () => {
    if (extractedData) {
      // Add the load to the system (in a real app, this would be an API call)
      console.log("Adding new load to system:", extractedData);
      
      toast({
        title: "Load Added",
        description: `Load #${extractedData.loadId} is now active in your system.`,
      });
      
      // Navigate to the new load
      navigate(`/load/${extractedData.loadId}`);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Rate Confirmation</h1>
            <p className="text-slate-600">Upload your rate confirmation to automatically create a new load</p>
          </div>

          {/* Upload Interface */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Smart Document Processing</span>
              </CardTitle>
              <CardDescription>
                Our AI will extract all load details from your rate confirmation and create the load automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {uploadStatus === "idle" && (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors">
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
                  <p className="text-xs text-slate-500 mt-4">
                    Supports PDF, JPG, PNG, DOC, DOCX files up to 10MB
                  </p>
                </div>
              )}

              {uploadStatus === "processing" && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Processing Document...</h3>
                  <p className="text-slate-600 mb-2">Using advanced OCR to extract load information</p>
                  <div className="text-sm text-slate-500">
                    <p>✓ Document uploaded securely</p>
                    <p>✓ Running text recognition</p>
                    <p>⏳ Extracting load details...</p>
                  </div>
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
                      <CardTitle className="text-green-900 flex items-center justify-between">
                        <span>Load #{extractedData.loadId} Ready for Creation</span>
                        <span className="text-2xl font-bold text-green-600">{extractedData.rate}</span>
                      </CardTitle>
                      <CardDescription className="text-green-700">
                        Extracted from {extractedData.brokerName} rate confirmation
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-green-900">Pickup Location</p>
                            <p className="text-sm text-green-700">{extractedData.origin}</p>
                            <p className="text-xs text-green-600">{extractedData.pickupDate}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-900">Commodity & Weight</p>
                            <p className="text-sm text-green-700">{extractedData.commodity}</p>
                            <p className="text-xs text-green-600">{extractedData.weight}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-green-900">Delivery Location</p>
                            <p className="text-sm text-green-700">{extractedData.destination}</p>
                            <p className="text-xs text-green-600">{extractedData.deliveryDate}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-900">Distance & Reference</p>
                            <p className="text-sm text-green-700">{extractedData.distance}</p>
                            <p className="text-xs text-green-600">{extractedData.referenceNumber}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button onClick={handleConfirmLoad} className="flex-1">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Load & Continue Setup
                        </Button>
                        <Button variant="outline" onClick={() => setUploadStatus("idle")}>
                          Upload Different Document
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Smart Features Preview */}
          {uploadStatus === "completed" && extractedData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Route Intelligence</h3>
                  <p className="text-sm text-blue-700 mb-3">AI found optimized route saving $67 in fuel costs</p>
                  <Button size="sm" variant="outline" className="border-blue-300 w-full">
                    View Route Options
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <h3 className="font-medium text-green-900 mb-2">Fuel Advance Available</h3>
                  <p className="text-sm text-green-700 mb-3">Get up to ${Math.round(parseFloat(extractedData.rate.slice(1)) * 0.45)} advance instantly</p>
                  <Button size="sm" variant="outline" className="border-green-300 w-full">
                    Apply for Advance
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4">
                  <h3 className="font-medium text-purple-900 mb-2">Document Checklist</h3>
                  <p className="text-sm text-purple-700 mb-3">Set up reminders for required documents</p>
                  <Button size="sm" variant="outline" className="border-purple-300 w-full">
                    Setup Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
