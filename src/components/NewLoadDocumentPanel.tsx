
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, Plus, Trash2, Edit } from "lucide-react";
import NewLoadTabsSection from "./NewLoadTabsSection";

interface UploadedDoc {
  name: string;
  status: string;
  preview?: string;
}

interface NewLoadDocumentPanelProps {
  activeTab: 'documents' | 'accessorials';
  onTabChange: (tab: 'documents' | 'accessorials') => void;
  uploadedDocs: UploadedDoc[];
  onFileUpload: () => void;
}

const NewLoadDocumentPanel = ({ 
  activeTab, 
  onTabChange, 
  uploadedDocs, 
  onFileUpload 
}: NewLoadDocumentPanelProps) => {
  return (
    <div className="w-1/2 border-r border-slate-200 bg-white">
      <NewLoadTabsSection activeTab={activeTab} onTabChange={onTabChange} />

      <div className="p-6">
        {activeTab === 'documents' && (
          <div className="space-y-6">
            {uploadedDocs.length === 0 ? (
              /* Empty State */
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Add A Rate Con</h3>
                <p className="text-slate-600 mb-6">We'll fill out the load details for you</p>
                <Button onClick={onFileUpload} className="bg-slate-600 hover:bg-slate-700">
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
                    onClick={onFileUpload}
                    className="w-8 h-8"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {uploadedDocs.map((doc, index) => (
                  <Card key={index} className="border-2 border-slate-200">
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
  );
};

export default NewLoadDocumentPanel;
