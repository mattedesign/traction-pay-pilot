
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoadDetailContent from "./LoadDetailContent";
import LoadDocumentsContent from "./LoadDocumentsContent";
import LoadIntelligenceContent from "./LoadIntelligenceContent";
import { Load } from "@/types/load";
import { EmailThread } from "@/services/emailService";

interface LoadDetailTabsProps {
  load: Load;
  emailThreads: EmailThread[];
  isLoadingEmails: boolean;
}

const LoadDetailTabs = ({ load, emailThreads, isLoadingEmails }: LoadDetailTabsProps) => {
  return (
    <Tabs defaultValue="detail" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="detail">Detail</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
      </TabsList>
      
      <TabsContent value="detail" className="space-y-6">
        <LoadDetailContent 
          load={load}
          emailThreads={emailThreads}
          isLoadingEmails={isLoadingEmails}
        />
      </TabsContent>
      
      <TabsContent value="documents" className="space-y-6">
        <LoadDocumentsContent />
      </TabsContent>
      
      <TabsContent value="intelligence" className="space-y-6">
        <LoadIntelligenceContent load={load} />
      </TabsContent>
    </Tabs>
  );
};

export default LoadDetailTabs;
