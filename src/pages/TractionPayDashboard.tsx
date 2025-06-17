
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import NavigationSidebar from "@/components/NavigationSidebar";
import TractionPayHeader from "@/components/traction-pay/TractionPayHeader";
import DocumentUploadZone from "@/components/traction-pay/DocumentUploadZone";
import LoadsPipeline from "@/components/traction-pay/LoadsPipeline";
import FinancialIntelligence from "@/components/traction-pay/FinancialIntelligence";
import BusinessCoachingWidget from "@/components/traction-pay/BusinessCoachingWidget";
import { useToast } from "@/hooks/use-toast";

const TractionPayDashboard = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'loads' | 'documents' | 'financials'>('dashboard');

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <NavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <TractionPayHeader 
          userProfile={profile}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quick Upload Zone */}
              <DocumentUploadZone />
              
              {/* Recent Loads Pipeline */}
              <LoadsPipeline limit={5} />
              
              {/* Financial Overview */}
              <FinancialIntelligence compact />
              
              {/* Business Coaching */}
              <BusinessCoachingWidget />
            </div>
          )}
          
          {activeTab === 'loads' && (
            <LoadsPipeline />
          )}
          
          {activeTab === 'documents' && (
            <DocumentUploadZone expanded />
          )}
          
          {activeTab === 'financials' && (
            <FinancialIntelligence />
          )}
        </div>
      </div>
    </div>
  );
};

export default TractionPayDashboard;
