
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
          <LoadDetailTabs 
            load={load}
            emailThreads={emailThreads}
            isLoadingEmails={isLoadingEmails}
          />
        </div>
      </div>
      
      {/* Floating Chat Widget */}
      <FloatingChatWidget loadId={load.id} />
    </div>
  );
};

export default LoadMainContent;
