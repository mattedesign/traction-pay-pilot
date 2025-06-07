
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Truck, DollarSign, Clock, Upload, FileText, AlertTriangle, CreditCard, Zap, TrendingUp } from "lucide-react";
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
      color: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 text-blue-700",
      emoji: "🚛"
    },
    {
      id: "upload-rate-confirmation",
      title: "Rate Confirmation Upload",
      description: "Carrier creates Load #5678 by uploading documents",
      icon: Upload,
      color: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-green-700",
      emoji: "📄"
    },
    {
      id: "exception-handling",
      title: "Exception Resolution",
      description: "Bill of lading mismatch detected for Load #ABCD",
      icon: AlertTriangle,
      color: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 text-orange-700",
      emoji: "⚠️"
    },
    {
      id: "quickpay-offer",
      title: "QuickPay Opportunity",
      description: "Invoice approved for Load #0000 - offer faster payment",
      icon: CreditCard,
      color: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 text-purple-700",
      emoji: "💳"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <span>Traction</span>
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-100 to-purple-100 px-2 py-1 rounded-full">
                    <Zap className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-700">AI Powered</span>
                  </div>
                </h1>
                <p className="text-xs text-slate-500 flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Get Paid Faster, Haul Smarter</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 shadow-sm">
                <DollarSign className="w-3 h-3 mr-1" />
                $2,350 Pending
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 shadow-sm">
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
            <div className="text-center mb-12 relative">
              {/* Background illustration */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <div className="w-96 h-96 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
                  <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-12 right-12 w-12 h-12 bg-white rounded-full animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center space-x-3">
                  <span>Welcome to Traction Demo</span>
                  <span className="text-3xl">🚀</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                  Experience how Traction simplifies freight management for independent carriers. 
                  Each scenario below demonstrates core features designed to get you paid faster and reduce operational friction.
                </p>
              </div>
            </div>

            {/* Demo Scenarios */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {demoScenarios.map((scenario, index) => {
                const Icon = scenario.icon;
                return (
                  <Card 
                    key={scenario.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${scenario.color} relative overflow-hidden group`}
                    onClick={() => setActiveDemo(scenario.id)}
                  >
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                      <div className="text-6xl transform rotate-12 translate-x-4 -translate-y-2">
                        {scenario.emoji}
                      </div>
                    </div>
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center shadow-sm">
                          <Icon className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-opacity-80 transition-colors">
                          {scenario.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm opacity-80">
                        {scenario.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <Button variant="outline" className="w-full bg-white/50 hover:bg-white/70 backdrop-blur-sm border-white/30 font-medium">
                        Try Demo Scenario
                        <span className="ml-2">{scenario.emoji}</span>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Chat Interface Preview */}
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg relative overflow-hidden">
              {/* Background AI pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"></div>
                  <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 right-6 w-3 h-3 bg-white rounded-full animate-pulse delay-300"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
                </div>
              </div>

              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-6 h-6 text-purple-700" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>AI Assistant</span>
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 rounded-full">
                        <Zap className="w-3 h-3 text-purple-600" />
                        <span className="text-xs font-medium text-purple-700">Powered by Claude Sonnet 4</span>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      Ask about your loads, payments, routes, or any freight-related questions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
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
              className="mb-4 bg-white/80 backdrop-blur-sm"
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
