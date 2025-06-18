
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoadDetailContent from "./LoadDetailContent";
import LoadDocumentsContent from "./LoadDocumentsContent";
import LoadIntelligenceContent from "./LoadIntelligenceContent";
import LoadAcceptanceCard from "./LoadAcceptanceCard";
import InvoiceRequestToast from "./InvoiceRequestToast";
import { Load } from "@/types/load";
import { EmailThread } from "@/services/emailService";

interface LoadDetailTabsProps {
  load: Load;
  emailThreads: EmailThread[];
  isLoadingEmails: boolean;
  onLoadUpdate?: () => void;
}

const LoadDetailTabs = ({ load, emailThreads, isLoadingEmails, onLoadUpdate }: LoadDetailTabsProps) => {
  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="detail" className="flex flex-col h-full">
        <TabsList className="grid w-full grid-cols-3 flex-shrink-0 mx-2 mt-2">
          <TabsTrigger value="detail" className="text-xs md:text-sm">Detail</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs md:text-sm">Documents</TabsTrigger>
          <TabsTrigger value="intelligence" className="text-xs md:text-sm">Intelligence</TabsTrigger>
        </TabsList>
        
        {/* Invoice Request Toast for Ready To Invoice loads */}
        {load.status === "ready_to_invoice" && (
          <div className="flex-shrink-0 mt-2 mx-2">
            <InvoiceRequestToast brokerName={load.broker} />
          </div>
        )}
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="detail" className="h-full m-0">
            <div className="h-full overflow-y-auto space-y-4 pt-4 pb-4 px-2" style={{ backgroundColor: '#F5F6FA' }}>
              {/* Load Acceptance Card for pending loads */}
              {load.status === "pending_acceptance" && (
                <LoadAcceptanceCard load={load} onLoadUpdate={onLoadUpdate} />
              )}
              
              <LoadDetailContent 
                load={load}
                emailThreads={emailThreads}
                isLoadingEmails={isLoadingEmails}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="h-full m-0">
            <div className="h-full overflow-y-auto space-y-4 pt-4 pb-4 px-2" style={{ backgroundColor: '#F5F6FA' }}>
              {/* Load Acceptance Card for pending loads */}
              {load.status === "pending_acceptance" && (
                <LoadAcceptanceCard load={load} onLoadUpdate={onLoadUpdate} />
              )}
              
              <LoadDocumentsContent />
            </div>
          </TabsContent>
          
          <TabsContent value="intelligence" className="h-full m-0">
            <div className="h-full overflow-y-auto space-y-4 pt-4 pb-4 px-2" style={{ backgroundColor: '#F5F6FA' }}>
              {/* Load Acceptance Card for pending loads */}
              {load.status === "pending_acceptance" && (
                <LoadAcceptanceCard load={load} onLoadUpdate={onLoadUpdate} />
              )}
              
              <LoadIntelligenceContent load={load} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default LoadDetailTabs;
