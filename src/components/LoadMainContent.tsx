
import { useState, useEffect } from "react";
import LoadHeader from "./LoadHeader";
import LoadAcceptanceCard from "./LoadAcceptanceCard";
import FloatingChatWidget from "./FloatingChatWidget";
import LoadDetailTabs from "./LoadDetailTabs";
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

  const refreshLoadData = () => {
    const refreshedLoad = LoadRepository.getLoadById(loadData.id);
    if (refreshedLoad) {
      setLoad(refreshedLoad);
    }
  };

  useEffect(() => {
    refreshLoadData();
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

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ backgroundColor: '#F5F6FA' }}>
      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-6 py-4 flex-shrink-0">
        <LoadHeader loadData={load} />
      </div>
      
      {/* Tabs Container */}
      <div className="flex-1 min-h-0 overflow-hidden px-3 pt-4">
        <LoadDetailTabs 
          load={load}
          emailThreads={emailThreads}
          isLoadingEmails={isLoadingEmails}
          onLoadUpdate={refreshLoadData}
        />
      </div>
      
      {/* Floating Chat Widget */}
      <FloatingChatWidget loadId={load.id} />
    </div>
  );
};

export default LoadMainContent;
