
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

  return (
    <div className="flex-1 flex flex-col h-screen" style={{ backgroundColor: '#F5F6FA' }}>
      {/* Header without notification bell */}
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <LoadHeader loadData={load} />
      </div>
      
      {/* Vertical gap between header and tabs */}
      <div className="h-4"></div>
      
      {/* Fixed Tabs Container with consistent padding */}
      <div className="border-b border-slate-200 px-6 sticky top-0 z-10">
        <LoadDetailTabs 
          load={load}
          emailThreads={emailThreads}
          isLoadingEmails={isLoadingEmails}
        />
      </div>
      
      {/* Floating Chat Widget */}
      <FloatingChatWidget loadId={load.id} />
    </div>
  );
};

export default LoadMainContent;
