
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

interface DocumentUploadCardProps {
  uploadedFiles: UploadedFile[];
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

const DocumentUploadCard = ({ uploadedFiles, onFileUpload, onRemoveFile }: DocumentUploadCardProps) => {
  return (
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
              onChange={onFileUpload}
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
                  onClick={() => onRemoveFile(index)}
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
  );
};

export default DocumentUploadCard;
