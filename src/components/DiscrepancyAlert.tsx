
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock } from "lucide-react";

interface DiscrepancyAlertProps {
  alert: {
    docType: string;
    discrepancies: Array<{
      description: string;
      severity: 'high' | 'medium' | 'low';
      suggestedResolution: string[];
      requiredDocuments?: string[];
    }>;
    resolutionSuggestions?: {
      estimatedResolutionTime: string;
    };
  };
}

const DiscrepancyAlert = ({ alert }: DiscrepancyAlertProps) => {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-red-900 text-base flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Discrepancies Detected in {alert.docType}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alert.discrepancies.map((discrepancy, discIndex) => (
          <div key={discIndex} className="bg-white p-3 rounded border border-red-200">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-red-900">{discrepancy.description}</p>
              <span className={`text-xs px-2 py-1 rounded ${
                discrepancy.severity === 'high' ? 'bg-red-100 text-red-800' :
                discrepancy.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {discrepancy.severity.toUpperCase()}
              </span>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium text-slate-700 mb-1">Suggested Resolutions:</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  {discrepancy.suggestedResolution.map((resolution, resIndex) => (
                    <li key={resIndex} className="flex items-start">
                      <span className="mr-2">•</span>
                      {resolution}
                    </li>
                  ))}
                </ul>
              </div>
              
              {discrepancy.requiredDocuments && discrepancy.requiredDocuments.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-700 mb-1">Supporting Documents Needed:</p>
                  <div className="flex flex-wrap gap-1">
                    {discrepancy.requiredDocuments.map((doc, docIndex) => (
                      <span key={docIndex} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {alert.resolutionSuggestions && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Resolution Timeline</span>
            </div>
            <p className="text-xs text-blue-700 mb-2">
              Estimated resolution time: {alert.resolutionSuggestions.estimatedResolutionTime}
            </p>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Start Resolution Process
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiscrepancyAlert;
