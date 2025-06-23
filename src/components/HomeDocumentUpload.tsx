
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, FileImage, FileVideo } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateFile, ALLOWED_FILE_TYPES } from "@/utils/security";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
  id: string;
  previewUrl?: string;
}

const HomeDocumentUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const createPreviewUrl = (file: File): string | undefined => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return FileImage;
    }
    if (type.startsWith('video/')) {
      return FileVideo;
    }
    return FileText;
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const validation = validateFile(file);
      
      if (!validation.isValid) {
        toast({
          title: "File Upload Failed",
          description: validation.error,
          variant: "destructive"
        });
        return;
      }

      const previewUrl = createPreviewUrl(file);
      
      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
        id: Math.random().toString(36).substr(2, 9),
        previewUrl
      };

      setUploadedFiles(prev => [...prev, newFile]);
      
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
    // Reset input value to allow uploading the same file again
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(file => file.id === id);
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter(file => file.id !== id);
    });
    toast({
      title: "File Removed",
      description: "File has been removed from upload queue.",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload Documents</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-slate-300 hover:border-slate-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Choose files or drag & drop them here
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            PDF, Word documents, and images up to 10MB each
          </p>
          <div>
            <input
              type="file"
              multiple
              onChange={handleFileInputChange}
              accept={ALLOWED_FILE_TYPES.all.join(',')}
              className="hidden"
              id="file-upload-input"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload-input" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>
        </div>

        {/* Uploaded Files List with Previews */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-slate-900">Uploaded Files ({uploadedFiles.length})</h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {uploadedFiles.map((file) => {
                const FileIcon = getFileIcon(file.type);
                
                return (
                  <div key={file.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border">
                    {/* Preview Section */}
                    <div className="flex-shrink-0">
                      {file.previewUrl ? (
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200">
                          <img 
                            src={file.previewUrl} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center border border-slate-200">
                          <FileIcon className="w-8 h-8 text-blue-600" />
                        </div>
                      )}
                    </div>
                    
                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{formatFileSize(file.size)}</p>
                      <p className="text-xs text-slate-400 mt-1 capitalize">
                        {file.type.split('/')[0]} File
                      </p>
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="hover:bg-red-100 hover:text-red-600 shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HomeDocumentUpload;
