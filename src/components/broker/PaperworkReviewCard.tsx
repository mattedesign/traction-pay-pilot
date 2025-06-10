
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, AlertCircle, Calendar, Eye } from "lucide-react";

interface PaperworkItem {
  carrier: string;
  loadId: string;
  documentsSubmitted: string[];
  documentsNeeded: string[];
  submittedDate: string;
  priority: string;
}

const PaperworkReviewCard = () => {
  const paperworkReview: PaperworkItem[] = [
    {
      carrier: "ABC Trucking",
      loadId: "BL-2024-001",
      documentsSubmitted: ["BOL", "POD"],
      documentsNeeded: ["Rate Confirmation"],
      submittedDate: "2024-06-08",
      priority: "High"
    },
    {
      carrier: "XYZ Logistics", 
      loadId: "BL-2024-002",
      documentsSubmitted: ["BOL", "POD", "Rate Confirmation"],
      documentsNeeded: [],
      submittedDate: "2024-06-07",
      priority: "Complete"
    },
    {
      carrier: "Fast Transport",
      loadId: "BL-2024-005",
      documentsSubmitted: ["BOL"],
      documentsNeeded: ["POD", "Rate Confirmation"],
      submittedDate: "2024-06-06",
      priority: "Medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      case "Complete": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Paperwork Review</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {paperworkReview.map((item, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-slate-900">{item.carrier}</h3>
                <p className="text-sm text-slate-600">Load: {item.loadId}</p>
              </div>
              <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Submitted: {item.documentsSubmitted.join(", ")}</span>
              </div>
              {item.documentsNeeded.length > 0 && (
                <div className="flex items-center space-x-2 text-orange-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Needed: {item.documentsNeeded.join(", ")}</span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>Submitted: {item.submittedDate}</span>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full">
          <Eye className="w-4 h-4 mr-2" />
          Review All Documents
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaperworkReviewCard;
