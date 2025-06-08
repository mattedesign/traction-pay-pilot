
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Upload, FileText, DollarSign, Scale, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Discrepancy {
  type: "rate" | "weight" | "commodity" | "timing" | "accessorial";
  severity: "low" | "medium" | "high";
  description: string;
  originalValue: string;
  detectedValue: string;
  suggestedActions: string[];
  requiredDocuments?: string[];
}

interface DiscrepancyDetectionProps {
  uploadedDocument: {
    type: string;
    fileName: string;
    loadId: string;
  };
  originalLoadData: {
    rate: string;
    weight: string;
    commodity: string;
    pickupDate: string;
    deliveryDate: string;
  };
}

const DiscrepancyDetection = ({ uploadedDocument, originalLoadData }: DiscrepancyDetectionProps) => {
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [resolvedDiscrepancies, setResolvedDiscrepancies] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    // Simulate discrepancy detection based on document type
    setTimeout(() => {
      const detectedDiscrepancies: Discrepancy[] = [];

      if (uploadedDocument.type === "Bill of Lading") {
        // Simulate rate discrepancy
        detectedDiscrepancies.push({
          type: "rate",
          severity: "high",
          description: "Rate difference detected between rate confirmation and BOL",
          originalValue: originalLoadData.rate,
          detectedValue: "$1,920.00",
          suggestedActions: [
            "Upload detention receipt for 2-hour delay",
            "Add fuel surcharge documentation",
            "Contact broker to confirm rate adjustment"
          ],
          requiredDocuments: ["Detention Receipt", "Fuel Surcharge Agreement"]
        });

        // Simulate weight discrepancy
        detectedDiscrepancies.push({
          type: "weight",
          severity: "medium",
          description: "Actual weight exceeds original booking",
          originalValue: originalLoadData.weight,
          detectedValue: "44,750 lbs",
          suggestedActions: [
            "Upload certified scale ticket",
            "Document overweight permit if required",
            "Notify broker of weight variance"
          ],
          requiredDocuments: ["Certified Scale Ticket"]
        });
      }

      if (uploadedDocument.type === "Delivery Receipt") {
        detectedDiscrepancies.push({
          type: "accessorial",
          severity: "medium",
          description: "Additional charges detected on delivery receipt",
          originalValue: "No accessorials",
          detectedValue: "$150 - Lumper fee, $75 - Inside delivery",
          suggestedActions: [
            "Upload lumper receipt",
            "Document special delivery requirements",
            "Submit accessorial pre-approval if available"
          ],
          requiredDocuments: ["Lumper Receipt", "Special Handling Documentation"]
        });

        detectedDiscrepancies.push({
          type: "timing",
          severity: "low",
          description: "Delivery completed earlier than scheduled",
          originalValue: originalLoadData.deliveryDate,
          detectedValue: "2025-06-13 (1 day early)",
          suggestedActions: [
            "Document early delivery approval",
            "Confirm no detention fees apply",
            "Update delivery appointment records"
          ]
        });
      }

      setDiscrepancies(detectedDiscrepancies);
      setIsAnalyzing(false);

      if (detectedDiscrepancies.length > 0) {
        toast({
          title: "Discrepancies Detected",
          description: `Found ${detectedDiscrepancies.length} potential issues that could delay payment.`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "No Issues Found",
          description: "Document matches original load details perfectly.",
        });
      }
    }, 2500);
  }, [uploadedDocument, originalLoadData, toast]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDiscrepancyIcon = (type: string) => {
    switch (type) {
      case "rate": return DollarSign;
      case "weight": return Scale;
      case "timing": return Clock;
      case "accessorial": return FileText;
      default: return AlertTriangle;
    }
  };

  const handleResolveDiscrepancy = (index: number) => {
    setResolvedDiscrepancies(prev => new Set([...prev, index]));
    toast({
      title: "Issue Marked as Resolved",
      description: "Great! This should help prevent payment delays.",
    });
  };

  const handleUploadSupportingDoc = (docType: string) => {
    // Simulate document upload
    toast({
      title: "Uploading Supporting Document",
      description: `Uploading ${docType}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Document Uploaded",
        description: `${docType} uploaded successfully and linked to this load.`,
      });
    }, 1500);
  };

  if (isAnalyzing) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="font-medium text-blue-900 mb-2">Analyzing Document</h3>
          <p className="text-sm text-blue-700">
            Comparing {uploadedDocument.type} against original load details...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (discrepancies.length === 0) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
          <h3 className="font-medium text-green-900 mb-2">Perfect Match!</h3>
          <p className="text-sm text-green-700">
            Your {uploadedDocument.type} matches the original load details exactly. No payment delays expected.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-900">
            <Shield className="w-5 h-5" />
            <span>Proactive Payment Protection</span>
          </CardTitle>
          <CardDescription className="text-orange-700">
            We detected {discrepancies.length} potential issue(s) that could delay your payment. 
            Resolve them now to ensure faster processing.
          </CardDescription>
        </CardHeader>
      </Card>

      {discrepancies.map((discrepancy, index) => {
        const Icon = getDiscrepancyIcon(discrepancy.type);
        const isResolved = resolvedDiscrepancies.has(index);
        
        return (
          <Card 
            key={index} 
            className={`${isResolved ? 'border-green-200 bg-green-50' : 'border-slate-200'}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isResolved ? 'text-green-600' : 'text-slate-600'}`} />
                  <div>
                    <CardTitle className={`text-sm ${isResolved ? 'text-green-900' : 'text-slate-900'}`}>
                      {discrepancy.description}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getSeverityColor(discrepancy.severity)}>
                        {discrepancy.severity.toUpperCase()} PRIORITY
                      </Badge>
                      {isResolved && (
                        <Badge className="bg-green-100 text-green-800">
                          RESOLVED
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-slate-700">Original:</p>
                  <p className="text-slate-600">{discrepancy.originalValue}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Detected:</p>
                  <p className="text-slate-600">{discrepancy.detectedValue}</p>
                </div>
              </div>

              {!isResolved && (
                <>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Suggested Actions:</h4>
                    <ul className="space-y-1">
                      {discrepancy.suggestedActions.map((action, actionIndex) => (
                        <li key={actionIndex} className="text-sm text-slate-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {discrepancy.requiredDocuments && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Upload Supporting Documents:</h4>
                      <div className="flex flex-wrap gap-2">
                        {discrepancy.requiredDocuments.map((doc, docIndex) => (
                          <Button
                            key={docIndex}
                            size="sm"
                            variant="outline"
                            onClick={() => handleUploadSupportingDoc(doc)}
                            className="text-xs"
                          >
                            <Upload className="w-3 h-3 mr-1" />
                            {doc}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleResolveDiscrepancy(index)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Mark as Resolved
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact Broker
                    </Button>
                  </div>
                </>
              )}

              {isResolved && (
                <div className="text-sm text-green-700">
                  ✓ This issue has been marked as resolved and shouldn't delay payment.
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">Pro Tip</span>
          </div>
          <p className="text-sm text-blue-700">
            Resolving these issues now can reduce payment processing time by 2-5 business days. 
            Our AI learns from resolved discrepancies to better prevent future issues.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscrepancyDetection;
