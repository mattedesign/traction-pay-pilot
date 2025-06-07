
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Truck, DollarSign, Clock, Upload, FileText, AlertTriangle, CreditCard } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import LoadNotification from "@/components/LoadNotification";
import DocumentUpload from "@/components/DocumentUpload";
import ExceptionAlert from "@/components/ExceptionAlert";
import QuickPayOffer from "@/components/QuickPayOffer";

const Index = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const demoScenarios = [
    {
      id: "new-load",
      title: "New Load Notification",
      description: "Non-factored carrier receives Load #1234 from TMS",
      icon: Truck,
      color: "bg-blue-50 border-blue-200 text-blue-700"
    },
    {
      id: "upload-rate-confirmation",
      title: "Rate Confirmation Upload",
      description: "Carrier creates Load #5678 by uploading documents",
      icon: Upload,
      color: "bg-green-50 border-green-200 text-green-700"
    },
    {
      id: "exception-handling",
      title: "Exception Resolution",
      description: "Bill of lading mismatch detected for Load #ABCD",
      icon: AlertTriangle,
      color: "bg-orange-50 border-orange-200 text-orange-700"
    },
    {
      id: "quickpay-offer",
      title: "QuickPay Opportunity",
      description: "Invoice approved for Load #0000 - offer faster payment",
      icon: CreditCard,
      color: "bg-purple-50 border-purple-200 text-purple-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Traction</h1>
                <p className="text-xs text-slate-500">Get Paid Faster, Haul Smarter</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                <DollarSign className="w-3 h-3 mr-1" />
                $2,350 Pending
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                <Clock className="w-3 h-3 mr-1" />
                3 Active Loads
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activeDemo ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Welcome to Traction Demo
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                Experience how Traction simplifies freight management for independent carriers. 
                Each scenario below demonstrates core features designed to get you paid faster and reduce operational friction.
              </p>
            </div>

            {/* Demo Scenarios */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {demoScenarios.map((scenario) => {
                const Icon = scenario.icon;
                return (
                  <Card 
                    key={scenario.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${scenario.color}`}
                    onClick={() => setActiveDemo(scenario.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <Icon className="w-6 h-6" />
                        <CardTitle className="text-lg">{scenario.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">
                        {scenario.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Try Demo Scenario
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Chat Interface Preview */}
            <Card className="bg-white border border-slate-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  <div>
                    <CardTitle>AI Assistant (Powered by Claude Sonnet 4)</CardTitle>
                    <CardDescription>
                      Ask about your loads, payments, routes, or any freight-related questions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChatInterface isPreview={true} />
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="space-y-6">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => setActiveDemo(null)}
              className="mb-4"
            >
              ← Back to Scenarios
            </Button>

            {/* Render Active Demo */}
            {activeDemo === "new-load" && <LoadNotification />}
            {activeDemo === "upload-rate-confirmation" && <DocumentUpload />}
            {activeDemo === "exception-handling" && <ExceptionAlert />}
            {activeDemo === "quickpay-offer" && <QuickPayOffer />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
