import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "@/components/NavigationSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadService } from "@/services/loadService";
import { toast } from "@/hooks/use-toast";
import NewLoadHeader from "@/components/NewLoadHeader";
import BasicInformationCard from "@/components/BasicInformationCard";
import RouteInformationCard from "@/components/RouteInformationCard";
import CargoInformationCard from "@/components/CargoInformationCard";
import DocumentUploadCard from "@/components/DocumentUploadCard";
import NewLoadActions from "@/components/NewLoadActions";

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
        <NewLoadHeader onClose={handleClose} />

        <div className="flex-1 overflow-y-auto p-6 pb-24">
          <div className="w-full">
            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-slate-100">
                <TabsTrigger value="details">Load Details</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <BasicInformationCard 
                  formData={{
                    loadId: formData.loadId,
                    brokerName: formData.brokerName,
                    rate: formData.rate,
                    referenceNumber: formData.referenceNumber
                  }}
                  onInputChange={handleInputChange}
                />

                <RouteInformationCard 
                  formData={{
                    origin: formData.origin,
                    destination: formData.destination,
                    pickupDate: formData.pickupDate,
                    deliveryDate: formData.deliveryDate,
                    distance: formData.distance
                  }}
                  onInputChange={handleInputChange}
                />

                <CargoInformationCard 
                  formData={{
                    commodity: formData.commodity,
                    weight: formData.weight,
                    pieces: formData.pieces
                  }}
                  onInputChange={handleInputChange}
                />
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <DocumentUploadCard 
                  uploadedFiles={uploadedFiles}
                  onFileUpload={handleFileUpload}
                  onRemoveFile={removeFile}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <NewLoadActions 
          onCancel={handleClose}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default NewLoadPage;
