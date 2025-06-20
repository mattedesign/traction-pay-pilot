
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, FileText, CreditCard, Settings, Users, Rocket } from "lucide-react";

const FactoringSetupWizard = () => {
  const steps = [
    {
      id: 1,
      title: "Document Upload",
      description: "Upload business license, insurance, and tax documents",
      icon: FileText,
      status: "completed",
      time: "5 min"
    },
    {
      id: 2,
      title: "Banking Setup",
      description: "Connect your business banking account for payments",
      icon: CreditCard,
      status: "completed", 
      time: "3 min"
    },
    {
      id: 3,
      title: "Rate Negotiation",
      description: "AI-powered rate optimization based on your profile",
      icon: Settings,
      status: "in-progress",
      time: "2 min"
    },
    {
      id: 4,
      title: "Customer Verification",
      description: "Verify your top customers for better rates",
      icon: Users,
      status: "pending",
      time: "10 min"
    },
    {
      id: 5,
      title: "Go Live",
      description: "Start factoring with optimized rates",
      icon: Rocket,
      status: "pending",
      time: "1 min"
    }
  ];

  const completedSteps = steps.filter(step => step.status === "completed").length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-green-900">
            <Rocket className="w-6 h-6" />
            <span>🚀 FACTORING SETUP WIZARD</span>
          </CardTitle>
          <Badge className="bg-green-100 text-green-800">
            {completedSteps}/{steps.length} Complete
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-green-700">Setup Progress</span>
            <span className="text-green-700">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-slate-200">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step.status === "completed" ? "bg-green-100" :
              step.status === "in-progress" ? "bg-blue-100" : "bg-slate-100"
            }`}>
              {step.status === "completed" ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <step.icon className={`w-4 h-4 ${
                  step.status === "in-progress" ? "text-blue-600" : "text-slate-400"
                }`} />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${
                  step.status === "completed" ? "text-green-900" :
                  step.status === "in-progress" ? "text-blue-900" : "text-slate-700"
                }`}>
                  {step.title}
                </h4>
                <span className="text-xs text-slate-500">{step.time}</span>
              </div>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>

            {step.status === "in-progress" && (
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Continue
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        ))}

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
          <h4 className="font-semibold text-blue-900 mb-2">✨ Next Step: Rate Optimization</h4>
          <p className="text-sm text-blue-800 mb-3">
            Our AI is analyzing your business profile to negotiate the best possible factoring rate. 
            Based on Metro Freight's similar profile, you're likely to qualify for 2.1% - 2.4% range.
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>85%+ on-time delivery</span>
            </div>
            <div className="flex items-center text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Quality customers verified</span>
            </div>
            <div className="flex items-center text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Complete documentation</span>
            </div>
          </div>
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Continue Setup - Finish in 13 Minutes
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default FactoringSetupWizard;
