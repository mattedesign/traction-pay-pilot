
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, FileText, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import ChatInterface from "./ChatInterface";
import { useState } from "react";

const ExceptionAlert = () => {
  const [resolutionStatus, setResolutionStatus] = useState<"pending" | "resolved">("pending");

  const exceptionData = {
    loadId: "ABCD",
    type: "Weight Discrepancy",
    severity: "medium",
    description: "Bill of lading shows 24,500 lbs but rate confirmation specifies 22,000 lbs",
    rateConfirmation: "22,000 lbs",
    billOfLading: "24,500 lbs",
    impact: "May delay payment approval by 3-5 days",
    suggestedActions: [
      "Contact shipper to verify actual weight",
      "Request amended bill of lading",
      "Submit weight ticket as proof",
      "Contact broker to discuss rate adjustment"
    ]
  };

  const handleResolution = (action: string) => {
    console.log(`Taking action: ${action}`);
    if (action === "submit-weight-ticket") {
      setResolutionStatus("resolved");
    }
  };

  return (
    <div className="space-y-6">
      {/* Exception Alert */}
      <Card className={resolutionStatus === "resolved" ? "border-slate-200 bg-slate-50" : "border-orange-200 bg-orange-50"}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <AlertTriangle className={`w-6 h-6 ${resolutionStatus === "resolved" ? "text-slate-600" : "text-orange-600"}`} />
            <div>
              <CardTitle className={resolutionStatus === "resolved" ? "text-slate-900" : "text-orange-900"}>
                {resolutionStatus === "resolved" ? "Exception Resolved - Load #" : "Exception Detected - Load #"}{exceptionData.loadId}
              </CardTitle>
              <CardDescription className={resolutionStatus === "resolved" ? "text-slate-700" : "text-orange-700"}>
                {resolutionStatus === "resolved" 
                  ? "Weight discrepancy resolved - load status pending" 
                  : `${exceptionData.type} found during document analysis`}
              </CardDescription>
            </div>
            <Badge 
              variant="outline" 
              className={`${
                resolutionStatus === "resolved" ? "border-slate-300 text-slate-700 bg-slate-50" :
                exceptionData.severity === "high" ? "border-red-300 text-red-700 bg-red-50" :
                exceptionData.severity === "medium" ? "border-orange-300 text-orange-700 bg-orange-50" :
                "border-yellow-300 text-yellow-700 bg-yellow-50"
              }`}
            >
              {resolutionStatus === "resolved" ? "PENDING" : exceptionData.severity.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`border rounded-lg p-4 ${resolutionStatus === "resolved" ? "bg-white border-slate-200" : "bg-white border-orange-200"}`}>
            <h3 className={`font-medium mb-2 ${resolutionStatus === "resolved" ? "text-slate-900" : "text-orange-900"}`}>Issue Details</h3>
            <p className={`text-sm mb-3 ${resolutionStatus === "resolved" ? "text-slate-800" : "text-orange-800"}`}>
              {resolutionStatus === "resolved" 
                ? "Weight ticket submitted and verified. Load proceeding to next steps."
                : exceptionData.description}
            </p>
            
            {resolutionStatus === "pending" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 border border-orange-200 rounded p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-900">Rate Confirmation</span>
                  </div>
                  <p className="text-sm text-orange-700">{exceptionData.rateConfirmation}</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-900">Bill of Lading</span>
                  </div>
                  <p className="text-sm text-orange-700">{exceptionData.billOfLading}</p>
                </div>
              </div>
            )}
          </div>

          {resolutionStatus === "pending" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-900">Potential Impact</span>
              </div>
              <p className="text-sm text-red-700">{exceptionData.impact}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resolution Status */}
      {resolutionStatus === "resolved" ? (
        <Card className="border-slate-200 bg-slate-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-slate-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Exception Resolved - Status: Pending</span>
            </div>
            <p className="text-sm text-slate-700 mt-1">
              Weight ticket submitted and verified. Load status updated to pending for next steps.
            </p>
          </CardContent>
        </Card>
      ) : (
        /* Suggested Actions */
        <Card>
          <CardHeader>
            <CardTitle>Suggested Resolutions</CardTitle>
            <CardDescription>
              Choose an action to resolve this exception quickly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {exceptionData.suggestedActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                <span className="text-sm text-slate-700">{action}</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleResolution(`action-${index}`)}
                >
                  Take Action
                </Button>
              </div>
            ))}
            
            {/* Special Quick Resolution */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Quick Resolution</h3>
              <p className="text-sm text-blue-700 mb-3">
                Upload a weight ticket photo to instantly resolve this discrepancy
              </p>
              <Button 
                className="w-full" 
                onClick={() => handleResolution("submit-weight-ticket")}
              >
                Upload Weight Ticket Photo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alternative Options */}
      {resolutionStatus === "pending" && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-yellow-900 mb-2">Can't Resolve Right Now?</h3>
            <p className="text-sm text-yellow-700 mb-3">
              Set up alerts so you don't miss payment delays
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-yellow-300">
                <MessageSquare className="w-4 h-4 mr-1" />
                Text Reminders
              </Button>
              <Button size="sm" variant="outline" className="border-yellow-300">
                <Clock className="w-4 h-4 mr-1" />
                Set Follow-up
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Chat */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help Resolving This Exception?</CardTitle>
          <CardDescription>
            Ask me about exception resolution, broker communication, or document requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface loadContext={`Load #${exceptionData.loadId} exception`} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExceptionAlert;
