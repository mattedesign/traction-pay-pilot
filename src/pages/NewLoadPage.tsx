
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Plus } from "lucide-react";
import { LoadService } from "@/services/loadService";
import { toast } from "@/hooks/use-toast";

const NewLoadPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loadId: '',
    brokerName: '',
    rate: '',
    origin: '',
    destination: '',
    pickupDate: '',
    deliveryDate: '',
    distance: '',
    commodity: '',
    weight: '',
    pieces: '',
    referenceNumber: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    name: string;
    size: string;
    type: string;
  }>>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        type: file.type.includes('pdf') ? 'PDF' : 'Document'
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!formData.loadId || !formData.brokerName || !formData.rate) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in Load ID, Broker Name, and Rate.",
        variant: "destructive"
      });
      return;
    }

    try {
      const newLoad = LoadService.createLoadFromRateConfirmation(formData);
      navigate(`/load/${newLoad.id}`);
    } catch (error) {
      toast({
        title: "Error Creating Load",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    navigate("/loads");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex w-full">
      <NavigationSidebar />
      {/* LoadsSidebar removed to give more space for creating new loads */}
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="border-b border-slate-200 bg-white px-6 py-4 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Create New Load</h1>
              <p className="text-slate-600">Add load details and attach supporting documents</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="hover:bg-slate-100"
              title="Cancel and return to loads"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-slate-100">
                <TabsTrigger value="details">Load Details</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="loadId">Load ID *</Label>
                        <Input
                          id="loadId"
                          value={formData.loadId}
                          onChange={(e) => handleInputChange('loadId', e.target.value)}
                          placeholder="Enter load ID"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="brokerName">Broker Name *</Label>
                        <Input
                          id="brokerName"
                          value={formData.brokerName}
                          onChange={(e) => handleInputChange('brokerName', e.target.value)}
                          placeholder="Enter broker name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rate">Rate *</Label>
                        <Input
                          id="rate"
                          value={formData.rate}
                          onChange={(e) => handleInputChange('rate', e.target.value)}
                          placeholder="$0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="referenceNumber">Reference Number</Label>
                        <Input
                          id="referenceNumber"
                          value={formData.referenceNumber}
                          onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
                          placeholder="Enter reference number"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Route Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="origin">Origin</Label>
                        <Textarea
                          id="origin"
                          value={formData.origin}
                          onChange={(e) => handleInputChange('origin', e.target.value)}
                          placeholder="Enter pickup address"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Textarea
                          id="destination"
                          value={formData.destination}
                          onChange={(e) => handleInputChange('destination', e.target.value)}
                          placeholder="Enter delivery address"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickupDate">Pickup Date</Label>
                        <Input
                          id="pickupDate"
                          type="datetime-local"
                          value={formData.pickupDate}
                          onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deliveryDate">Delivery Date</Label>
                        <Input
                          id="deliveryDate"
                          type="datetime-local"
                          value={formData.deliveryDate}
                          onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="distance">Distance</Label>
                        <Input
                          id="distance"
                          value={formData.distance}
                          onChange={(e) => handleInputChange('distance', e.target.value)}
                          placeholder="000 miles"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cargo Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="commodity">Commodity</Label>
                        <Input
                          id="commodity"
                          value={formData.commodity}
                          onChange={(e) => handleInputChange('commodity', e.target.value)}
                          placeholder="General Freight"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                          id="weight"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          placeholder="00000 lbs"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pieces">Pieces</Label>
                        <Input
                          id="pieces"
                          value={formData.pieces}
                          onChange={(e) => handleInputChange('pieces', e.target.value)}
                          placeholder="0 pallets"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Upload</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 mb-2">
                        Choose a file or drag & drop it here
                      </h3>
                      <p className="text-sm text-slate-500 mb-4">
                        JPEG, PNG, PDF, and MP4 formats, up to 50 MB
                      </p>
                      <div>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <Button asChild variant="outline">
                          <label htmlFor="file-upload" className="cursor-pointer">
                            Browse files
                          </label>
                        </Button>
                      </div>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-900">Uploaded Files</h4>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded border">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                <span className="text-xs font-medium text-blue-600">
                                  {file.type === 'PDF' ? 'PDF' : 'DOC'}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">{file.name}</p>
                                <p className="text-xs text-slate-500">{file.size}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                              className="hover:bg-red-100 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                Create Load
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoadPage;
