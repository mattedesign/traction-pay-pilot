
import { useState, useEffect } from "react";
import { LoadService } from "@/services/loadService";
import { Load } from "@/types/load";
import LoadDetailContent from "./LoadDetailContent";
import { EmailService, EmailThread } from "@/services/emailService";

interface LoadsSummaryViewProps {
  onLoadSelect: (load: Load) => void;
}

const LoadsSummaryView = ({ onLoadSelect }: LoadsSummaryViewProps) => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [firstLoad, setFirstLoad] = useState<Load | null>(null);
  const [emailThreads, setEmailThreads] = useState<EmailThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEmails, setIsLoadingEmails] = useState(false);

  useEffect(() => {
    const fetchLoads = async () => {
      setIsLoading(true);
      const allLoads = LoadService.getAllLoads();
      setLoads(allLoads);
      
      if (allLoads.length > 0) {
        const first = allLoads[0];
        setFirstLoad(first);
        onLoadSelect(first);
        
        // Load emails for the first load
        setIsLoadingEmails(true);
        try {
          const threads = await EmailService.getEmailThreadsForLoad(first.id);
          setEmailThreads(threads);
        } catch (error) {
          console.error('Error loading email threads:', error);
        } finally {
          setIsLoadingEmails(false);
        }
      }
      
      setIsLoading(false);
    };

    fetchLoads();
  }, [onLoadSelect]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4" style={{ backgroundColor: '#F5F6FA' }}>
        <div className="text-slate-600">Loading loads...</div>
      </div>
    );
  }

  if (loads.length === 0) {
    return (
      <div className="flex flex-col h-full" style={{ backgroundColor: '#F5F6FA' }}>
        <div className="border-b border-slate-200 bg-white px-6 py-4 flex-shrink-0">
          <h1 className="text-2xl font-bold text-slate-900">Loads</h1>
          <p className="text-slate-600 mt-1">No loads found</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-slate-500">
            <h3 className="text-lg font-medium mb-2">No loads available</h3>
            <p className="text-sm">Start by creating your first load or uploading rate confirmations.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!firstLoad) {
    return (
      <div className="flex-1 flex items-center justify-center p-4" style={{ backgroundColor: '#F5F6FA' }}>
        <div className="text-slate-600">Unable to load first load</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#F5F6FA' }}>
      {/* Header - Fixed */}
      <div className="border-b border-slate-200 bg-white px-6 py-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-900">Load #{firstLoad.id}</h1>
        <p className="text-slate-600 mt-1">{firstLoad.broker} • {firstLoad.origin} → {firstLoad.destination}</p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-auto p-6">
        <LoadDetailContent 
          load={firstLoad}
          emailThreads={emailThreads}
          isLoadingEmails={isLoadingEmails}
        />
      </div>
    </div>
  );
};

export default LoadsSummaryView;
