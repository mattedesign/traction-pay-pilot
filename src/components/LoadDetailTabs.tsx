
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
        <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
          <TabsTrigger value="detail">Detail</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
        </TabsList>
        
        {/* Invoice Request Toast for Ready To Invoice loads */}
        {load.status === "ready_to_invoice" && (
          <div className="flex-shrink-0">
            <InvoiceRequestToast brokerName={load.broker} />
          </div>
        )}
        
        <div className="flex-1 min-h-0 overflow-y-auto space-y-6 pt-6" style={{ backgroundColor: '#F5F6FA' }}>
          <TabsContent value="detail" className="m-0 h-full">
            {/* Load Acceptance Card for pending loads */}
            {load.status === "pending_acceptance" && (
              <LoadAcceptanceCard load={load} onLoadUpdate={onLoadUpdate} />
            )}
            
            <LoadDetailContent 
              load={load}
              emailThreads={emailThreads}
              isLoadingEmails={isLoadingEmails}
            />
          </TabsContent>
          
          <TabsContent value="documents" className="m-0 h-full">
            {/* Load Acceptance Card for pending loads */}
            {load.status === "pending_acceptance" && (
              <LoadAcceptanceCard load={load} onLoadUpdate={onLoadUpdate} />
            )}
            
            <LoadDocumentsContent />
          </TabsContent>
          
          <TabsContent value="intelligence" className="m-0 h-full">
            {/* Load Acceptance Card for pending loads */}
            {load.status === "pending_acceptance" && (
              <LoadAcceptanceCard load={load} onLoadUpdate={onLoadUpdate} />
            )}
            
            <LoadIntelligenceContent load={load} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default LoadDetailTabs;
