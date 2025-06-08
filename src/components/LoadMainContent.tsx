
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import LoadInformation from "./LoadInformation";
import RouteOptimization from "./RouteOptimization";
import EldSharing from "./EldSharing";
import DocumentUploadSection from "./DocumentUploadSection";
import FinancialServices from "./FinancialServices";
import FunctionalChatInterface from "./FunctionalChatInterface";
import QuickPayOffer from "./QuickPayOffer";
import EmailThreadDisplay from "./EmailThreadDisplay";
import { FileText, Upload, Brain, X, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmailService, EmailThread } from "@/services/emailService";

interface LoadMainContentProps {
  loadData: any;
}

const LoadMainContent = ({ loadData }: LoadMainContentProps) => {
  const [isChatFocused, setIsChatFocused] = useState(false);
  const [emailThreads, setEmailThreads] = useState<EmailThread[]>([]);
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmailThreads = async () => {
      setIsLoadingThreads(true);
      try {
        const threads = await EmailService.getEmailThreadsForLoad(loadData.loadId);
        setEmailThreads(threads);
      } catch (error) {
        console.error(`Error loading threads for load ${loadData.loadId}:`, error);
      } finally {
        setIsLoadingThreads(false);
      }
    };

    loadEmailThreads();
  }, [loadData.loadId]);

  const handleNavigateToLoad = (path: string) => {
    navigate(path);
  };

  const handleFocusChange = (focused: boolean) => {
    setIsChatFocused(focused);
  };

  const handleClose = () => {
    navigate("/loads");
  };

  // Check if load is completed and should show QuickPay option at the top
  const shouldShowQuickPayAtTop = loadData.status === "delivered" && 
    loadData.fundingMethod === "Standard Pay ACH";

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-50 relative overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs defaultValue="details" className="h-full flex flex-col">
          <div className="border-b border-slate-200 bg-white px-6 py-4 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Load #{loadData.loadId}
                </h1>
                <p className="text-slate-600">{loadData.broker}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="hover:bg-slate-100"
                title="Close load details"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <TabsList className="grid w-full grid-cols-3 bg-slate-100">
              <TabsTrigger value="details" className="flex items-center space-x-2 text-slate-700">
                <FileText className="w-4 h-4" />
                <span>Load Details</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center space-x-2 text-slate-700">
                <Upload className="w-4 h-4" />
                <span>Documents</span>
              </TabsTrigger>
              <TabsTrigger value="intelligence" className="flex items-center space-x-2 text-slate-700">
                <Brain className="w-4 h-4" />
                <span>Intelligence</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 relative">
            <TabsContent value="details" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 pb-32">
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Show QuickPay at top for completed loads with standard funding */}
                    {shouldShowQuickPayAtTop && <QuickPayOffer />}
                    
                    <LoadInformation loadData={loadData} />
                    <FinancialServices loadAmount={loadData.amount} />
                    
                    {/* Communications Section */}
                    {emailThreads.length > 0 && (
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center space-x-2 mb-4">
                          <MessageSquare className="w-5 h-5 text-slate-600" />
                          <h3 className="text-lg font-semibold text-slate-900">Communications</h3>
                        </div>
                        {isLoadingThreads ? (
                          <div className="text-slate-500 text-sm">Loading communications...</div>
                        ) : (
                          <EmailThreadDisplay threads={emailThreads} compact={true} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="documents" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 pb-32">
                  <div className="max-w-4xl mx-auto">
                    <DocumentUploadSection />
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="intelligence" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 pb-32">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <RouteOptimization />
                    <EldSharing />
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold mb-4 text-slate-900">Load Intelligence</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium mb-2 text-slate-900">Route Analysis</h4>
                          <p className="text-sm text-slate-600">
                            Optimal route identified with 3% fuel savings potential.
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium mb-2 text-slate-900">Weather Impact</h4>
                          <p className="text-sm text-slate-600">
                            Clear conditions expected for the entire route.
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium mb-2 text-slate-900">Traffic Patterns</h4>
                          <p className="text-sm text-slate-600">
                            Light traffic expected during pickup window.
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium mb-2 text-slate-900">Historical Performance</h4>
                          <p className="text-sm text-slate-600">
                            Similar loads completed 15% faster than average.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Fixed chat interface within the load details container */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-20 p-4 shrink-0">
              <div className="max-w-4xl mx-auto">
                <FunctionalChatInterface 
                  onNavigateToLoad={handleNavigateToLoad}
                  onFocusChange={handleFocusChange}
                  isFocused={isChatFocused}
                />
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default LoadMainContent;
