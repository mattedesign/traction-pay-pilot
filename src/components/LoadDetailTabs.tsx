
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoadDetailContent from "./LoadDetailContent";
import LoadDocumentsContent from "./LoadDocumentsContent";
import LoadIntelligenceContent from "./LoadIntelligenceContent";
import LoadAcceptanceCard from "./LoadAcceptanceCard";
import { Load } from "@/types/load";
import { EmailThread } from "@/services/emailService";

interface LoadDetailTabsProps {
  load: Load;
  emailThreads: EmailThread[];
  isLoadingEmails: boolean;
}

const LoadDetailTabs = ({ load, emailThreads, isLoadingEmails }: LoadDetailTabsProps) => {
  return (
    <Tabs defaultValue="detail" className="flex flex-col h-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="detail">Detail</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
      </TabsList>
      
      <div className="flex-1 overflow-y-auto">
        <TabsContent value="detail" className="h-full m-0">
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Load Acceptance Card for pending loads - now within scrollable content */}
            {load.status === "pending_acceptance" && (
              <LoadAcceptanceCard load={load} />
            )}
            
            <LoadDetailContent 
              load={load}
              emailThreads={emailThreads}
              isLoadingEmails={isLoadingEmails}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="h-full m-0">
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Load Acceptance Card for pending loads - now within scrollable content */}
            {load.status === "pending_acceptance" && (
              <LoadAcceptanceCard load={load} />
            )}
            
            <LoadDocumentsContent />
          </div>
        </TabsContent>
        
        <TabsContent value="intelligence" className="h-full m-0">
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Load Acceptance Card for pending loads - now within scrollable content */}
            {load.status === "pending_acceptance" && (
              <LoadAcceptanceCard load={load} />
            )}
            
            <LoadIntelligenceContent load={load} />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default LoadDetailTabs;
