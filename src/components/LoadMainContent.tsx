
import { useState, useEffect } from "react";
import LoadHeader from "./LoadHeader";
import LoadInformation from "./LoadInformation";
import DocumentUploadSection from "./DocumentUploadSection";
import EmailThreadDisplay from "./EmailThreadDisplay";
import LoadChatSection from "./LoadChatSection";
import PaymentChatSection from "./PaymentChatSection";
import LoadAcceptanceCard from "./LoadAcceptanceCard";
import NotificationBell from "./NotificationBell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      {/* Header with notification bell */}
      <div className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <LoadHeader loadData={load} />
        <NotificationBell />
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Load Acceptance Card for pending loads */}
          {load.status === "pending_acceptance" && (
            <LoadAcceptanceCard load={load} />
          )}
          
          {/* Load Information */}
          <LoadInformation loadData={load} />
          
          {/* Document Upload Section */}
          <DocumentUploadSection />
          
          {/* Email Communications */}
          <Card>
            <CardHeader>
              <CardTitle>Email Communications</CardTitle>
              <CardDescription>
                Email threads and communications for this load
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingEmails ? (
                <div className="text-center py-8">
                  <div className="text-slate-500 text-sm">Loading communications...</div>
                </div>
              ) : (
                <EmailThreadDisplay threads={emailThreads} />
              )}
            </CardContent>
          </Card>
          
          {/* Load-specific Chat */}
          <LoadChatSection loadId={load.id} />
          
          {/* Payment Chat */}
          <PaymentChatSection loadId={load.id} />
        </div>
      </div>
    </div>
  );
};

export default LoadMainContent;
