
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { LoadService } from "@/services/loadService";
import { toast } from "@/hooks/use-toast";
import NewLoadFormData from "@/components/NewLoadFormData";
import NewLoadSummaryCard from "@/components/NewLoadSummaryCard";
import NewLoadDocumentPanel from "@/components/NewLoadDocumentPanel";

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
          preview: '/lovable-uploads/ad7b3d1c-33b6-4157-9f06-f48286cb588c.png'
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
          <NewLoadDocumentPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            uploadedDocs={uploadedDocs}
            onFileUpload={handleFileUpload}
          />

          {/* Right Panel - Load Details */}
          <div className="w-1/2 bg-white">
            <div className="p-6 space-y-6">
              <NewLoadFormData 
                formData={formData}
                onInputChange={handleInputChange}
              />

              {/* Summary Section */}
              <NewLoadSummaryCard />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-white px-6 py-4 shrink-0">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-slate-600 hover:bg-slate-700">
              Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoadPage;
