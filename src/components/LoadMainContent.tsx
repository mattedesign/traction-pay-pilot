
import { useState, useEffect } from "react";
import LoadHeader from "./LoadHeader";
import LoadInformation from "./LoadInformation";
import FinancialSummaryCard from "./FinancialSummaryCard";
import DocumentUploadSection from "./DocumentUploadSection";
import EmailThreadDisplay from "./EmailThreadDisplay";
import LoadChatSection from "./LoadChatSection";
import PaymentChatSection from "./PaymentChatSection";
import LoadAcceptanceCard from "./LoadAcceptanceCard";
import FloatingChatWidget from "./FloatingChatWidget";
import RouteOptimization from "./RouteOptimization";
import FinancialServices from "./FinancialServices";
import SmartFeaturesCards from "./SmartFeaturesCards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { EmailService, EmailThread } from "@/services/emailService";
import { LoadRepository } from "@/services/loadRepository";
import { Load } from "@/types/load";

interface LoadMainContentProps {
  loadData: Load;
}

const LoadMainContent = ({ loadData }: LoadMainContentProps) => {
  const [emailThreads, setEmailThreads] = useState<EmailThread[]>([]);
  const [isLoadingEmails, setIsLoadingEmails] = useState(true);
  const [load, setLoad] = useState(loadData);
  const [isEmailSectionOpen, setIsEmailSectionOpen] = useState(false);

  useEffect(() => {
    // Refresh load data from repository
    const refreshedLoad = LoadRepository.getLoadById(loadData.id);
    if (refreshedLoad) {
      setLoad(refreshedLoad);
    }
  }, [loadData.id]);

  useEffect(() => {
    const loadEmails = async () => {
      setIsLoadingEmails(true);
      try {
        const threads = await EmailService.getEmailThreadsForLoad(loadData.id);
        setEmailThreads(threads);
      } catch (error) {
        console.error('Error loading email threads:', error);
      } finally {
        setIsLoadingEmails(false);
      }
    };

    loadEmails();
  }, [loadData.id]);

  // Create extracted data for SmartFeaturesCards
  const extractedData = {
    rate: load.amount,
    origin: load.origin,
    destination: load.destination,
    distance: load.distance
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header without notification bell */}
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <LoadHeader loadData={load} />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6">
          {/* Load Acceptance Card for pending loads */}
          {load.status === "pending_acceptance" && (
            <div className="mb-6">
              <LoadAcceptanceCard load={load} />
            </div>
          )}
          
          {/* Tabbed Interface */}
          <Tabs defaultValue="detail" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="detail">Detail</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
            </TabsList>
            
            <TabsContent value="detail" className="space-y-6">
              {/* Load Information */}
              <LoadInformation loadData={load} />
              
              {/* Financial Summary Card */}
              <FinancialSummaryCard loadData={load} />
              
              {/* Email Communications - Collapsible */}
              <Collapsible open={isEmailSectionOpen} onOpenChange={setIsEmailSectionOpen}>
                <Card>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Email Communications</CardTitle>
                          <CardDescription>
                            Email threads and communications for this load
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          {isEmailSectionOpen ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      {isLoadingEmails ? (
                        <div className="text-center py-8">
                          <div className="text-slate-500 text-sm">Loading communications...</div>
                        </div>
                      ) : (
                        <EmailThreadDisplay threads={emailThreads} />
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              {/* Document Upload Section */}
              <DocumentUploadSection />
            </TabsContent>
            
            <TabsContent value="intelligence" className="space-y-6">
              {/* Smart Features Overview */}
              <SmartFeaturesCards extractedData={extractedData} />
              
              {/* Route Optimization */}
              <RouteOptimization />
              
              {/* Financial Services */}
              <FinancialServices loadAmount={load.amount} />
              
              {/* Load-specific Chat */}
              <LoadChatSection loadId={load.id} />
              
              {/* Payment Chat */}
              <PaymentChatSection loadId={load.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Floating Chat Widget */}
      <FloatingChatWidget loadId={load.id} />
    </div>
  );
};

export default LoadMainContent;
