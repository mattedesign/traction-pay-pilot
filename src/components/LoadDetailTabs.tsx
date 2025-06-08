
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
}

const LoadDetailTabs = ({ load, emailThreads, isLoadingEmails }: LoadDetailTabsProps) => {
  return (
    <div>
      <Tabs defaultValue="detail" className="flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="detail">Detail</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
        </TabsList>
        
        {/* Invoice Request Toast for Ready To Invoice loads */}
        {load.status === "ready_to_invoice" && (
          <InvoiceRequestToast brokerName={load.broker} />
        )}
        
        <div className="overflow-y-auto space-y-6" style={{ height: 'calc(100vh - 140px)', backgroundColor: '#F5F6FA' }}>
          <TabsContent value="detail" className="m-0 pt-6">
            {/* Load Acceptance Card for pending loads */}
            {load.status === "pending_acceptance" && (
              <LoadAcceptanceCard load={load} />
            )}
            
            <LoadDetailContent 
              load={load}
              emailThreads={emailThreads}
              isLoadingEmails={isLoadingEmails}
            />
          </TabsContent>
          
          <TabsContent value="documents" className="m-0 pt-6">
            {/* Load Acceptance Card for pending loads */}
            {load.status === "pending_acceptance" && (
              <LoadAcceptanceCard load={load} />
            )}
            
            <LoadDocumentsContent />
          </TabsContent>
          
          <TabsContent value="intelligence" className="m-0 pt-6">
            {/* Load Acceptance Card for pending loads */}
            {load.status === "pending_acceptance" && (
              <LoadAcceptanceCard load={load} />
            )}
            
            <LoadIntelligenceContent load={load} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default LoadDetailTabs;
