
import { Button } from "@/components/ui/button";
import { Upload, FileText, Camera, Mic } from "lucide-react";

interface RateConfirmationUploadProps {
  onUpload: () => void;
}

const RateConfirmationUpload = ({ onUpload }: RateConfirmationUploadProps) => {
  return (
    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
      <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-slate-900 mb-2">Upload Rate Confirmation</h3>
      <p className="text-slate-600 mb-4">Drag and drop your document or click to browse</p>
      <div className="flex justify-center space-x-3">
        <Button onClick={onUpload}>
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
  );
};

export default RateConfirmationUpload;
