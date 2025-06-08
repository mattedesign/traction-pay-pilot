
import LoadInformation from "./LoadInformation";
import FinancialSummaryCard from "./FinancialSummaryCard";
import EmailCommunicationsSection from "./EmailCommunicationsSection";
import { Load } from "@/types/load";
import { EmailThread } from "@/services/emailService";

interface LoadDetailContentProps {
  load: Load;
  emailThreads: EmailThread[];
  isLoadingEmails: boolean;
}

const LoadDetailContent = ({ load, emailThreads, isLoadingEmails }: LoadDetailContentProps) => {
  return (
    <div className="space-y-6">
      {/* Load Information */}
      <LoadInformation loadData={load} />
      
      {/* Financial Summary Card */}
      <FinancialSummaryCard loadData={load} />
      
      {/* Email Communications - Collapsible */}
      <EmailCommunicationsSection 
        emailThreads={emailThreads}
        isLoadingEmails={isLoadingEmails}
      />
    </div>
  );
};

export default LoadDetailContent;
