
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadInformation from "./LoadInformation";
import RouteOptimization from "./RouteOptimization";
import EldSharing from "./EldSharing";
import DocumentUploadSection from "./DocumentUploadSection";
import FinancialServices from "./FinancialServices";
import MockChatInterface from "./MockChatInterface";
import { FileText, Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LoadMainContentProps {
  loadData: any;
}

const LoadMainContent = ({ loadData }: LoadMainContentProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    console.log("Navigating back to dashboard");
    navigate("/");
  };

  return (
    <div className="flex-1 bg-white flex flex-col min-h-screen">
      {/* Main content area */}
      <div className="flex-1 border-r border-slate-200">
        <Tabs defaultValue="details" className="h-full flex flex-col">
          <div className="border-b border-slate-200 bg-white px-6 py-4 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={handleBackClick}
                  className="flex items-center space-x-2 hover:bg-slate-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <div>
                  <h1 className="text-2xl font-semibold text-slate-900">
                    Load #{loadData.loadId}
                  </h1>
                  <p className="text-slate-600">{loadData.broker}</p>
                </div>
              </div>
            </div>
            
            <TabsList className="grid w-full grid-cols-2 bg-slate-100">
              <TabsTrigger value="details" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Load Details</span>
              </TabsTrigger>
              <TabsTrigger value="intelligence" className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Intelligence</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-hidden pb-80">
            <TabsContent value="details" className="h-full p-6 overflow-y-auto">
              <div className="max-w-4xl space-y-6 w-full">
                <LoadInformation loadData={loadData} />
                <RouteOptimization />
                <EldSharing />
                <DocumentUploadSection />
                <FinancialServices loadAmount={loadData.amount} />
              </div>
            </TabsContent>
            
            <TabsContent value="intelligence" className="h-full p-6 overflow-y-auto">
              <div className="max-w-4xl w-full">
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Load Intelligence</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium mb-2">Route Analysis</h4>
                      <p className="text-sm text-slate-600">
                        Optimal route identified with 3% fuel savings potential.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium mb-2">Weather Impact</h4>
                      <p className="text-sm text-slate-600">
                        Clear conditions expected for the entire route.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium mb-2">Traffic Patterns</h4>
                      <p className="text-sm text-slate-600">
                        Light traffic expected during pickup window.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium mb-2">Historical Performance</h4>
                      <p className="text-sm text-slate-600">
                        Similar loads completed 15% faster than average.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Bottom AI assistant panel - adjusted for new layout */}
      <div className="fixed bottom-0 left-96 right-0 h-80 bg-white border-t border-slate-200 shadow-lg z-10">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50 shrink-0">
            <h3 className="text-lg font-semibold text-slate-900">AI Assistant</h3>
            <p className="text-sm text-slate-600">Ask about this load, regulations, routes, and more</p>
          </div>
          <div className="flex-1 p-4 overflow-hidden min-h-0">
            <MockChatInterface 
              loadContext={`Load #${loadData.loadId} from ${loadData.origin} to ${loadData.destination}, Rate: ${loadData.amount}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadMainContent;
