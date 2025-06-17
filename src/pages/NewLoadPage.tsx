
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, Plus, FileText, Trash2, Edit } from "lucide-react";
import { LoadService } from "@/services/loadService";
import { toast } from "@/hooks/use-toast";

const NewLoadPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loadId: '',
    linehaul: '',
    broker: '',
    factor: 'TFS',
    funding: 'ACH *3993',
    invoiceNumber: '',
    expectedPayDate: ''
  });

  const [activeTab, setActiveTab] = useState<'documents' | 'accessorials'>('documents');
  const [uploadedDocs, setUploadedDocs] = useState<Array<{
    name: string;
    status: string;
    preview?: string;
  }>>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.png,.jpg,.jpeg';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        setUploadedDocs(prev => [...prev, {
          name: 'Rate Confirmation',
          status: 'Processed',
          preview: '/lovable-uploads/ad7b3d1c-33b6-4157-9f06-f48286cb588c.png' // Using the uploaded image as preview
        }]);
        
        // Auto-fill form with mock data when document is uploaded
        setFormData(prev => ({
          ...prev,
          loadId: '3249883',
          linehaul: '$1,250.00',
          broker: 'Mainstreet Brokerage',
          invoiceNumber: '#090345035',
          expectedPayDate: 'Monday, March 26, 2025'
        }));
      }
    };
    input.click();
  };

  const handleSubmit = () => {
    if (!formData.loadId || !formData.broker || !formData.linehaul) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in Load #, Broker, and Linehaul.",
        variant: "destructive"
      });
      return;
    }

    try {
      const newLoad = LoadService.createLoadFromRateConfirmation({
        loadId: formData.loadId,
        brokerName: formData.broker,
        rate: formData.linehaul,
        origin: "Origin City, ST",
        destination: "Destination City, ST",
        pickupDate: "2025-06-18",
        deliveryDate: "2025-06-19",
        distance: "500 miles",
        referenceNumber: formData.invoiceNumber
      });
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
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white px-6 py-4 shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-900">Create Load</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Document Upload */}
          <div className="w-1/2 border-r border-slate-200 bg-white">
            {/* Tabs */}
            <div className="border-b border-slate-200">
              <div className="flex">
                <button
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'documents' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                  onClick={() => setActiveTab('documents')}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Documents
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'accessorials' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                  onClick={() => setActiveTab('accessorials')}
                >
                  Accessorials
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'documents' && (
                <div className="space-y-6">
                  {uploadedDocs.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-12">
                      <div className="w-32 h-32 mx-auto mb-6">
                        <img 
                          src="/lovable-uploads/ad7b3d1c-33b6-4157-9f06-f48286cb588c.png" 
                          alt="Upload illustration"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">Add A Rate Con</h3>
                      <p className="text-slate-600 mb-6">We'll fill out the load details for you</p>
                      <Button onClick={handleFileUpload} className="bg-blue-600 hover:bg-blue-700">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  ) : (
                    /* Filled State */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-slate-900">Load Docs</h3>
                        <Button 
                          size="icon" 
                          variant="outline"
                          onClick={handleFileUpload}
                          className="w-8 h-8"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {uploadedDocs.map((doc, index) => (
                        <Card key={index} className="border-2 border-blue-200">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-16 h-20 bg-white border rounded overflow-hidden">
                                <img 
                                  src="/lovable-uploads/701decda-0e75-4971-8e93-1801fc88a964.png"
                                  alt="Rate Confirmation Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm font-medium text-slate-900">{doc.name}</h4>
                                  <div className="flex space-x-1">
                                    <Button size="icon" variant="ghost" className="w-6 h-6">
                                      <Trash2 className="w-3 h-3 text-red-500" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="w-6 h-6">
                                      <Edit className="w-3 h-3 text-slate-500" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Status: {doc.status}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                        <Plus className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600 mb-2">Have More Docs?</p>
                        <p className="text-xs text-slate-500">Add them here</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'accessorials' && (
                <div className="text-center py-12 text-slate-500">
                  <p>Accessorials content would go here</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Load Details */}
          <div className="w-1/2 bg-white">
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loadId" className="text-sm font-medium text-slate-700">Load #</Label>
                  <Input
                    id="loadId"
                    value={formData.loadId}
                    onChange={(e) => handleInputChange('loadId', e.target.value)}
                    placeholder="3249883"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="linehaul" className="text-sm font-medium text-slate-700">
                    <span className="inline-flex items-center">
                      💰 Linehaul
                    </span>
                  </Label>
                  <Input
                    id="linehaul"
                    value={formData.linehaul}
                    onChange={(e) => handleInputChange('linehaul', e.target.value)}
                    placeholder="$1,250.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="broker" className="text-sm font-medium text-slate-700">
                    <span className="inline-flex items-center">
                      👤 Broker
                    </span>
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="broker"
                      value={formData.broker}
                      onChange={(e) => handleInputChange('broker', e.target.value)}
                      placeholder="Mainstreet Brokerage"
                    />
                    {formData.broker && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
                        onClick={() => handleInputChange('broker', '')}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="factor" className="text-sm font-medium text-slate-700">
                    <span className="inline-flex items-center">
                      👤 Factor
                    </span>
                  </Label>
                  <Input
                    id="factor"
                    value={formData.factor}
                    onChange={(e) => handleInputChange('factor', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="funding" className="text-sm font-medium text-slate-700">
                    <span className="inline-flex items-center">
                      💳 Funding
                    </span>
                  </Label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Input
                      id="funding"
                      value={formData.funding}
                      onChange={(e) => handleInputChange('funding', e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="invoiceNumber" className="text-sm font-medium text-slate-700">
                    <span className="inline-flex items-center">
                      📄 Invoice #
                    </span>
                  </Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                    placeholder="#090345035"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="expectedPayDate" className="text-sm font-medium text-slate-700">
                    <span className="inline-flex items-center">
                      📅 Expected Pay Date
                    </span>
                  </Label>
                  <Input
                    id="expectedPayDate"
                    value={formData.expectedPayDate}
                    onChange={(e) => handleInputChange('expectedPayDate', e.target.value)}
                    placeholder="Monday, March 26, 2025"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Summary Section */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Amount</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Fee</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900">Total</span>
                        <span className="font-bold text-lg">$0.00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-white px-6 py-4 shrink-0">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoadPage;
